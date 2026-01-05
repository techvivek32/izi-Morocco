import { Request, Response } from 'express'
import Players from '../db/models/players.schema'
import TempStorage from '../db/models/tempStorage.schema'
import bcrypt from 'bcrypt'
import { generateUUID } from '../utils/uuid'
import { createJWT } from '../utils/token'
import sendEmail from '../utils/email'
import config from '../config'
import { generateOTP } from '../utils/otp'

export const signup = async (req: Request, res: Response) => {
  const { name, email, password } = req.body

  const hashedPassword = await bcrypt.hash(password, 10)
  const playerId = generateUUID()

  const playerDetails = {
    playerId,
    name,
    email,
    password: hashedPassword,
    createdAt: new Date(),
    updatedAt: new Date(),
    isVerified: false // Will be true after email verification
  }

  const otp = generateOTP()
  const ttl = 10 * 60 * 1000 // 10 minutes
  const expiresAt = new Date(Date.now() + ttl)

  // SEND THE OTP TO PLAYER'S EMAIL FOR VERIFICATION
  await Promise.all([
    Players.create(playerDetails),
    TempStorage.create({
      key: `accountVerification_${playerId}`,
      value: otp,
      expiresAt
    })
  ])

  sendEmail('ACCOUNT_VERIFICATION', {
    email: playerDetails.email,
    name: playerDetails.name,
    otp
  })

  const token = createJWT(
    {
      id: playerId
    },
    process.env.JWT_SECRET || ''
  )

  return res.json({
    success: true,
    message: 'Signup successful',
    token,
    step: 'otpScreen'
  })
}

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body

  const player = await Players.findOne({ email }).lean()

  if (!player) {
    res.status(401).json({
      success: false,
      message: 'Invalid email or password.'
    })
    return
  }

  let isPasswordSame = false

  isPasswordSame = await bcrypt.compare(password, player.password)

  if (!isPasswordSame) {
    res.status(401).json({
      success: false,
      message: 'Invalid email or password.'
    })
    return
  }

  const token = createJWT(
    {
      id: player.playerId
    },
    process.env.JWT_SECRET || ''
  )

  let step = 'homeScreen'

  if (!player.isVerified) {
    step = 'otpScreen'
    const otp = generateOTP()
    const ttl = 10 * 60 * 1000 // 10 minutes
    const expiresAt = new Date(Date.now() + ttl)

    await Promise.all([
      TempStorage.findOneAndUpdate(
        { key: `accountVerification_${player.playerId}` },
        { value: otp, expiresAt },
        { upsert: true }
      ),
      sendEmail('ACCOUNT_VERIFICATION', {
        email: player.email,
        name: player.name,
        otp
      })
    ])
  }

  return res.json({ success: true, message: 'Login successful', token, step })
}

export const verifyAccount = async (req: Request, res: Response) => {
  const { email, otp } = req.body || {}

  if (!email || !otp) {
    return res.status(400).json({
      success: false,
      message: 'Invalid OTP'
    })
  }

  const player = await Players.findOne({ email })

  if (!player) {
    return res.status(400).json({
      success: false,
      message: 'Invalid OTP'
    })
  }

  if (player.isVerified) {
    return res.status(400).json({
      success: false,
      message: 'Account is already verified. Please login.'
    })
  }

  const key = `accountVerification_${player.playerId}`
  const tempData = await TempStorage.findOne({ key, value: otp })

  if (!tempData) {
    return res.status(400).json({
      success: false,
      message: 'Invalid or expired OTP'
    })
  }

  await Promise.all([
    Players.updateOne(
      { playerId: player.playerId },
      { isVerified: true, updatedAt: new Date() }
    ),
    TempStorage.deleteOne({ key })
  ])

  return res.json({
    success: true,
    message: 'Account verified successfully. You can now login.'
  })
}

export const forgetPassword = async (req: Request, res: Response) => {
  const { email } = req.body

  const player = await Players.findOne({ email })

  if (player) {
    const otp = generateOTP()
    const ttl = 10 * 60 * 1000 // 10 minutes
    const expiresAt = new Date(Date.now() + ttl)

    await TempStorage.create({
      key: `forgetPassword_${player.playerId}`,
      value: otp,
      expiresAt
    })

    await sendEmail('FORGET_PASSWORD', {
      email: player.email,
      name: player.name,
      otp
    })
  }

  res.status(200).json({
    message:
      'Password reset link has been sent to your email if it is registered with us.',
    success: true
  })
}

export const verifySetupPasswordToken = async (req: Request, res: Response) => {
  res.status(200).json({
    message: 'Token is valid.',
    data: res.locals.shared.userData,
    success: true
  })
}

export const setupPassword = async (req: Request, res: Response) => {
  const { userData } = res.locals.shared
  const { password } = req.body

  const hashedPassword = await bcrypt.hash(password, 10)

  await Players.updateOne(
    { playerId: userData.playerId },
    { password: hashedPassword, isVerified: true, updatedAt: new Date() }
  )

  res.status(200).json({
    message: 'Password setup successfully. You can now login.',
    success: true
  })
}

export const resetPassword = async (req: Request, res: Response) => {
  const { password } = req.body
  const { user } = res.locals

  const isSamePrevCurr = await bcrypt.compare(password, user.password)

  if (isSamePrevCurr) {
    res.status(400).json({
      message: 'New password must be different from the previous password.',
      success: false
    })
    return
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  await Players.updateOne(
    { playerId: user.playerId },
    { password: hashedPassword, updatedAt: new Date() }
  )

  res.status(200).json({
    message: 'Password reset successfully. You can now login.',
    success: true
  })
}

export const resendOTP = async (req: Request, res: Response) => {
  const { email, reqFor } = req.body

  if (!email) {
    return res.status(400).json({
      success: false,
      message: 'Email is required'
    })
  }

  const player = await Players.findOne({ email }).lean()

  if (!player) {
    return res.status(400).json({
      success: false,
      message: 'Invalid Email'
    })
  }

  if (player.isVerified && reqFor === 'ACCOUNT_VERIFICATION') {
    return res.status(400).json({
      success: false,
      message: 'Account is already verified. Please login.'
    })
  }

  const featureMap: { [key: string]: string } = {
    ACCOUNT_VERIFICATION: 'accountVerification',
    FORGET_PASSWORD: 'forgetPassword'
  }

  const key = `${featureMap[reqFor]}_${player.playerId}`
  const otp = generateOTP()
  const ttl = 10 * 60 * 1000 // 10 minutes
  const expiresAt = new Date(Date.now() + ttl)

  const existingEntry = await TempStorage.findOne({ key })

  if (existingEntry) {
    if (existingEntry.count >= 5) {
      return res.status(429).json({
        success: false,
        message: 'Maximum OTP resend attempts reached. Please try again later.'
      })
    }

    existingEntry.value = otp
    existingEntry.expiresAt = expiresAt
    existingEntry.count += 1
    await existingEntry.save()
  } else {
    await TempStorage.create({
      key,
      value: otp,
      expiresAt
    })
  }

  await sendEmail(reqFor, {
    email: player.email,
    name: player.name,
    otp
  })

  return res.json({
    success: true,
    message: 'OTP resent successfully'
  })
}

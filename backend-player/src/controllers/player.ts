import { Request, Response } from 'express'
import { removeExtraFieldFormObject } from '../utils/funcations'
import Player from '../db/models/players.schema'
import mongoDB from '../db'
import { generateUUID } from '../utils/uuid'
import bcrypt from 'bcrypt'
import { base64ToBuffer, uploadFromBuffer } from '../utils/fileuplode'

export const viewPlayer = async (req: Request, res: Response) => {
  const user = res.locals.user

  delete user.password
  delete user._id

  return res.status(200).json({
    success: true,
    message: 'User details fetched successfully',
    data: {
      ...user
    }
  })
}

export const editPlayer = async (req: Request, res: Response) => {
  const { name, phone, profileImage } = req.body
  const { user } = res.locals

  const updateData = {
    name,
    phone,
    profileImage
  }

  const pureUpdateData = removeExtraFieldFormObject(
    updateData,
    ['name', 'phone', 'profileImage'],
    true,
    [false]
  )

  if (Object.keys(pureUpdateData).length) {
    await Player.updateOne(
      { playerId: user.playerId },
      { ...pureUpdateData, updatedAt: new Date() }
    )
  }

  res.status(200).json({
    success: true,
    message: 'Member details updated successfully'
  })
}

export const deleteUser = async (req: Request, res: Response) => {
  const { userId } = req.params

  await Player.updateOne({ playerId: userId }, { isDeleted: true })

  res.status(200).json({
    success: true,
    message: 'Family member deleted successfully'
  })
}

// export const deleteMyAccount = async (req: Request, res: Response) => {
//   const { user } = res.locals

//   let condition = {}

//   if (user.role === 'O') {
//     condition = { famId: user.famId }
//   } else {
//     condition = { userId: user.userId }
//   }

//   await userQueries.updateUserByCondition(mongoDB, condition, {
//     isDeleted: true
//   })

//   return res.status(200).json({
//     success: true,
//     message: 'Account deleted successfully'
//   })
// }

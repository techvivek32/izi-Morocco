import { AnyType, DynamicObjectType } from '../../types'

export default {
  FORGET_PASSWORD: (normalizedEntry: DynamicObjectType) => ({
    html: `<div>
            <p>Hi ${normalizedEntry.name},</p>
            <p>We received a request to reset your password. Use the OTP below to reset your password:</p>
            <div style="background-color: #f8f9fa; padding: 20px; text-align: center; margin: 20px 0; border-radius: 5px;">
              <h2 style="color: #007bff; font-size: 32px; letter-spacing: 5px; margin: 0;">${normalizedEntry.otp}</h2>
              <p style="color: #6c757d; margin: 10px 0 0 0; font-size: 14px;">This OTP will expire in 10 minutes</p>
            </div>
            <p>If you did not request a password reset, please ignore this email. Your current password will remain unchanged.</p>
            <p>Thanks,<br/>IZI Morocco Team</p>
          </div>`,
    from: normalizedEntry.mailSender,
    replyTo: normalizedEntry.replyTo,
    to: [normalizedEntry.email],
    subject: 'Password Reset OTP – IZI Morocco'
  }),
  ACCOUNT_VERIFICATION: (normalizedEntry: DynamicObjectType) => ({
    html: `<div>
            <p>Hi ${normalizedEntry.name},</p>
            <p>Thank you for registering with IZI Morocco! Please use the OTP below to verify your account:</p>
            <div style="background-color: #f8f9fa; padding: 20px; text-align: center; margin: 20px 0; border-radius: 5px;">
              <h2 style="color: #007bff; font-size: 32px; letter-spacing: 5px; margin: 0;">${normalizedEntry.otp}</h2>
              <p style="color: #6c757d; margin: 10px 0 0 0; font-size: 14px;">This OTP will expire in 10 minutes</p>
            </div>
            <p>If you did not create an account, please ignore this email.</p>
            <p>Thanks,<br/>IZI Morocco Team</p>
          </div>`,
    from: normalizedEntry.mailSender,
    replyTo: normalizedEntry.replyTo,
    to: [normalizedEntry.email],
    subject: 'Verify Your Account – IZI Morocco'
  })
}

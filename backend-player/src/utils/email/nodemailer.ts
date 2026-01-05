import mailer from 'nodemailer'
import { DynamicObjectType } from '../../types'

export default async (
  transportData: DynamicObjectType,
  emailbody: DynamicObjectType
) => {
  try {
    const transporter = mailer.createTransport(transportData)

    const res = await transporter.sendMail(emailbody)

    if (res && res.accepted && res.accepted.length) {
      return { success: true }
    }
    return { success: false, res }
  } catch (error) {
    return { success: false, error }
  }
}

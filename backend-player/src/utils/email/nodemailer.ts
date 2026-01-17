import mailer from 'nodemailer'
import { DynamicObjectType } from '../../types'

export default async (
  transportData: DynamicObjectType,
  emailbody: DynamicObjectType
) => {
  try {
    console.log('[EMAIL] Creating transporter with config:', {
      host: transportData.host,
      port: transportData.port,
      secure: transportData.secure,
      user: transportData.auth?.user
    })
    
    const transporter = mailer.createTransporter(transportData)
    
    // Verify connection
    console.log('[EMAIL] Verifying SMTP connection...')
    await transporter.verify()
    console.log('[EMAIL] SMTP connection verified successfully')

    console.log('[EMAIL] Sending email to:', emailbody.to)
    const res = await transporter.sendMail(emailbody)
    console.log('[EMAIL] Email sent successfully:', res.messageId)

    if (res && res.accepted && res.accepted.length) {
      return { success: true, messageId: res.messageId }
    }
    return { success: false, res }
  } catch (error) {
    console.error('[EMAIL] Failed to send email:', error)
    return { success: false, error }
  }
}

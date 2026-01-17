import mailer from 'nodemailer'
import { DynamicObjectType } from '../../types'
import axios from 'axios'

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
    
    // Use SendGrid Web API instead of SMTP for Render compatibility
    if (transportData.host === 'smtp.sendgrid.net') {
      console.log('[EMAIL] Using SendGrid Web API instead of SMTP')
      return await sendViaSendGridAPI(transportData.auth.pass, emailbody)
    }
    
    const transporter = mailer.createTransport(transportData)
    
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

// SendGrid Web API implementation
async function sendViaSendGridAPI(apiKey: string, emailbody: DynamicObjectType) {
  try {
    const response = await axios.post(
      'https://api.sendgrid.com/v3/mail/send',
      {
        personalizations: [{
          to: [{ email: emailbody.to }],
          subject: emailbody.subject
        }],
        from: { email: emailbody.from },
        content: [{
          type: 'text/html',
          value: emailbody.html || emailbody.text
        }]
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    )
    
    console.log('[EMAIL] SendGrid API success:', response.status)
    return { success: true, messageId: 'sendgrid-api-' + Date.now() }
    
  } catch (error: any) {
    console.error('[EMAIL] SendGrid API error:', error.response?.data || error.message)
    throw error
  }
}

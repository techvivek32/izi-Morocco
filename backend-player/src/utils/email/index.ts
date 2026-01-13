import nodemailer from './nodemailer'
import config from '../../config'
import { DynamicObjectType } from '../../types'
import getTransport from './getTransport'
import generateEmailBody from './generateEmailBody'

const sendEmail = async (
  feature: keyof typeof generateEmailBody,
  emailContentData: DynamicObjectType
) => {
  const transportData = await getTransport()

  Object.assign(emailContentData, {
    mailSender: `${config.common.companyName} <${process.env.MAIL_USER || config.common.fromEmail}>`
  })

  const emailbody = generateEmailBody[feature](emailContentData)

  const response = await nodemailer(transportData.smtpConfig, emailbody)
  console.dir({ response }, { depth: null })

  return response
}

export default sendEmail

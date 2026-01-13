export default async () => {
  const port = parseInt(process.env.MAIL_PORT || '465');
  return {
    smtpConfig: {
      host: process.env.MAIL_HOST,
      port: port,
      secure: port === 465,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
      },
      tls: {
        rejectUnauthorized: false
      },
      connectionTimeout: 10000, // 10 seconds
      greetingTimeout: 10000,
      socketTimeout: 10000
    }
  }
}

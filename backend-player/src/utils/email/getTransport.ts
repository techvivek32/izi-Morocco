export default async () => {
  const port = parseInt(process.env.MAIL_PORT || '587');
  return {
    smtpConfig: {
      host: process.env.MAIL_HOST,
      port: port,
      secure: port === 465, // true for 465, false for other ports
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
      },
      tls: {
        rejectUnauthorized: false
      },
      connectionTimeout: 30000, // 30 seconds
      greetingTimeout: 30000,
      socketTimeout: 30000,
      pool: true,
      maxConnections: 1,
      rateDelta: 20000,
      rateLimit: 5
    }
  }
}

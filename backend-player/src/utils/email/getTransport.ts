export default async () => {
  const port = parseInt(process.env.MAIL_PORT || '587');
  return {
    smtpConfig: {
      host: process.env.MAIL_HOST,
      port: port,
      secure: false, // false for port 587, true for port 465
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
      },
      tls: {
        rejectUnauthorized: false
      },
      requireTLS: true, // Force TLS for SendGrid
      connectionTimeout: 30000,
      greetingTimeout: 30000,
      socketTimeout: 30000
    }
  }
}

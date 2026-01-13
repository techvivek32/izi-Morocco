export default async () => {
  const port = parseInt(process.env.MAIL_PORT || '587');
  const host = process.env.MAIL_HOST || 'smtp.gmail.com';
  
  console.log(`[Email Config] Using Host: ${host}, Port: ${port}`);

  return {
    smtpConfig: {
      host: host,
      port: port,
      secure: port === 465, // true for 465, false for 587
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
      },
      tls: {
        // Do not fail on invalid certs
        rejectUnauthorized: false,
        // For port 587, we often need to specify the ciphers
        ciphers: 'SSLv3'
      },
      connectionTimeout: 15000, // Increased to 15 seconds
      greetingTimeout: 15000,
      socketTimeout: 15000,
      debug: true, // Enable debug output
      logger: true // Log to console
    }
  }
}

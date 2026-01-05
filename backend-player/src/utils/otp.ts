import crypto from 'crypto'

export function generateOTP(digits: number = 6): string {
  // crypto.randomInt is inclusive of min, exclusive of max
  const num = crypto.randomInt(0, Math.pow(10, digits)) // 0 .. 999999
  return String(num).padStart(digits, '0')
}

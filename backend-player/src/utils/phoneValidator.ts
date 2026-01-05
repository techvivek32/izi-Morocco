export default (phone: string) => {
  const phoneRegex = /^\+?\d{1,4}(\s?\d{1,15})+$/
  const isValidPhoneNumber = phoneRegex.test(phone)
  const digitsOnly = phone.replace(/\D/g, '')
  const digitCount = digitsOnly.length

  if (!isValidPhoneNumber || digitCount < 7 || digitCount > 15) {
    return false
  }

  return true
}

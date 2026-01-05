import { body, ValidationChain } from 'express-validator'

const isNameValid = body('name')
  .isString()
  .withMessage('Name must be a string')
  .bail()
  .isLength({ min: 3 })
  .withMessage('Name must be at least 3 characters')

const isEmailValid = body('email')
  .isEmail()
  .withMessage('Invalid email address')

const isPhoneValid = body('phone')
  .trim()
  .notEmpty()
  .withMessage('Mobile number is required.')
  .isMobilePhone('any')
  .withMessage('Please enter a valid mobile number.')

const isPasswordValid = body('password')
  .isString()
  .withMessage('Password must be at least 6 characters')
  .bail()
  .isLength({ min: 6 })
  .withMessage('Password must be at least 6 characters')

const isProfileImageValid = body('profileImage')
  .optional()
  .isString()
  .withMessage('Profile Image must be a base64 string')

// Single source of truth for all player fields
export const playerValidatorsMap = {
  name: isNameValid,
  // email: isEmailValid,
  phone: isPhoneValid,
  // password: isPasswordValid,
  profileImage: isProfileImageValid
}

export const playerValidatorsArr: ValidationChain[] =
  Object.values(playerValidatorsMap)

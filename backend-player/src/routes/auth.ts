import { Router } from 'express'
import validate, { validateReq } from '../middlewares/validate'
import {
  forgetPasswordSchema,
  isTokenValid,
  loginSchema,
  setupPasswordSchema,
  signupSchema,
  checkEmailUnique,
  resendOTPSchema
} from '../validators/auth'
import {
  forgetPassword,
  login,
  resendOTP,
  resetPassword,
  setupPassword,
  signup,
  verifyAccount,
  verifySetupPasswordToken
} from '../controllers/auth'
import auth from '../middlewares/auth/auth'

const router = Router()

// Signup
router.post('/signup', validateReq([...signupSchema, checkEmailUnique]), signup)

// Login
router.post('/login', validateReq(loginSchema), login)

router.post('/verify-account', verifyAccount)

router.post(
  '/forget-password',
  validateReq(forgetPasswordSchema),
  forgetPassword
)

router.get('/verify-token', validate([isTokenValid]), verifySetupPasswordToken)

router.post(
  '/setup-password',
  validateReq(setupPasswordSchema),
  validate([isTokenValid]),
  setupPassword
)

router.post(
  '/reset-password',
  auth('P'),
  validateReq([...setupPasswordSchema]),
  resetPassword
)

router.post('/resend-otp', validateReq(resendOTPSchema), resendOTP)

export default router

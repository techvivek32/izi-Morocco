import express from 'express'
import trimRequest from 'trim-request'

import * as authControllers from '../controllers/auth.controller.js'
import * as authValidators from '../validators/auth.validator.js'

import { authLimiter } from '../helpers/rateLimitter.js'

const router = express.Router()


router.use(trimRequest.all)


router.post(
  '/signup',
  authLimiter ,
  authValidators.signupValidator,
  authControllers.signupController,
)

router.post(
  '/login' ,
  authLimiter ,
  authValidators.loginValidator ,
  authControllers.loginController
)

router.delete(
  '/logout' , 
  authControllers.logoutController
)


router.post(
  '/send-otp' ,
  authLimiter ,
  authValidators.sendOtpvalidator ,
  authControllers.sendOtpController
)

router.post(
  '/forgot-password-token',
  authLimiter,
  authValidators.generateForgotPasswordTokenValidator,
  authControllers.generateForgotPasswordTokenController
)

router.post(
  '/reset-password' ,
  authLimiter,
  authValidators.resetPasswordValidator ,
  authControllers.resetPasswordController
)


router.post(
  '/verify-otp' ,
  authLimiter,
  authValidators.verifyOtpValidator , 
  authControllers.verifyOtpController
)


router.get(
  '/verify-tokens' ,
  authValidators.verifyTokensValidator ,
  authControllers.verifyTokensController
)




export default router

import express from 'express'

import * as questionInfoControllers from '../controllers/game-info.controller.js'
import * as questionInfoValidators from '../validators/game-info.validator.js'
import { requireAuth } from '../middlewares/auth.middleware.js'
import { generalLimiter } from '../helpers/rateLimitter.js'
import { checkPermission } from '../middlewares/check-permission.middleware.js'


const router = express.Router()

router.use(requireAuth)
router.use(generalLimiter)


router.get(
  '/:id',
  checkPermission(PERMISSIONS.GAMES.READ) ,
  questionInfoValidators.getGameInfoByIdValidator,
  questionInfoControllers.getGameInfoByIdController
)

router.get(
  '/',
  checkPermission(PERMISSIONS.GAMES.READ) ,
  questionInfoValidators.getAllGamesValidator,
  questionInfoControllers.getAllGamesController
)   


router.post(
  '/',
  checkPermission(PERMISSIONS.GAMES.CREATE) ,
  questionInfoValidators.createGameInfoValidator,
  questionInfoControllers.createGameInfoController
)

router.put(
  '/:id',
  checkPermission(PERMISSIONS.GAMES.UPDATE) ,
  questionInfoValidators.updateGameInfoValidator,
  questionInfoControllers.updateGameInfoController
)

export default router
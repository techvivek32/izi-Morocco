import express from 'express'
import * as gamesController from '../controllers/games'
import * as gamesValidators from '../validators/games'
import auth from '../middlewares/auth/auth'
import { validateReq, validateRequest } from '../middlewares/validate'

const router = express.Router()

router.use(auth('P', 'A'))

router.post(
  '/',
  validateReq(gamesValidators.joinGameValidator),
  gamesController.joinGameController
)
router.get(
  '/',
  validateReq(gamesValidators.getGamesValidator),
  gamesController.getGamesController
)
router.put(
  '/',
  // validateRequest,
  validateReq(gamesValidators.updateGameLogsValidator),
  gamesController.updateGameLogsController
)

router.post(
  '/reverse-game',
  validateReq(gamesValidators.gameReverseValidator),
  gamesController.gameReverseController
)

// router.get('/')

export default router

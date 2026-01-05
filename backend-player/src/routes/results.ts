import express from 'express'
import { validateReq } from '../middlewares/validate'
import auth from '../middlewares/auth/auth'
import * as gamesValidators from '../validators/games'
import * as resultsController from '../controllers/results'


const router = express.Router()
router.use(auth('P', 'A'))

// Get current authenticated player's game history (uses res.locals.user.playerId)
router.get(
  '/player-history',
  validateReq(gamesValidators.getGamesValidator),
  resultsController.getSpecificPlayerPlayedGamesHistory
)

// Get a specific game log (with populated questions/media/comments) for the current player
router.get(
  '/player-history/game/:gameId',
  resultsController.getPlayerGameWithQuestions
)

export default router

import express from 'express';

import * as gameQuestionsController from '../controllers/game-question.controller.js';
import * as gameQuestionsValidator from '../validators/game-question.validator.js';
import { requireAuth } from '../middlewares/auth.middleware.js';
import { generalLimiter } from '../helpers/rateLimitter.js';

const router = express.Router();


router.use(requireAuth);
router.use(generalLimiter);


router.post(
    '/',
    gameQuestionsValidator.validateUpsertGameQuestions,
    gameQuestionsController.upsertGameQuestionsController
);

router.get(
    '/:gameId',
    gameQuestionsValidator.validateGetGameQuestions,
    gameQuestionsController.getGameQuestionsController
);

router.get(
    '/',
    gameQuestionsValidator.validateGetAllGameQuestions,
    gameQuestionsController.getAllGameQuestionsController
);

router.get(
    '/nearby',
    gameQuestionsValidator.validateGetNearbyQuestions,
    gameQuestionsController.getNearbyQuestionsController
);

router.delete(
    '/:gameId',
    gameQuestionsValidator.validateDeleteGameQuestions,
    gameQuestionsController.deleteGameQuestionsController
);


export default router;
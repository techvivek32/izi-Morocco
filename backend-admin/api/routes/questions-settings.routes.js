import express from 'express';
import * as questionsSettingsController from '../controllers/questions-settings.controller.js';
import * as questionsSettingsValidator from '../validators/question-settings.validator.js';
import { requireAuth } from '../middlewares/auth.middleware.js';
import { generalLimiter } from '../helpers/rateLimitter.js';



const router = express.Router();

router.use(requireAuth);
router.use(generalLimiter)




router.get(
  '/:id',
  questionsSettingsValidator.getQuestionSettingsValidator,
  questionsSettingsController.getQuestionsSettings
);

router.post(
  '/:id',
  questionsSettingsValidator.mutateQuestionSettingsValidator,
  questionsSettingsController.mutateQuestionsSettings
);

export default router;

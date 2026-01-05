import express from 'express';
import * as questionsController from '../controllers/questions.controller.js';
import * as questionsValidator from '../validators/questions.validator.js';

import { requireAuth } from '../middlewares/auth.middleware.js';
import { generalLimiter } from '../helpers/rateLimitter.js';
import trimRequest from 'trim-request';
import { checkPermission } from '../middlewares/check-permission.middleware.js';
import { PERMISSIONS } from '../utils/permissions.js';

const router = express.Router();

router.use(generalLimiter);
router.use(requireAuth);
router.use(trimRequest.all);

router.get(
  '/',
  checkPermission(PERMISSIONS.PUZZLES.READ),
  questionsValidator.getQuestionsValidator,
  questionsController.getQuestions
);

router.get(
  '/:id',
  checkPermission(PERMISSIONS.PUZZLES.READ),
  questionsValidator.getQuestionByIdValidator,
  questionsController.getQuestionById
);

router.post(
  '/',
  checkPermission(PERMISSIONS.PUZZLES.CREATE),
  questionsValidator.createQuestionValidator,
  questionsController.createQuestion
);

router.put(
  '/:id',
  checkPermission(PERMISSIONS.PUZZLES.UPDATE),
  questionsValidator.editQuestionValidator,
  questionsController.editQuestion
);
router.delete(
  '/:id',
  checkPermission(PERMISSIONS.PUZZLES.DELETE),
  questionsValidator.deleteQuestionValidator,
  questionsController.deleteQuestion
);
router.post(
  '/multiple-delete',
  checkPermission(PERMISSIONS.PUZZLES.DELETE),
  questionsValidator.deleteQuestionsValidator,
  questionsController.deleteMultipleQuestions
);

router.get(
  '/clone/:id',
  questionsValidator.getQuestionByIdValidator,
  questionsController.cloneQuestion
);

export default router;

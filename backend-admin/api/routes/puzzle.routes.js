import express from 'express';
import { requireAuth } from '../middlewares/auth.middleware.js';
import trimRequest from 'trim-request';
import * as puzzlesValidators from '../validators/puzzle.validator.js';
import * as puzzlesController from '../controllers/puzzle.controller.js';
import { generalLimiter } from '../helpers/rateLimitter.js';
import { checkPermission } from '../middlewares/check-permission.middleware.js';
import { PERMISSIONS } from '../utils/permissions.js';

const router = express.Router();

router.use(requireAuth);
router.use(trimRequest.all);
router.use(generalLimiter)


router.post(
    '/',
    checkPermission(PERMISSIONS.PUZZLES.CREATE) ,
    puzzlesValidators.validateCreatePuzzle,
    puzzlesController.createPuzzleController
);


router.get(
    '/',
    checkPermission(PERMISSIONS.PUZZLES.READ) ,
    puzzlesValidators.validateGetPuzzles,
    puzzlesController.getPuzzlesController
);


router.get(
    '/:id',
    checkPermission(PERMISSIONS.PUZZLES.READ) ,
    puzzlesValidators.validateGetPuzzleById,
    puzzlesController.getPuzzleByIdController
);


router.put(
    '/:id',
    checkPermission(PERMISSIONS.PUZZLES.UPDATE) ,
    puzzlesValidators.validateUpdatePuzzle,
    puzzlesController.updatePuzzleController
);


router.delete(
    '/:id',
    checkPermission(PERMISSIONS.PUZZLES.DELETE) ,
    puzzlesValidators.validateDeletePuzzle,
    puzzlesController.deletePuzzleController
);


export default router;
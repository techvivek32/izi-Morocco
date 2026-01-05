import express from 'express';

import * as gameInfoControllers from '../controllers/game-info.controller.js';
import * as gameInfoValidators from '../validators/game-info.validator.js';
import { requireAuth } from '../middlewares/auth.middleware.js';
import { generalLimiter } from '../helpers/rateLimitter.js';
import { checkPermission } from '../middlewares/check-permission.middleware.js';
import { PERMISSIONS } from '../utils/permissions.js';

const router = express.Router();

router.use(requireAuth);

router.use(generalLimiter);

router.get('/list-dropdown', gameInfoControllers.listDropdownController);

router.get(
  '/:id',
  checkPermission(PERMISSIONS.GAMES.READ),
  gameInfoValidators.getGameInfoByIdValidator,
  gameInfoControllers.getGameInfoByIdController
);

router.get(
  '/',
  checkPermission(PERMISSIONS.GAMES.READ),
  gameInfoValidators.getAllGamesValidator,
  gameInfoControllers.getAllGamesController
);

router.post(
  '/',
  checkPermission(PERMISSIONS.GAMES.CREATE),
  gameInfoValidators.createGameInfoValidator,
  gameInfoControllers.createGameInfoController
);

router.put(
  '/:id',
  checkPermission(PERMISSIONS.GAMES.UPDATE),
  gameInfoValidators.updateGameInfoValidator,
  gameInfoControllers.updateGameInfoController
);

router.patch(
  '/:id',
  checkPermission(PERMISSIONS.GAMES.UPDATE),
  gameInfoValidators.togggleActiveStatus,
  gameInfoControllers.toggleActiveStatusController
);

router.delete(
  '/:id',
  checkPermission(PERMISSIONS.GAMES.DELETE),
  gameInfoValidators.validateDeleteGame,
  gameInfoControllers.deleteGameController
);

router.get(
  '/clone/:id',
  gameInfoValidators.getGameInfoByIdValidator,
  gameInfoControllers.cloneGameInfoController
);

export default router;

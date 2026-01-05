import express from 'express';
import * as playerControllers from '../controllers/player-admin.controller.js';
import * as playerValidators from '../validators/player-admin.validator.js';
import { requireAuth } from '../middlewares/auth.middleware.js';
import trimRequest from 'trim-request';
import { generalLimiter } from '../helpers/rateLimitter.js';
const router = express.Router();

router.use(requireAuth);
router.use(trimRequest.all);
router.use(generalLimiter)

router.post('/',
    playerValidators.createPlayersForAdminsValidator,
    playerControllers.createPlayerForAdmins
);

router.get('/',
    playerValidators.getAllPlayersForAdminsValidator,
    playerControllers.getAllPlayersForAdmins
);

router.get('/list-dropdown',
    playerControllers.listDropdownController
);

export default router;
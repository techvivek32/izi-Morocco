import trimRequest from "trim-request";

import express from "express";
import * as userGroupsController from "../controllers/user-group.controller.js";
import * as userGroupsValidator from "../validators/user-group.validator.js";
import validateRequest from "../utils/validateRequest.js";
import { requireAuth } from "../middlewares/auth.middleware.js";
import { checkPermission } from "../middlewares/check-permission.middleware.js";
import { PERMISSIONS } from "../utils/permissions.js";
import { generalLimiter } from "../helpers/rateLimitter.js";



const router = express.Router();


router.use(generalLimiter)






router
  .get(
    '/' ,
    requireAuth,
    checkPermission(PERMISSIONS.USER_GROUPS.READ),
    trimRequest.all,
    userGroupsValidator.validateGetUsergroups,
    userGroupsController.getUserGroupsController
  );



export default router;
import trimRequest from "trim-request";

import express from "express";
import * as userController from "../controllers/user.controller.js";
import * as userValidator from "../validators/user.validator.js";
import validateRequest from "../utils/validateRequest.js";
import { requireAuth } from "../middlewares/auth.middleware.js";
import { requireSuperAdmin } from "../middlewares/super-admin-only.middleware.js";
import { generalLimiter } from "../helpers/rateLimitter.js";

const router = express.Router();



router.use(generalLimiter)





router.get(
     '/' ,
    requireAuth,
    requireSuperAdmin(),
    trimRequest.all,
    userValidator.getUsersValidator ,
    userController.getUsersController
  );

router.post(
    '/' ,
    requireAuth,
    requireSuperAdmin(),
    trimRequest.all,
    userValidator.createUserValidator ,
    userController.createUserController
  );

  router.put(
    '/:userId' ,
    requireAuth,
    requireSuperAdmin(),
    trimRequest.all,
    userValidator.updateUserValidator ,
    userController.updateUserController
  );



  router.delete(
    '/:id' ,
    
  )


  export default router;
import express from 'express'
import { requireAuth } from '../middlewares/auth.middleware.js'
import   trimRequest  from 'trim-request';
import * as tagsValidators from '../validators/tags.validator.js'
import * as tagsController from '../controllers/tags.controller.js'
import { generalLimiter } from '../helpers/rateLimitter.js';
import { checkPermission } from '../middlewares/check-permission.middleware.js';
import { PERMISSIONS } from '../utils/permissions.js';

const router = express.Router()

router.use(requireAuth)
router.use(trimRequest.all)
router.use(generalLimiter)




router.post(
    '/' ,
    checkPermission(PERMISSIONS.TAGS.CREATE) ,
    tagsValidators.validateCreateTag ,
    tagsController.createTagsController
)




router.put(
    '/:id' ,
    checkPermission(PERMISSIONS.TAGS.UPDATE) ,
    tagsValidators.validateUpdateTag ,
    tagsController.updateTagController
)



router.get(
    '/' ,
    checkPermission(PERMISSIONS.TAGS.READ) ,
    tagsValidators.validateGetTags ,
    tagsController.getTagsController
)


router.delete(
    '/:id' ,
    checkPermission(PERMISSIONS.TAGS.DELETE) ,
    tagsValidators.validateDeleteTags ,
    tagsController.deleteTagController
)



export default router

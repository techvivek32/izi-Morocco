import express from 'express'

import * as questionsMediaController from '../controllers/questions-media.controller.js'
import * as questionsMediaValidator from '../validators/question-media.validator.js'
import { requireAuth } from '../middlewares/auth.middleware.js'
import { generalLimiter } from '../helpers/rateLimitter.js'

const router = express.Router()


router.use(requireAuth)
router.use(generalLimiter)



router.get(
    '/:id' ,
    questionsMediaValidator.questionMediaValidator ,
    questionsMediaController.getQuestionsMedia 
)

router.post(
    '/:id' ,
    questionsMediaValidator.questionMediaValidator ,
    questionsMediaController.mutateQuestionsMedia 
)


export default router
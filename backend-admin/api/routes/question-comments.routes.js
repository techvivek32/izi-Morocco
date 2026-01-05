import express from 'express'

import * as questionCommentsController from '../controllers/questions-comments.controller.js'
import * as questionCommentsValidator from '../validators/question-comments.validator.js'
import { requireAuth } from '../middlewares/auth.middleware.js'
import { generalLimiter } from '../helpers/rateLimitter.js'

const router = express.Router()


router.use(requireAuth)
router.use(generalLimiter)


router.get(
    '/:id' ,
    questionCommentsValidator.getQuestionCommentsValidator ,
    questionCommentsController.getQuestionsComments
)

router.post(
    '/:id' ,
    questionCommentsValidator.mutateQuestionCommentsValidator ,
    questionCommentsController.mutateQuestionsComments 
)   



export default router
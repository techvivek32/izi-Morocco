import {check , query} from 'express-validator';
import validateRequest from '../utils/validateRequest.js';



export const mutateQuestionCommentsValidator = [
    check('id').isMongoId().withMessage('Invalid question id').notEmpty().withMessage('Question id is required') ,
    check('hints').optional({nullable:true}) ,
    check('commentsAfterCorrection')
    .optional({ nullable: true })
    .custom(value => {
        if (value !== null && (typeof value !== 'object' || Array.isArray(value))) {
        throw new Error('commentsAfterCorrection must be an object');
        }
        return true;
    }),

    check('commentsAfterRejection')
    .optional({ nullable: true })
    .custom(value => {
        if (value !== null && (typeof value !== 'object' || Array.isArray(value))) {
        throw new Error('commentsAfterRejection must be an object');
        }
        return true;
    }),


    (req , res , next)=>validateRequest(req , res , next)


]



export const getQuestionCommentsValidator =[
    check('id').isMongoId().withMessage('Invalid question id').notEmpty().withMessage('Question id is required') ,
    (req , res , next)=>validateRequest(req , res , next)

]
    
    
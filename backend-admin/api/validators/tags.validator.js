import {check , param ,query} from 'express-validator'
import validateRequest from '../utils/validateRequest.js'
import { paginationValidator } from './paginate.validator.js'



export const validateCreateTag = [
    check('name')
    .exists()
    .withMessage('Tag name is required')
    .notEmpty()
    .withMessage('Tag name cannot be empty')
    .isLength({ min: 3 })
    .withMessage('Tag name must be at least 3 characters long')
    .trim()
    .escape(),

    check('manualEntry')
    .optional({ nullable: true })
    .isBoolean()
    .withMessage('manualEntry must be a boolean'),

    (req, res, next) => validateRequest(req, res, next)

        
]


export const validateUpdateTag = [
  check('id')
    .exists()
    .withMessage('Tag ID is required')
    .notEmpty()
    .withMessage('Tag ID cannot be empty')
    .isMongoId()
    .withMessage('Invalid tag ID'),

  check('name')
    .optional()
    .notEmpty()
    .withMessage('Tag name cannot be empty')
    .isLength({ min: 3 })
    .withMessage('Tag name must be at least 3 characters long')
    .trim()
    .escape(),

  check('manualEntry')
    .optional({ nullable: true })
    .isBoolean()
    .withMessage('manualEntry must be a boolean'),

  (req, res, next) => validateRequest(req, res, next)
]



export const validateGetTags = [

    ...paginationValidator ,

    (req , res , next)=>validateRequest(req , res , next)
]





export const validateDeleteTags=[
    param('id')
    .exists()
    .withMessage('Tag ID is required')
    .isMongoId()
    .withMessage('Invalid Tag ID'),

    (req , res , next)=>validateRequest(req , res , next)
]

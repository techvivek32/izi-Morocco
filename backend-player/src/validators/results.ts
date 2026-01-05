import { check, ValidationChain } from 'express-validator'

export const getGamesValidator: ValidationChain[] = [
  check('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be an integer greater than 0')
    .toInt(),

  check('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be an integer between 1 and 100')
    .toInt(),

  check('search').optional().isString().withMessage('Search must be a string')
]

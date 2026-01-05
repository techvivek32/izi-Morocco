import { body, check, ValidationChain } from 'express-validator'
import { GameStatus } from '../db/models/played-game-status.schema'

export const joinGameValidator: ValidationChain[] = [
  body('gameId')
    .notEmpty()
    .withMessage('Game ID is required')
    .bail()
    .isMongoId()
    .withMessage('Game ID must be  valid ID')
    .bail()
    .isLength({ min: 24, max: 24 })
    .withMessage('Game ID must be 24 characters long'),

  body('activationCode')
    .notEmpty()
    .withMessage('Activation Code is required')
    .bail()
    .isString()
    .withMessage('Activation Code must be a string')
    .bail()

  // body('status')
  //   .notEmpty()
  //   .withMessage('Status is required')
  //   .bail()
  //   .isString()
  //   .withMessage('Status must be a string')
  //   .bail()
  //   .isIn([GameStatus.IN_PROGRESS, GameStatus.FINISHED])
  //   .withMessage('Status must be either in progress or finished')
]

export const updateGameLogsValidator: ValidationChain[] = [
  body('gameId')
    .notEmpty()
    .withMessage('Game ID is required')
    .bail()
    .isMongoId()
    .withMessage('Game ID must be  valid ID')
    .bail()
    .isLength({ min: 24, max: 24 })
    .withMessage('Game ID must be 24 characters long'),

  body('activationCode')
    .notEmpty()
    .withMessage('Activation Code is required')
    .bail()
    .isString()
    .withMessage('Activation Code must be a string')
    .bail(),

  // body('playerId')
  //   .notEmpty()
  //   .withMessage('Player ID is required')
  //   .bail()
  //   .isString()
  //   .withMessage('Activation Code must be a string')
  //   .bail()
]

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

export const gameReverseValidator: ValidationChain[] = [
  body('gameId')
    .notEmpty()
    .withMessage('Game ID is required')
    .bail()
    .isMongoId()
    .withMessage('Game ID must be  valid ID')
    .bail()
    .isLength({ min: 24, max: 24 })
    .withMessage('Game ID must be 24 characters long'),

  body('playerId')
    .notEmpty()
    .withMessage('Player ID is required')
    .bail()
    .isString()
    .withMessage('Activation Code must be a string')
    .bail()
]

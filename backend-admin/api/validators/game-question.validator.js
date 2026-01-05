import { check, param, query } from 'express-validator';
import validateRequest from '../utils/validateRequest.js';
import { paginationValidator } from './paginate.validator.js';

export const validateUpsertGameQuestions = [
  check('gameId')
    .exists()
    .withMessage('Game ID is required')
    .notEmpty()
    .withMessage('Game ID cannot be empty')
    .isMongoId()
    .withMessage('Invalid Game ID'),

  check('questions')
    .exists()
    .withMessage('Questions array is required')
    .isArray({ min: 1 })
    .withMessage('Questions must be a non-empty array'),

  check('questions.*.questionId')
    .exists()
    .withMessage('Question ID is required')
    .notEmpty()
    .withMessage('Question ID cannot be empty')
    .isMongoId()
    .withMessage('Invalid Question ID'),

  check('questions.*.latitude')
    .optional({ nullable: true })
    .isFloat({ min: -90, max: 90 })
    .withMessage('Latitude must be between -90 and 90'),

  check('questions.*.longitude')
    .optional({ nullable: true })
    .isFloat({ min: -180, max: 180 })
    .withMessage('Longitude must be between -180 and 180'),

  check('questions.*.radius')
    .optional()
    .isFloat({ min: 0, max: 1000 })
    .withMessage('Radius must be between 0 and 1000'),

  check('questions.*.order')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Order must be a non-negative integer'),

  check('blocklyJsonRules')
    .exists()
    .withMessage('Blockly JSON rules are required')
    .isObject()
    .withMessage('Blockly JSON rules must be an object'),

  check('blocklyXmlRules').optional({ nullable: true }),

  check('blocklyJsonRules')
    .exists()
    .withMessage('Blockly JSON rules are required')
    .notEmpty()
    .withMessage('Blockly JSON rules cannot be empty')
    .isObject()
    .withMessage('Blockly JSON rules must be an object'),

  check('blocklyXmlRules').optional({ nullable: true }),

  check('questions').custom((questions) => {
    const coordsSet = new Set();
    for (const q of questions) {
      if (q.latitude == null || q.longitude == null) continue;
      const coordKey = `${q.latitude},${q.longitude}`;
      // if (coordsSet.has(coordKey)) {
      //   throw new Error('Duplicate latitude and longitude not allowed');
      // }
      coordsSet.add(coordKey);
    }
    return true;
  }),
  check('questions.*.isPlacedCanvas')
    .optional()
    .isBoolean()
    .withMessage('isPlacedCanvas must be a boolean'),

  check('questions.*.x')
    .optional({ nullable: true })
    .isFloat() // isFloat covers both integers and decimals
    .withMessage('X coordinate must be a number'),

  check('questions.*.y')
    .optional({ nullable: true })
    .isFloat()
    .withMessage('Y coordinate must be a number'),

  (req, res, next) => validateRequest(req, res, next)
];

export const validateGetGameQuestions = [
  param('gameId')
    .exists()
    .withMessage('Game ID is required')
    .isMongoId()
    .withMessage('Invalid Game ID'),

  (req, res, next) => validateRequest(req, res, next)
];

export const validateGetAllGameQuestions = [
  ...paginationValidator,

  query('game').optional().isMongoId().withMessage('Invalid Game ID'),

  query('sortField')
    .optional()
    .isIn(['createdAt', 'updatedAt'])
    .withMessage('Sort field must be createdAt or updatedAt'),

  query('sortBy')
    .optional()
    .isIn(['asc', 'desc'])
    .withMessage('Sort by must be asc or desc'),

  (req, res, next) => validateRequest(req, res, next)
];

export const validateGetNearbyQuestions = [
  query('latitude')
    .exists()
    .withMessage('Latitude is required')
    .isFloat({ min: -90, max: 90 })
    .withMessage('Latitude must be between -90 and 90'),

  query('longitude')
    .exists()
    .withMessage('Longitude is required')
    .isFloat({ min: -180, max: 180 })
    .withMessage('Longitude must be between -180 and 180'),

  query('maxDistance')
    .optional()
    .isFloat({ min: 1 })
    .withMessage('Max distance must be a positive number'),

  query('gameId').optional().isMongoId().withMessage('Invalid Game ID'),

  (req, res, next) => validateRequest(req, res, next)
];

export const validateDeleteGameQuestions = [
  param('gameId')
    .exists()
    .withMessage('Game ID is required')
    .isMongoId()
    .withMessage('Invalid Game ID'),

  (req, res, next) => validateRequest(req, res, next)
];

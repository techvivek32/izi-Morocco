import { check, query } from 'express-validator';
import validateRequest from '../utils/validateRequest.js';

export const questionMediaValidator = [
  check('id')
    .isMongoId()
    .withMessage('Invalid question id')
    .notEmpty()
    .withMessage('Question id is required'),

  check('images').optional().isArray().withMessage('Images must be an array'),
  check('images.*')
    .optional()
    .isString()
    .withMessage('Each image must be a string'),

  check('videos').optional().isArray().withMessage('Videos must be an array'),
  check('videos.*')
    .optional()
    .isString()
    .withMessage('Each video must be a string'),

  check('videoUrls')
    .optional()
    .isArray()
    .withMessage('Video URLs must be an array'),
  check('videoUrls.*')
    .optional()
    .isString()
    .withMessage('Each video URL must be a string'),

  // audios should be an array of objects: { url: string, type: 'starting'|'background' }
  check('audios').optional().isArray().withMessage('Audios must be an array'),
  check('audios.*.url')
    .optional()
    .isString()
    .withMessage('Each audio.url must be a string')
    .notEmpty()
    .withMessage('audio.url cannot be empty'),
  check('audios.*.type')
    .optional()
    .isIn(['starting', 'background'])
    .withMessage('audio.type must be one of: starting, background'),

  (req, res, next) => validateRequest(req, res, next)
];

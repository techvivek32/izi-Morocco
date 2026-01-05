import { check, param, query } from 'express-validator';
import validateRequest from '../utils/validateRequest.js';
import { paginationValidator } from './paginate.validator.js';


export const validateCreatePuzzle = [
    check('name')
        .exists()
        .withMessage('Puzzle name is required')
        .notEmpty()
        .withMessage('Puzzle name cannot be empty')
        .isLength({ min: 3 })
        .withMessage('Puzzle name must be at least 3 characters long')
        .trim()
        .escape(),

    check('url')
        .exists()
        .withMessage('Puzzle URL is required')
        .notEmpty()
        .withMessage('Puzzle URL cannot be empty')
        .isURL()
        .withMessage('Invalid URL format')
        .trim(),

    check('createdBy')
        .optional({ nullable: true })
        .isMongoId()
        .withMessage('Invalid user ID'),

    (req, res, next) => validateRequest(req, res, next)
];


export const validateGetPuzzles = [
    ...paginationValidator,

    (req, res, next) => validateRequest(req, res, next)
];


export const validateGetPuzzleById = [
    param('id')
        .exists()
        .withMessage('Puzzle ID is required')
        .isMongoId()
        .withMessage('Invalid Puzzle ID'),

    (req, res, next) => validateRequest(req, res, next)
];


export const validateUpdatePuzzle = [
    param('id')
        .exists()
        .withMessage('Puzzle ID is required')
        .isMongoId()
        .withMessage('Invalid Puzzle ID'),

    check('name')
        .optional()
        .notEmpty()
        .withMessage('Puzzle name cannot be empty')
        .isLength({ min: 3 })
        .withMessage('Puzzle name must be at least 3 characters long')
        .trim()
        .escape(),

    check('url')
        .optional()
        .notEmpty()
        .withMessage('Puzzle URL cannot be empty')
        .isURL()
        .withMessage('Invalid URL format')
        .trim(),

    (req, res, next) => validateRequest(req, res, next)
];


export const validateDeletePuzzle = [
    param('id')
        .exists()
        .withMessage('Puzzle ID is required')
        .isMongoId()
        .withMessage('Invalid Puzzle ID'),

    (req, res, next) => validateRequest(req, res, next)
];
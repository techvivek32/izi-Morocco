import { body } from "express-validator";
import validateRequest from "../utils/validateRequest.js";
import { paginationValidator } from "./paginate.validator.js";

export const createPlayersForAdminsValidator = [
    body('email')
        .isEmail()
        .withMessage('Invalid email address')
        .bail(),

    body('password')
        .isString()
        .withMessage('Password must be at least 6 characters')
        .bail()
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters')
        .bail(),

    body('name')
        .isString()
        .withMessage('Name must be a string')
        .bail()
        .isLength({ min: 3 })
        .withMessage('Name must be at least 3 characters')
        .bail(),

    (req, res, next) => validateRequest(req, res, next)
]

export const getAllPlayersForAdminsValidator = [
    ...paginationValidator,
    (req, res, next) => validateRequest(req, res, next)
]
import { Request, Response, NextFunction, RequestHandler } from 'express'
import { AnyType } from '../types'
import { ValidationChain, validationResult } from 'express-validator'

type Validator = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<AnyType>

export const multipleErrorsSymbol = Symbol('multipleErrors')

export const handleValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map((error) => ({
        field: error.type === 'field' ? (error as any).path : error.type,
        message: error.msg
      }))
    })
  }
  next()
}

export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log('🧾 req.body in validator middleware:', req.body)

  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    console.log('❌ Validation Errors:', errors.array())
    return res.status(400).json({ errors: errors.array() })
  }
  next()
}

// Unified validation function that runs express-validator chains and handles errors
export const validateReq = (
  validators: ValidationChain[]
): RequestHandler[] => {
  return [...validators, handleValidationErrors]
}

export const makeOptionalFields = <
  T extends Record<string, ValidationChain>,
  K extends keyof T = keyof T
>(
  schemaMap: T,
  optionalFields: K[]
): ValidationChain[] => {
  return Object.entries(schemaMap).map(([key, validator]) => {
    if (optionalFields.includes(key as K)) {
      return validator.optional()
    }
    return validator
  })
}

export default (validators: Validator[]): RequestHandler => {
  return async (req, res, next) => {
    res.locals.validationErrors = []

    for (const validator of validators) {
      try {
        const result = await validator(req, res, next)

        if (result !== null && result !== undefined) {
          const errorSymbol = result?.symbol || ''
          if (errorSymbol === multipleErrorsSymbol) {
            res.locals.validationErrors.push(...result.errors)
          } else {
            res.locals.validationErrors.push(result)
          }
        }
      } catch (error: AnyType) {
        console.log({ error })

        res.status(400).json({ message: 'Validation error' })
        return
      }
    }

    if (res.locals.validationErrors.length === 0) {
      return next()
    }

    const errors = res.locals.validationErrors.map((err: AnyType) => ({
      message: err.message,
      field: err.field,
      ...(err.extraData || {})
    }))

    res
      .status(400)
      .json({ success: false, message: 'Validation Failed', errors })
    return
  }
}

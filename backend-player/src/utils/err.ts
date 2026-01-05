import { Request, Response, NextFunction, RequestHandler } from 'express'
import { validationResult, ValidationChain } from 'express-validator'
import { AnyType } from '../types'

// Alternative approach - single middleware that runs all validators
export const validate = (validators: ValidationChain[]): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // Run all validation chains
    await Promise.all(validators.map((validator) => validator.run(req)))

    // Check for validation errors
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
}

export default (message: string, fieldName: string, symbol?: symbol) => {
  const error = {
    message,
    field: fieldName,
    symbol
  }
  return error
}

export const handleMultipleErrors = (
  errors: { message: string; field: string }[],
  symbol: symbol
) => {
  const multipleErrors = {
    message: 'Validation failed',
    errors,
    symbol
  }
  return multipleErrors
}

export const errorHandler = (
  err: AnyType,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('[ERROR]', err)

  const statusCode = err.statusCode || 500
  const message = 'Internal Server Error'

  res.status(statusCode).json({
    success: false,
    message
  })
}

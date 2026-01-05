import jwt, { Secret, SignOptions } from 'jsonwebtoken'
import { AnyType } from '../types'

export const createJWT = (
  payload: Record<string, AnyType>,
  secret: Secret,
  expiresIn: string = '60d'
) => jwt.sign(payload, secret, { expiresIn } as SignOptions)

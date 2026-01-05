import rateLimit from 'express-rate-limit';
import httpStatus from 'http-status';

export const generalLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, 
  limit: 600, 
  statusCode: httpStatus.TOO_MANY_REQUESTS,
  message: 'TOO_MANY_REQUESTS',
});

export const authLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  limit: 40,
  statusCode: httpStatus.TOO_MANY_REQUESTS,
  message: 'TOO_MANY_ATTEMPTS_TRY_LATER',
});

export const uploadLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  limit: 400,
  statusCode: httpStatus.TOO_MANY_REQUESTS,
  message: 'UPLOAD_RATE_LIMIT_EXCEEDED',
});
import handleError from "../utils/handleError.js";
import buildErrorObject from "../utils/buildErrorObject.js";
import httpStatus from "http-status";

export const requireSuperAdmin = () => {
  return async (req, res, next) => {
    try {
      if (!req.user || !req.user._id) {
        throw buildErrorObject(httpStatus.UNAUTHORIZED, 'User not authenticated')
      }

      // Only super admin can access user management
      if (!req.user.isSuperAdmin) {
        throw buildErrorObject(httpStatus.FORBIDDEN, 'Only super admin can manage users')
      }

      next()

    } catch (err) {
      handleError(res, err)
    }
  }
}
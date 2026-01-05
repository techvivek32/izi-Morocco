
import UserGroupsAssignment from '../models/user-group-assignment.schema.js'
import UserGroups from '../models/user-group.schema.js'
import handleError from "../utils/handleError.js";
import buildErrorObject from "../utils/buildErrorObject.js";
import httpStatus from "http-status";
import { hasPermission } from '../utils/permissions.js'

export const checkPermission = (permission) => {
  return async (req, res, next) => {
    try {
      if (!req.user || !req.user._id) {
        throw buildErrorObject(httpStatus.UNAUTHORIZED, 'User not authenticated')
      }

      if(req.user.isSuperAdmin){
        next()
        return
      }

      const userId = req.user._id

      console.log("user" , userId)

      const userGroupAssignment = await UserGroupsAssignment.findOne({ userId }).lean()

      if (!userGroupAssignment) {
        throw buildErrorObject(httpStatus.FORBIDDEN, 'User has no group assignment')
      }

      const userGroup = await UserGroups.findById(userGroupAssignment.groupId).lean()

      if (!userGroup) {
        throw buildErrorObject(httpStatus.FORBIDDEN, 'User group not found')
      }

      const hasRequiredPermission = hasPermission(userGroup.accessLevel, permission)

      if (!hasRequiredPermission) {
        throw buildErrorObject(httpStatus.FORBIDDEN, `Insufficient permissions. Required: ${permission}`)
      }

      req.userAccessLevel = userGroup.accessLevel
      next()

    } catch (err) {
      handleError(res, err)
    }
  }
}
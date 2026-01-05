import handleError from "../utils/handleError.js";
import buildErrorObject from "../utils/buildErrorObject.js";
import buildResponse from "../utils/buildResponse.js";
import { matchedData } from "express-validator";
import httpStatus from "http-status";
import User from "../models/user.schema.js";
import bcrypt from 'bcrypt'
import UserGroupsAssignment from "../models/user-group-assignment.schema.js";
import UserGroups from '../models/user-group.schema.js'
import Role from '../models/role.schema.js'
import mongoose from "mongoose";




export const createUserController = async (req, res) => {
  const session = await mongoose.startSession()
  session.startTransaction()

  try {
    const validatedData = matchedData(req)

    const [userExists, superAdminRole] = await Promise.all([
      User.exists({ email: validatedData.email }),
      Role.findOne({ role: 'super-admin' }).lean()
    ])

    if (userExists) {
      throw buildErrorObject(httpStatus.CONFLICT, 'User already exists')
    }




    if (
      superAdminRole &&
      validatedData.roleId?.toString() === superAdminRole._id.toString()
    ) {
      throw buildErrorObject(httpStatus.FORBIDDEN, 'Cannot create super admin')
    }

    const userGroup = await UserGroups.findById(validatedData.userGroupId).session(session)
    if (!userGroup) {
      throw buildErrorObject(httpStatus.NOT_FOUND, 'User group not found')
    }

    const adminRoleId = await Role.findOne({ role: 'admin' }).lean().then(r => r._id)
    if (!validatedData.roleId) {
      validatedData.roleId = adminRoleId
    }

    validatedData.password = await bcrypt.hash(validatedData.password, 10)

    const [newUser] = await User.create([validatedData], { session })

    await UserGroupsAssignment.create(
      [{ userId: newUser._id, groupId: userGroup._id }],
      { session }
    )

    await session.commitTransaction()
    session.endSession()

    return res
      .status(httpStatus.CREATED)
      .json(buildResponse(httpStatus.CREATED, {message: 'User Created'}))

  } catch (err) {
    await session.abortTransaction()
    session.endSession()
    return handleError(res, err)
  }
}


export const updateUserController = async (req, res) => {
  const session = await mongoose.startSession()
  session.startTransaction()

  try {
    const validatedData = matchedData(req)
    const userId = req.params.userId

    console.log("userId" , userId)

    console.log("validatedData" , validatedData)

    const [user, superAdminRole] = await Promise.all([
      User.findById(userId).session(session),
      Role.findOne({ role: 'super-admin' }).lean()
    ])

    if (!user) {
      throw buildErrorObject(httpStatus.NOT_FOUND, 'User not found')
    }

    if (validatedData.email) {
      const existing = await User.findOne({
        email: validatedData.email,
        _id: { $ne: userId }
      }).lean()
      if (existing) {
        throw buildErrorObject(httpStatus.CONFLICT, 'Email already in use')
      }
      user.email = validatedData.email.toLowerCase()
    }

    if (validatedData.fullName) user.fullName = validatedData.fullName
    if (validatedData.phoneNumber) user.phoneNumber = validatedData.phoneNumber

    if (validatedData.roleId) {
      if (validatedData.roleId.toString() === superAdminRole._id.toString()) {
        throw buildErrorObject(httpStatus.FORBIDDEN, 'Cannot assign super admin role')
      }
      user.roleId = validatedData.roleId
    }

    if (validatedData.password) {
      user.password = await bcrypt.hash(validatedData.password, 10)
    }

    if (validatedData.userGroupId) {
      const newGroup = await UserGroups.findById(validatedData.userGroupId).session(session)
      if (!newGroup) {
        throw buildErrorObject(httpStatus.NOT_FOUND, 'User group not found')
      }
      let assignment = await UserGroupsAssignment.findOne({ userId: user._id }).session(session)
      if (!assignment) {
        assignment = new UserGroupsAssignment({
          userId: user._id,
          groupId: newGroup._id
        })
      } else {
        assignment.groupId = newGroup._id
      }
      await assignment.save({ session })
    }

    await user.save({ session })

    await session.commitTransaction()
    session.endSession()

    return res
      .status(httpStatus.OK)
      .json(buildResponse(httpStatus.OK, {message: 'User updated successfully'}))

  } catch (err) {
    await session.abortTransaction()
    session.endSession()
    return handleError(res, err)
  }
}



export const getUsersController = async (req, res) => {
  try {
    const validatedData = matchedData(req)
    const { page = 1, limit = 10 } = validatedData
    const skip = (page - 1) * limit

    const match = {}

    if (validatedData.search) {
      match.$or = [
        { fullName: { $regex: validatedData.search, $options: 'i' } },
        { email: { $regex: validatedData.search, $options: 'i' } },
        { phoneNumber: { $regex: validatedData.search, $options: 'i' } }
      ]
    }

    if (validatedData.roleId) {
      match.roleId = new mongoose.Types.ObjectId(validatedData.roleId)
    }

    const pipeline = [
      {
        $lookup: {
          from: 'UserGroupAssignments',
          localField: '_id',
          foreignField: 'userId',
          as: 'assignment'
        }
      },
      { $unwind: { path: '$assignment', preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: 'UserGroups',
          localField: 'assignment.groupId',
          foreignField: '_id',
          as: 'group'
        }
      },
      { $unwind: { path: '$group', preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: 'Roles',
          localField: 'roleId',
          foreignField: '_id',
          as: 'role'
        }
      },
      { $unwind: { path: '$role', preserveNullAndEmptyArrays: true } } ,

    ]

    if (validatedData.groupId) {
      pipeline.push({
        $match: { 'assignment.groupId': new mongoose.Types.ObjectId(validatedData.groupId) }
      })
    }


    pipeline.push({
        $project: {
            password: 0,
            loginAttempts: 0,
            blockExpires: 0,
            userGroupAssignmentId: 0,
            __v: 0,
        }
    })

    if (Object.keys(match).length > 0) {
      pipeline.push({ $match: match })
    }

    const countPipeline = [...pipeline, { $count: 'total' }]
    pipeline.push({ $skip: skip })
    pipeline.push({ $limit: parseInt(limit, 10) })

    const [users, totalArr] = await Promise.all([
      User.aggregate(pipeline),
      User.aggregate(countPipeline)
    ])

    const total = totalArr[0]?.total || 0


    const response = {
        docs:users ,
        totalDocs:total,
        page ,
        limit ,
 
        hasNextPage: page * limit < total ,
        hasPrevPage: page > 1 ,
        totalPages: Math.ceil(total / limit) ,
      
    }

    return res.status(httpStatus.OK).json(
      buildResponse(httpStatus.OK,response , 'Users fetched successfully')
    )
  } catch (err) {
    return handleError(res, err)
  }
}









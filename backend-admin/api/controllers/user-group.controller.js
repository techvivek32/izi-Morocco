import handleError from "../utils/handleError.js";
import buildErrorObject from "../utils/buildErrorObject.js";
import buildResponse from "../utils/buildResponse.js";
import { matchedData } from "express-validator";
import httpStatus from "http-status";
import User from "../models/user.schema.js";
import bcrypt from 'bcrypt'
import UserGroupsAssignment from "../models/user-group-assignment.schema.js";
import UserGroups from '../models/user-group.schema.js'



export const getUserGroupsController = async (req , res)=>{
    try{

        const validatedData = matchedData(req)
        const {page=1 , limit=10}  =  validatedData  
        const skip = (page -1)* limit




        const  filter = {}


        if(validatedData.search){
            filter.name={
                $regex: validatedData.search,
                $options: 'i'

            }
        }

        const [userGroups , total] = await Promise.all([
            UserGroups.find(filter).skip(skip).limit(limit).lean(),
            UserGroups.countDocuments(filter)
        ])

        const response = {
            docs:userGroups ,
            total,
            hasNextPage: skip + userGroups.length < total,
            hasPrevPage: skip > 0,
            totalPages: Math.ceil(total/limit)
        }

        return res.status(httpStatus.OK).json(buildResponse(httpStatus.OK , response , 'User groups fetched successfully'))





    }catch(err){
        handleError(res , err)
    }
}
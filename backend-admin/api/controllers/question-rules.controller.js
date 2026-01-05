import buildErrorObject from "../utils/buildErrorObject.js";
import handleError from "../utils/handleError.js";
import buildResponse from "../utils/buildResponse.js";
import { matchedData } from "express-validator";
import httpStatus from "http-status";




export const createGameRules = async(req , res)=>{
    try{
        const validatedData = matchedData(req)

        
    }catch(err){
        handleError(res , err)
    }
}
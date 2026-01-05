import {check , query  , param}from 'express-validator';
import { paginationValidator } from './paginate.validator.js';
import validateRequest from '../utils/validateRequest.js'



export const validateGetUsergroups =[
    ...paginationValidator,

    (req , res ,next) =>validateRequest(req , res , next)
]
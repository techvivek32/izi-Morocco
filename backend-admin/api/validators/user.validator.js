import {check , query  , param}from 'express-validator';
import { paginationValidator } from './paginate.validator.js';
import validateRequest from '../utils/validateRequest.js';



export const createUserValidator = [
  check('fullName')
    .exists()
    .withMessage('Full Name Is Required')
    .not()
    .isEmpty()
    .withMessage('Full Name Cannot Be Empty')
 .matches(/^[\p{L}\s]+$/u)
.withMessage('Name can only contain letters and spaces') ,


  check('email')
    .exists()
    .withMessage('Email Is Required')
    .not()
    .isEmpty()
    .withMessage('Email Cannot Be Empty')
    .isEmail()
    .withMessage('Email is invalid'),



  check('password')
    .isStrongPassword()
    .withMessage(
      'Password must conntain one digit , one special character , one uppercase letter with minimum length 8',
    ),

    check('userGroupId')
    .exists()
    .withMessage('User Group Is Required')
    .not()
    .isEmpty()
    .withMessage('User Group Cannot Be Empty')
    .isMongoId().withMessage('INVALID_USER_GROUP_ID'),

    (req , res ,next) =>validateRequest(req , res , next)
    
]

export const getUsersValidator = [
    ...paginationValidator ,
    (req , res ,next) =>validateRequest(req , res , next)

]



export const updateUserValidator = [
    param('userId')
      .exists()
      .withMessage('User Id Is Required')
      .not()
      .isEmpty()
      .withMessage('User Id Cannot Be Empty')
      .isMongoId().withMessage('INVALID_USER_ID'),
    check('email')
        .optional()
        .isEmail()
        .withMessage('Email is invalid'), 
   check('password')
        .optional()
        .not()
        .isEmpty()
        .withMessage('Password Cannot Be Empty')
        .isStrongPassword()
        .withMessage(
        'Password must conntain one digit , one special character , one uppercase letter with minimum length 8',
        ),  
    
    check('userGroupId')

        .optional()
        .isMongoId().withMessage('INVALID_USER_GROUP_ID'), 


    check('fullName')
        .optional()
        .isString()
        .withMessage('Full name must be a string') 
        .matches(/^[\p{L}\s]+$/u)
        .withMessage('Name can only contain letters and spaces') ,



       
       
        
        (req , res ,next) =>validateRequest(req , res , next)

]


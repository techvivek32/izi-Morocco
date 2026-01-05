import handleError from '../utils/handleError.js';
import buildErrorObject from '../utils/buildErrorObject.js';
import buildResponse from '../utils/buildResponse.js';
import httpStatus from 'http-status';
import Questions from '../models/question.schema.js';
import { matchedData } from 'express-validator';
import QuestionComments from '../models/question-comments.schema.js';

export const mutateQuestionsComments = async (req, res) => {
  try {
    const {hints=null , commentsAfterCorrection=null , commentsAfterRejection=null , id} = matchedData(req);



    console.log({hints , commentsAfterCorrection , commentsAfterRejection , id})





    
    const questionExist = await Questions.findById(id);






 

    if (!questionExist) {
      throw buildErrorObject(httpStatus.NOT_FOUND, 'Question not found');
    }
    const update = {
      hints: hints ?? null,
      commentsAfterCorrection: commentsAfterCorrection ?? null,
      commentsAfterRejection: commentsAfterRejection ?? null,
    };

    console.log("update" , update)

   const q =  await QuestionComments.findOneAndUpdate(
      { questionId: id },
      update,
      { upsert: true, new: true }
    );



    console.log("q" , q)


    res
      .status(httpStatus.OK)
      .json(buildResponse(httpStatus.OK, {} , 'Comments updated successfully'));
  } catch (err) {
    handleError(res, err);
  }
};

export const getQuestionsComments = async (req, res) => {
  try {
    const validatedData = matchedData(req);

    console.log(validatedData)

    const questionExist = await Questions.findById(validatedData.id);

    if (!questionExist) {
      throw buildErrorObject(httpStatus.NOT_FOUND, 'Question not found');
    }

    const comments = await QuestionComments.findOne({
      questionId: validatedData.id
    });


    console.log("comments" , comments)

    res
      .status(httpStatus.OK)
      .json(
        buildResponse(httpStatus.OK, comments, 'Comments fetched successfully')
      );
  } catch (err) {
    handleError(res, err);
  }
};

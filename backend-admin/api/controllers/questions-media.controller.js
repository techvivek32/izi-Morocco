import handleError from '../utils/handleError.js';
import buildErrorObject from '../utils/buildErrorObject.js';
import buildResponse from '../utils/buildResponse.js';
import httpStatus from 'http-status';
import Questions from '../models/question.schema.js';
import { matchedData } from 'express-validator';
import QuestionMedia from '../models/question-media.schema.js';
import fs from 'fs';

export const mutateQuestionsMedia = async (req, res) => {
  try {
    const validatedData = matchedData(req);

    const questionExist = await Questions.findById(validatedData.id);

    if (!questionExist) {
      throw buildErrorObject(httpStatus.NOT_FOUND, 'Question not found');
    }

    await QuestionMedia.findOneAndUpdate(
      { questionId: validatedData.id },
      validatedData,
      { upsert: true }
    );

    res
      .status(httpStatus.OK)
      .json(
        buildResponse(httpStatus.OK, {}, 'Question media updated successfully')
      );
  } catch (err) {
    handleError(res, err);
  }
};

export const getQuestionsMedia = async (req, res) => {
  try {
    const validatedData = matchedData(req);

    const questionExist = await Questions.findById(validatedData.id);

    if (!questionExist) {
      throw buildErrorObject(httpStatus.NOT_FOUND, 'Question not found');
    }

    const media = await QuestionMedia.findOne({ questionId: validatedData.id });

    res
      .status(httpStatus.OK)
      .json(
        buildResponse(
          httpStatus.OK,
          media,
          'Question media fetched successfully'
        )
      );
  } catch (err) {
    handleError(res, err);
  }
};

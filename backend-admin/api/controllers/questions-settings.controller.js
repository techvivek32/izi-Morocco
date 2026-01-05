import handleError from '../utils/handleError.js';
import buildErrorObject from '../utils/buildErrorObject.js';
import buildResponse from '../utils/buildResponse.js';
import httpStatus from 'http-status';
import Questions from '../models/question.schema.js';
import { matchedData } from 'express-validator';
import QuestionSettings from '../models/questions-settings.schema.js';
export const mutateQuestionsSettings = async (req, res) => {
  try {
    const {
      id,
      icon = null,
      iconName = null,
      timeLimit,
      timeUnit,
      radiusColor,
      locationRadius,
      behaviorOption,
      // durations ,
      language
    } = matchedData(req);

    const questionExist = await Questions.findById(id);

    if (!questionExist) {
      throw buildErrorObject(httpStatus.NOT_FOUND, 'Question not found');
    }

    const updateData = {
      icon,
      iconName,
      timeLimit,
      timeUnit,
      radiusColor,
      locationRadius,
      behaviorOption,
      // durations: {
      //   deactivateOnIncorrectSeconds: durations?.deactivateOnIncorrectSeconds || null,
      //   deactivateAfterClosingSeconds: durations?.deactivateAfterClosingSeconds || null
      // } ,
      language
    };

    await QuestionSettings.findOneAndUpdate(
      { questionId: id },
      updateData,
      { upsert: true }
    );

    res
      .status(httpStatus.OK)
      .json(
        buildResponse(
          httpStatus.OK,
          {} ,
          'Question settings updated successfully'
        )
      );
  } catch (err) {
    handleError(res, err);
  }
};

export const getQuestionsSettings = async (req, res) => {
  try {
    const validatedData = matchedData(req);

    const questionExist = await Questions.findById(validatedData.id);

    if (!questionExist) {
      throw buildErrorObject(httpStatus.NOT_FOUND, 'Question not found');
    }

    const settings = await QuestionSettings.findOne({
      questionId: validatedData.id
    });


    console.log("---" ,settings)

    res
      .status(httpStatus.OK)
      .json(
        buildResponse(
          httpStatus.OK,
          settings,
          'Question settings fetched successfully'
        )
      );
  } catch (err) {
    handleError(res, err);
  }
};

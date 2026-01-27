import FormStepperButtons from "./FormStepperButtons";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  createComment,
  getComments,
  resetApiStateFromQuestion,
} from "../../../slices/questionSlice";
import useApiResponseHandler from "../../../hooks/useApiResponseHandler";
import { getSessionData } from "../../../utils/sessionStorage";
import { useEffect, useState } from "react";
import { apiResponseType } from "../../../utils/types";
import toast from "react-hot-toast";
import RichTextEditor from "../../../components/ReactQuill";
import { processDeltaImages } from "../../../services/image-upload";
import { useResetMultipleApiStates } from "../../../hooks/useResetMultipleApiStates";
import { useParams } from "react-router-dom";
import CommentsSkeleton from "./CommentsSkeleton";

const defaultValueForComments = {
  hints: {},
  commentsAfterCorrection: {},
  commentsAfterRejection: {},
};

const Comments = ({
  curStep,
  previousStepHandler,
  nextStepHandler,
  completedSteps,
  markStepCompleted,
}) => {
  const form = useForm({ defaultValues: defaultValueForComments });
  const { handleSubmit, formState, setError, reset, control } = form;
  const { errors } = formState;
  const { createQuestionApi, createCommentApi, getCommentsApi } = useSelector(
    (state) => state.question
  );
  const { id } = useParams();
  const [imageProcessingLoading, setImageProcessingLoading] = useState(false);
  const questionId =
    createQuestionApi?.data?.response?._id || getSessionData("questionId");
  const { data, isLoading, error, status } = createCommentApi;
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    // console.log("form submitted", data);
    const { hints, commentsAfterCorrection, commentsAfterRejection } = data;
    const pureData = { hints };
    setImageProcessingLoading(true);
    const commentsAfterCorrectionProcessing = await processDeltaImages(
      commentsAfterCorrection
    );
    const commentsAfterRejectionProcessing = await processDeltaImages(
      commentsAfterRejection
    );
    setImageProcessingLoading(false);
    pureData.commentsAfterCorrection = commentsAfterCorrectionProcessing;
    pureData.commentsAfterRejection = commentsAfterRejectionProcessing;
    if (questionId) {
      dispatch(createComment({ questionId, data: pureData }));
    }
  };

  useApiResponseHandler({
    status,
    data,
    error,
    setFormError: setError,
    sideAction: () => markStepCompleted(curStep),
  });

  useEffect(() => {
    if (questionId) {
      dispatch(getComments(questionId));
    }
  }, [questionId]);

  useEffect(() => {
    if (getCommentsApi.status === apiResponseType.success) {
      // console.log(getCommentsApi.data?.response);
      const response = getCommentsApi.data?.response;
      if (response) {
        reset({
          hints: response?.hints,
          commentsAfterCorrection: response?.commentsAfterCorrection,
          commentsAfterRejection: response?.commentsAfterRejection,
        });
      }
    } else if (getCommentsApi.status === apiResponseType.failed) {
      getCommentsApi.error?.forEach((error) => {
        if (error.location === "params") {
          toast.error(error.msg);
        }
      });
    }
  }, [getCommentsApi.status]);

  useEffect(() => {
    return () => {
      reset(defaultValueForComments);
    };
  }, []);

  useResetMultipleApiStates([
    { action: resetApiStateFromQuestion, stateName: "createCommentApi" },
    { action: resetApiStateFromQuestion, stateName: "getCommentsApi" },
  ]);


  if (getCommentsApi.isLoading) {
    return <CommentsSkeleton />
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <h3 className="font-semibold mb-2 text-xl">Comments Section</h3>
        <div className="p-4 flex flex-col gap-4">
          <RichTextEditor
            id={`hints`}
            name={`hints`}
            labelName="Hints"
            control={control}
            errors={errors}
          />
          <RichTextEditor
            id={`commentsAfterCorrection`}
            name={`commentsAfterCorrection`}
            labelName="Comments After Correction"
            control={control}
            errors={errors}
          />
          <RichTextEditor
            id={`commentsAfterRejection`}
            name={`commentsAfterRejection`}
            labelName="Comments After Rejection"
            control={control}
            errors={errors}
          />
        </div>

        <FormStepperButtons
          curStep={curStep}
          previousStepHandler={previousStepHandler}
          nextStepHandler={handleNextStep}
          isLoading={isLoading || imageProcessingLoading}
          completedSteps={completedSteps}
          isHiddenSubmitButton={true}
          // isDisabledNextButton={!!id || (!!questionId)}
        />
      </form>
    </div>
  );
};

export default Comments;

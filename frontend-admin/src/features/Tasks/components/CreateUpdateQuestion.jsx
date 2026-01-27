import { useEffect, useState } from "react";
import AntMultiSelector from "../../../components/form/AntDesign/AntMultiSelector";
import AntSearchableSelector from "../../../components/form/AntDesign/AntSearchableSelector";
import CommonInput from "../../../components/form/CommonInput";
import useApiResponseHandler from "../../../hooks/useApiResponseHandler";
import {
  createQuestion,
  getQuestionById,
  resetApiStateFromQuestion,
  updateQuestion,
} from "../../../slices/questionSlice";
import FormStepperButtons from "./FormStepperButtons";
import { useFieldArray, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { cn } from "../../../lib/utils";
import CheckBox from "../../../components/form/Checkbox";
import TooltipWrapper from "../../../components/TooltipWrapper";
import DeleteIcon from "../../../components/svgs/DeleteIcon";
import PlusIcon from "../../../components/svgs/PlusIcon";
import {
  getSessionData,
  setDataInSessionStorage,
} from "../../../utils/sessionStorage";
import { useParams } from "react-router-dom";
import { apiResponseType } from "../../../utils/types";
import toast from "react-hot-toast";
import { ROUTES } from "../../../routes/helper";
import useNavigateTo from "../../../hooks/useNavigateTo";
import RichTextEditor from "../../../components/ReactQuill";
import { processDeltaImages } from "../../../services/image-upload";
import { getTags } from "../../../slices/tagSlice";
import CreateUpdateTagModal from "../../Tag/modals/CreateUpdateTagModal";
import { getPuzzles } from "../../../slices/PuzzlesSlice";
import Button from "../../../components/Button";
import CreateUpdatePuzzlesModal from "../../Puzzles/components/CreateUpdatePuzzles";
import { useResetMultipleApiStates } from "../../../hooks/useResetMultipleApiStates";
import CreateUpdateQuestionSkeleton from "./CreateUpdateQuestionSkeleton";

const defaultValueForQuestion = {
  questionName: "",
  questionDescription: "",
  answerType: "text",
  correctAnswers: [],
  options: [{ text: "", isCorrect: false }],
  tags: [],
  points: 0,
  puzzle: "",
};

const answerTypes = [
  {
    value: "number",
    label: "Number",
  },
  {
    value: "text",
    label: "Text",
  },
  {
    value: "mcq",
    label: "Multiple With Single Answer",
  },
  {
    value: "multiple",
    label: "MCQ With Multiple Answers",
  },
  {
    value: "no_answer",
    label: "No Answer",
  },
  {
    value: "puzzle",
    label: "Puzzle",
  },
];

const CreateUpdateQuestion = ({
  curStep,
  previousStepHandler,
  nextStepHandler,
  completedSteps,
  markStepCompleted,
}) => {
  const form = useForm({
    // resolver: zodResolver(basicDetailsSchema),
    defaultValues: defaultValueForQuestion,
  });
  const { id } = useParams();
  const getQuestionId = id || getSessionData("questionId");
  const goTo = useNavigateTo();
  const [isNextClicked, setIsNextClicked] = useState(false);
  const {
    register,
    handleSubmit,
    formState,
    control,
    setError,
    getValues,
    watch,
    reset,
    setValue,

  } = form;
  const { errors, isDirty } = formState;
  const optionsMethods = useFieldArray({
    control,
    name: "options",
  });

  const { fields, append, remove, update } = optionsMethods;
  const dispatch = useDispatch();
  const { createQuestionApi, getQuestionByIdApi, updateQuestionApi } =
    useSelector((state) => state.question);
  const { getTagsApi } = useSelector((state) => state.tag);
  const { getPuzzlesApi } = useSelector((state) => state.puzzles);
  const { data, isLoading, error, status } = createQuestionApi;
  const questionId = createQuestionApi?.data?.response?._id;
  const [imageProcessingLoading, setImageProcessingLoading] = useState(false);
  const [openTagModal, setOpenTagModal] = useState(false);
  const [openPuzzleModal, setOpenPuzzleModal] = useState(false);

  window.addEventListener('beforeunload', (e) => {
    if (isDirty) {
      e.preventDefault();
      e.returnValue = ''; // Required for most browsers
    }
  });

  const tagsOptions =
    getTagsApi?.data?.response?.docs?.map((tag) => ({
      value: tag._id,
      label: tag.name,
    })) || [];

  const puzzlesDocs =
    getPuzzlesApi?.data?.response?.docs ||
    getPuzzlesApi?.data?.docs ||
    getPuzzlesApi?.data?.response ||
    [];

  const puzzlesOptions =
    (Array.isArray(puzzlesDocs) ? puzzlesDocs : []).map((puzzle) => ({
      value: puzzle._id,
      label: `${puzzle.name} - ${puzzle.url}`,
    })) || [];

  const onSubmit = async (data) => {
    const {
      questionName,
      questionDescription,
      answerType,
      correctAnswers,
      tags,
      points,
      options,
      puzzle,
    } = data;
    const pureData = { answerType, tags, points };
    if (answerType === "mcq" || answerType === "multiple") {
      pureData.options = options;
    }
    if (answerType === "puzzle") {
      pureData.puzzle = puzzle;
    }
    // console.log({ correctAnswers });
    if (Array.isArray(correctAnswers)) {
      pureData.correctAnswers = correctAnswers;
    } else {
      pureData.correctAnswers = [correctAnswers];
    }

    setImageProcessingLoading(true);
    // Process images in the rich text description (questionDescription)
    const processedDescription = await processDeltaImages(questionDescription);
    // keep title as plain text
    pureData.questionName = questionName;
    pureData.questionDescription = processedDescription;
    setImageProcessingLoading(false);

    // debug: show outgoing payload (use browser console to verify)
    // console.debug("Submitting question payload:", pureData);

    if (getQuestionId) {
      console.log({ getQuestionId });
      dispatch(
        updateQuestion({
          id: getQuestionId,
          data: pureData,
        })
      );
    } else {
      dispatch(createQuestion(pureData));
    }
  };

  const handleCheckboxChange = (index = -1) => {
    const currentFieldValue = getValues("options")[index];
    if (answerType === "mcq") {
      //create all fields to false and then set current to true
      fields.forEach((field, idx) => {
        if (idx !== index && field.isCorrect) {
          update(idx, { ...field, isCorrect: false });
        }
      });
    }
    update(index, {
      ...currentFieldValue,
      isCorrect: !currentFieldValue?.isCorrect,
    });
  };

  const answerType = watch("answerType");
  const options = watch("options");

  useApiResponseHandler({
    status,
    data,
    error,
    setFormError: setError,
    sideAction: () => markStepCompleted(curStep),
  });

  useApiResponseHandler({
    status: updateQuestionApi.status,
    data: updateQuestionApi.data,
    error: updateQuestionApi.error,
    setFormError: setError,
    sideAction: () => markStepCompleted(curStep),
  });

  useEffect(() => {
    if (questionId) {
      setDataInSessionStorage("questionId", questionId);
    }
  }, [questionId]);

  useEffect(() => {
    if (getQuestionId) {
      dispatch(getQuestionById(getQuestionId));
    }
  }, [getQuestionId]);

  useEffect(() => {
    if (getQuestionByIdApi.status === apiResponseType.success) {
      const response = getQuestionByIdApi.data?.response;
      setDataInSessionStorage("questionId", response?._id);
      reset({
        questionName: response?.questionName,
        questionDescription: response?.questionDescription || "",
        answerType: response?.answerType,
        correctAnswers: response?.correctAnswers[0],
        tags: response?.tags?.map((tag) => tag._id) || [],
        points: response?.points,
        options: response?.options?.map((op) => ({
          text: op.text,
          isCorrect: op.isCorrect,
        })),
        // response.puzzle may be populated object or ObjectId — prefer _id if present
        puzzle: response?.puzzle?._id || response?.puzzle || "",
      });
    } else if (getQuestionByIdApi.status === apiResponseType.failed) {
      getQuestionByIdApi.error?.forEach((error) => {
        if (error.location === "params") {
          toast.error(error.msg);
        }
      });
      goTo(ROUTES.TASKS);
    }
  }, [getQuestionByIdApi.status]);

  useEffect(() => {
    dispatch(getTags());
    dispatch(getPuzzles());
    return () => {
      reset(defaultValueForQuestion);
    };
  }, []);

  useResetMultipleApiStates([
    { action: resetApiStateFromQuestion, stateName: "createQuestionApi" },
    { action: resetApiStateFromQuestion, stateName: "updateQuestionApi" },
    { action: resetApiStateFromQuestion, stateName: "getQuestionByIdApi" },
  ]);

  useEffect(() => {
    if (answerType === "no_answer" || answerType === "puzzle") {
      setValue("correctAnswers", []);
    } else if (answerType === "mcq" || answerType === "multiple") {
      setValue(
        "correctAnswers",
        options?.filter((op) => op.isCorrect)?.map((op) => op.text) || []
      );
    }
  }, [answerType, options]);

  useEffect(() => {
    if (
      options.length === 0 &&
      (answerType === "mcq" || answerType === "multiple")
    ) {
      setValue("options", [{ text: "", isCorrect: false }]);
    }
  }, [answerType]);


  if (getQuestionByIdApi.isLoading) {
    return <CreateUpdateQuestionSkeleton />
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <h3 className="font-semibold mb-2 text-xl">
          {getQuestionId ? "Update Question" : "Create Question"}
        </h3>
        <div className="p-4 flex flex-col gap-4">
          <CommonInput
            labelName="Task Name"
            id="questionName"
            type="text"
            name="questionName"
            register={register}
            errors={errors}
          />
          <RichTextEditor
            name="questionDescription"
            labelName="Task Description"
            control={control}
            errors={errors}
            toolbar="full"
            required
          />
          <AntSearchableSelector
            id="answerType"
            name="answerType"
            labelName="Answer Type"
            options={answerTypes}
            control={control}
            errors={errors}
            required
          />
          {(answerType === "mcq" || answerType === "multiple") && (
            <div className="border border-accent/25 rounded-lg p-4 flex flex-col gap-1">
              {errors.options?.message && (
                <p className="text-red-600 text-sm mb-2">
                  {errors.options.message}
                </p>
              )}
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className={cn("relative flex w-full items-center gap-4")}
                >
                  <CommonInput
                    labelName="Question Option"
                    id={`options.${index}.text`}
                    name={`options.${index}.text`}
                    register={register}
                    errors={errors}
                    required
                  />
                  <CheckBox
                    labelName="Is Correct"
                    handleChecked={() => handleCheckboxChange(index)}
                    name={`options.${index}.isCorrect`}
                    checked={!!getValues("options")?.[index]?.isCorrect}
                  />
                  <div className="flex w-full gap-4">
                    <TooltipWrapper
                      content={"Add Option"}
                      place="right"
                      className="h-10 w-10 flex items-center justify-center rounded-full hover:bg-accent/10 cursor-pointer"
                    >
                      <span
                        onClick={() => {
                          append({
                            isCorrect: false,
                            text: "",
                          });
                        }}
                        className="rounded-full h-10 w-10"
                      >
                        <PlusIcon variant="dark" />
                      </span>
                    </TooltipWrapper>

                    {/* Remove button - Only show if more than one diagnosis */}
                    {fields.length > 1 && (
                      <TooltipWrapper
                        place="right"
                        content="Remove Option"
                        className="h-10 w-10 flex items-center justify-center rounded-full hover:bg-accent/10 cursor-pointer"
                      >
                        <span
                          onClick={() => remove(index)}
                          className="rounded-full h-10 w-10"
                        >
                          {" "}
                          <DeleteIcon variant="dark" />
                        </span>
                      </TooltipWrapper>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
          {["number", "text"].includes(answerType) && (
            <CommonInput
              labelName="Correct Answer"
              id="correctAnswers"
              name="correctAnswers"
              register={register}
              errors={errors}
              required
            />
          )}
          {answerType === "puzzle" && (
            <div className="flex items-end gap-3">
              <AntSearchableSelector
                id="puzzle"
                name="puzzle"
                labelName="Select Puzzle"
                options={puzzlesOptions}
                control={control}
                errors={errors}
                required
                message={
                  getPuzzlesApi?.status === "success"
                    ? "No puzzles available"
                    : "Loading puzzles..."
                }
              />
              <Button
                type="button"
                onClick={() => setOpenPuzzleModal(true)}
                className="h-10 min-w-max"
              >
                Add New Puzzles
              </Button>
            </div>
          )}

          <div className="flex w-full items-end justify-center h-full gap-4 cursor-pointer">
            <AntMultiSelector
              id="tags"
              name="tags"
              labelName="Select Tags"
              options={tagsOptions}
              control={control}
              errors={errors}
            />
            <Button
              type="button"
              className="h-10 min-w-max"
              onClick={() => setOpenTagModal((prev) => !prev)}
            >
              Add New Tags
            </Button>
          </div>

          <CommonInput
            labelName="Points"
            id="points"
            name="points"
            register={register}
            type="number"
            errors={errors}
            required
          />
        </div>
        <FormStepperButtons
          curStep={curStep}
          resetFormHandler={reset}
          previousStepHandler={previousStepHandler}
          nextStepHandler={handleNextStep}
          isLoading={isLoading || imageProcessingLoading}
          completedSteps={completedSteps}
          isHiddenSubmitButton={true}
          // isDisabledNextButton={!!id || (!!getQuestionId)}
        />
      </form>
      {openTagModal && (
        <CreateUpdateTagModal onClose={() => setOpenTagModal(false)} />
      )}
      {openPuzzleModal && (
        <CreateUpdatePuzzlesModal
          open={openPuzzleModal}
          onClose={() => setOpenPuzzleModal(false)}
          onSuccess={() => {
            // refresh puzzles list after successful create/update
            dispatch(getPuzzles());
          }}
        />
      )}
    </>
  );
};

export default CreateUpdateQuestion;

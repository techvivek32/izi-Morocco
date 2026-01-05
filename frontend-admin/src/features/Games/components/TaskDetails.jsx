import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatDateToReadable } from "../../../utils/common";
import { getAllQuestions } from "../../../slices/questionSlice";
import { HeaderType } from "../../../utils/types";
import TableGrid from "../../../components/table/TableGrid";
import TooltipWrapper from "../../../components/TooltipWrapper";
import ArrowIcon from "../../../components/svgs/ArrowIcon";
import toast from "react-hot-toast";
import FormStepperButtons from "../../Tasks/components/FormStepperButtons";
import {
  resetApiStateFromGames,
  setSelectedQuestions,
} from "../../../slices/gameSlice";
import SelectedQuestions from "./SelectedQuestions.jsx";
import { useResetMultipleApiStates } from "../../../hooks/useResetMultipleApiStates.js";
import { useParams } from "react-router-dom";

const TaskDetails = ({
  curStep,
  previousStepHandler,
  nextStepHandler,
  completedSteps,
  markStepCompleted,
}) => {
  const dispatch = useDispatch();
  const { getAllQuestionsApi } = useSelector((state) => state.question);
  const { data, isLoading } = getAllQuestionsApi;
  const [currentPage, setCurrentPage] = useState(1);
  const { selectedQuestions } = useSelector((state) => state.games);
  const { id } = useParams();

  const questions = (data?.response?.docs || []).map((q) => {
    return {  
      ...q,
      tags: q.tags?.map((t) => t.name) || [],
      createdAt: formatDateToReadable(q.createdAt, false, true),
    };
  });

  // console.log({ questions });

  const totalPages = data?.response?.totalPages || 1;
  const totalRecords = data?.response?.totalDocs || 0;
  const limit = data?.response?.limit || 10;

  const handleSelect = (question) => {
    // console.log("I am handle select for this question", question);
    if (selectedQuestions.find((q) => q.id === question._id)) {
      toast.error("Task already selected");
      return;
    }

    const pureQuestion = {
      name: question.questionName,
      id: question._id,
      points: question.points,
      tags: question.tags,
      index: selectedQuestions.length + 1,
      icon: question?.icon,
      iconName: question?.iconName,
      locationRadius: question?.locationRadius,
      radiusColor: question?.radiusColor,
      isSelected: false,
    };
    dispatch(setSelectedQuestions([...selectedQuestions, pureQuestion]));
  };

  // console.log({ selectedQuestions });

  const columns = [
    { value: "questionName", name: "Question", _class: "col-span-4" },
    {
      value: "tags",
      name: "Tags",
      _class: "col-span-2",
      type: HeaderType.tooltip,
    },
    { value: "points", name: "Points" },
    { value: "answerType", name: "Ans Type", _class: "col-span-2" },
    { value: "createdAt", name: "Created At", _class: "col-span-2" },
    {
      name: "Actions",
      value: "actions",
      type: HeaderType.dynamicAction,
      actions: [
        {
          label: "Select",
          icon: (
            <TooltipWrapper
              content={"Selct Task"}
              place="right"
              className="h-7 w-7 flex items-center justify-center rounded-full hover:bg-accent/10 cursor-pointer"
            >
              <ArrowIcon variant="dark" className="cursor-pointer" />
            </TooltipWrapper>
          ),
          onClick: (question) => handleSelect(question),
          _class: "flex w-full justify-center",
        },
      ],
    },
  ];

  useEffect(() => {
    dispatch(getAllQuestions({ page: currentPage }));
  }, [dispatch, currentPage]);

  useResetMultipleApiStates([
    { action: resetApiStateFromGames, stateName: "getGameQuestionsApi" },
  ]);

  return (
    <>
      <h3 className="font-semibold mb-2 text-xl">Task Details</h3>
      <div className="w-full h-full grid grid-cols-5 gap-2">
        {/* all Tasks list */}
        <div className="col-span-3 rounded-lg">
          {/* <DisabledWrapper where={selectedQuestions.length >= 10}> */}
          <TableGrid
            data={questions}
            columns={columns}
            isCompressView
            isLoading={isLoading}
            allowPagination={true}
            currentPage={currentPage}
            totalPages={totalPages}
            totalRecords={totalRecords}
            pageLimit={limit}
            onPageChange={(newPage) => setCurrentPage(newPage)}
          />
          {/* </DisabledWrapper> */}
        </div>
        {/* selected Tasks list */}
        <div className="col-span-2 rounded-lg">
          <SelectedQuestions />
        </div>
      </div>
      <FormStepperButtons
        curStep={curStep}
        resetFormHandler={() => dispatch(setSelectedQuestions([]))}
        previousStepHandler={previousStepHandler}
        nextStepHandler={nextStepHandler}
        currentStepHandler={() => markStepCompleted(curStep)}
        isHiddenSubmitButton
        isDisabledNextButton={selectedQuestions.length === 0}
        isLoading={isLoading}
        lastStep={3}
        completedSteps={completedSteps}
      />
    </>
  );
};

export default TaskDetails;

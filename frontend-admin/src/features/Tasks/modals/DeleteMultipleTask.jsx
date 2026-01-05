import React, { useEffect } from "react";
import Modal from "../../../components/Modal";
import CheckBox from "../../../components/form/Checkbox";
import Button from "../../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteQuestions,
  getAllQuestions,
  resetApiStateFromQuestion,
} from "../../../slices/questionSlice";
import useApiResponseHandler from "../../../hooks/useApiResponseHandler";
import SpinnerIcon from "../../../components/svgs/SpinnerIcon";
import Pagination from "../../../components/Pagination";
import { useResetMultipleApiStates } from "../../../hooks/useResetMultipleApiStates";

const DeleteMultipleTask = ({
  open = true,
  onClose,
  questions,
  allowPagination = false,
  currentPage = 1,
  totalPages = 1,
  totalRecords = 0,
  pageLimit = 1,
  onPageChange = () => {},
}) => {
  const [pureQuestions, setPureQuestions] = React.useState(
    questions?.map((q) => ({
      name: q.questionName,
      _id: q._id,
      isSelect: false,
    })) || []
  );
  const selectedQuestions = pureQuestions
    .filter((q) => q.isSelect)
    .map((q) => q._id);

  const selectAll = pureQuestions.every((q) => q.isSelect);
  const dispatch = useDispatch();
  const { deleteQuestionsApi } = useSelector((state) => state.question);
  const { data, isLoading, error, status } = deleteQuestionsApi;

  const handleCheckboxChange = (questionId = -1) => {
    if (questionId === -1) {
      // Select All checkbox logic

      const updatedQuestions = pureQuestions.map((q) => ({
        ...q,
        isSelect: !selectAll,
      }));
      setPureQuestions(updatedQuestions);
    } else {
      //   Individual checkbox logic can be added here
      if (!selectedQuestions.some((q) => q._id === questionId)) {
        const updatedQuestion = pureQuestions.map((q) => {
          if (q._id === questionId) {
            return { ...q, isSelect: !q.isSelect };
          }
          return q;
        });
        setPureQuestions(updatedQuestion);
      }
    }
  };

  const deleteTasks = () => {
    dispatch(deleteQuestions({ ids: selectedQuestions }));
  };

  useApiResponseHandler({
    status,
    data,
    error,
    sideAction: () => {
      onClose();
      dispatch(getAllQuestions());
    },
  });

  useEffect(() => {
    setPureQuestions(
      questions?.map((q) => ({
        name: q.questionName,
        _id: q._id,
        isSelect: false,
      })) || []
    );
  }, [questions]);

  useResetMultipleApiStates([
    { action: resetApiStateFromQuestion, stateName: "deleteQuestionsApi" },
  ]);

  return (
    <Modal
      open={open}
      onOpenChange={onClose}
      title={<span className="text-2xl">Delete Multiple Tasks</span>}
      contentClassName="min-w-[90%] lg:min-w-[840px] max-h-[85vh] overflow-y-auto overflow-x-clip"
      className="py-10 flex flex-col gap-4 overflow-y-scroll scrollbar-hide text-blue min-h-[200px]"
      showClose
    >
      <div className="rounded-lg">
        <div className="grid grid-cols-3 gap-4 py-2 px-4 bg-orange-100 border-accent border rounded-lg">
          <div>Id</div>
          <div>Name</div>
          <div>
            <CheckBox
              handleChecked={handleCheckboxChange}
              checked={selectAll}
            />
          </div>
        </div>
        <div className="flex flex-col divide-y divide-accent">
          {pureQuestions.map((question) => (
            <div
              key={question._id}
              className="grid grid-cols-3 gap-4 py-2 px-4 border border-accent rounded-lg items-center"
            >
              <div className="font-semibold text-gray-700 text-xs">
                {question._id}
              </div>
              <div>{question.name}</div>
              <div>
                <CheckBox
                  handleChecked={() => handleCheckboxChange(question._id)}
                  checked={question.isSelect}
                />
              </div>
            </div>
          ))}
        </div>
        {allowPagination && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalRecords={totalRecords}
            pageLimit={pageLimit}
            onPageChange={onPageChange}
          />
        )}
      </div>
      <div className="flex justify-end w-full">
        <Button
          disabled={isLoading || selectedQuestions.length === 0}
          onClick={deleteTasks}
        >
          {isLoading && <SpinnerIcon />} Delete Selected Tasks
        </Button>
      </div>
    </Modal>
  );
};

export default DeleteMultipleTask;

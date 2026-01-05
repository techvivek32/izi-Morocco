import React, { useEffect, useState } from "react";
import FormStepperButtons from "./FormStepperButtons";
import { FormProvider, useForm } from "react-hook-form";
import FileUpload from "../../../components/form/FileUpload";
import CommonInput from "../../../components/form/CommonInput";
import ColorPickerInput from "../../../components/form/AntDesign/ColorPicker";
import { useDispatch, useSelector } from "react-redux";
import { callAPI } from "../../../services/callApi";
import {
  createSettings,
  getSettings,
  resetApiStateFromQuestion,
} from "../../../slices/questionSlice";
import useApiResponseHandler from "../../../hooks/useApiResponseHandler";
import AntSearchableSelector from "../../../components/form/AntDesign/AntSearchableSelector";
import useNavigateTo from "../../../hooks/useNavigateTo";
import { ROUTES } from "../../../routes/helper";
import { getSessionData } from "../../../utils/sessionStorage";
import { apiResponseType } from "../../../utils/types";
import { MEDIA_URL } from "../../../utils/config";
import toast from "react-hot-toast";
import OptionGroup from "../../../components/form/OptionGroup";
import { extractFilename } from "../helper";
import { useResetMultipleApiStates } from "../../../hooks/useResetMultipleApiStates";
import { useParams } from "react-router-dom";
import SettingsSkeleton from "./SettingsSkeleton";

const timeUnits = [
  { value: "minutes", label: "minutes" },
  { value: "hours", label: "hours" },
];

const radioButtonOptions = [
  {
    label: "Remove when answered correctly/incorrectly.",
    value: "remove_on_answer",
  },
  { label: "Keep until answered correctly.", value: "keep_until_correct" },
  { label: "Keep until the end of the game.", value: "keep_until_end" },
];

const Settings = ({
  curStep,
  previousStepHandler,
  nextStepHandler,
  completedSteps,
  markStepCompleted,
}) => {
  const defaultValues = {
    radiusColor: "rgb(249,87,56)",
    timeLimit: "",
    timeUnit: "minutes",
    iconName: "",
    locationRadius: "",
    behaviorOption: "remove_on_answer",
    durations: {
      deactivateOnIncorrectSeconds: null,
      deactivateAfterClosingSeconds: null,
    },
  };
  const form = useForm({ defaultValues });
  const {
    register,
    handleSubmit,
    formState,
    control,
    setError,
    reset,
    watch,
    setValue,
  } = form;
  const { errors } = formState;

  // console.log({ errors });
  const { createQuestionApi, createSettingsApi, getSettingsApi } = useSelector(
    (state) => state.question
  );

  const [isUploading, setIsUploading] = useState(false);
  const { id } = useParams();
  const questionId =
    createQuestionApi?.data?.response?._id || getSessionData("questionId");
  const { data, isLoading, error, status } = createSettingsApi;
  const dispatch = useDispatch();

  const goTo = useNavigateTo();
  // const behaviourOption = watch("behaviorOption");

  const onSubmit = async (data) => {
    // console.log("form submitted", data);
    const {
      timeLimit,
      timeUnit,
      iconName,
      radiusColor,
      locationRadius,
      questionLogo,
      // durations,
      behaviorOption,
    } = data;
    // console.log(data.questionLogo)
    if (typeof questionLogo !== "string" && data.questionLogo) {
      const formData = new FormData();
      formData.append("images", data.questionLogo);

      setIsUploading(true);
      const response = await callAPI("/upload", {
        method: "POST",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
        suppressError: true,
      });

      setIsUploading(false);
      if (!response.error) {
        const { images = [] } = response?.data?.response || {};

        // console.log({ images });
        if (questionId) {
          dispatch(
            createSettings({
              questionId,
              data: {
                timeLimit,
                timeUnit,
                iconName,
                radiusColor,
                locationRadius,
                icon: images[0],
                behaviorOption,
                // durations,
              },
            })
          );
        }
      }
    } else {
      if (questionId) {
        dispatch(
          createSettings({
            questionId,
            data: {
              timeLimit,
              timeUnit,
              iconName,
              radiusColor,
              locationRadius,
              icon: questionLogo ? extractFilename(questionLogo) : null,
              behaviorOption,
              // durations,
            },
          })
        );
      }
    }
  };

  useApiResponseHandler({
    status,
    data,
    error,
    setFormError: setError,
    sideAction: () => {
      markStepCompleted(curStep);
      goTo(ROUTES.TASKS);
    },
  });

  useEffect(() => {
    if (questionId) {
      dispatch(getSettings(questionId));
    }
  }, [questionId]);

  useEffect(() => {
    if (getSettingsApi.status === apiResponseType.success) {
      // console.log(getSettingsApi.data?.response);
      const response = getSettingsApi.data?.response;
      if (response) {
        reset({
          timeLimit: response.timeLimit,
          timeUnit: response.timeUnit,
          iconName: response.iconName,
          radiusColor: response.radiusColor,
          locationRadius: response.locationRadius,
          questionLogo: `${MEDIA_URL()}/${response.icon}`,
          behaviorOption: response.behaviorOption || "remove_on_answer",
          // durations: {
          //   deactivateOnIncorrectSeconds:
          //     response.durations?.deactivateOnIncorrectSeconds || null,
          //   deactivateAfterClosingSeconds:
          //     response.durations?.deactivateAfterClosingSeconds || null,
          // },
        });
      }
    } else if (getSettingsApi.status === apiResponseType.failed) {
      getSettingsApi.error?.forEach((error) => {
        if (error.location === "params") {
          toast.error(error.msg);
        }
      });
    }
  }, [getSettingsApi.status]);

  // useEffect(() => {
  //   if (behaviourOption === "keep_until_correct") {
  //     setValue("durations.deactivateAfterClosingSeconds", null);
  //   } else if (behaviourOption === "keep_until_end") {
  //     setValue("durations.deactivateOnIncorrectSeconds", null);
  //   } else if (behaviourOption === "remove_on_answer") {
  //     setValue("durations", {
  //       deactivateOnIncorrectSeconds: null,
  //       deactivateAfterClosingSeconds: null,
  //     });
  //   }
  // }, [behaviourOption]);

  useEffect(() => {
    return () => {
      reset(defaultValues);
    };
  }, []);

  useResetMultipleApiStates([
    { action: resetApiStateFromQuestion, stateName: "createSettingsApi" },
    { action: resetApiStateFromQuestion, stateName: "getSettingsApi" },
  ]);


  if (getSettingsApi.isLoading) {
    return <SettingsSkeleton />
  }

  return (
    <div>
      <FormProvider {...form}>
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <h3 className="font-semibold mb-2 text-xl">Settings Section</h3>
          <div className="p-4 flex flex-col gap-4">
            <div className="flex gap-4">
              <CommonInput
                placeholder="Eg. 6"
                labelName="Time Limit"
                id="timeLimit"
                name="timeLimit"
                register={register}
                type="number"
                errors={errors}
                required
              />
              <AntSearchableSelector
                id="timeUnit"
                name="timeUnit"
                labelName="Time Unit"
                options={timeUnits}
                control={control}
                errors={errors}
                required
              />
            </div>
            <FileUpload
              name={`questionLogo`}
              labelName={"Question Logo"}
              type="image"
              required
            />
            <CommonInput
              placeholder="Eg. IZIMorocco"
              labelName="Logo Name"
              id="iconName"
              name="iconName"
              register={register}
              errors={errors}
              required
            />
            <CommonInput
              placeholder="Eg. 50 (in meters)"
              labelName="Location Radius"
              id="locationRadius"
              name="locationRadius"
              register={register}
              type="number"
              errors={errors}
              required
            />
            <ColorPickerInput
              name="radiusColor"
              errors={errors}
              labelName="Radius Background Color"
              control={control}
              defaultValue={watch("radiusColor")}
              required
            />

            <OptionGroup
              name="behaviorOption"
              options={radioButtonOptions}
              register={register}
              required={true}
              errors={errors}
            />
            {/* {behaviourOption === "keep_until_correct" && (
              <CommonInput
                placeholder="Eg. 60 (in Seconds)"
                labelName="Deactivate location if answered incorrectly for"
                id="durations.deactivateOnIncorrectSeconds"
                name="durations.deactivateOnIncorrectSeconds"
                register={register}
                type="number"
                errors={errors}
                required
              />
            )}
            {behaviourOption === "keep_until_end" && (
              <CommonInput
                placeholder="Eg. 60 (in Seconds)"
                labelName="Deactivate location after answering for"
                id="durations.deactivateAfterClosingSeconds"
                name="durations.deactivateAfterClosingSeconds"
                register={register}
                type="number"
                errors={errors}
                required
              />
            )} */}
          </div>
          <FormStepperButtons
            curStep={curStep}
            previousStepHandler={previousStepHandler}
            nextStepHandler={nextStepHandler}
            isLoading={isLoading || isUploading}
            completedSteps={completedSteps}
            isDisabledNextButton={!!id}
          />
        </form>
      </FormProvider>
    </div>
  );
};

export default Settings;

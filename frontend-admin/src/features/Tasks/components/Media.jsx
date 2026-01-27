import { FormProvider, useForm, useFieldArray } from "react-hook-form";
import FormStepperButtons from "./FormStepperButtons";
import FileUpload from "../../../components/form/FileUpload";
import CommonInput from "../../../components/form/CommonInput";
import { useDispatch, useSelector } from "react-redux";
import { callAPI } from "../../../services/callApi";
import {
  createMedia,
  getMedia,
  resetApiStateFromQuestion,
} from "../../../slices/questionSlice";
import useApiResponseHandler from "../../../hooks/useApiResponseHandler";
import { useEffect, useState } from "react";
import { getSessionData } from "../../../utils/sessionStorage";
import { apiResponseType } from "../../../utils/types";
import toast from "react-hot-toast";
import { MEDIA_URL } from "../../../utils/config";
import OptionGroup from "../../../components/form/OptionGroup";
import { cn } from "../../../lib/utils";
import { extractFilename } from "../helper";
import { useResetMultipleApiStates } from "../../../hooks/useResetMultipleApiStates";
import { useParams } from "react-router-dom";
import MediaSkeleton from "./MediaSkeleton";
import AudioManager from "./AudioManager";

const defaultValueForMedia = {
  image: [],
  video: [],
  audioUrls: [],
  videoUrls: [],
};

const Media = ({
  curStep,
  previousStepHandler,
  nextStepHandler,
  completedSteps,
  markStepCompleted,
}) => {
  const form = useForm({ defaultValues: defaultValueForMedia });
  const {
    register,
    handleSubmit,
    formState,
    setError,
    reset,
    control,
    setValue,
    watch,
  } = form;
  const optionsMethods = useFieldArray({
    control,
    name: "audios",
  });
  const { errors } = formState;
  const [isUploading, setIsUploading] = useState(false);
  const [isNextClicked, setIsNextClicked] = useState(false);

  const { createQuestionApi, createMediaApi, getMediaApi } = useSelector(
    (state) => state.question
  );
  const questionId =
    createQuestionApi?.data?.response?._id || getSessionData("questionId");
  const { data, isLoading, error, status } = createMediaApi;
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    // console.log("form submitted", data);

    // Collect files that need uploading and keep track of their indices
    const audioFields = data.audioUrls || [];
    const audioFilesToUpload = [];
    const fileIndexToFieldIndex = new Map();
    let hasError = false;

    audioFields.forEach((af, idx) => {
      const val = af?.url;
      if (!val && audioFields.length < 2) {
        hasError = true;
        return;
      }
      if (val instanceof File) {
        fileIndexToFieldIndex.set(audioFilesToUpload.length, idx);
        audioFilesToUpload.push(val);
      }
    });

    if (hasError) {
      toast.error("Please Select audio first");
      return;
    }

    // Also collect image/video files as before
    const getFiles = (array) =>
      array?.filter((item) => item instanceof File) || [];
    const getUrls = (array) =>
      array?.filter(
        (item) => typeof item === "string" && item.startsWith("http")
      ) || [];

    const imageFiles = getFiles(data.image);
    const videoFiles = getFiles(data.video);

    const imageUrls = getUrls(data.image).map(extractFilename);
    const videoUrls = getUrls(data.video).map(extractFilename);

    const hasFilesToUpload =
      imageFiles.length > 0 ||
      videoFiles.length > 0 ||
      audioFilesToUpload.length > 0;

    let uploadedImages = [];
    let uploadedVideos = [];
    let uploadedAudios = [];

    if (hasFilesToUpload) {
      const formData = new FormData();
      imageFiles.forEach((file) => formData.append("images", file));
      videoFiles.forEach((file) => formData.append("videos", file));
      audioFilesToUpload.forEach((file) => formData.append("audios", file));

      setIsUploading(true);
      const response = await callAPI("/upload", {
        method: "POST",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
        suppressError: true,
      });

      setIsUploading(false);

      if (!response.error) {
        const result = response?.data?.response || {};
        uploadedImages = result.images || [];
        uploadedVideos = result.videos || [];
        uploadedAudios = result.audios || [];
      }
    }

    // Build final audios array as objects { url, type }
    const finalAudios = [];

    // First handle fields that had string URLs (existing uploaded or external)
    audioFields.forEach((af) => {
      const val = af?.url;
      const type = af?.type || "background";
      if (typeof val === "string") {
        // Extract filename - handle both MEDIA_URL and Cloudinary URLs
        const filename = extractFilename(val);
        finalAudios.push({ url: filename, type });
      }
    });

    // Now map uploaded audio filenames back to their original field index to preserve type
    // uploadedAudios is array of filenames returned by backend in same order as uploaded files
    uploadedAudios.forEach((fname, uploadIdx) => {
      const fieldIdx = fileIndexToFieldIndex.get(uploadIdx);
      const type =
        (audioFields[fieldIdx] && audioFields[fieldIdx].type) || "background";
      finalAudios.push({ url: fname, type });
    });

    const finalData = {
      images: [...imageUrls, ...uploadedImages],
      videos: [...videoUrls, ...uploadedVideos],
      audios: finalAudios,
      videoUrls: [
        data.videoUrls && data.videoUrls.length ? data.videoUrls : "",
      ],
    };

    if (questionId) {
      dispatch(createMedia({ questionId, data: finalData }));
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
      dispatch(getMedia(questionId));
    }
  }, [questionId]);

  useEffect(() => {
    if (getMediaApi.status === apiResponseType.success) {
      // console.log(getMediaApi.data?.response);
      const response = getMediaApi.data?.response;
      if (response) {
        // Normalize audios into objects { url, type } so the field array has consistent shape
        const normalizedAudios = (response.audios || [])
          .map((a) => {
            if (!a) return null;
            if (typeof a === "string") {
              return { url: `${MEDIA_URL("video")}/${a}`, type: "background" };
            }
            // if object with url or filename
            const rawUrl = a.url || a.filename || a.path || "";
            const full = rawUrl.startsWith("http")
              ? rawUrl
              : `${MEDIA_URL("video")}/${rawUrl}`;
            return { url: full, type: a.type || "background" };
          })
          .filter(Boolean);

        reset({
          videoUrls: response.videoUrls?.[0] || "",
          image:
            response.images?.map((image) => `${MEDIA_URL()}/${image}`) || [],
          video:
            response.videos?.map((video) => `${MEDIA_URL("video")}/${video}`) ||
            [],
          audioUrls: normalizedAudios,
        });
      }
    } else if (getMediaApi.status === apiResponseType.failed) {
      getMediaApi.error?.forEach((error) => {
        if (error.location === "params") {
          toast.error(error.msg);
        }
      });
    }
  }, [getMediaApi.status, reset]);

  useEffect(() => {
    return () => {
      reset(defaultValueForMedia);
    };
  }, []);

  useResetMultipleApiStates([
    { action: resetApiStateFromQuestion, stateName: "createMediaApi" },
    { action: resetApiStateFromQuestion, stateName: "getSettingsApi" },
    { action: resetApiStateFromQuestion, stateName: "getMediaApi" },
  ]);



  if (getMediaApi.isLoading) {
    return <MediaSkeleton />
  }
  return (
    <div>
      <FormProvider {...form}>
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <h3 className="font-semibold mb-2 text-xl">Media Section</h3>
          <div className="p-4 flex flex-col gap-4">
            <FileUpload
              name={`image`}
              multiple={true}
              labelName={"Select Image"}
              type="image"
            />
            <CommonInput
              id={`videoUrls`}
              name={`videoUrls`}
              labelName="Video URL"
              type="text"
              register={register}
              errors={errors}
            />
            <FileUpload
              name={`video`}
              multiple={true}
              labelName={"Select Video"}
              type="video"
            />

            {/* Audios field array: each field has url and type */}
            {/* <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-900">
                  Audios
                </label>
                <button
                  type="button"
                  onClick={() => append({ url: "", type: "background" })}
                  className="text-sm px-3 py-1 bg-primary text-white rounded"
                >
                  Add audio
                </button>
              </div>

              {fields.map((field, index) => {
                const audiosWatch = watch("audios") || [];
                const thisField = audiosWatch[index] || {};
                const currentType = thisField.type || "background";

                const audioTypeOptions = [
                  { value: "starting", label: "Starting" },
                  { value: "background", label: "Background" },
                ];

                return (
                  <div
                    key={field.id}
                    className={cn(
                      "p-2 rounded flex items-center justify-between gap-4"
                    )}
                  >
                    <div className="flex-1">
                      <FileUpload
                        id={`audios.${index}.url`}
                        name={`audios.${index}.url`}
                        labelName={`Select Audio ${index + 1}`}
                        type="audio"
                      />
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex flex-row items-center gap-3">
                        <OptionGroup
                          name={`audios.${index}.type`}
                          options={audioTypeOptions}
                          selected={[currentType]}
                          onChange={(values) =>
                            setValue(
                              `audios.${index}.type`,
                              values[0] || "background"
                            )
                          }
                          type="radio"
                          _class="flex-row gap-3"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="p-1 rounded hover:bg-red-50"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-red-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div> */}

            <AudioManager />

          </div>
          <FormStepperButtons
          curStep={curStep}
          previousStepHandler={previousStepHandler}
          nextStepHandler={handleNextStep}
          isLoading={isLoading || isUploading}
          completedSteps={completedSteps}
          isHiddenSubmitButton={true}
          // isDisabledNextButton={!!id || (!!questionId)}
        />
        </form>
      </FormProvider>
    </div>
  );
};

export default Media;

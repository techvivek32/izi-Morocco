import {  useRef } from "react";
import { useFormContext } from "react-hook-form";
import { cn } from "../../lib/utils";
import UploadIcon from "../svgs/UploadIcon";
import DeleteIcon from "../svgs/DeleteIcon";
import { getNestedError } from "../../utils/common";

const FileUpload = ({
  name,
  accept = "image/*,.pdf",
  multiple = false,
  labelName,
  required = false,
  type = "image",
  errors = {},
  isCompress = false,
}) => {
  const { register, setValue, watch } = useFormContext();
  const fileInputRef = useRef(null);
  const files = watch(name) || (multiple ? [] : null);

  // type :"image"|"video"|"file"|"audio"
  const inputProps = {
    ...(type === "image" && { accept: "image/*" }),
    ...(type === "video" && { accept: "video/*" }),
    ...(type === "file" && { accept: ".pdf,.doc,.docx" }),
    ...(type === "audio" && { accept: "audio/*" }),
  };

  const handleButtonClick = () => {
    fileInputRef.current.value = ""; // Reset input to allow re-selecting same file
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length === 0) return;

    if (multiple) {
      setValue(name, [...(files || []), ...selectedFiles]);
    } else {
      setValue(name, selectedFiles[0]); // Store single file
    }
  };

  const removeFile = () => {
    setValue(name, multiple ? [] : null);
  };

  // MODIFIED: Handles both File objects and URL strings
  const handleFileClick = (file) => {
    if (typeof file === "string") {
      // It's a URL string from the backend
      window.open(file, "_blank");
    } else if (file instanceof File) {
      // It's a File object selected by the user
      const fileUrl = URL.createObjectURL(file);
      window.open(fileUrl, "_blank");
    }
  };

  const filesToDisplay = multiple
    ? files
    : files instanceof File || typeof files === "string"
      ? [files]
      : [];

  const errorMessage = getNestedError(errors, name)?.message;

  // console.log({ filesToDisplay, files })
  return (
    <div className="flex flex-col items-start w-full relative text-accent">
      <label
        htmlFor={labelName}
        className={cn(
          "block font-medium text-gray-900",
          isCompress ? "text-xs" : "text-sm"
        )}
      >
        {labelName}
        {required && <span className="text-red-600"> *</span>}
      </label>
      {/* Hidden file input */}
      <input
        type="file"
        accept={accept}
        multiple={multiple}
        ref={(e) => {
          fileInputRef.current = e;
          register(name).ref(e);
        }}
        onChange={handleFileChange}
        className="hidden"
        {...inputProps}
      />

      {/* Custom upload button */}
      <button
        type="button"
        onClick={handleButtonClick}
        className={cn(
          "mt-1 input-focus-and-hover bg-white w-full flex items-center justify-between p-2 h-10 text-primary cursor-pointer rounded-lg",
          isCompress ? "text-xs" : "text-base sm:text-sm"
        )}
      >
        <span>
          {filesToDisplay.length > 0
            ? multiple
              ? "Reselect Files"
              : "Reselect File"
            : multiple
              ? "Select Files"
              : "Selects File"}
        </span>
        <span
          className={cn(
            "p-1.5 rounded-md flex items-center gap-0.5",
            filesToDisplay.length > 0
              ? "bg-green-200 text-[#00AC00]"
              : "bg-light-accent text-accent",
            isCompress ? "text-[8px]" : "text-[10px] lg:text-xs"
          )}
        >
          <UploadIcon /> {filesToDisplay.length > 0 ? "Uploaded" : "Upload"}
        </span>
      </button>
      {/* File preview & Input Label */}
      {filesToDisplay.length > 0 && (
        <div
          className={cn(
            "text-primary cursor-pointer rounded-md p-2 flex flex-col gap-2",
            isCompress ? "text-xs" : "text-base sm:text-sm"
          )}
        >
          {filesToDisplay.map((file, index) => {
            // MODIFIED: Get file name whether it's a File object or a URL string
            const fileName =
              typeof file === "string"
                ? file.split("/").pop() // Extract filename from URL
                : file.name;
            return (
              <div
                key={index}
                className="flex items-center justify-between gap-2"
              >
                <span
                  className={cn(
                    "truncate max-w-xs cursor-pointer hover:underline",
                    isCompress ? "text-[8px]" : "text-xs"
                  )}
                  onClick={() => handleFileClick(file)}
                >
                  {fileName}
                </span>
                <span onClick={() => removeFile(index)}>
                  <DeleteIcon />
                </span>
              </div>
            );
          })}
        </div>
      )}

      {errorMessage && (
        <p
          className={cn(
            "top-full text-red-600 text-start text-nowrap",
            isCompress ? "text-[8px]" : "text-[10px] lg:text-xs"
          )}
        >
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default FileUpload;

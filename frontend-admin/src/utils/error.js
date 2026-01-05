import toast from "react-hot-toast";

export const mapFieldErrors = (response) => {
  const fieldErrors = {};

  response.reasons?.forEach((error) => {
    if (error.type === "field" && error.path) {
      fieldErrors[error.path] = error.msg;
    } else {
      //   fieldErrors.general = error.message;
      toast.error(error.message || "An Error Occurred");
    }
  });

  return fieldErrors;
};

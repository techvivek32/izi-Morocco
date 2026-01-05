import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { apiResponseType } from "../utils/types";

const useApiResponseHandler = ({
  status,
  data,
  error,
  resetForm,
  resetReduxStatus,
  setFormError,
  updateReduxList,
  sideAction,
}) => {
  useEffect(() => {
    if (status === apiResponseType.success) {
      // console.log({ data });
      toast.success(data?.message || "Successfully Done");
      resetForm?.();
      updateReduxList?.();
      sideAction?.();
      resetReduxStatus?.();
    } else if (status === apiResponseType.failed) {
      // console.log({ error });
      error?.forEach((err) => {
        if (err.type !== "field") {
          toast.error(err?.msg || err?.message || "Something went wrong");
        } else {
          if (err?.path) {
            setFormError?.(err.path, {
              type: "server",
              message: err.msg,
            });
          }
        }
      });
    }
  }, [status]);
};

export default useApiResponseHandler;

import { useEffect } from "react";
import { useDispatch } from "react-redux";

export const useResetMultipleApiStates = (resetConfigs) => {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      resetConfigs.forEach(({ action, stateName }) => {
        if (action && stateName) {
          dispatch(action(stateName));
        }
      });
    };
  }, []);
};

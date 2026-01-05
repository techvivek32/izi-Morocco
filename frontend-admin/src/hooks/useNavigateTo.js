import { useNavigate } from "react-router-dom";

const useNavigateTo = () => {
  const navigate = useNavigate();

  const goTo = (path, state = {}) => {
    if (path) {
      navigate(path, { state });
    }
  };

  return goTo;
};

export default useNavigateTo;

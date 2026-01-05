import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { apiResponseType } from "../../utils/types";

const Protected = ({ children }) => {
  const { verifyAuthApi } = useSelector((state) => state.user);
  const { isLoading, status } = verifyAuthApi;
  const location = useLocation();


  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-2"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }
  if (status === apiResponseType.failed) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }


  return <>{children}</>;
};

export default Protected;

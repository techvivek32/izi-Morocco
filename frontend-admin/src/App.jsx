import { Toaster } from "react-hot-toast";
import AppRoutes from "./routes/routes";
import { useDispatch } from "react-redux";
import { resetApiStateFromUser, verifyAuth } from "./slices/usersSlice";
import { useEffect } from "react";
import { useResetMultipleApiStates } from "./hooks/useResetMultipleApiStates";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(verifyAuth());
  }, []);

  useResetMultipleApiStates([
    { action: resetApiStateFromUser, stateName: "verifyAuthApi" },
  ]);

  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <AppRoutes />
    </div>
  );
}

export default App;

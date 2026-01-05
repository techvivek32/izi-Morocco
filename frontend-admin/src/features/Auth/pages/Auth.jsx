import { useState, useEffect } from "react";
import logo from "../../../assets/logo.png";
import CommonInput from "../../../components/form/CommonInput";
import SpinnerIcon from "../../../components/svgs/SpinnerIcon";
import { callAPI } from "../../../services/callApi";
import useNavigateTo from "../../../hooks/useNavigateTo";
import { mapFieldErrors } from "../../../utils/error";
import Eyeopen from "../../../components/svgs/Eyeopen";
import Eyeclose from "../../../components/svgs/Eyeclose";
import { apiResponseType } from "../../../utils/types";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { ROUTES } from "../../../routes/helper";
import { verifyAuth } from "../../../slices/usersSlice";


export default function Auth() {
  const initialFormData = { email: "", password: "", errors: null };
  const [formData, setFormData] = useState(initialFormData);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { verifyAuthApi } = useSelector((state) => state.user);

  const goTo = useNavigateTo();
  const dispatch = useDispatch();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await callAPI("/auth/login", {
        method: "POST",
        data: {
          email: formData.email,
          password: formData.password,
        },
        suppressError: true,
      });
      if (response && !response.error && response.data?.success) {
        // Save access token to localStorage so subsequent API calls include it
        const accessToken = response?.data?.response?.accessToken || response?.data?.response?.accessToken;
        if (accessToken) {
          try {
            localStorage.setItem("accessToken", accessToken);
          } catch (e) {
            console.warn("Unable to persist access token to localStorage", e);
          }
        }

        setFormData(initialFormData);
        const redirectUrl = ROUTES.DASHBOARD;
        // dispatch verifyAuth after storing token so callAPI can attach it
        dispatch(verifyAuth()).then(() => goTo(redirectUrl));

      } else {
        console.log("Login failed:", response);
        const errors = mapFieldErrors(response);
        setFormData((prev) => ({
          ...prev,
          errors,
        }));
      }
    } catch (error) {
      console.error("Login error:", error);
      setFormData((prev) => ({
        ...prev,
        errors: { general: "Login failed. Please try again." },
      }));
    }
    setIsLoading(false);
  };

  const handleChange = (field, val) => {
    setFormData(prev => ({ ...prev, [field]: val }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    let toastId;
    if (verifyAuthApi.status === apiResponseType.pending) {
      toastId = toast.loading("Verifying authentication...");
    }
    else if (verifyAuthApi.status === apiResponseType.success) {
      toast.dismiss(toastId);
      goTo("/dashboard", { replace: true });
    }
    else {
      toast.dismiss(toastId);
      goTo("/auth", { replace: true });
    }
  }, [verifyAuthApi.status])

  return (
    <div className="min-h-screen w-full relative">
      {/* Background */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(125% 125% at 50% 10%, #fff 40%, #ee964b 100%)",
        }}
      />

      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Logo" className="h-16 w-auto" />
        </div>

        <h1 className="font-bold text-accent text-center text-3xl my-5">
          Login to Admin Panel
        </h1>

        <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <CommonInput
              labelName="Email Address"
              value={formData.email}
              name={"email"}
              onChange={handleChange.bind(null, "email")}
              required
              disabled={isLoading}
              errors={formData.errors}
            />

            {/* Password */}
            <div className="relative">
              <CommonInput
                labelName="Password"
                value={formData.password}
                name={"password"}
                type={showPassword ? "text" : "password"}
                onChange={handleChange.bind(null, "password")}
                required
                disabled={isLoading}
                errors={formData.errors}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none mt-3"
                disabled={isLoading}
              >
                {showPassword ? <Eyeopen /> : <Eyeclose />}
              </button>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={
                  isLoading || formData.email === "" || formData.password === ""
                }
                className="flex w-full justify-center rounded-md bg-accent px-4 py-2 text-sm font-semibold text-white shadow hover:bg-accent/90 focus-visible:outline cursor-pointer focus-visible:outline-offset-2 focus-visible:outline-accent disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <SpinnerIcon />
                    Logging in...
                  </div>
                ) : (
                  "Login"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

import axios from "axios";
import { API_BASE_URL } from "../utils/config";

// Base URLs for different servers
const API_BASE_URLS = {
  main: API_BASE_URL,
};

// Create Axios instances for each server
const createAxiosInstance = (baseURL) => {
  const instance = axios.create({
    baseURL,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  });

  return instance;
};

const axiosInstances = {
  main: createAxiosInstance(API_BASE_URLS.main),
  secondary: createAxiosInstance(API_BASE_URLS.secondary),
};

export const callAPI = async (endpoint, options = {}) => {
  const {
    method = "GET",
    data = {},
    params = {},
    headers = {},
    suppressError = false,
    server = "main", // Default to main server
  } = options;

  try {
    // Attach Authorization header from localStorage accessToken if available
    const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
    const authHeaders = token ? { Authorization: `Bearer ${token}` } : {};

    const response = await axiosInstances[server]({
      url: endpoint,
      method,
      data,
      params,
      headers: {
        ...authHeaders,
        ...headers, // allow callers to override or provide additional headers
      },
    });

    return { error: false, data: response.data };
  } catch (error) {
    // console.log("API call error:", error);
    const errorDataFromServer = error?.response?.data;
    const reasons = [];
    if (errorDataFromServer?.errors) {
      reasons.push(...errorDataFromServer.errors);
    } else if (errorDataFromServer?.message) {
      reasons.push({ field: "general", message: errorDataFromServer.message });
    } else {
      reasons.push({
        field: "general",
        message: "Something went wrong please try again.",
      });
    }
    if (suppressError) {
      return { error: true, reasons };
    }
    throw JSON.stringify(reasons);
  }
};

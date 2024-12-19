import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem("token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
    // Also set the token in cookies for middleware
    Cookies.set("token", token, { secure: true, sameSite: "strict" });
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      Cookies.remove("token");
      window.location.href = "/auth/signin";
    }
    return Promise.reject(error);
  }
);

interface NestJsError {
  message: string | string[];
  error: string;
  statusCode: number;
}

export const handleApiError = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const nestError = error.response?.data as NestJsError | undefined;

    if (nestError?.message) {
      if (Array.isArray(nestError.message)) {
        return nestError.message[0];
      }
      return nestError.message;
    }

    switch (error.response?.status) {
      case 403:
        return "Access denied. Please check your credentials.";
      case 404:
        return "Resource not found.";
      case 422:
        return "Invalid input data.";
      case 429:
        return "Too many requests. Please try again later.";
      case 500:
        return "Server error. Please try again later.";
      default:
        return "An unexpected error occurred.";
    }
  }
  return "An unexpected error occurred.";
};

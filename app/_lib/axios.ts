import axios, { AxiosError } from "axios";

export class ApiError extends Error {
  constructor(
    public readonly status: number | null,
    message: string,
    public readonly backendMessage?: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response) {
      const { status, data } = error.response;

      const backendMessage =
        typeof data === "object" &&
        data !== null &&
        "message" in data &&
        typeof data.message === "string"
          ? data.message
          : undefined;

      const message = backendMessage || getStatusMessage(status); // fallback

      return Promise.reject(new ApiError(status, message, backendMessage));
    }

    if (error.request) {
      return Promise.reject(
        new ApiError(null, "Network error. Please check your connection."),
      );
    }

    return Promise.reject(new ApiError(null, error.message));
  },
);

function getStatusMessage(status: number): string {
  switch (status) {
    case 400:
      return "Invalid request. Please check your input.";
    case 401:
      return "Unauthorized. Please log in again.";
    case 403:
      return "You don't have permission to perform this action.";
    case 404:
      return "The requested resource was not found.";
    case 409:
      return "A conflict occurred. Please try again.";
    case 422:
      return "Validation failed. Please check your input.";
    case 429:
      return "Too many requests. Please slow down.";
    case 500:
      return "Server error. Please try again later.";
    case 502:
    case 503:
    case 504:
      return "Service unavailable. Please try again later.";
    default:
      return "An unexpected error occurred.";
  }
}

export default axiosInstance;

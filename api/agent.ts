import axios from "axios";
import { onLogout } from "@/utils/auth";
import { getAccessToken } from "@privy-io/react-auth";
import { toast } from "sonner";

export const agentApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_AGENT_API_URL || "",
  headers: {
    "Content-Type": "application/json",
    chain: process.env.NEXT_PUBLIC_CHAIN || "SOL",
    "x-access-token":
      process.env.NEXT_PUBLIC_AGENT_API_TOKEN || "hombyQ-wevbek-5qybde",
  },
});

// Add request interceptor to handle authorization
agentApi.interceptors.request.use((config) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor to handle authentication errors
agentApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const retryCount = error.config?.__retryCount || 0;

    const handleAuthError = () => {
      toast.error("Authentication Error", {
        id: "auth-error",
        description: "Session expired. Please login again.",
      });
      onLogout();
      return Promise.reject(error);
    };

    if (
      ["Token expired", "Missing auth token"].includes(
        error?.response?.data?.message,
      ) ||
      error?.response?.status === 401
    ) {
      if (retryCount >= 2) {
        return handleAuthError();
      }

      localStorage.removeItem("token");

      const newAccessToken = await getAccessToken();
      if (newAccessToken) {
        try {
          // Store the new token
          localStorage.setItem("token", newAccessToken);

          // Retry the original request with the new token
          const originalRequest = error.config;
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          originalRequest.__retryCount = retryCount + 1;
          return agentApi(originalRequest);
        } catch (retryError) {
          console.error("Retry failed:", retryError);
        }
      }

      // If getting new token failed, show error and logout
      return handleAuthError();
    }
    return Promise.reject(error);
  },
);

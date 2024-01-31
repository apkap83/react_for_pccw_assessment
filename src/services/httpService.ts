import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

interface HttpResponse<T> {
  success: boolean;
  data?: T;
  error?: any;
}

async function handleRequest<T>(
  requestFunc: (...args: any[]) => Promise<AxiosResponse<T>>,
  ...args: any[]
): Promise<HttpResponse<T>> {
  try {
    const response: AxiosResponse<T> = await requestFunc(...args);
    return { success: true, data: response.data };
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      // Check if the URL is '/api/auth/me'
      const isAuthMeEndpoint =
        error.config && error.config.url?.endsWith("/api/auth/me");

      if (error.response) {
        // Execute errorNotification only if it's not the '/api/auth/me' endpoint
        if (!isAuthMeEndpoint) {
          throw error;
        }
      } else if (error.request) {
      }
    } else {
    }

    return { success: false, error: error };
  }
}

const httpService = {
  get: <T>(url: string, config?: AxiosRequestConfig) =>
    handleRequest<T>(axios.get, url, config),
  post: <T>(url: string, data?: any, config?: AxiosRequestConfig) =>
    handleRequest<T>(axios.post, url, data, config),
  put: <T>(url: string, data?: any, config?: AxiosRequestConfig) =>
    handleRequest<T>(axios.put, url, data, config),
  delete: <T>(url: string, config?: AxiosRequestConfig) =>
    handleRequest<T>(axios.delete, url, config),
  setJwtAuthHeader: (jwt: string | null) => {
    axios.defaults.headers.common["Authorization"] = `Bearer: ${jwt}`;
  },
  removeJwtAuthHeader: () => {
    axios.defaults.headers.common["Authorization"] = undefined;
  },
};

export default httpService;

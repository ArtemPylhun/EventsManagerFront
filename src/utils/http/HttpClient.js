import axios, { AxiosError } from "axios";

export class HttpClient {
  constructor(configs, signal) {
    this.axiosInstance = axios.create({
      baseURL: configs.baseURL,
      timeout: configs.timeout || 3000,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...configs.headers,
      },
      ...configs,
    });

    this.signal = signal;

    // Uncomment if you need interceptors
    // this.initInterceptors();
  }

  async get(url, config = {}) {
    return this.request({ method: "GET", url, ...config });
  }

  async post(url, data, config = {}) {
    return this.request({ method: "POST", url, data, ...config });
  }

  async put(url, data, config = {}) {
    return this.request({ method: "PUT", url, data, ...config });
  }

  async delete(url, config = {}) {
    return this.request({ method: "DELETE", url, ...config });
  }

  async request(config) {
    try {
      const response = await this.axiosInstance.request({
        ...config,
        signal: this.signal,
      });
      return response.data;
    } catch (error) {
      if (axios.isCancel(error)) {
        console.info("Request was cancelled");
      } else if (error instanceof AxiosError) {
        console.error("Request failed with error", error.response?.statusText);
      } else {
        console.error("Unexpected error occurred", error.message);
      }
      return Promise.reject(error);
    }
  }

  // Uncomment this method if you want to use interceptors
  /*
  initInterceptors() {
    this.axiosInstance.interceptors.request.use(
      (config) => {
        const apiKey = localStorage.getItem("apiKey") ?? "SrFeARsHHeiM2kaAABFGnnlk6Tgu4Wzt";
        if (apiKey) {
          config.params = { ...config.params, "api-key": apiKey };
        }
        // const token = localStorage.getItem("token");
        // if (token) {
        //   config.headers["Authorization"] = `Bearer ${token}`;
        // }
        return config;
      },
      (error) => {
        console.error("Request failed with error", error);
        return Promise.reject(error);
      }
    );

    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error instanceof AxiosError && error.response?.status === 401) {
          console.error("Unauthorized request");
          window.location.href = "/login?returnUrl=" + window.location.pathname;
          // Refresh token logic can be added here if needed
        }
        return Promise.reject(error);
      }
    );
  }
  */
}

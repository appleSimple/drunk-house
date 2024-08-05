import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const api = axios.create({
  // Set your base URL here
  baseURL: 'http://3.36.207.45:8080',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 404) {
      console.log('404 error');

      return;
    }
    if (error.response?.status === 500) {
      console.log('500 error');

      return;
    }
    // Handle error here
    return Promise.reject(error);
  },
);

const get = async <T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
  return await api.get(url, config);
};

const post = async <T, U>(url: string, data?: T, config?: AxiosRequestConfig): Promise<AxiosResponse<U>> => {
  return await api.post(url, data, config);
};

export {
  get,
  post,
};

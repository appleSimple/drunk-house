import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const api = axios.create({
  // Set your base URL here
  baseURL: 'http://3.36.207.45:8080',
});

const get = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  const response: AxiosResponse<T> = await api.get(url, config);
  return response.data;
};

const post = async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
  const response: AxiosResponse<T> = await api.post(url, data, config);
  return response.data;
};

// Add more methods for other HTTP methods (e.g., put, delete, etc.) as needed

export {
  get,
  post,
};

import axios, { AxiosInstance } from 'axios';

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_DOMEIN,
  headers: { 'Content-Type': 'multipart/form-data' },
  timeout: 20000,
});

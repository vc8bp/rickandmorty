import axios from "axios";

export const BASE_URL = import.meta.env.VITE_BASE_URL;

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

// publicRequest.interceptors.request.use(config => {
//   return config;
// });
import axios from "axios";

const BASE_URL = "http://192.168.1.110:4000";

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const setHeaderToken = (token) => {
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const removeHeaderToken = () => {
  api.defaults.headers.common.Authorization = null;
};

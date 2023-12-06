import { api } from "./config";

export const getTrending = async (type, time) => {
  const response = await api.get(`/trending/${type}/${time}`);
  return response.data.data;
};
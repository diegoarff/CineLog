import { api } from "./config";

export const getTrending = async (type, time) => {
  const response = await api.get(`/trending/${type}/${time}`);
  return response.data.data.results;
};

export const getTrendingPaginated = async (type, time, pageParam) => {
  const response = await api.get(`/trending/${type}/${time}?page=${pageParam}`);
  return response.data.data;
};

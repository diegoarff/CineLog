import { api } from "./config";

export const getTrending = async (type, time) => {
  const response = await api.get(`/trending/${type}/${time}`);
  return response.data.data.results;
};

export const getTrendingPaginated = async (type, time, pageParam) => {
  const response = await api.get(`/trending/${type}/${time}?page=${pageParam}`);
  return response.data.data;
};

export const getSearch = async (query, pageParam) => {
  const response = await api.get(`/search?query=${query}&page=${pageParam}`);
  return response.data.data;
};

export const getDiscover = async (
  media_type,
  sort,
  year,
  language,
  genre,
  pageParam,
) => {
  const response = await api.get(
    `/search/filter/${media_type}?sort_by=${sort}&primary_release_year=${year}&first_air_date_year=${year}&with_original_language=${language}&with_genres=${genre}&page=${pageParam}`,
  );
  return response.data.data;
};

export const getMedia = async (mediaType, id) => {
  const response = await api.get(`/media/${mediaType}/${id}`);

  return response.data.data;
};

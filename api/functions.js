import { api } from "./config";

export const getTrending = async (type, time) => {
  try {
    const response = await api.get(`/trending/${type}/${time}`);
    return response.data.data.results;
  } catch (error) {
    throw new Error(
      `Error getting trending data: ${error.response.data.message}`,
    );
  }
};

export const getTrendingPaginated = async (type, time, pageParam) => {
  try {
    const response = await api.get(
      `/trending/${type}/${time}?page=${pageParam}`,
    );
    return response.data.data;
  } catch (error) {
    throw new Error(
      `Error getting paginated trending data: ${error.response.data.message}`,
    );
  }
};

export const getSearch = async (query, pageParam) => {
  try {
    const response = await api.get(`/search?query=${query}&page=${pageParam}`);
    return response.data.data;
  } catch (error) {
    throw new Error(`Error searching: ${error.response.data.message}`);
  }
};

export const getDiscover = async (
  media_type,
  sort,
  year,
  language,
  genre,
  pageParam,
) => {
  try {
    const response = await api.get(
      `/search/filter/${media_type}?sort_by=${sort}&primary_release_year=${year}&first_air_date_year=${year}&with_original_language=${language}&with_genres=${genre}&page=${pageParam}`,
    );
    return response.data.data;
  } catch (error) {
    throw new Error(
      `Error getting discover data: ${error.response.data.message}`,
    );
  }
};

export const getMedia = async (mediaType, id) => {
  try {
    const response = await api.get(`/media/${mediaType}/${id}`);
    return response.data.data;
  } catch (error) {
    throw new Error(`Error getting media data: ${error.response.data.message}`);
  }
};

export const getMediaReviews = async (id) => {
  try {
    const response = await api.get(`/review/${id}`);
    return response.data.data;
  } catch (error) {
    throw new Error(
      `Error getting media reviews: ${error.response.data.message}`,
    );
  }
};

export const createReview = async (data) => {
  try {
    const response = await api.post(`/review/create`, {
      MediaID: data.id,
      score: data.score,
      content: data.content,
    });
    return response.data.data;
  } catch (error) {
    throw new Error(`Error creating review: ${error.response.data.message}`);
  }
};

export const createComment = async (data) => {
  try {
    const response = await api.post(`/comment/create`, data);
    return response.data.data;
  } catch (error) {
    throw new Error(`Error creating comment: ${error.response.data.message}`);
  }
};

export const getComments = async (type, id) => {
  try {
    const response = await api.get(`/comment/${type}/${id}`);
    return response.data.data;
  } catch (error) {
    throw new Error(`Error getting comments: ${error.response.data.message}`);
  }
};

export const getReview = async (id) => {
  try {
    const response = await api.get(`/review/detail/${id}`);
    return response.data.data;
  } catch (error) {
    throw new Error(`Error getting review: ${error.response.data.message}`);
  }
};

export const getComment = async (id) => {
  try {
    const response = await api.get(`/comment/detail/${id}`);
    return response.data.data;
  } catch (error) {
    throw new Error(`Error getting comment: ${error.response.data.message}`);
  }
};

export const changePassword = async (data) => {
  try {
    const response = await api.put(`/user/changePassword`, data);
    return response.data.data;
  } catch (error) {
    throw new Error(`Error changing password: ${error.response.data.message}`);
  }
};

export const getProfile = async () => {
  try {
    const response = await api.get(`/user/me`);
    return response.data.data;
  } catch (error) {
    throw new Error(`Error getting profile: ${error.response.data.message}`);
  }
};

export const updateProfile = async (data) => {
  try {
    const response = await api.put(`/user/me`, data);
    return response.data.data;
  } catch (error) {
    throw new Error(`Error updating profile: ${error.response.data.message}`);
  }
};

export const deleteProfile = async () => {
  try {
    const response = await api.delete(`/user/me`);
    return response.data.data;
  } catch (error) {
    throw new Error(`Error deleting profile: ${error.response.data.message}`);
  }
};

export const getChat = async (id) => {
  try {
    const response = await api.get(`/chat/${id}`);
    return response.data.data;
  } catch (error) {
    throw new Error(`Error getting chat: ${error.response.data.message}`);
  }
};

export const getUser = async (id) => {
  try {
    const response = await api.get(`/user/${id}`);

    return response.data.data;
  } catch (error) {
    throw new Error(`Error getting user: ${error.response.data.message}`);
  }
};

export const createChat = async (data) => {
  try {
    const response = await api.post(`/chat/create`, data);
    return response.data.data;
  } catch (error) {
    throw new Error(`Error creating chat: ${error.response.data.message}`);
  }
};

export const checkChatExists = async (userId) => {
  try {
    const response = await api.get(`/chat/check/${userId}`);
    return response.data.data;
  } catch (error) {
    throw new Error(`Error checking chat: ${error.response.data.message}`);
  }
};

export const getUserChats = async () => {
  try {
    const response = await api.get(`/chat/user`);
    return response.data.data;
  } catch (error) {
    throw new Error(`Error getting user chats: ${error.response.data.message}`);
  }
};

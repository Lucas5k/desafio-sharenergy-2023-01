import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

export const loginPage = async (endpoint, obj) => {
  const { status } = await api.post(endpoint, obj).catch((error) => error.response);

  return status;
};

export default api;
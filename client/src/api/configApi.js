import api from "./api";

export const getPublicConfig = async () => {
  const response = await api.get("/config");

  return response.data;
};
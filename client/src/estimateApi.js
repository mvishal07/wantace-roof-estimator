import api from "./api";

export const submitEstimate = async (data) => {
  const response = await api.post(
    "/estimate",
    data
  );

  return response.data;
};
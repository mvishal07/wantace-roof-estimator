import api from "./api";

export const getAdminConfig = async () => {
  const token = localStorage.getItem("adminToken");

  const response = await api.get(
    "/admin/config",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const updateAdminConfig = async (config) => {
  const token = localStorage.getItem("adminToken");

  const response = await api.put(
    "/admin/config",
    config,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
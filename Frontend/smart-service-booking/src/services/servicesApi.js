import api from "./api";

const getAuthConfig = () => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      Authorization: token,
    },
  };
};

export const getServices = async () => {
  const response = await api.get("/services", getAuthConfig());
  return response.data;
};

export const addService = async (serviceData) => {
  const response = await api.post("/add-service", serviceData, getAuthConfig());
  return response.data;
};

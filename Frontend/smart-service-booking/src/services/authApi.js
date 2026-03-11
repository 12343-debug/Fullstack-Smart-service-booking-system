import api from "./api";

export const registerUser = async (name, email, password, options = {}) => {
  const res = await api.post("/register", {
    name,
    email,
    password,
    ...options,
  });
  return res.data;
};

export const loginUser = async (email, password) => {
  const res = await api.post("/login", {
    email: email,
    password: password,
  });
  return res.data;
};

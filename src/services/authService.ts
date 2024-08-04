import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

export const signUp = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/signup}`, { email, password });
  return response.data;
};

export const logIn = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  return response.data;
};

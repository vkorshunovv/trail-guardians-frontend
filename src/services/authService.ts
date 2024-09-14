import axios from "axios";

const API_URL = "http://13.60.190.59:5000/api/auth" || "http://localhost:5000/api/auth";

export const signUp = async (name: string, email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, {
      name,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.log(
      "Error occurred while call signup API: ",
      (error as Error).message
    );
  }
};

export const logIn = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    const { token, user } = response.data;

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    return user;
  } catch (error) {
    console.log(
      "Error occurs while call login API: ",
      (error as Error).message
    );
  }
};

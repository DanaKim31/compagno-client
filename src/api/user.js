import axios from "axios";

const instance = axios.create({ baseURL: "http://localhost:8080/compagno/" });

export const registerUser = async (user) => {
  return await instance.post("signUp", user);
};

export const loginUser = async (user) => {
  return await instance.post("login", user);
};

export const myPageInfo = async (id) => {
  return await instance.get("myinfo/" + id);
};

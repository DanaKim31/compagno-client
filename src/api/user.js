import axios from "axios";

const instance = axios.create({ baseURL: "http://localhost:8080/compagno/" });

export const loginUser = async (user) => {
  return await instance.post("login", user);
};

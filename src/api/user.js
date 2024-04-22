import axios from "axios";

// http://localhost:8080/compagno/login
export const login = async (data) => {
  return await axios.post("http://localhost:8080/compagno/login", data);
};

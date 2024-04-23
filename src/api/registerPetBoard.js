import axios from "axios";

export const getInsts = async () => {
  return await axios.get("http://localhost:8080/compagno/register-pet");
};

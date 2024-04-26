import axios from "axios";

// 인증이 필요 x
const instance = axios.create({
  baseURL: "http://localhost:8080/compagno/public/",
});

// 인증 필요 o
const authorize = axios.create({
  baseURL: "http://localhost:8080/compagno/",
});

export const getAnswer = async (no) => {
  return await instance.get("question/" + no + "/answer");
};

// 답변 등록
export const addAnswer = async (data) => {
  return await authorize.post("answer", data);
};

export const updateAnswer = async (data) => {
  return await instance.put("answer", data);
};
export const deleteAnswer = async (no) => {
  return await instance.delete("answer" + no);
};

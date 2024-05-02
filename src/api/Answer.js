import axios from "axios";

const getToken = () => {
  return localStorage.getItem("token");
};

// 인증이 필요 x
const instance = axios.create({
  baseURL: "http://localhost:8080/compagno/public/",
});

// 인증 필요 o
const authorize = axios.create({
  baseURL: "http://localhost:8080/compagno/",
});

authorize.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getAnswer = async (no) => {
  return await instance.get("question/" + no + "/answer");
};

// 답변 등록
export const addAnswer = async (data) => {
  return await authorize.post("answer", data);
};

// 답변 수정
export const updateAnswer = async (data) => {
  return await authorize.put("answer", data);
};

// 답변 삭제
export const deleteAnswer = async (no) => {
  return await authorize.delete("answer/" + no);
};

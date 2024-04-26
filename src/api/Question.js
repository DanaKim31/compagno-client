import axios from "axios";

const getToken = () => {
  return localStorage.getItem("token");
};

// 인증 필요한 RESTful API 가져올 때 기본 루트
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

// 인증이 필요 x
const instance = axios.create({
  baseURL: "http://localhost:8080/compagno/public/",
});

// 목록 보기
export const getQuestions = async () => {
  return await instance.get("question");
};

// 1개 보여주기
export const getQuestion = async (no) => {
  return await instance.get("question/" + no);
};

// 수정하기
export const updateQuestion = async (data) => {
  return await instance.put("question", data);
};

// 추가하기
export const addQuestion = (data) => {
  return authorize.post("question", data);
};

// 삭제하기
export const delQuestion = async (no) => {
  return await instance.delete("question/" + no);
};

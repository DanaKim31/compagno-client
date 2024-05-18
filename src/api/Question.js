import axios from "axios";

const getToken = () => {
  return localStorage.getItem("token");
};

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

const instance = axios.create({
  baseURL: "http://localhost:8080/compagno/public/",
});

// 목록 보기
export const getQuestions = async (page, select, keyword) => {
  let url = "question?page=" + page;

  if (select !== null) {
    url += "&" + select + "=" + keyword;
  } else {
  }

  return await instance.get(url);
};

// 질문 보여주기
export const getQuestion = async (no) => {
  return await instance.get("question/" + no);
};

// 수정하기
export const updateQuestion = async (data) => {
  return await authorize.put("question", data);
};

// 추가하기
export const addQuestion = (data) => {
  return authorize.post("question", data);
};

// 삭제하기
export const delQuestion = async (no) => {
  return await authorize.delete("question/" + no);
};

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
export const getQuestions = async (page, select, keyword) => {
  let url = "question?page=" + page;

  // 조건 검색....
  if (select !== null) {
    url += "&" + select + "=" + keyword;
  }

  return await instance.get(url);
};

// 매니저 목록 가져오기
export const manageQuestions = async (page) => {
  return await authorize.get("question/manage?page=" + page);
};

// 마이페이지 질문 목록 가져오기
export const myQuestions = async (page) => {
  return await authorize.get("question/mypage?page=" + page);
};

// 1개 보여주기
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

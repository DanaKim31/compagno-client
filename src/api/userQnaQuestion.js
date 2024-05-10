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

// 1. 등록하기
export const addUserQuestion = (data) => {
  return authorize.post("userQuestion", data);
};

// 2. 리스트 출력
export const getUserQuestions = async (page, select, keyword) => {
  let url = "userQuestion?page=" + page;

  if (select !== "") {
    url += "&" + select + "=" + keyword;
  }

  return await instance.get(url);
};

// 3. 상세보기 출력
export const getUserQuestion = async (no) => {
  return await instance.get("userQuestion/" + no);
};

// 4. 수정
export const updateUserQuestion = async (data) => {
  return await authorize.put("userQuestion", data);
};

// 5. 삭제
export const deleteUserQuestion = async (no) => {
  return await authorize.delete("userQuestion/" + no);
};

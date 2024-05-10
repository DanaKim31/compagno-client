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
export const addUserAnswer = (data) => {
  return authorize.post("userQuestion/answer", data);
};

// 2. 상위 답변 출력
export const getUserAnswers = async (no) => {
  console.log(no);
  return await instance.get("userQuestion/answer/" + no);
};

// 3. 수정
export const updateUserAnswer = async (data) => {
  return await authorize.put("userQuestion/answer", data);
};

// 4. 삭제
export const deleteUserAnswer = async (no) => {
  return await authorize.delete("userQuestion/answer/" + no);
};

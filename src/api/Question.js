import axios from "axios";

// 인증이 필요 x
const instance = axios.create({
  baseURL: "http://localhost:8080/compagno/",
});

// 인증 필요 o
// const authorize = axios.create({
//   baseURL: "http://localhost:8080/compagno/",
// });

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
export const addQuestion = async (data) => {
  return await instance.post("question", data);
};

// 삭제하기
export const delQuestion = async (no) => {
  return await instance.delete("question/" + no);
};

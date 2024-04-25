import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/compagno/",
});

// 대행기관 전체보기
export const getInsts = async () => {
  return await instance.get("register-pet");
};

// 전체보기
export const getRegisterBoardFaqs = async () => {
  return await instance.get("register-pet/faq");
};

// 등록
export const registerRegisterBoardFaq = async (data) => {
  return await instance.post("register-pet/faq", data);
};

// 상세
export const getRegisterBoardFaq = async (code) => {
  return await instance.get("register-pet/faq/" + code);
};

// 수정
export const updateRegisterBoardFaq = async (data) => {
  return await instance.put("register-pet/faq", data);
};

// 삭제
export const deleteRegisterBoardFaq = async (code) => {
  return await instance.delete("register-pet/faq/" + code);
};

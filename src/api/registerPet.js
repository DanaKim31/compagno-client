import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/compagno/",
});

// 대행기관 목록
export const getInsts = async () => {
  return await instance.get("register-pet");
};

// 동물등록 FAQ 목록
export const getFaqList = async () => {
  return await instance.get("faq");
};

// FAQ 상세
export const getFaq = async (code) => {
  return await instance.get("faq" + code);
};

// FAQ 수정
export const updateFaq = async (data) => {
  return await instance.put("faq", data);
};

// FAQ 등록
export const addFaq = async (data) => {
  return await instance.post("faq", data);
};

// FAQ 삭제
export const deleteFaq = async (code) => {
  return await instance.delete("faq/" + code);
};

import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/compagno/public/",
});

const authorize = axios.create({
  baseURL: "http://localhost:8080/compagno/",
});

// 대행기관 전체보기
export const getInsts = async () => {
  return await instance.get("register-pet");
};

// FAQ 전체보기
export const getRegisterBoardFaqs = async () => {
  return await instance.get("register-pet/faq");
};

// FAQ 등록
export const registerRegisterBoardFaq = async (data) => {
  return await authorize.post("register-pet/faq", data);
};

// FAQ 상세
export const getRegisterBoardFaq = async (code) => {
  return await instance.get("register-pet/faq/" + code);
};

// FAQ 수정
export const updateRegisterBoardFaq = async (data) => {
  return await authorize.put("register-pet/faq", data);
};

// FAQ 삭제
export const deleteRegisterBoardFaq = async (code) => {
  return await authorize.delete("register-pet/faq/" + code);
};

// 시도 전체보기
export const getProvinces = async () => {
  return await instance.get("location/province");
};

// 시도에 따른 시군구 전체보기
export const getDistricts = async (code) => {
  return await instance.get("location/district/" + code);
};

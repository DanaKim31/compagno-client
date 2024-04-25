import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/compagno/",
});

// 전체보기
export const getSitterBoards = async () => {
  return await instance.get("sitter");
};

// 등록
export const registerSitterBoard = async (data) => {
  return await instance.post("sitter", data);
};

// 상세
export const getSitterBoard = async (code) => {
  return await instance.get("sitter/" + code);
};

// 수정
export const updateSitterBoard = async (data) => {
  return await instance.put("sitter", data);
};

// 삭제
export const deleteSitterBoard = async (code) => {
  return await instance.delete("sitter/" + code);
};

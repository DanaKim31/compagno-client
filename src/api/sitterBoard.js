import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/compagno/public/",
});

const authorize = axios.create({
  baseURL: "http://localhost:8080/compagno/",
});

// 전체보기
export const getSitterBoards = async () => {
  return await instance.get("sitter");
};

// 등록
export const registerSitterBoard = async (data) => {
  return await authorize.post("sitter", data);
};

// 상세
export const getSitterBoard = async (code) => {
  return await instance.get("sitter/" + code);
};

// 수정
export const updateSitterBoard = async (data) => {
  return await authorize.put("sitter", data);
};

// 삭제
export const deleteSitterBoard = async (code) => {
  return await authorize.delete("sitter/" + code);
};

// 카테고리 보기
export const getCategories = async () => {
  return await instance.get("sitter/category");
};

// 시도 전체보기
export const getProvinces = async () => {
  return await instance.get("location/province");
};

// 시도에 따른 시군구 전체보기
export const getDistricts = async (code) => {
  return await instance.get("location/district/" + code);
};

// =================== 댓글 ===================

// 각 게시글 댓글 전체보기
export const getSitterComments = async (code) => {
  return await instance.get("sitter/" + code + "/comment");
};

// 댓글 등록
export const registerSitterComment = async (data) => {
  return await authorize.post("sitter/comment", data);
};

// 대댓글 등록
export const registerSitterReply = async (data) => {
  return await authorize.post("sitter/comment", data);
};

// 댓글 수정
export const updateSitterComment = async (data) => {
  return await authorize.put("sitter/comment", data);
};

// 댓글 삭제
export const deleteSitterComment = async (code) => {
  return await authorize.delete("sitter/comment" + code);
};

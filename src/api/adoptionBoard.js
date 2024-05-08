import axios from "axios";
const getToken = () => {
  return localStorage.getItem("token");
};

// 인증 필요 기본 루트
const authorize = axios.create({ baseURL: "http://localhost:8080/compagno/" });

authorize.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 인증 필요 없는 기본 루트
const instance = axios.create({
  baseURL: "http://localhost:8080/compagno/public/",
});

// 입양 신청
export const createAdopBoard = async (data) => {
  return await authorize.post("adoptionBoard", data);
};

// 전체 보기
export const viewAllAdopBoard = async (page) => {
  return await instance.get("adoptionBoard?page=" + page);
};

// 하나 보기
export const viewOneAdopBoard = async (code) => {
  return await instance.get("adoptionBoard/" + code);
};

// 수정
export const updateAdopBoard = async (data) => {
  return await authorize.put("adoptionBoard", data);
};

// 삭제
export const deleteAdopBoard = async (code) => {
  return await authorize.delete("adoptionBoard/" + code);
};

// 댓글 관련 경로 ---------------------------
// 댓글 추가
export const addTopCommentAdop = async (data) => {
  return await authorize.post("adoptionBoard/comment", data);
};

// 대댓글 추가
export const addBottomCommentAdop = async (data) => {
  return await authorize.post("adoptionBoard/comment", data);
};

// 댓글 전체 보기(페이징x)
export const viewAllCommentAdop = async (code) => {
  return await instance.get("adoptionBoard/commentAll/" + code);
};

// 댓글 전체 보기(페이징)
export const viewCommentAdop = async (code, page) => {
  return await instance.get("adoptionBoard/comment/" + code + "?page=" + page);
};

// 댓글 삭제
export const deleteCommentAdop = async (code) => {
  return await authorize.delete("adoptionBoard/comment/" + code);
};

// 댓글 수정
export const updateCommentAdop = async (data) => {
  return await authorize.put("adoptionBoard/comment", data);
};

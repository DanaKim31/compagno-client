import axios from "axios";

const getToken = () => {
  return localStorage.getItem("token");
};

// 인증 필요한 RESTful API 가져올 때 기본 루트
const authorize = axios.create({ baseURL: "http://localhost:8080/compagno/" });

authorize.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 인증 필요 없는 RESTful API 가져올 때 기본 루트
const instance = axios.create({
  baseURL: "http://localhost:8080/compagno/public/",
});

const instanceComment = axios.create({
  baseURL: "http://localhost:8080/compagno/lostBoard/comment",
});

// 분실 신청
// http://localhost:8080/compagno/lostBoard
export const createlostBoard = async (data) => {
  return await authorize.post("lostBoard", data);
};

// 전체 보기+검색&정렬+페이징
// http://localhost:8080/compagno/public/lostBoard
export const viewAllLostBoard = async (page) => {
  return await instance.get("lostBoard?page=" + page);
};

// 1개 보기
// http://localhost:8080/compagno/public/lostBoard/4
export const viewOneLostBoard = async (code) => {
  return await instance.get("lostBoard/" + code);
};

// 게시글 수정
export const updateLostBoard = async (data) => {
  return await authorize.put("lostBoard", data);
};

// 게시글 삭제
export const deleteLostBoard = async (code) => {
  return await authorize.delete("lostBoard/" + code);
};

// 댓글 추가
export const addTopCommentLost = async (data) => {
  return await instanceComment.post(data);
};

// 대댓글 추가
export const addBottomCommentLost = async (data) => {
  return await instanceComment.post(data);
};

// 댓글 보기
export const viewCommentLost = async (code) => {
  return await instanceComment.get("/" + code);
};

// 댓글 삭제
export const deleteCommentLost = async (code) => {
  return await instanceComment.delete("/" + code);
};

// 댓글 수정
export const updateCommentLost = async (data) => {
  return await instanceComment.put(data);
};

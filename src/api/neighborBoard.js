import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/compagno/public/",
});

const authorize = axios.create({
  baseURL: "http://localhost:8080/compagno/",
});

// 전체보기
export const getNeighborBoards = async () => {
  return await instance.get("neighbor");
};

// 등록
export const registerNeighborBoard = async (data) => {
  return await authorize.post("neighbor", data);
};

// 상세
export const getNeighborBoard = async (code) => {
  return await instance.get("neighbor/" + code);
};

// 수정
export const updateNeighborBoard = async (data) => {
  return await authorize.put("neighbor", data);
};

// 삭제
export const deleteNeighborBoard = async (code) => {
  return await authorize.delete("neighbor/" + code);
};

// =================== 댓글 ===================

// 각 게시글 댓글 전체보기
export const getNeighborComments = async (code) => {
  return await instance.get("neighbor/" + code + "/comment");
};

// 댓글 등록
export const registerNeighborComment = async (data) => {
  return await authorize.post("neighbor/comment", data);
};

// 대댓글 등록
export const registerNeighborReply = async (data) => {
  return await authorize.post("neighbor/comment", data);
};

// 댓글 수정
export const updateNeighborComment = async (data) => {
  return await authorize.put("neighbor/comment", data);
};

// 댓글 삭제
export const deleteNeighborComment = async (code) => {
  return await authorize.delete("neighbor/comment" + code);
};

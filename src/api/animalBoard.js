import axios from "axios";

const getToken = () => {
  return localStorage.getItem("token");
};

// 인증이 필요한 RESTFUL API 가져올때 기본 루트
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

// 인증 필요없는 RESTFUL API 가져올때 기본 루트
const instance = axios.create({
  baseURL: "http://localhost:8080/compagno/public/",
});

// 글쓰기
export const addBoard = async (boardInfo) => {
  console.log(boardInfo);
  return await authorize.post(`animal-board`, boardInfo);
};
// 글 전체보기
export const viewBoardList = async (page, category, sort) => {
  let url = `animal-board?page=${page}`;
  if (category !== null || category !== undefined) {
    url += category;
  }
  if (sort !== null || sort !== undefined) {
    url += sort;
  }
  console.log(url);
  return await instance.get(url);
};
// 좋아요 랭킹 불러오기
export const viewRanker = async () => {
  return await instance.get("animal-board/weeklyRank");
};
// 글 검색 카테고리 불러오기
export const viewCategory = async () => {
  return await instance.get("animal-board/animalCategory");
};

// 글 하나보기
export const viewDetail = async (animalBoardCode) => {
  return await instance.get(`animal-board/` + animalBoardCode);
};

// 글 수정
export const updateBoard = async (updatedInfo) => {
  return await authorize.put("animal-board", updatedInfo);
};
// 수정 이전에 기존 이미지 가져오기
export const getPrevImages = async (animalBoardCode) => {
  return await instance.get("animal-board/" + animalBoardCode + "/prevImages");
};

// 글 삭제
export const delBoard = async (animalBoardCode) => {
  return await authorize.delete(`animal-board/` + animalBoardCode);
};

// ==========================================================================================//

// 게시글 댓글 불러오기
export const getComments = async (animalBoardCode) => {
  return await instance.get("animal-board/" + animalBoardCode + "/comment");
};

// 게시글 댓글 쓰기
export const writeComment = async (data) => {
  console.log(data);
  return await authorize.post("animal-board/comment", data);
};

// 게시글 댓글 수정 // api 분리
export const updateComment = async (data) => {
  console.log(data);
  return await authorize.put("animal-board/comment", data);
};

// 게시글 댓글 삭제
export const delComment = async (commentCode) => {
  console.log(commentCode);
  return await authorize.post("animal-board/deleteComment", commentCode);
};
// 특정 게시글 댓글 수 조회
export const countComment = async (animalBoardCode) => {
  return await instance.get(`animal-board/${animalBoardCode}/countComment`);
};

// ==============================================================
// 조회수
export const viewCount = async (animalBoardCode) => {
  return await instance.get(`animal-board/${animalBoardCode}/viewCount`);
};
// 해당글의 현재 유저의 좋아요 정보 가져오기 -boradCode + userId
export const checkFavorite = async (favDetail) => {
  // console.log(favDetail);
  return await instance.post("animal-board/checkFavorite", favDetail);
};
// 해당 글의 좋아요 수 가져오기 - count
export const FavCount = async (boolean) => {
  return await instance.put(`animal-board/countFavorite`, boolean);
};

// 게시글 좋아요
export const addFavorite = async (boardData) => {
  return await authorize.post("animal-board/addFavorite", boardData);
};

// 게시글 좋아요 취소
export const delFavorite = async (boardData) => {
  return await authorize.post("animal-board/delFavorite", boardData);
};
//=====================================================================

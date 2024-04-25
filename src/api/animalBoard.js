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
  baseURL: "http://localhost:8080/compagno/",
});

// 글쓰기
export const addBoard = async (boardInfo) => {
  return await authorize.post(`animal-board`, boardInfo);
};

// 글 전체보기
export const viewBoardList = async () => {
  return await instance.get(`animal-board`);
};

// 글 하나보기 + 조회수
export const viewDetail = async (animalBoardCode) => {
  return await instance.get(`animal-board/` + animalBoardCode);
};

// 글 수정
export const updateBoard = async (updatedInfo) => {
  return await instance.put("animal-board", updatedInfo);
};

// 글 삭제
export const delBoard = async (animalBoardCode) => {
  return await instance.delete(`animal-board/` + animalBoardCode);
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
  return await instance.put("animal-board/comment", data);
};

// 게시글 댓글 삭제
export const delComment = async (commentCode) => {
  return await instance.delete("animal-board/comment/" + commentCode);
};

// ==============================================================
// // 조회수
// export const viewCount = async (animalBoardCode) =>{
//   return await instance.get("animal-board/" + animalBoardCode);
// }

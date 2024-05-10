import axios from "axios";

const getToken = () => {
  return localStorage.getItem("token");
};

const instance = axios.create({
  baseURL: "http://localhost:8080/compagno/public/",
});

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

// 전체보기
export const getNeighborBoards = async (page) => {
  return await instance.get("neighbor?page=" + page);
};

// 등록
export const registerNeighborBoard = async (data) => {
  return await authorize.post("neighbor", data);
};

// 상세
export const getNeighborBoard = async (code) => {
  return await instance.get("neighbor/" + code, {
    withCredentials: true,
  });
};

// 수정
export const updateNeighborBoard = async (data) => {
  return await authorize.put("neighbor", data);
};

// 삭제
export const deleteNeighborBoard = async (code) => {
  return await authorize.delete("neighbor/" + code);
};

// 동물 카테고리 보기
export const getAnimalCategories = async () => {
  return await instance.get("neighbor/animal-category");
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
export const getNeighborComments = async (code) => {
  return await instance.get("neighbor/" + code + "/comment");
};

// 댓글 등록
export const registerNeighborComment = async (data) => {
  console.log(data);
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
  return await authorize.delete("neighbor/comment/" + code);
};

import axios from "axios";

const getToken = () => {
  return localStorage.getItem("token");
};

const instance = axios.create({
  baseURL: "http://localhost:8080/compagno/public",
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

export const searchProductBoard = async (page) => {
  return await instance.get("productBoard/search?page=" + page);
};

export const addProductBoard = async (data) => {
  return await authorize.post("productBoard", data);
};

export const delProductBoard = async (no) => {
  return await authorize.delete("productBoard/" + no);
};

export const getProductBoard = async (no) => {
  return await instance.get("productBoard/" + no, {
    withCredentials: true,
  });
};

export const editProductBoard = async (data) => {
  return await authorize.put("productBoard", data);
};

export const productBoardRecommend = async (data) => {
  return await authorize.post("productBoard/recommend", data);
};

export const productBoardBookmark = async (data) => {
  return await authorize.post("productBoard/bookmark", data);
};

export const getProductBoardComments = async (no) => {
  return await instance.get("productBoard/comment/" + no);
};

export const addProductBoardComment = async (data) => {
  return await authorize.post("productBoard/comment", data);
};

export const editProductBoardComment = async (data) => {
  return await authorize.patch("productBoard/comment", data);
};

export const delProductBoardcomment = async (no) => {
  return await authorize.delete("productBoard/comment/" + no);
};

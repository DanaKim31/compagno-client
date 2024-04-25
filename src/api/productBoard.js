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

export const searchProductBoard = async (no) => {
  return await instance.get("productBoard/search?page=");
};

export const addProductBoard = async (data) => {
  return await instance.post("productBoard", data);
};

export const delProductBoard = async (no) => {
  return await instance.delete("productBoard/" + no);
};

export const getProductBoard = async (no) => {
  return await instance.get("productBoard/" + no, {
    withCredentials: true,
  });
};

export const updateProductBoard = async (data) => {
  return await instance.put("productBoard", data);
};

export const productBoardRecommend = async (data) => {
  return await authorize.post("productBoard/recommend", data);
};

export const checkProductBoardRecommend = async (data) => {
  return await instance.post("productBoard/recommend/check", data);
};

export const productBoardBookmark = async (data) => {
  return await authorize.post("productBoard/bookmark", data);
};

export const checkProductBoardBookmark = async (data) => {
  return await instance.post("productBoard/recommend/check", data);
};

export const getProductBoardComment = async (no) => {
  return await instance.get("productBoard/comment/" + no);
};

export const addProductBoardComment = async (data) => {
  return await authorize.post("productBoard/comment", data);
};

export const updateProductBoardComment = async (data) => {
  return await authorize.patch("productBoard/comment", data);
};

export const delProductBoardcomment = async (no) => {
  return await authorize.delete("productBoard/comment/" + no);
};

import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/compagno/",
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
  return await instance.post("productBoard" + no);
};

export const updateProductBoard = async (data) => {
  return await instance.put("productBoard", data);
};

export const productBoardRecommend = async (data) => {
  return await instance.post("productBoard/recommend", data);
};

export const checkProductBoardRecommend = async (data) => {
  return await instance.post("productBoard/recommend/check", data);
};

export const productBoardBookmark = async (data) => {
  return await instance.post("productBoard/bookmark", data);
};

export const checkProductBoardBookmark = async (data) => {
  return await instance.post("productBoard/recommend/check", data);
};

export const getProductBoardComment = async (no) => {
  return await instance.get("productBoard/comment/" + no);
};

export const addProductBoardComment = async (data) => {
  return await instance.post("productBoard/comment", data);
};

export const updateProductBoardComment = async (data) => {
  return await instance.patch("productBoard/comment", data);
};

export const delProductBoardcomment = async (no) => {
  return await instance.delete("productBoard/comment/" + no);
};

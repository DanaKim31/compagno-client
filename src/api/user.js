import { dataTagSymbol } from "@tanstack/react-query";
import axios from "axios";

const getToken = () => {
  return localStorage.getItem("token");
};

// 인증이 필요없는 RESTful API 가져올때 기본 루트
const instance = axios.create({ baseURL: "http://localhost:8080/compagno/" });

// 인증이 필요한 RESTful API 가져올때 기본 루트
const authorize = axios.create({
  baseURL: "http://localhost:8080/api/",
});

authorize.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const registerUser = async (user) => {
  return await instance.post("signUp", user);
};

export const loginUser = async (user) => {
  return await instance.post("login", user);
};

export const myPageInfo = async (id) => {
  return await instance.get("myinfo/" + id);
};

export const checkDupId = async (id) => {
  return await instance.get("signUp/checkid/" + id);
};

export const checkDupNick = async (nickname) => {
  return await instance.get("signUp/checknick/" + nickname);
};

export const changePwd = async (data) => {
  return await authorize.post("mypage/myinfo/", data);
};

export const quitUser = async (id) => {
  return await authorize.put("/mypage/myinfo/" + id + "/quit");
};

import axios from "axios";

// 인증이 필요없는 RESTful API 가져올때 기본 루트
const instance = axios.create({
  baseURL: "http://localhost:8080/compagno/public/",
});

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

// Post방식 => 원데이 클래스 등록(인증 필요)
export const addOnedayClass = async (data) => {
  console.log(data);
  return await authorize.post("ClassBoard", data);
};

// Get방식 => 원데이 클래스 등록 전체 보기 !! (인증 필요 x)
export const viewAllClass = async () => {
  return await instance.get("ClassBoard");
};

// Get방식 => 원데이 클래스 등록된 게시물중 하나 보기 (인증 필요 x)
export const viewClass = async (code) => {
  return await instance.get("ClassBoard/" + code);
};

// Put방식 => 원데이 클래스 게시물 수정 (인증 필요)
export const updateClass = async (data) => {
  return await authorize.put("ClassBoard", data);
};

// Delete방식 => 원데이 클래스 삭제 (인증 필요)
export const deleClass = async (code) => {
  return await authorize.delete("ClassBoard/" + code);
};

// ==================================================

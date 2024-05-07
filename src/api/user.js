import axios from "axios";

const getToken = () => {
  return localStorage.getItem("token");
};

// 인증이 필요없는 RESTful API 가져올때 기본 루트
const instance = axios.create({ baseURL: "http://localhost:8080/compagno/" });

// 인증이 필요한 RESTful API 가져올때 기본 루트
const authorize = axios.create({
  baseURL: "http://localhost:8080/compagno/api/",
});

authorize.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 회원 가입
export const registerUser = async (user) => {
  return await instance.post("signUp", user);
};

// 로그인
export const loginUser = async (user) => {
  return await instance.post("login", user);
};

// 내 정보 불러오기
export const myPageInfo = async (id) => {
  return await authorize.get("mypage/myinfo/" + id);
};

// 회원가입시 중복 아이디 체크
export const checkDupId = async (id) => {
  return await instance.get("signUp/checkid/" + id);
};

// 회원가입이 중복 닉네임 체크
export const checkDupNick = async (nickname) => {
  return await instance.get("signUp/checknick/" + nickname);
};

// 회원 탈퇴
export const quitUser = async (data) => {
  return await authorize.put("mypage/myinfo/quit", data);
};

// 회원정보 변경
export const updateUser = async (data) => {
  return await authorize.put("mypage/myinfo/updateProfile", data);
};

// 내 활동내역 - animalboard 좋아요 목록 출력
export const getAnimalboardFavList = async (id, pageNum) => {
  return await authorize.get("mypage/myactivity/" + id + "?page=" + pageNum);
};

// 내 활동내역 - animalboard 좋아요 갯수 출력
export const getAnimalboardFavCount = async (id) => {
  return await authorize.get("mypage/myactivity/countfav/" + id);
};

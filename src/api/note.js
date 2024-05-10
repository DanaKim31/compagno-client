import axios from "axios";

const getToken = () => {
  return localStorage.getItem("token");
};

// 공통 경로 지정
const instance = axios.create({
  baseURL: "http://localhost:8080/compagno/public/",
});

// 인증 경로
const authorize = axios.create({ baseURL: "http://localhost:8080/compagno/" });

authorize.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 쪽지 등록
export const createNote = async (data) => {
  return await authorize.post("note", data);
};

// 쪽지 전체 보기(검색+페이징+정렬)
// @GetMapping("/note/viewAll/{nickName}")
export const viewAllNote = async (nickName) => {
  return await authorize.get("note/viewAll/" + nickName);
};

// 쪽지 1개 보기
export const viewOnteNote = async (code) => {
  return await authorize.get("note/" + code);
};

// 보낸 편지함
export const sendBox = async (name) => {
  return await authorize.get("note/sendBox/" + name);
};

// 받은 편지함
export const receiverBox = async (name) => {
  return await authorize.get("note/receiveBox/" + name);
};

// 검색
// http://localhost:8080/compagno/note/search?noteRegiDate=2024-04-11&page=2
// export const searchNote = async (option) => {
//   return await instance.get(url);
// };

// 보내는 이 삭제
export const deleteSender = async (code) => {
  return await authorize.delete("note/sender/" + code);
};

// 받는 이 삭제
export const deleteReceiver = async (code) => {
  return await authorize.delete("note/receiver/" + code);
};

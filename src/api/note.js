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
// 중요 쪽지함
//   @GetMapping("/note/viewAll/starBox/{nickName}")
export const viewStarBox = async (nickName) => {
  return await authorize.get("note/viewAll/starBox/" + nickName);
};

// 전체 보기 중 삭제 쪽지
// http://localhost:8080/compagno/note/delCount/hand0000
export const delCount = async (nickName) => {
  return await authorize.get("note/delCount/" + nickName);
};

// recievBox 삭제 쪽지
export const delReceiverCount = async (nickName) => {
  return await authorize.get("note/delReceiverCount/" + nickName);
};
// sendBox 삭제 쪽지
export const delSenderCount = async (nickName) => {
  return await authorize.get("note/delSenderCount/" + nickName);
};
// 중요 쪽지 갯수
export const starCount = async (nickName) => {
  return await authorize.get("note/starCount/" + nickName);
};

// 쪽지 1개 보기
// http://localhost:8080/compagno/note/18
export const viewOneNote = async (code) => {
  return await authorize.get("note/" + code);
};

// 보낸 편지함
//    @GetMapping("/note/sendBox/{sender}")
export const sendBox = async (name) => {
  return await authorize.get("note/sendBox/" + name);
};

// 받은 편지함
//   @GetMapping("/note/receiveBox/{receiver}")
export const receivBox = async (name) => {
  return await authorize.get("note/receiveBox/" + name);
};

// 중요 쪽지
// http://localhost:8080/compagno/note/star?noteCode=2
export const starSenderUpdate = async (code) => {
  return await authorize.put("note/starSender?noteCode=" + code);
};

export const starReceiverUpdate = async (code) => {
  return await authorize.put("note/starReceiver?noteCode=" + code);
};

// 보내는 이 삭제
export const deleteSender = async (code) => {
  return await authorize.delete("note/sender/" + code);
};

// 받는 이 삭제
export const deleteReceiver = async (code) => {
  return await authorize.delete("note/receiver/" + code);
};

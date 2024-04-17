import axios from "axios";

// 공통 경로 지정
const instance = axios.create({
  baseURL: "http://localhost:8080/compagno/note",
});

// 쪽지 등록
export const createNote = async (data) => {
  return await instance.post(data);
};

// 쪽지 전체 보기
export const viewAllNote = async () => {
  return await instance.get();
};

// 쪽지 1개 보기
export const viewOnteNote = async (code) => {
  return await instance.get("/" + code);
};

// 보낸 편지함
export const sendBox = async (name) => {
  return await instance.get("/sendBox/" + name);
};

// 받은 편지함
export const receiverBox = async (name) => {
  return await instance.get("/receiveBox/" + name);
};

// 검색
// http://localhost:8080/compagno/note/search?noteRegiDate=2024-04-11&page=2
export const searchNote = async (option, content) => {
  let url="/search?";
  if(option=="page"){
    url+="page="+content;
  }
  if(option=="sender"){
    url+="sender=" + content;
  }
  if(option=="receiver"){
    url+="receiver="+content;
  }
  if(option=="noteTitle"){
    url+="noteTitle="+content;
  }
  if(option=="noteRegiDate"){
    url+="noteRegiDate="+content;
  }
  return await instance.get(url);
};

// 보내는 이 삭제
export const deleteSender = async (code) => {
  return await instance.delete("/sender/" + code);
};

// 받는 이 삭제
export const deleteReceiver = async (code) => {
  return await instance.delete("/receiver/" + code);
};

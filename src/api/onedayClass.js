import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/compagno/public/",
});

// Post방식 => 원데이 클래스 등록
export const addOnedayClass = async (data) => {
  return await instance.post("ClassBoard", data);
};

// Get방식 => 원데이 클래스 등록 전체 보기 !!
export const viewAllClass = async () => {
  return await instance.get("ClassBoard");
};

// Get방식 => 원데이 클래스 등록된 게시물중 하나 보기
export const onedayClass = async (code) => {
  return await instance.get("ClassBoard/" + code);
};

// Put방식 => 원데이 클래스 게시물 수정
export const updateOnedayClass = async (date) => {
  return await instance.put("ClassBoard", date);
};

// Delete방식 => 원데이 클래스 삭제
export const deleOnedayClass = async (code) => {
  return await instance.delete("ClassBoard/" + code);
};

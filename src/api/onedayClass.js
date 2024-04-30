import axios from "axios";

// Post방식 => 원데이 클래스 등록
export const addOnedayClass = async (data) => {
  return await axios.post("http://localhost:8080/api/ClassBoard", data);
};

// Get방식 => 원데이 클래스 등록 전체 보기 !!
export const getOnedayClasses = async () => {
  return await axios.get("http://localhost:8080/api/ClassBoard");
};

// Get방식 => 원데이 클래스 등록된 게시물중 하나 보기
// export const getOnedayClass()

// Put방식 => 원데이 클래스 게시물 수정
export const updateOnedayClass = async (code) => {
  return await axios.put("http://localhost:8080/api/ClassBoard" + code);
};

// Delete방식 => 원데이 클래스 삭제
export const deleOnedayClass = async () => {
  return await axios.delete("http://localhost:8080/api/ClassBoard");
};

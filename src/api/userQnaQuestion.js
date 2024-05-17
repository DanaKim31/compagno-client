import axios from "axios";

const getToken = () => {
  return localStorage.getItem("token");
};

// 인증 필요한 RESTful API 가져올 때 기본 루트
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

// 인증이 필요 x
const instance = axios.create({
  baseURL: "http://localhost:8080/compagno/public/",
});

// 1. 등록하기
export const addUserQuestion = (data) => {
  return authorize.post("userQuestion", data);
};

// 2. 리스트 출력
export const getUserQuestions = async (
  page,
  select,
  keyword,
  category,
  status,
  sort
) => {
  let url = "userQuestion?page=" + page;

  if (sort !== undefined && sort !== 0) {
    url += "&sort=" + sort;
  }
  if (select !== undefined && select !== "") {
    url += "&" + select + "=" + keyword;
  }

  if (category !== undefined && category !== 0) {
    url += "&category=" + category;
  }

  if (status !== undefined && status !== 0) {
    url += "&status=" + status;
  }

  return await instance.get(url);
};

// 2-1. 좋아요한 글만 보기 출력
export const getliked = async (page, liked) => {
  let url = "userQuestion?page=" + page;
  console.log(liked);
  if (liked !== undefined && liked === true) {
    url += "&liked=true";
  }
  return await authorize.get(url);
};

// 3-0. 상세보기 시 조회수 증가
export const updateviewcount = async(no) => {
  return await instance.put("userQuestion/" + no);
}

// 3. 상세보기 출력
export const getUserQuestion = async (no) => {
  return await instance.get("userQuestion/" + no);
};

// 4. 수정
export const updateUserQuestion = async (data) => {
  return await authorize.put("userQuestion", data);
};

// 5. 삭제
export const deleteUserQuestion = async (no) => {
  return await authorize.delete("userQuestion/" + no);
};

// 6. 채택하기
export const ChooseAnswer = async (data) => {
  return await authorize.post("userQuestion/answerChoose", data);
};

// 7. 채택 취소하기
export const deleteChoose = async (no) => {
  return await authorize.delete("userQuestion/answerChoose/" + no);
};

// 8. 채택 보기
export const getChoose = async (no) => {
  return await instance.get("userQuestion/answerChoose/" + no);
};

// 9. 좋아요 등록하기
export const addLike = async (data) => {
  return await authorize.post("userQuestion/like", data);
};

// 10. 좋아요 확인하기
// (로그인된 상황에서만..)
export const selectLike = async (no) => {
  return await authorize.get("userQuestion/like/" + no);
};

export const deletelike = async (no) => {
  return await authorize.delete("userQuestion/like/" + no);
};

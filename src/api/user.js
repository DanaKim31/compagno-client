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
  return await authorize.get(
    "mypage/myactivity/animalfav/" + id + "?page=" + pageNum
  );
};

// 내 활동내역 - animalboard 좋아요 갯수 출력
export const getAnimalboardFavCount = async (id) => {
  return await authorize.get("mypage/myactivity/countanimalfav/" + id);
};

// 내 활동내역 - animalboard 좋아요 삭제
export const deleteAnimalFav = async (id, code) => {
  return await authorize.delete(
    "mypage/myactivity/deleteanimalfav/" + id + "?code=" + code
  );
};

// 내 활동내역 - animalboard 좋아요 카운트 변경
export const updateFavCount = async (code) => {
  return await authorize.put("mypage/myactivity/updateanimalfavcount/" + code);
};

// 내 활동내역 - 북마크한 상품 목록 출력
export const getProductBookmarkList = async (id, pageNum) => {
  return await authorize.get(
    "mypage/myactivity/productfav/" + id + "?page=" + pageNum
  );
};

// 내 활동내역 - 북마크한 상품 갯수 불러오기
export const getProductBookmarkCount = async (id) => {
  return await authorize.get("mypage/myactivity/productfav/count/" + id);
};

// 내 활동내역 - 일반유저 작성한 질문 리스트 출력
export const getMyQnaList = async (id, pageNum) => {
  return await authorize.get(
    "mypage/myactivity/myqna/" + id + "?page=" + pageNum
  );
};

// 내 활동내역 - 일반유저 작성한 질문 갯수 불러오기
export const getMyQnaCount = async (id) => {
  return await authorize.get("mypage/myactivity/myqna/count/" + id);
};

// 내 활동내역 - 매니저 미답변된 질문 리스트 출력
export const getManageQnaList = async (pageNum) => {
  return await authorize.get("mypage/myactivity/manageqna?page=" + pageNum);
};

// 내 활동내역 - 매니저 미답변된 질문 갯수 불러오기
export const getManageQnaCount = async () => {
  return await authorize.get("mypage/myactivity/manageqna/count");
};

// 내 활동내역 - 입양공고 리스트 출력
export const getAdoptionList = async (id, pageNum) => {
  return await authorize.get(
    "mypage/myactivity/myadoption/" + id + "?page=" + pageNum
  );
};

// 내 활동내역 - 입양공고 갯수 불러오기
export const getAdoptionCount = async (id) => {
  return await authorize.get("mypage/myactivity/myadoption/count/" + id);
};

// 내 활동내역 - 유저간 질문 리스트 출력
export const getUserQnaList = async (id, pageNum) => {
  return await authorize.get(
    "mypage/myactivity/myuserqna/" + id + "?page=" + pageNum
  );
};

// 내 활동내역 - 유저간 질문 리스트 갯수 불러오기
export const getUserQnaCount = async (id) => {
  return await authorize.get("mypage/myactivity/myuserqna/count/" + id);
};

// 내 활동내역 - 우리동네 게시글 리스트 가져오기
export const getNeighborPostList = async (id, pageNum) => {
  return await authorize.get(
    "mypage/myactivity/myneighborpost/" + id + "?page=" + pageNum
  );
};

// 내 활동내역 - 우리동네 게시글 갯수 가져오기
export const getNeighborPostCount = async (id) => {
  return await authorize.get("mypage/myactivity/myneighborpost/count/" + id);
};

// 내 활동내역 - 우리동네 댓글 리스트 가져오기
export const getNeighborComList = async (id, pageNum) => {
  return await authorize.get(
    "mypage/myactivity/myneighborcom/" + id + "?page=" + pageNum
  );
};

// 내 활동내역 - 우리동네 댓글 갯수 가져오기
export const getNeighborComCount = async (id) => {
  return await authorize.get("mypage/myactivity/myneighborcom/count/" + id);
};

// 내 활동내역 - 원데이클래스 개설 내역 가져오기
export const getOnedayClass = async (id, pageNum) => {
  return await authorize.get(
    "mypage/myactivity/myodc/" + id + "?page=" + pageNum
  );
};

// 내 활동내역 - 원데이클래스 개설 갯수 가져오기
export const getOnedayClassCount = async (id) => {
  return await authorize.get("mypage/myactivity/myodc/count/" + id);
};

// 내 활동내역 - 실종 공고 리스트 불러오기
export const getLostList = async (id, pageNum) => {
  return await authorize.get(
    "mypage/myactivity/mylost/" + id + "?page=" + pageNum
  );
};

// 내 활동내역 - 실종 공고 갯수 불러오기
export const getLostCount = async (id) => {
  return await authorize.get("mypage/myactivity/mylost/count/" + id);
};

// 내 활동내역 - 시터 게시글 불러오기
export const getSitterList = async (id, pageNum) => {
  return await authorize.get(
    "mypage/myactivity/mysitterpost/" + id + "?page=" + pageNum
  );
};

// 내 활동내역 - 시터 게시글 갯수 불러오기
export const getSitterCount = async (id) => {
  return await authorize.get("mypage/myactivity/mysitterpost/count/" + id);
};

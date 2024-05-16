import axios from "axios";

// 인증 필요없는 RESTFUL API 가져올때 기본 루트
const instance = axios.create({
  baseURL: "http://localhost:8080/compagno/public/",
});

// productBoard 상품 리스트
export const showProducts = async () => {
  return await instance.get("product-board/reviews");
};

// 현재 추천로직 포인트 가져오기
export const getCurrentPoint = async (user) => {
  return await instance.get("logic-point/" + user);
};

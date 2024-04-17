import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/compagno/lostBoard",
});

// 분실 신청
// http://localhost:8080/compagno/lostBoard

// 전체 보기
// http://localhost:8080/compagno/lostBoard

// 1개 보기
// http://localhost:8080/compagno/lostBoard/6

// 게시글 수정
// http://localhost:8080/compagno/lostBoard

// 게시글 삭제
// http://localhost:8080/compagno/lostBoard/7

// 검색 및 정렬
// http://localhost:8080/compagno/lostBoard/search?lostLocation=서울시

// 댓글 추가
// http://localhost:8080/compagno/lostBoard/comment

// 대댓글 추가
// http://localhost:8080/compagno/lostBoard/comment

// 댓글 보기
// http://localhost:8080/compagno/lostBoard/1/comment

// 댓글 삭제
// http://localhost:8080/compagno/lostBoard/comment/15

// 댓글 수정
// http://localhost:8080/compagno/lostBoard/comment

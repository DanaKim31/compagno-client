import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/compagno/lostBoard",
});

const instanceComment = axios.create({
  baseURL: "http://localhost:8080/compagno/lostBoard/comment",
})

// 분실 신청
export const createlostBoard=async(data)=>{
  return await instance.post(data);
}

// 전체 보기
export const viewAllLostBoard=async()=>{
  return await instance.get();
}

// 1개 보기
export const viewOneLosstBoard=async(code)=>{
  return await instance.get("/"+code);
}

// 게시글 수정
export const updateLostBoard=async(data)=>{
  return await instance.put(data);
}

// 게시글 삭제
export const deleteLostBoard=async(code)=>{
  return await instance.delete("/"+code);
}

// 검색 및 정렬
// http://localhost:8080/compagno/lostBoard/search?lostLocation=서울시&lostDate=2024-03-13
export const searchLostBoard=async(option, content)=>{
  let url = "/search?";
  if(option=='page') {
    url += "page="+content;
  } 
  if(option=="lostAnimalKind") {
    url += "";
  }
  if(optional=="lostAnimalGender"){
    url +="";
  }
  if(optional=="userNickname"){
    url+="";
  }
  if(optional=="lostDate"){
    url+="";
  }
  if(optional=="lostLocation"){
    url+="";
  }
  if(optional=="lostAnimalName"){
    url+="";
  }
  if(optional=="sort"){
    url+="";
  }
  return await instance.get(url);
}

// 댓글 추가
export const addTopCommentLost=async(data)=>{
  return await instanceComment.post(data);
}

// 대댓글 추가
export const addBottomCommentLost=async(data)=>{
  return await instanceComment.post(data);
}

// 댓글 보기
export const viewCommentLost=async(code)=>{
  return await instanceComment.get("/"+code);
}

// 댓글 삭제
export const deleteCommentLost=async(code)=>{
  return await instanceComment.delete("/"+code);
}

// 댓글 수정
export const updateCommentLost=async(data)=>{
  return await instanceComment.put(data)
}

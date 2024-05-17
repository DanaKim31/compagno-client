import axios from "axios";

const getToken = () => {
  return localStorage.getItem("token");
};

const instance = axios.create({
  baseURL: "http://localhost:8080/compagno/public",
});

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

export const searchNoticeBoard = async (keyword, page) => {
  if (page === 1 || page === 0) {
    if (keyword === null || keyword === "") {
      return await instance.get("noticeBoard");
    } else {
      return await instance.get("noticeBoard?keyword=" + keyword);
    }
  } else {
    if (keyword === null || keyword === "") {
      return await instance.get("noticeBoard?page=" + page);
    } else {
      return await instance.get(
        "noticeBoard?keyword=" + keyword + "&page=" + page
      );
    }
  }
};

export const addNoticeBoard = async (data) => {
  return await authorize.post("noticeBoard", data);
};

export const delNoticeBoard = async (no) => {
  return await authorize.delete("noticeBoard/" + no);
};

export const getNoticeBoard = async (no) => {
  return await instance.get("noticeBoard/" + no, {
    withCredentials: true,
  });
};

export const editNoticeBoard = async (data) => {
  return await authorize.patch("noticeBoard", data);
};

export const getNoticeBoardComments = async (no) => {
  return await instance.get("noticeBoard/comment/" + no);
};

export const addNoticeBoardComment = async (data) => {
  return await authorize.post("noticeBoard/comment", data);
};

export const editNoticeBoardComment = async (data) => {
  return await authorize.patch("noticeBoard/comment", data);
};

export const delNoticeBoardcomment = async (no) => {
  return await authorize.delete("noticeBoard/comment/" + no);
};

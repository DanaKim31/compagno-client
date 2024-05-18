import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/compagno/public/",
});

export const getContents = async (
  page,
  mainCate,
  subCate,
  mainReg,
  keyword
) => {
  return await instance.get(
    "content/list?page=" +
      page +
      "&mainCate=" +
      mainCate +
      "&subCate=" +
      subCate +
      "&mainReg=" +
      mainReg +
      "&keyword=" +
      keyword
  );
};

export const getContent = async (num) => {
  return await instance.get("content/" + num);
};

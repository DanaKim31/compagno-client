import { viewAllAdopBoard } from "../../api/adoptionBoard";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userSave } from "../../store/user";
import moment from "moment";
import "moment/locale/ko";

const Div = styled.div`
  @font-face {
    font-family: "TAEBAEKmilkyway";
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2310@1.0/TAEBAEKmilkyway.woff2")
      format("woff2");
    font-weight: normal;
    font-style: normal;
  }
  font-family: "TAEBAEKmilkyway";
  font-weight: bold;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  top: 180px;
`;

const ViewAllAdopBoard = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => {
    return state.user;
  });
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token != null) {
      dispatch(userSave(JSON.parse(localStorage.getItem("user"))));
    }
  }, []);

  // 페이징
  const [adops, setAdops] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [pages, setPages] = useState([]);

  // 검색  -- 추후
  const [searchKind, setSearchKind] = useState("");
  const [searchGender, setSearchGender] = useState("");
  const [searchNeuter, setSearchNeuter] = useState("");
  const [searchFindplace, setSearchFindplace] = useState("");
  const [searchCenterName, setSearchCenterName] = useState("");
  const [sort, setSort] = useState(0);
  const [allCount, setAllCount] = useState(0);

  const adopsAPI = async () => {
    let response = await viewAllAdopBoard(
      page +
        "&adopAnimalKind=" +
        searchKind +
        "&adopAnimalGender=" +
        searchGender +
        "&adopAnimalNeuter=" +
        searchNeuter +
        "&adopAnimalFindplace=" +
        searchFindplace +
        "&adopCenterName=" +
        searchCenterName +
        "&sort=" +
        sort
    );
    setAdops(response.data.content);
    setAllCount(response.data.totalElements);
    setTotalPage(response.data.totalPages);
  };

  let lastPage = 0;
  let firstPage = 0;
  let pageList = [];

  useEffect(() => {
    adopsAPI();
  }, [page, sort]);

  useEffect(() => {
    lastPage = Math.ceil(page / 5) * 5;
    firstPage = lastPage - 4;
    if (totalPage < lastPage) {
      lastPage = totalPage;
    }
    for (let i = firstPage; i <= lastPage; i++) {
      pageList.push(i);
    }
    setPages(pageList);
  }, [totalPage]);

  //   const navigate = useNavigate();
  //   const onCreate=async()=>{
  //     if(Object.keys(user).length!=0){
  //         navigate("/compagno/adoptionBoard/create");
  //     } else{
  //         navigate("/compagno/login");
  //     }
  //   }

  //   const view = (code)=>{
  //     navigate("/compagno/adoptionBoard/view/"+code);
  //   }

  return (
    <Div>
      <h2>전체보기올시다</h2>
    </Div>
  );
};
export default ViewAllAdopBoard;

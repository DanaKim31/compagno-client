import { getProductBookmarkList } from "../../api/user";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useDidMountEffect from "../../components/user/useDidMountEffect";
import Paging from "../../components/user/MyPagePagination";
import MyPageSidebar from "../../components/user/MyPageSidebar";
import MyPageTab from "../../components/user/MyPageTab";

const Div = styled.div`
  display: flex;
  height: 100vh;
  padding-top: 112px;

  .mypageMain {
    width: calc(100vw - 300px);
    display: flex;
    flex-direction: column;
    padding-top: 20px;

    .activityHeader {
      width: calc(100vw - 300px);
      height: fit-content;
      display: flex;
      justify-content: left;
      padding-left: 8px;
      border-bottom: 1px double black;

      a {
        width: 150px;
        margin: 0px 2px;
        padding: 10px 10px;
        height: fit-content;
        text-decoration-line: none;
        color: black;
        border-top: 1px dashed black;
        border-left: 1px dashed black;
        border-right: 1px dashed black;
        border-top-right-radius: 10px;
        border-top-left-radius: 10px;
        text-align: center;
      }
    }
  }
`;

const MyPageFavProduct = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({});

  // 유저정보 가지고온다
  const info = useSelector((state) => {
    return state.user;
  });

  useEffect(() => {
    if (Object.keys(info).length === 0) {
      setUser(JSON.parse(localStorage.getItem("user")));
    } else {
      setUser(info);
    }
  }, []);

  useDidMountEffect(() => {
    favListAPI();
  }, [user]);

  // 좋아요 목록과 페이징 기초값 세팅
  const [productBoardFav, setProductBoardFav] = useState([]);
  const [page, setPage] = useState(1);

  // 좋아요 목록 불러오기
  const favListAPI = async () => {
    const response = await getProductBookmarkList(user.userId, page);
    const favData = response.data;

    setProductBoardFav(favData);
    console.log(favData);
  };
  return (
    <Div>
      <MyPageSidebar />
      <div className="mypageMain">
        <MyPageTab />
        <div className="contentZone"></div>
      </div>
    </Div>
  );
};

export default MyPageFavProduct;

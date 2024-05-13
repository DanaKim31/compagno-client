import styled from "styled-components";
import MyPageSidebar from "../../components/user/MyPageSidebar";
import MyPageTab from "../../components/user/MyPageTab";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import {
  getNeighborPostList,
  getNeighborPostCount,
  getNeighborComList,
  getNeighborComCount,
} from "../../api/user";
import useDidMountEffect from "../../components/user/useDidMountEffect";

const Div = styled.div`
  @font-face {
    font-family: "TAEBAEKmilkyway";
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2310@1.0/TAEBAEKmilkyway.woff2")
      format("woff2");
    font-weight: normal;
    font-style: normal;
  }

  display: flex;
  height: 100vh;
  padding-top: 112px;
  font-family: "TAEBAEKmilkyway";
  font-weight: bold;

  .myNeighborMain {
    width: calc(100vw - 300px);
    display: flex;
    flex-direction: column;
    padding-top: 20px;

    .contentZone {
      width: 100%;
      height: calc(100vh - 66px);
      display: flex;
      flex-direction: row;

      .content-post {
        width: 50%;
        background-color: yellow;
        display: flex;
        justify-content: center;
      }

      .content-com {
        width: 50%;
        background-color: lightblue;
        display: flex;
        justify-content: center;
      }
    }
  }
`;

const MyPageNeighbor = () => {
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

  // 펫시터 게시판 작성글 기초값 세팅
  const [neighborPost, setNeighborPost] = useState([]);
  const [countNeighborPost, setCountNeighborPost] = useState(0);

  // 펫시터 게시판 작성댓글 기초값 세팅
  const [neighborCom, setNeighborCom] = useState([]);
  const [countNeighborCom, setCountNeighborCom] = useState(0);

  // 페이징 기초값 설정
  const [postPage, setPostPage] = useState(1);
  const [comPage, setComPage] = useState(1);

  // 작성글 + 작성댓글 불러오기
  const sitterListAPI = async () => {
    // 게시글 관련
    const postResponse = await getNeighborPostList(user.userId, postPage);
    const postData = postResponse.data;

    const countPostResponse = await getNeighborPostCount(user.userId);
    const countPostData = countPostResponse.data;

    // 댓글 관련
    // const comResponse = await getNeighborComList(user.userId, comPage);
    // const comData = comResponse.data;

    // const countComResponse = await getNeighborComCount(user.userId);
    // const countComData = countComResponse.data;

    setNeighborPost(postData);
    setCountNeighborPost(countPostData);

    // setNeighborCom(comData);
    // setCountNeighborCom(countComData);

    console.log(neighborPost);
    // console.log(neighborCom);
  };

  useDidMountEffect(() => {
    sitterListAPI();
  }, [user]);

  // 작성글 페이지 변경
  const handlePostPageChange = async (pPage) => {
    setPostPage(pPage);
    const postResponse = await getNeighborPostList(user.userId, pPage);
    const postData = postResponse.data;
    setNeighborPost(postData);
  };

  // 작성댓글 페이지 변경
  //   const handlePostComChange = async (cPage) => {
  //     setComPage(cPage);
  //     const comResponse = await getNeighborComList(user.userId, cPage);
  //     const comData = comResponse.data;
  //     setNeighborCom(comData);
  //   };

  return (
    <Div>
      <MyPageSidebar />
      <div className="myNeighborMain">
        <MyPageTab />
        <div className="contentZone">
          <div className="content-post">
            <table>
              <tr>
                <th>구분</th>
                <th>반려동물</th>
                <th>지역</th>
                <th>제목</th>
                <th>작성일</th>
              </tr>
            </table>
            <tbody>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </div>
          <div className="content-com">
            <table>
              <tr>
                <th>반려동물</th>
                <th>지역</th>
                <th>제목</th>
                <th>작성일</th>
              </tr>
            </table>
            <tbody>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </div>
        </div>
      </div>
    </Div>
  );
};

export default MyPageNeighbor;

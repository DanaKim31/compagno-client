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
import Paging from "../../components/user/MyPagePagination";

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
        flex-direction: column;
      }

      .content-com {
        width: 50%;

        display: flex;
        justify-content: center;
        flex-direction: column;
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

  useDidMountEffect(() => {
    neighborPostAPI();
    neighborComAPI();
  }, [user]);
  // --------------------------------- 게시글 ---------------------------------
  // 작성 게시글 기초값 세팅
  const [postList, setPostList] = useState([]);
  const [postPage, setPostPage] = useState(1);
  const [countPost, setCountPost] = useState(0);

  // 작성 게시글 불러오기
  const neighborPostAPI = async () => {
    const postResponse = await getNeighborPostList(user.userId, postPage);
    const postData = postResponse.data;
    setPostList(postData);

    const countPost = await getNeighborPostCount(user.userId);
    const countPostData = countPost.data;
    setCountPost(countPostData);
  };

  // 게시글 페이지 변경
  const handlePostPageChange = async (page) => {
    setPostPage(page);
    const postResponse = await getNeighborPostList(user.userId, page);
    const postData = postResponse.data;
    setPostList(postData);
  };
  // -------------------------------------------------------------------------

  // --------------------------------- 댓글 ---------------------------------
  // 작성 댓글 기초값 세팅
  const [comList, setComList] = useState([]);
  const [comPage, setComPage] = useState(1);
  const [countCom, setCountCom] = useState(0);

  // 작성 댓글 불러오기
  const neighborComAPI = async () => {
    const comResponse = await getNeighborComList(user.userId, comPage);
    const comData = comResponse.data;
    setComList(comData);

    const countCom = await getNeighborComCount(user.userId);
    const countComData = countCom.data;
    setCountCom(countComData);
  };

  // 댓글 페이지 변경
  const handleComPageChange = async (page) => {
    setComPage(page);
    const comResponse = await getNeighborComList(user.userId, page);
    const comData = comResponse.data;
    setComList(comData);
  };

  // ------------------------------------------------------------------------

  return (
    <Div>
      <MyPageSidebar />
      <div className="myNeighborMain">
        <MyPageTab />
        <div className="contentZone">
          <div className="content-post">
            <table>
              <thead>
                <tr>
                  <th>반려동물</th>
                  <th>지역</th>
                  <th>제목</th>
                  <th>작성일</th>
                </tr>
              </thead>
              <tbody>
                {postList?.map((post) => (
                  <tr key={post.neighborBoardCode}>
                    <td>{post.animalCategoryCode.animalType}</td>
                    <td>{post.location.locationName}</td>
                    <td>{post.neighborBoardTitle}</td>
                    <td>
                      {moment(post.neighborBoardRegiDate).format("YYYY-MM-DD")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Paging
              page={postPage}
              count={countPost}
              setPage={handlePostPageChange}
            />
          </div>
          <div className="content-com">
            <table>
              <thead>
                <tr>
                  <th>게시글 번호</th>
                  <th>댓글 내용</th>
                  <th>작성일</th>
                </tr>
              </thead>
              <tbody>
                {comList?.map((com) => (
                  <tr key={com.neighborCommentCode}>
                    <td>{com.neighborBoardCode}</td>
                    <td>{com.neighborCommentContent}</td>
                    <td>
                      {moment(com.neighborCommentRegiDate).format("YYYY-MM-DD")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Paging
              page={comPage}
              count={countCom}
              setPage={handleComPageChange}
            />
          </div>
        </div>
      </div>
    </Div>
  );
};

export default MyPageNeighbor;

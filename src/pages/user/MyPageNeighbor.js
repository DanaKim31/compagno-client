import styled from "styled-components";
import MyPageSidebar from "../../components/user/MyPageSidebar";
import MyPageTab from "../../components/user/MyPageTab";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import { getNeighborPostList, getNeighborPostCount } from "../../api/user";
import useDidMountEffect from "../../components/user/useDidMountEffect";
import Paging from "../../components/user/MyPagePagination";
import { useLocation } from "react-router-dom";

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
      height: calc(100vh - 66px);
      display: flex;
      align-items: center;
      flex-direction: column;
      padding-top: 15px;

      #headText {
        width: 900px;
        padding-bottom: 15px;
        font-weight: bold;
      }

      .myNeighborList {
        table-layout: fixed;
        border-collapse: separate;
        width: 300px;
        border-bottom: 2px solid black;

        thead th {
          width: 200px;
          height: 50px;
          text-align: left;
          line-height: 50px;
          color: black;
          border-top: 2px solid black;
          border-bottom: 2px solid black;
        }
        .th1 {
          width: 300px;
        }

        tbody {
          td {
            color: black;
            height: 50px;
            text-align: left;
            line-height: 50px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          a {
            color: black;
            text-decoration-line: none;
          }

          a:hover {
            color: orange;
          }
        }
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
  // 페이지 경로에서 정보 따오기
  const location = useLocation();
  const nowLoca = location.pathname.substring(17);

  return (
    <Div>
      <MyPageSidebar />
      <div className="myNeighborMain">
        <MyPageTab onClickMenu={nowLoca} />
        <div className="contentZone">
          <h1 id="headText">우리동네 게시판 작성 글 목록</h1>
          <div className="content-post">
            <table className="myNeighborList">
              <thead>
                <tr>
                  <th>반려동물</th>
                  <th className="th1">제목</th>
                  <th>지역</th>
                  <th>작성일</th>
                </tr>
              </thead>
              <tbody>
                {postList?.map((post) => (
                  <tr key={post.neighborBoardCode}>
                    <td>{post.animalCategoryCode.animalType}</td>
                    <td>
                      <a
                        href={
                          `/compagno/neighborBoard/detail/` +
                          post.neighborBoardCode
                        }
                      >
                        {post.neighborBoardTitle}
                      </a>
                    </td>
                    <td>{post.location.locationName}</td>
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
        </div>
      </div>
    </Div>
  );
};

export default MyPageNeighbor;

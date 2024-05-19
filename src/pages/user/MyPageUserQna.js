import styled from "styled-components";
import MyPageSidebar from "../../components/user/MyPageSidebar";
import MyPageTab from "../../components/user/MyPageTab";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserQnaList, getUserQnaCount } from "../../api/user";
import useDidMountEffect from "../../assets/useDidMountEffect";
import Paging from "../../components/user/MyPagePagination";
import moment from "moment";
import "moment/locale/ko";
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

  .myUserQnaMain {
    width: calc(100vw - 300px);
    display: flex;
    flex-direction: column;
    padding-top: 20px;

    .contentZone {
      height: calc(100vh - 66px);
      display: flex;
      padding-top: 15px;
      align-items: center;
      flex-direction: column;

      #headText {
        width: 1000px;
        padding-bottom: 15px;
        font-weight: bold;
      }

      .myUserQnaList {
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

const MyPageUserQna = () => {
  const [user, setUser] = useState({});
  // 유저정보 가지고 오기
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

  // 유저간 질문 리스트 초기값 설정
  const [userQnaList, setUserQnaList] = useState([]);
  const [page, setPage] = useState(1);
  const [userQnaCount, setUserQnaCount] = useState(0);

  // 유저간 질문 리스트 불러오기
  const userQnaAPI = async () => {
    const response = await getUserQnaList(user.userId, page);
    const userQnaData = response.data;
    setUserQnaList(userQnaData);

    const countResponse = await getUserQnaCount(user.userId);
    const countUserQnaData = countResponse.data;
    setUserQnaCount(countUserQnaData);
  };
  useDidMountEffect(() => {
    userQnaAPI();
  }, [user]);

  // 페이지 변경
  const handlePageChange = async (page) => {
    setPage(page);
    const response = await getUserQnaList(user.userId, page);
    const userQnaData = response.data;
    setUserQnaList(userQnaData);
  };

  // 페이지 경로에서 정보 따오기
  const location = useLocation();
  const nowLoca = location.pathname.substring(17);

  return (
    <Div>
      <MyPageSidebar />
      <div className="myUserQnaMain">
        <MyPageTab onClickMenu={nowLoca} />
        <div className="contentZone">
          <h1 id="headText">유저간 질문 목록</h1>
          <table className="myUserQnaList">
            <thead>
              <tr>
                <th className="th1">제목</th>
                <th className="th1">내용</th>
                <th>답변 여부</th>
                <th>작성일</th>
              </tr>
            </thead>
            <tbody>
              {userQnaList?.map((userQna) => (
                <tr key={userQna.userQuestionBoardCode}>
                  <td>
                    <a
                      href={
                        `/compagno/userQna/detail/` +
                        userQna.userQuestionBoardCode
                      }
                    >
                      {userQna.userQuestionBoardTitle}
                    </a>
                  </td>
                  <td>{userQna.userQuestionBoardContent}</td>
                  <td>{userQna.userQuestionBoardStatus === "N" ? "X" : "O"}</td>
                  <td>
                    {userQna.userQuestionBoardDate !== null ? (
                      <>
                        {moment(userQna.userQuestionBoardDate).format(
                          "YYYY-MM-DD hh:mm"
                        )}
                      </>
                    ) : (
                      <>
                        {moment(userQna.userQuestionBoardDateUpdate).format(
                          "YYYY-MM-DD hh:mm"
                        )}
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Paging page={page} count={userQnaCount} setPage={handlePageChange} />
        </div>
      </div>
    </Div>
  );
};

export default MyPageUserQna;

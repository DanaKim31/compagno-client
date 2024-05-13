import styled from "styled-components";
import MyPageSidebar from "../../components/user/MyPageSidebar";
import MyPageTab from "../../components/user/MyPageTab";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserQnaList, getUserQnaCount } from "../../api/user";
import useDidMountEffect from "../../assets/useDidMountEffect";
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

  .myUserQnaMain {
    width: calc(100vw - 300px);
    display: flex;
    flex-direction: column;
    padding-top: 20px;

    .contentZone {
      height: calc(100vh - 66px);
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;

      .myUserQnaList {
        thead th {
          background-color: rgb(85, 96, 143);
          width: 200px;
          height: 50px;
          text-align: left;
          line-height: 50px;
          color: white;
        }

        tbody {
          background: linear-gradient(45deg, #49a09d, #5f2c82);
          color: white;
          height: 50px;
          text-align: left;
          line-height: 50px;
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

  const [userQnaList, setUserQnaList] = useState([]);
  const [page, setPage] = useState(1);
  const [userQnaCount, setUserQnaCount] = useState(0);

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

  return (
    <Div>
      <MyPageSidebar />
      <div className="myUserQnaMain">
        <MyPageTab />
        <div className="contentZone">
          <table className="myUserQnaList">
            <thead>
              <tr>
                <th>제목</th>
                <th>답변 여부</th>
                <th>뭐넣지 여기에</th>
                <th>작성일</th>
              </tr>
            </thead>
            <tbody>
              {userQnaList?.map((userQna) => (
                <tr key={userQna.userQuestionBoardCode}>
                  <td>{userQna.userQuestionBoardTitle}</td>
                  <td>{userQna.userQuestionBoardStatus}</td>
                  <td>뭐넣지...</td>
                  <td>{userQna.userQuestionBoardDate}</td>
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

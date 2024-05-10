import MyPageSidebar from "../../components/user/MyPageSidebar";
import styled from "styled-components";
import MyPageTab from "../../components/user/MyPageTab";
import {
  getMyQnaList,
  getMyQnaCount,
  getManageQnaList,
  getManageQnaCount,
} from "../../api/user";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Paging from "../../components/user/MyPagePagination";
import useDidMountEffect from "../../components/user/useDidMountEffect";

const Div = styled.div`
  display: flex;
  height: 100vh;
  padding-top: 112px;

  .myQnaMain {
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

      .myQnaList {
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

const MyPageMyQnA = () => {
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

  useDidMountEffect(() => {
    qnaAPI();
  }, [user]);

  // ----------------------------------- 일반유저 관련 -----------------------------------
  // 질문 목록과 페이징 기초값 세팅
  // 페이징에 사용할 총 질문 갯수 가져오기
  const [qnaList, setQnaList] = useState([]);
  const [page, setPage] = useState(1);
  const [qnaCount, setQnaCount] = useState(0);

  // 페이지 변경
  const handlePageChange = async (page) => {
    if (user.userRole == "ROLE_USER") {
      setPage(page);
      const response = await getMyQnaList(user.userId, page);
      const qnaData = response.data;
      setQnaList(qnaData);
    } else if (user.userRole == "ROLE_ADMIN") {
      setManagePage(page);
      const mResponse = await getManageQnaList(page);
      const mQnaData = mResponse.data;
      setManageQnaList(mQnaData);
    }
  };

  // 질문 목록 + 질문 갯수 불러오기
  const qnaAPI = async () => {
    if (user.userRole == "ROLE_USER") {
      // 일반 유저일때
      const response = await getMyQnaList(user.userId, page);
      const qnaData = response.data;

      const countResponse = await getMyQnaCount(user.userId);
      const countQnaData = countResponse.data;

      setQnaList(qnaData);
      setQnaCount(countQnaData);
      console.log(qnaData);
    } else if (user.userRole == "ROLE_ADMIN") {
      // 매니저일때
      const mResponse = await getManageQnaList(page);
      const mQnaData = mResponse.data;
      const countMResponse = await getManageQnaCount();
      const countMQnaData = countMResponse.data;

      setManageQnaList(mQnaData);
      setManageQnaCount(countMQnaData);
      console.log(mQnaData);
    }
  };
  // -----------------------------------------------------------------------------------

  // ----------------------------------- 매니저 관련 ------------------------------------
  // 매니저 질문 목록과 페이징 기초값 세팅
  // 페이징에 사용할 총 질문 갯수 가져오기
  const [manageQnaList, setManageQnaList] = useState([]);
  const [managePage, setManagePage] = useState(0);
  const [manageQnaCount, setManageQnaCount] = useState(0);

  // -----------------------------------------------------------------------------------

  return (
    <Div>
      <MyPageSidebar />
      <div className="myQnaMain">
        <MyPageTab />
        <div className="contentZone">
          {user.userRole == "ROLE_USER" ? (
            <>
              <table className="myQnaList">
                <thead>
                  <tr>
                    <th>제목</th>
                    <th>작성자</th>
                    <th>작성일</th>
                    <th>답변 여부</th>
                  </tr>
                </thead>
                <tbody>
                  {qnaList?.map((qna) => (
                    <tr key={qna.qnaQCode}>
                      <td>{qna.qnaQTitle}</td>
                      <td>{qna.userNickname}</td>
                      <td>{qna.qnaQDate}</td>
                      <td>{qna.qnaQStatus}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Paging page={page} count={qnaCount} setPage={handlePageChange} />
            </>
          ) : (
            <>
              <table className="myQnaList">
                <thead>
                  <tr>
                    <th>제목</th>
                    <th>작성자</th>
                    <th>작성일</th>
                    <th>답변 여부</th>
                  </tr>
                </thead>
                <tbody>
                  {manageQnaList?.map((mQna) => (
                    <tr key={mQna.qnaQCode}>
                      <td>{mQna.qnaQTitle}</td>
                      <td>{mQna.userNickname}</td>
                      <td>{mQna.qnaQDate}</td>
                      <td>{mQna.qnaQStatus}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Paging
                page={managePage}
                count={manageQnaCount}
                setPage={handlePageChange}
              />
            </>
          )}
        </div>
      </div>
    </Div>
  );
};

export default MyPageMyQnA;

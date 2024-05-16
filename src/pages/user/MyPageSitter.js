import styled from "styled-components";
import MyPageSidebar from "../../components/user/MyPageSidebar";
import MyPageTab from "../../components/user/MyPageTab";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useDidMountEffect from "../../components/user/useDidMountEffect";
import moment from "moment";
import { useLocation } from "react-router-dom";
import { getSitterList, getSitterCount } from "../../api/user";
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

  .mySitterMain {
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
        width: 1100px;
        padding-bottom: 15px;
        font-weight: bold;
      }

      .mySitterList {
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

const MyPageSitter = () => {
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

  // 시터 게시글 초기값 설정
  const [sitterList, setSitterList] = useState([]);
  const [page, setPage] = useState(1);
  const [sitterCount, setSitterCount] = useState(0);

  // 시터 게시글 가져오기
  const sitterAPI = async () => {
    const response = await getSitterList(user.userId, page);
    const sitterData = response.data;
    setSitterList(sitterData);

    const countResponse = await getSitterCount(user.userId);
    const countSitterData = countResponse.data;
    setSitterCount(countSitterData);

    console.log(sitterData);
  };

  useDidMountEffect(() => {
    sitterAPI();
  }, [user]);

  // 페이지 변경
  const handlePageChange = async (page) => {
    setPage(page);
    const response = await getSitterList(user.userId, page);
    const sitterData = response.data;
    setSitterList(sitterData);
  };

  // 페이지 경로에서 정보 따오기
  const location = useLocation();
  const nowLoca = location.pathname.substring(17);
  return (
    <Div>
      <MyPageSidebar />
      <div className="mySitterMain">
        <MyPageTab onClickMenu={nowLoca} />
        <div className="contentZone">
          <h1 id="headText">펫 시터 작성 글 목록</h1>
          <table className="mySitterList">
            <thead>
              <tr>
                <th>구분</th>
                <th>반려동물</th>
                <th className="th1">제목</th>
                <th>지역</th>
                <th>작성일</th>
              </tr>
            </thead>
            <tbody>
              {sitterList?.map((sitter) => (
                <tr key={sitter.sitterBoardCode}>
                  <td>{sitter.sitterCategory.sitterCategoryType}</td>
                  <td>{sitter.animalCategoryCode.animalType}</td>
                  <td>
                    {" "}
                    <a
                      href={
                        `/compagno/sitterBoard/detail/` + sitter.sitterBoardCode
                      }
                    >
                      {sitter.sitterTitle}
                    </a>
                  </td>
                  <td>{sitter.location.locationName}</td>
                  <td>{moment(sitter.sitterRegiDate).format("YYYY-MM-DD")}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Paging page={page} count={sitterCount} setPage={handlePageChange} />
        </div>
      </div>
    </Div>
  );
};

export default MyPageSitter;

import styled from "styled-components";
import MyPageSidebar from "../../components/user/MyPageSidebar";
import MyPageTab from "../../components/user/MyPageTab";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import useDidMountEffect from "../../components/user/useDidMountEffect";
import Paging from "../../components/user/MyPagePagination";
import { getOnedayClass, getOnedayClassCount } from "../../api/user";
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

  .myOdcMain {
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

      .myOdcList {
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
        .th2 {
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

const MyPageOneday = () => {
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
    odcAPI();
  }, [user]);

  // 원데이클래스 기초값 세팅
  const [odcList, setOdcList] = useState([]);
  const [page, setPage] = useState(1);
  const [countOdc, setCountOdc] = useState(0);

  // 원데이클래스 불러오기
  const odcAPI = async () => {
    const response = await getOnedayClass(user.userId, page);
    const odcData = response.data;
    setOdcList(odcData);

    const countOdc = await getOnedayClassCount(user.userId);
    const countData = countOdc.data;
    setCountOdc(countData);
  };

  // 페이지 변경
  const handlePageChange = async (page) => {
    setPage(page);
    const response = await getOnedayClass(user.userId, page);
    const odcData = response.data;
    setOdcList(odcData);
  };

  // 페이지 경로에서 정보 따오기
  const location = useLocation();
  const nowLoca = location.pathname.substring(17);

  return (
    <Div>
      <MyPageSidebar />
      <div className="myOdcMain">
        <MyPageTab onClickMenu={nowLoca} />
        <div className="contentZone">
          <h1 id="headText">개설한 원데이 클래스 목록</h1>
          <table className="myOdcList">
            <thead>
              <tr>
                <th className="th1">제목</th>
                <th className="th2">기간</th>
                <th>동물 동반 여부</th>
                <th>등록일</th>
              </tr>
            </thead>
            <tbody>
              {odcList?.map((odc) => (
                <tr key={odc.odcCode}>
                  <td>
                    <a
                      href={`/compagno/onedayClassBoard/detail/` + odc.odcCode}
                    >
                      {odc.odcTitle}
                    </a>
                  </td>
                  <td>
                    {moment(odc.odcStartDate).format("YYYY-MM-DD")} ~{" "}
                    {moment(odc.odcLastDate).format("YYYY-MM-DD")}
                  </td>
                  <td>{odc.odcAccompaying === "N" ? "X" : "O"}</td>
                  <td>{moment(odc.odcRegiDate).format("YYYY-MM-DD")}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Paging page={page} count={countOdc} setPage={handlePageChange} />
        </div>
      </div>
    </Div>
  );
};

export default MyPageOneday;

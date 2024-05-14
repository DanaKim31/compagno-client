import styled from "styled-components";
import MyPageSidebar from "../../components/user/MyPageSidebar";
import MyPageTab from "../../components/user/MyPageTab";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import useDidMountEffect from "../../components/user/useDidMountEffect";
import Paging from "../../components/user/MyPagePagination";
import { getOnedayClass, getOnedayClassCount } from "../../api/user";

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
      width: 100%;
      height: calc(100vh - 66px);
      display: flex;

      align-items: center;
      flex-direction: column;

      .myOdcList {
        thead th {
          background-color: rgb(85, 96, 143);
          width: 250px;
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

    console.log(odcData);
    console.log(countData);
  };

  // 페이지 변경
  const handlePageChange = async (page) => {
    setPage(page);
    const response = await getOnedayClass(user.userId, page);
    const odcData = response.data;
    setOdcList(odcData);
  };

  return (
    <Div>
      <MyPageSidebar />
      <div className="myOdcMain">
        <MyPageTab />
        <div className="contentZone">
          <table className="myOdcList">
            <thead>
              <tr>
                <th>제목</th>
                <th>기간</th>
                <th>동물 동반 여부</th>
                <th>등록일</th>
              </tr>
            </thead>
            <tbody>
              {odcList?.map((odc) => (
                <tr key={odc.odcCode}>
                  <td>{odc.odcTitle}</td>
                  <td>
                    {moment(odc.odcStartDate).format("YYYY-MM-DD")} ~{" "}
                    {moment(odc.odcLastDate).format("YYYY-MM-DD")}
                  </td>
                  <td>{odc.odcAccompaying}</td>
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

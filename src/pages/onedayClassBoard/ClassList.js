import styled from "styled-components";
import { viewAllClass } from "../../api/onedayClass";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import Pagination from "../../components/ClassBoard/Pagination";

const StyledDiv = styled.div`
  background-color: rgb(244, 244, 244);
  width: 100%;
  margin: auto;
  text-align: center;
  position: relative;
  top: 94px;
  font-weight: bold;

  @font-face {
    font-family: "TAEBAEKmilkyway";
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2310@1.0/TAEBAEKmilkyway.woff2")
      format("woff2");
    font-weight: normal;
    font-style: normal;
  }

  * {
    font-family: "TAEBAEKmilkyway";
    font-size: 1rem;
  }

  button {
    border-radius: 5px;
    border: 2px solid;
    color: rgb(32, 61, 59);
    text-decoration: none;
    padding: 10px;
    font-size: 1rem;
    font-weight: bold;
    /* display: flex; */
    justify-content: center;
    position: relative;
    left: 43%;
    bottom: 56px;
  }

  button:hover {
    background-color: rgb(32, 61, 59);
    color: white;
  }
  img {
    object-fit: cover;
    width: 50%;
    height: 300px;
    border-radius: 25px;
  }

  h1 {
    font-size: 3.5rem;
    font-weight: blod;
    padding-top: 83px;
  }

  .viewAll {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 65px;
  }

  .oneClass {
    display: flex;
    box-sizing: border-box;
    border: 1px solid;
    border-radius: 25px;
    width: 91%;
    cursor: pointer;
    left: 41px;
    position: relative;
  }

  .info {
    display: inline-grid;
    width: 100%;
  }

  // =================

  .title {
    position: relative;
    left: 8px;
    top: 54px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: justify;
  }

  .Accompaying {
    position: relative;
    bottom: 83px;
    left: 272px;
    width: 137px;
  }

  .regidate {
    position: relative;
    bottom: 133px;
    right: 14px;
  }

  .Content {
    position: relative;
    left: 8px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    top: 43px;
    width: 398px;
    text-align: justify;
  }
`;

// 원데이 클래스 리스트 페이지 !!  ==> 전체 조회 viewAllClass
const ClassList = () => {
  const navigate = useNavigate();
  const [onedayClasses, setOnedayClasses] = useState([]); // 내가 가저올 원데이 클래스 리스트들 관련 변수랑 함수
  const [page, setPage] = useState(1); // 페이지 카운트 관련 !!
  const [ClassBoardCount, setClassBoardCount] = useState(0); // 초기값 0

  //   ======== 비동기처리로된 원데이 클래스 리스트 정보 =======
  const onedayClassAPI = async () => {
    const result = await viewAllClass();
    setOnedayClasses(result.data);
    console.log(result.data);
  };

  useEffect(() => {
    onedayClassAPI();
  }, []);

  const Detail = () => {
    navigate("/compagno/onedayClassBoard/detail");
  };

  const handlePageChange = async (page) => {
    await setPage(page);
    const response = await viewAllClass();
    // set;
  };

  const list = () => {
    navigate("/compagno/onedayClassBoard");
  };

  const create = () => {
    navigate("/compagno/onedayClassBoard/create");
  };

  //  ================================================== Pagination

  return (
    <StyledDiv>
      <div>
        <h1>원데이 클래스</h1>
        <div className="button">
          {/* <button onClick={list}>클래스 목록</button> */}
          <button onClick={create}>원데이 클래스 나도 추가</button>
        </div>
        <div className="viewAll">
          {onedayClasses.map((onedayClass) => (
            <div
              key={onedayClass.odcCode}
              className="oneClass"
              onClick={() => Detail()}
            >
              <div id="photo" style={{ width: "100%", height: "300px" }}>
                {onedayClass.images?.map((image) => (
                  <img
                    style={{ width: "100%", height: "100%" }}
                    src={image.odcMainImage?.replace(
                      "\\\\DESKTOP-U0CNG13\\upload\\ClassBoard",
                      "http://192.168.10.28:8081/ClassBoard"
                    )}
                  />
                ))}
              </div>
              <div className="info">
                {/* 나머지 클래스 정보 */}
                <div className="title">제목 : {onedayClass.odcTitle}</div>
                <div className="Content">내용 : {onedayClass.odcContent}</div>
                <div className="Accompaying">
                  동반 가능 여부 : {onedayClass.odcAccompaying}
                </div>
                <div className="regidate">
                  등록 날짜 :{" "}
                  {moment(onedayClass.odcRegiDate).format("YY-MM-DD")}
                </div>

                <div className="startdate">
                  클래스 시작 날짜 :
                  {moment(onedayClass.odcStartDate).format("YY-MM-DD")}
                </div>
                <div className="lastdate">
                  클래스 마지막 날짜 :
                  {moment(onedayClass.odcLastDate).format("YY-MM-DD")}
                </div>
              </div>
            </div>
          ))}
        </div>
        <Pagination
          page={page}
          count={onedayClasses}
          setPage={handlePageChange}
        />
      </div>
    </StyledDiv>
  );
};

export default ClassList;

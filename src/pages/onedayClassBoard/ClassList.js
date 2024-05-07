import styled from "styled-components";
import { viewAllClass } from "../../api/onedayClass";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const StyledDiv = styled.div`
  width: 100%;
  margin: auto;
  text-align: center;
  position: fixed;
  top: 78px;
  h1 {
    font-size: 2.5rem;
    font-weight: blod;
    margin-top: 30px;
  }
  table {
    width: 100%;
    margin-top: 30px;
    th {
      width: 5%;
      font-weight: bold;
    }
    td {
      padding-top: 20px;
    }
  }
  a {
    text-decoration: none;
    color: black;
    margin: 50px;
    margin-top: 20px;
    margin-bottom: 20px;
  }
`;

// 원데이 클래스 리스트 페이지 !!  ==> 전체 조회 viewAllClass
const ClassList = () => {
  const navigate = useNavigate();
  const [onedayClasses, setOnedayClasses] = useState([]); // 내가 가저올 원데이 클래스 리스트들 관련 변수랑 함수

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

  //  =======================================================

  return (
    <StyledDiv>
      <h1>원데이 클래스</h1>
      <a href="/compagno/onedayClassBoard">클래스 목록</a>
      <a href="/compagno/onedayClassBoard/create">원데이 클래스 나도 추가</a>

      {/* <div id="imageBox">
        <img
          id="mainImage"
          // src={lost.lostAnimalImage?.replace(
          //   "C:",
          //   "http://localhost:8081"
          // )}
          src={lost.lostAnimalImage?.replace(
            "\\\\DESKTOP-U0CNG13\\upload\\lostBoard",
            "http://192.168.10.28:8081/lostBoard/"
          )}
        />
      </div> */}

      <th>원데이클래스 메인 이미지</th>
      <div className="oneClass" onClick={() => Detail()}>
        <div>
          {onedayClasses.map((onedayClass) => (
            <div key={onedayClass.odcCode}>
              {onedayClass.images?.map((image) => (
                // <img
                //   key={onedayClass.odcImageCode}
                //   src={"http://192.168.10.28:8081/" + image.odcMainImage}
                // ></img>

                <img
                  src={image.odcMainImage?.replace(
                    "///DESKTOP-U0CNG13/upload/ClassBoard/",
                    "http://http://192.168.10.28:8081/"
                  )}
                />
              ))}

              {/* 나머지 클래스 정보 */}
              <div className="title">제목: {onedayClass.odcTitle}</div>
              <div className="Content">
                간단한 내용: {onedayClass.odcContent}
              </div>
              <div className="Accompaying">
                동반 가능 여부: {onedayClass.odcAccompaying}
              </div>
              <div className="title">
                등록 날짜: {moment(onedayClass.odcRegiDate).format("YY-MM-DD")}
              </div>
              <div className="startDate">
                클래스 시작 날짜:
                {moment(onedayClass.odcStartDate).format("YY-MM-DD")}
              </div>
              <div className="lastDate">
                클래스 마지막 날짜:
                {moment(onedayClass.odcLastDate).format("YY-MM-DD")}
              </div>
            </div>
          ))}
        </div>
      </div>
    </StyledDiv>
  );
};

export default ClassList;

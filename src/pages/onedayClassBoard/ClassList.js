import styled from "styled-components";
import { viewAllClass } from "../../api/onedayClass";
import { useState, useEffect } from "react";

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

// 원데이 클래스 리스트 페이지 !!
const ClassList = () => {
  const [onedayClasses, setOnedayClasses] = useState([]); // 내가 가저올 원데이 클래스 리스트들 관련 변수랑 함수

  //   ======== 비동기처리로된 원데이 클래스 리스트 정보 =======
  const onedayClassAPI = async () => {
    const result = await viewAllClass();
    setOnedayClasses(result.data);
  };

  useEffect(() => {
    onedayClassAPI();
  }, []);

  //  =======================================================

  return (
    <StyledDiv>
      <h1>원데이 클래스</h1>
      <a href="/compagno/onedayClassBoard">클래스 목록</a>
      <a href="/compagno/onedayClassBoard/create">원데이 클래스 나도 추가</a>

      <th>원데이클래스 메인 이미지</th>

      {onedayClasses.map((onedayClass) => (
        <div key={onedayClass.odcCode} className="">
          <div className="title">제목 : {onedayClass.odcTitle}</div>
          <div className="Content">간단한 내용 : {onedayClass.odcContent}</div>
          <div className="Accompaying">
            동반가능여부 : {onedayClass.odcAccompaying}
          </div>
          <div className="title">등록 날짜 : {onedayClass.odcRegiDate}</div>
          <div className="startDate">
            클래스 시작 날짜:{onedayClass.odcStartDate}
          </div>
          <div className="lastDate">
            클래스 마지막 날짜 : {onedayClass.odcLastDate}
          </div>
          <div className="fileupload">파일 업로드: {}</div>
        </div>
      ))}
    </StyledDiv>
  );
};

export default ClassList;

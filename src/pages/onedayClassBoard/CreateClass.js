import styled from "styled-components";
import { useState } from "react";
import { addOnedayClass } from "../../api/onedayClass";
import { useNavigate } from "react-router-dom";
import SDatePicker from "react-datepicker";
const StyledDiv = styled.div`
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
    color: rgb(32, 61, 59);
  }

  text-align: center;
  background-color: rgb(244, 244, 244);
  font-weight: bold;
  padding-top: 147px;

  h1 {
    font-size: 2.5rem;
    font-weight: bold;
    margin-top: 30px;
    margin-bottom: 30px;
    position: relative;
    /* bottom: 346px; */
  }

  h2 {
  }

  input {
    width: 100%;
    height: 123px;
    margin: 5px;
    padding: 5px;
    box-sizing: border-box;
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
    left: 20%;
    bottom: 56px;
    width: 10%;
  }

  button:hover {
    background-color: rgb(32, 61, 59);
    color: white;
  }

  .textin h2 {
    position: relative;
    top: 71px;
    right: -29px;
    text-align: justify;
  }

  .text {
    position: relative;
    width: 62%;
    height: auto;
    right: 11%;
    top: 30px;
  }

  .content {
    position: relative;
  }

  .regisDate {
    position: relative;
    bottom: 335px;
    text-align: right;
    right: 50px;
  }

  .date {
    position: relative;
    width: 9%;
    height: 10%;
  }
`;

const StyledSec = styled.section`
  position: relative;
`;

// SDatePicker {
//   margin-top: 1.5rem;
//   width: 300px;
//   height: 42px;
//   box-sizing: border-box;
//   padding: 8px 20px;
//   border-radius: 4px;
//   border: 1px solid;
//   font-size: 12px;
// };

// 원데이 클래스 추가 페이지!!
const CreateClass = () => {
  const [odcTitle, setOdcTitle] = useState("");
  const [odcContent, setContent] = useState("");
  const [odcAccompaying, setOdcAccompaying] = useState("");
  const [odcMainImage, setOdcMainImage] = useState(null);
  const [odcStartDate, setOdcStartDate] = useState("");
  const [odcLastDate, setOdcLastDate] = useState("");

  const navigate = useNavigate();

  const onCreate = async () => {
    const formData = new FormData();
    formData.append("odcTitle", odcTitle);
    formData.append("odcContent", odcContent);
    formData.append("odcAccompaying", odcAccompaying);
    formData.append("file", odcMainImage);
    formData.append("odcStartDate", odcStartDate);
    formData.append("odcLastDate", odcLastDate);
    await addOnedayClass(formData);
    navigate("/compagno/onedayClassBoard");
  };

  const onBack = () => {
    navigate("/compagno/onedayClassBoard");
  };

  // ============================================================== 날짜
  // const [startDate, setStartDate] = useState(new Date());
  // const [endDate, setEndDate] = useState(new Date());

  // ========== OnCreate 함수에다가 비동기 처리된 클래스 추가관련 로직들 =============

  // const []

  // =======================================
  return (
    <div>
      <StyledDiv>
        <h1>원데이 클래스 등록</h1>
        <div className="textin">
          <h2>등록할 클래스 명</h2>
          <input
            type="text"
            placeholder="제목을 입력하세요"
            value={odcTitle}
            className="text"
            onChange={(e) => setOdcTitle(e.target.value)}
          />
        </div>
        <div>
          <h2>자세한 내용 관련</h2>
          <input
            type="text"
            placeholder="내용을 입력하세요"
            value={odcContent}
            className="content"
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        {/* 파일 업로드 */}
        <div>
          파일업로드{" "}
          <input
            type="file"
            // value={odcMainImage}
            className="file"
            onChange={(e) => setOdcMainImage(e.target.files[0])}
          />
        </div>

        <div className="regisDate">
          시작날짜
          <input
            type="date"
            value={odcStartDate}
            className="date"
            onChange={(e) => setOdcStartDate(e.target.value)}
          />
          종료날짜
          <input
            type="date"
            value={odcLastDate}
            className="date"
            onChange={(e) => setOdcLastDate(e.target.value)}
          />
        </div>

        <legend>동반 여부</legend>
        <label>
          Y
          <input
            type="checkbox"
            value="Y"
            className="Acom"
            onChange={(e) => setOdcAccompaying(e.target.value)}
          />
        </label>
        <label>
          N
          <input
            type="checkbox"
            value="N"
            className="Acom"
            onChange={(e) => setOdcAccompaying(e.target.value)}
          />
        </label>
        <button onClick={onCreate}>추가</button>
        <button onClick={onBack}>취소</button>
      </StyledDiv>
    </div>
  );
};

export default CreateClass;

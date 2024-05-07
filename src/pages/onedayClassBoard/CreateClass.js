import styled from "styled-components";
import { useState } from "react";
import { addOnedayClass } from "../../api/onedayClass";
import { useNavigate } from "react-router-dom";
import SDatePicker from "react-datepicker";
const StyledDiv = styled.div`
  width: 100%;
  top: 25%;
  margin: auto;
  text-align: center;
  position: fixed;
  h1 {
    font-size: 2.5rem;
    font-weight: bold;
    margin-top: 30px;
    margin-bottom: 30px;
  }
  input {
    width: 100%;
    margin: 5px;
    padding: 5px;
    box-sizing: border-box;
  }

  button {
    width: 100%;
    margin: 5px;
    cursor: pointer;
    background-color: black;
    color: white;
    font-weight: bold;
    padding: 10px;
  }

  section {
    position: relative;
    top: 600px;
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
        <input
          type="text"
          placeholder="제목을 입력하세요"
          value={odcTitle}
          onChange={(e) => setOdcTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="내용을 입력하세요"
          value={odcContent}
          onChange={(e) => setContent(e.target.value)}
        />
        {/* 파일 업로드 */}
        <input
          type="file"
          // value={odcMainImage}
          onChange={(e) => setOdcMainImage(e.target.files[0])}
        />
        <h1>원데이클래스 관련 날짜</h1>
        <label>시작날짜</label>
        <input
          type="date"
          value={odcStartDate}
          onChange={(e) => setOdcStartDate(e.target.value)}
        />
        <label>종료날짜</label>
        <input
          type="date"
          value={odcLastDate}
          onChange={(e) => setOdcLastDate(e.target.value)}
        />
        <legend>동반 여부</legend>
        <label>
          Y
          <input
            type="checkbox"
            value="Y"
            onChange={(e) => setOdcAccompaying(e.target.value)}
          />
        </label>
        <label>
          N
          <input
            type="checkbox"
            value="N"
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

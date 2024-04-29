import styled from "styled-components";
import { useState } from "react";
import { addOnedayClass } from "../../api/onedayClass";
import { useNavigate } from "react-router-dom";

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
`;
// 원데이 클래스 추가 페이지!!
const CreateClass = () => {
  const [odcTitle, setOdcTitle] = useState("");
  const [odcContent, setContent] = useState("");
  const [odcAccompaying, setOdcAccompaying] = useState("");

  // ========== OnCreate 함수에다가 비동기 처리된 클래스 추가관련 로직들 =============

  const navigate = useNavigate();

  const onCreate = async () => {
    await addOnedayClass({ odcTitle, odcContent, odcAccompaying });
    navigate("onedayClassBoard");
  };
  // =======================================
  return (
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
      <legend>동반 여부</legend>
      <label>
        Y
        <input
          type="checkbox"
          value={odcAccompaying}
          onChange={(e) => setOdcAccompaying(e.target.value)}
        />
      </label>
      <label>
        N
        <input
          type="checkbox"
          value={odcAccompaying}
          onChange={(e) => setOdcAccompaying(e.target.value)}
        />
      </label>

      <button onClick={onCreate}>추가</button>
    </StyledDiv>
  );
};

export default CreateClass;

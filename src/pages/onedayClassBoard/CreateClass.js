import styled from "styled-components";
import { useEffect, useState } from "react";
import { addOnedayClass } from "../../api/onedayClass";
import { useNavigate } from "react-router-dom";
import { userSave } from "../../store/user";
import { useSelector, useDispatch } from "react-redux";

const StyledDiv = styled.div`
  text-align: center;
  background-color: rgb(244, 244, 244);
  font-weight: bold;
  padding-top: 147px;

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
    font-weight: bold;
  }

  h1 {
    font-size: 2.5rem;
    font-weight: bold;
    margin-top: 50px;
    margin-bottom: 118px;
    position: relative;
  }

  h2 {
    font-weight: bold;
    margin-right: 15px;
  }

  input {
    height: 49px;
    padding: 10px;
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
    justify-content: center;
    position: relative;
    left: 26.6%;
    width: 80px;
    position: relative;
    bottom: 89px;
  }

  button:hover {
    background-color: rgb(32, 61, 59);
    color: white;
  }

  .create {
    position: relative;
    right: 56px;
    bottom: 40px;
    padding-top: 37px;
  }

  .textin {
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
    right: 192px;
  }

  .text {
    position: relative;
    width: 30%;
    height: auto;
  }

  .contentin {
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
    padding-top: 60px;
    left: 322px;
    width: 72%;
    bottom: 88px;
  }

  .content1 {
    position: relative;
    height: 250px;
    width: 77%;
  }

  .uploadin {
    position: relative;
    width: 69%;
  }
  .file {
    position: relative;
    left: 20px;
  }

  .regisDate {
    position: relative;
    bottom: 49px;
    text-align: right;
    display: flex;
    width: 467px;
    left: 1157px;
  }

  .date {
    position: relative;
    display: flex;
    padding-left: 17px;
    justify-content: end;
    align-items: center;
  }

  .Accin {
    width: 206px;
    position: relative;
    bottom: 176px;
    left: 1385px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    label {
      display: inherit;
    }
  }
`;

// 원데이 클래스 추가 페이지!!
const CreateClass = () => {
  const navigate = useNavigate();
  // 유저 정보
  const dispatch = useDispatch();
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

  //
  const [odcTitle, setOdcTitle] = useState("");
  const [odcContent, setContent] = useState("");
  const [odcAccompaying, setOdcAccompaying] = useState("");
  const [odcMainImage, setOdcMainImage] = useState(null);
  const [odcStartDate, setOdcStartDate] = useState("");
  const [odcLastDate, setOdcLastDate] = useState("");

  const onCreate = async () => {
    const formData = new FormData();
    formData.append("userId", user.userId);
    formData.append("odcTitle", odcTitle);
    formData.append("odcContent", odcContent);
    formData.append("odcAccompaying", odcAccompaying);
    formData.append("file", odcMainImage);
    formData.append("odcStartDate", odcStartDate);
    formData.append("odcLastDate", odcLastDate);

    if (odcTitle == "" || odcTitle == undefined) {
      alert("등록할 클래스명을 적어주세요");
    } else if (odcTitle.length > 30) {
      alert("30자 내외로 작성 바랍니다");
    } else if (odcContent == "" || odcContent == undefined) {
      alert("자세한 클래스 내용을 적어주세요");
    } else if (odcStartDate == "" || odcStartDate == undefined) {
      alert("시작 날짜를 정해주세요");
    } else if (odcLastDate == "" || odcLastDate == undefined) {
      alert("마지막 날짜를 정해주세요");
    } else if (odcAccompaying == "" || odcAccompaying == undefined) {
      alert("동반여부에 관련 체크를 정해주세요");
    } else if (odcMainImage == "" || odcMainImage == undefined) {
      alert("클래스관련 메인 이미지를 1개 택해주세요");
    } else {
      await addOnedayClass(formData);
      navigate("/compagno/onedayClassBoard");
    }
  };

  const onBack = () => {
    navigate("/compagno/onedayClassBoard");
  };
  console.log(user);
  return (
    <div>
      <StyledDiv>
        <h1>원데이 클래스 등록</h1>
        <div className="create">
          <div className="textin">
            <h2>등록할 클래스 명</h2>
            <input
              type="text"
              placeholder="제목을 입력하세요"
              value={odcTitle}
              className="text"
              maxLength={35}
              onChange={(e) => setOdcTitle(e.target.value)}
            />
          </div>
          <div className="regisDate">
            <div className="date">
              시작날짜
              <input
                type="date"
                value={odcStartDate}
                min={odcStartDate}
                onChange={(e) => setOdcStartDate(e.target.value)}
              />
            </div>
            <div className="date">
              종료날짜
              <input
                type="date"
                value={odcLastDate}
                onChange={(e) => setOdcLastDate(e.target.value)}
              />
            </div>
          </div>
          <div className="Accin">
            <h2>동반 여부</h2>
            <label>
              Y
              <input
                type="radio"
                value="Y"
                className="Acom"
                name="Acc"
                onChange={(e) => setOdcAccompaying(e.target.value)}
              />
            </label>
            <label>
              N
              <input
                type="radio"
                value="N"
                className="Acom"
                name="Acc"
                onChange={(e) => setOdcAccompaying(e.target.value)}
              />
            </label>
          </div>
          <div className="contentin">
            <h2>자세한 내용 관련</h2>
            <textarea
              type="text"
              placeholder="내용을 입력하세요"
              value={odcContent}
              className="content1"
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <div className="setup">
            <div className="uploadin">
              파일업로드{" "}
              <input
                type="file"
                className="file"
                onChange={(e) => setOdcMainImage(e.target.files[0])}
              />
            </div>
          </div>
        </div>
        <button onClick={onCreate}>추가</button>
        <button onClick={onBack}>취소</button>
      </StyledDiv>
    </div>
  );
};

export default CreateClass;

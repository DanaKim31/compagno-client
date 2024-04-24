import { viewAllLostBoard } from "../../api/lostBoard";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userSave } from "../../store/user";
import moment from "moment";

const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  position: relative;
  top: 180px;
  .contentHeader {
    width: 75%;
    display: flex;
    justify-content: space-between;
  }

  h2 {
    font-size: 3rem;
    margin-bottom: 50px;
  }
  .addBtn {
    width: 90px;
    height: 35px;
    font-size: 0.8rem;
  }
  .contents {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-row-gap: 20px;
    width: 80%;

    .regiDate {
      display: flex;
      justify-content: right;
      margin-right: 30px;
    }
    .contentDetail {
      border: 1px solid gray;
      height: 250px;
      margin: 20px;
      h4 {
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        border-bottom: 1px dashed green;
        height: 40px;
      }
      .text {
        height: 77%;
        border-top: 1px dashed green;
        display: flex;
        align-items: center;
      }
    }
    .contentDetail:hover {
      background-color: yellow;
      cursor: pointer;
    }
  }
`;

const ViewAllLostBoard = () => {
  // 유저정보 가지고온다
  const dispatch = useDispatch();
  const user = useSelector((state) => {
    return state.user;
  });
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== null) {
      dispatch(userSave(JSON.parse(localStorage.getItem("user"))));
    }
  }, []);

  // 전체 정보 불러오기
  const [losts, setLosts] = useState([]);
  const lostAPI = async () => {
    const response = await viewAllLostBoard();
    setLosts(response.data);
  };

  useEffect(() => {
    lostAPI();
  }, []);

  // 입력 날짜 형식 변경
  const lostAll = Array.from(losts);
  const [formatRegiDates, setFormatRegiDates] = useState([]);
  const regiDateRender = () => {
    for (let i = 0; i < lostAll.length; i++) {
      // console.log(lostAll[i].lostRegiDate);
      const regiDate = lostAll[i].lostRegiDate;

      const formattedRegiDate = moment(regiDate).format("YY-MM-DD");

      setFormatRegiDates(formattedRegiDate);
    }
  };

  // 분실 날짜 형식 변경
  const [formatLostDates, setFormatLostDates] = useState([]);
  const lostDateRender = () => {
    for (let i = 0; i < lostAll.length; i++) {
      const date = lostAll[i].lostDate;
      const formattedDate = moment(date).format("YY-MM-DD");
      setFormatLostDates(formattedDate);
    }
  };
  useEffect(() => {
    regiDateRender();
    lostDateRender();
  });

  const navigate = useNavigate();
  const onCreate = async () => {
    navigate("/compagno/lostBoard/create");
  };

  const view = (code) => {
    navigate("/compagno/lostBoard/view/" + code);
  };

  return (
    <>
      <Div>
        <div className="contentHeader">
          <h2>동물 신고 게시판</h2>
          <button className="addBtn" onClick={onCreate}>
            게시글 작성
          </button>
        </div>
        <div className="contents">
          {losts.map((lost) => (
            <div key={lost.lostBoardCode}>
              {/* <div className="regiDate">{formatRegiDates}</div> */}
              <div className="regiDate">{lost.lostRegiDate}</div>
              <div
                className="contentDetail"
                onClick={() => view(lost.lostBoardCode)}
              >
                <h4>{lost.lostAnimalName}</h4>
                이미지 :{lost.lostAnimalImage}
                {/* <img
                  src={lost.lostAnimalImage?.replace("file", "localhost:3030")}
                /> */}
                <div className="text">
                  신고자 닉네임 : {lost.userNickname}
                  <br />
                  실종 동물 품종 : {lost.lostAnimalKind}
                  <br />
                  성별 : {lost.lostAnimalGender}
                  <br />
                  실종일 : {lost.lostDate}
                  실종일 : {formatLostDates}
                  <br />
                  실종지역 : {lost.lostLocation}
                  <br />
                  실종 동물 특징 : {lost.lostAnimalFeature}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Div>
    </>
  );
};
export default ViewAllLostBoard;

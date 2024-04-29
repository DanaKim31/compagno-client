import { viewAllLostBoard, viewAllPaging } from "../../api/lostBoard";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userSave } from "../../store/user";
import moment from "moment";
import "moment/locale/ko";
import {
  FaAngleLeft,
  FaAnglesLeft,
  FaAngleRight,
  FaAnglesRight,
} from "react-icons/fa6";

const Div = styled.div`
  @font-face {
    font-family: "TAEBAEKmilkyway";
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2310@1.0/TAEBAEKmilkyway.woff2")
      format("woff2");
    font-weight: normal;
    font-style: normal;
  }
  font-family: "TAEBAEKmilkyway";
  font-weight: bold;
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
    font-weight: bold;
  }
  .addBtn {
    width: 90px;
    height: 35px;
    font-size: 0.8rem;
    font-family: "TAEBAEKmilkyway";
    font-weight: bold;
  }
  .contentsBody {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-row-gap: 20px;
    width: 80%;

    #mainImage {
      width: 100%;
      height: 50%;
    }
    #regiDate {
      display: flex;
      justify-content: right;
      position: absolute;
      top: 187px;
      padding: 3px;
      border: 1px solid black;
      border-radius: 13px;
      width: 75px;
      background-color: palegreen;
      border: 1px dashed black;
    }
    .contentDetail {
      height: 85%;
      margin: 20px;

      #animalName {
        font-weight: bold;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        border-bottom: 1px dashed green;
        border-top: 1px dashed green;
        height: 40px;
      }
      .text {
        height: 30%;
        border-top: 1px dashed green;
        display: flex;
        align-items: center;
        margin-top: 10px;
      }
    }
    .contentDetail:hover {
      background-color: yellow;
      cursor: pointer;
    }
  }
  .paging {
    margin-bottom: 100px;
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
  const [page, setPage] = useState("1");

  const lostAPI = async () => {
    let response = "";
    if (page !== 1) {
      response = await viewAllLostBoard(page);
    } else {
      response = await viewAllLostBoard(1);
    }
    setLosts(response.data);
  };

  useEffect(() => {
    lostAPI();
  }, [page]);

  const pageNumber = [1, 2, 3, 4, 5];

  const navigate = useNavigate();
  const onCreate = async () => {
    if (Object.keys(user).length !== 0) {
      navigate("/compagno/lostBoard/create");
    } else {
      navigate("/compagno/login");
    }
  };

  const view = (code) => {
    navigate("/compagno/lostBoard/view/" + code);
  };

  return (
    <Div>
      <div className="contentHeader">
        <h2>동물 신고 게시판</h2>
        <button className="addBtn" onClick={onCreate}>
          게시글 작성
        </button>
      </div>
      <div className="contentsBody">
        {losts.map((lost) => (
          <div key={lost.lostBoardCode}>
            <div
              className="contentDetail"
              onClick={() => view(lost.lostBoardCode)}
            >
              <h4 id="animalName">{lost.lostAnimalName}</h4>
              <img
                id="mainImage"
                src={lost.lostAnimalImage?.replace(
                  "\\\\DESKTOP-U0CNG13\\upload\\lostBoard",
                  "http://192.168.10.28:8081/lostBoard/"
                )}
              />

              <div id="regiDate">
                {moment(lost.regiDate).format("YY-MM-DD")}
              </div>
              <div className="text">
                신고자 닉네임 : {lost.userNickname}
                <br />
                실종 동물 품종 : {lost.lostAnimalKind}
                <br />
                성별 : {lost.lostAnimalGender}
                <br />
                실종일 :{moment(lost.lostDate).format("YY-MM-DD")}
                <br />
                실종지역 : {lost.lostLocation}
                <br />
                실종 동물 특징 : {lost.lostAnimalFeature}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="paging">
        <FaAnglesLeft />
        <FaAngleLeft value="1" onClick={(e) => setPage(e.target.value)} />
        {pageNumber.map((num, index) => (
          <button
            key={index}
            value={num}
            onClick={(e) => setPage(e.target.value)}
          >
            {num}
          </button>
        ))}

        <FaAngleRight />
        <FaAnglesRight />
      </div>
    </Div>
  );
};
export default ViewAllLostBoard;

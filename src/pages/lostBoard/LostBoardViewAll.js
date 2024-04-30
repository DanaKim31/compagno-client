import { viewAllLostBoard, viewAllPaging } from "../../api/lostBoard";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userSave } from "../../store/user";
import moment from "moment";
import "moment/locale/ko";
import Pagination from "react-js-pagination";
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

  const [losts, setLosts] = useState([]); // 전체 정보 불러오기
  const [page, setPage] = useState(1); // 현재 페이지
  const [totalPage, setTotalPage] = useState(0); // 전체 총 페이지
  const [prev, setPrev] = useState(false); // 앞으로 한칸 버튼
  const [next, setNext] = useState(false); // 뒤로 한칸 버튼
  const [pages, setPages] = useState([]); // 페이지들

  // 페이지 변경될 때마다 호출!
  const lostAPI = async () => {
    const response = await viewAllLostBoard(page);
    setLosts(response.data.content);
    setTotalPage(response.data.totalPages); // response에서 totalPages 불러와서 set으로 담기
  };

  // 첫페이지, 마지막 페이지, 페이지 리스트 초기 셋팅
  let lastPage = 0;
  let firstPage = 0;
  let pageList = [];

  // 페이지가 변할 때마다 lostAPI() 실행
  useEffect(() => {
    lostAPI();
  }, [page]);

  // totalPage가 바뀔 때 마다 실행
  useEffect(() => {
    lastPage = Math.ceil(page / 5) * 5; // 나는 한 화면에 1~5, 6~10 등 5개로 나뉘어서 보이기 때문에 5로 설정
    firstPage = lastPage - 4;

    if (totalPage < lastPage) {
      lastPage = totalPage; // 전체 페이지가 마지막 페이지보다 작은 경우엔 전체 페이지 수가 마지막 페이지 수랑 같음
    }
    setPrev(firstPage > 1);
    setNext(lastPage < totalPage);
    for (let i = firstPage; i <= lastPage; i++) {
      pageList.push(i); // 처음 i는 firstPage, 범위는 lastPage로 반복문 돌려서 i값을 넣은 list 만들기
    }
    setPages(pageList); // 해당 list 배열을 setPages에 담기
  }, [totalPage]);

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

  // 페이지 관련

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
              {/* <img
                id="mainImage"
                src={lost.lostAnimalImage?.replace(
                  "\\\\DESKTOP-U0CNG13\\upload\\lostBoard",
                  "http://192.168.10.28:8081/lostBoard/"
                )}
              /> */}
              <img
                id="mainImage"
                src={lost.lostAnimalImage?.replace(
                  "C:",
                  "http://localhost:8081"
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
        <FaAnglesLeft onClick={() => setPage(1)} />
        {/* 가장 첫 페이지로 */}
        <FaAngleLeft
          onClick={() => (page > 1 ? setPage(page - 1) : setPage(1))} // 현재 페이지에서 한칸 앞으로
        />
        {pages.map(
          (
            num,
            index // 배열 담은 pages를 map으로 만들어서 반복문 페이지번호 생성
          ) => (
            <button
              key={index}
              value={num}
              onClick={(e) => setPage(Number(e.target.value))}
            >
              {num}
            </button>
          )
        )}

        <FaAngleRight
          onClick={
            () => (page < totalPage ? setPage(page + 1) : setPage(totalPage)) // 현재 페이지에서 한칸 뒤로
          }
        />
        <FaAnglesRight onClick={() => setPage(totalPage)} />
        {/* 가장 마지막 페이지로 */}
      </div>
    </Div>
  );
};
export default ViewAllLostBoard;

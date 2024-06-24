import { viewAllLostBoard, viewCountLostBoard } from "../../api/lostBoard";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userSave } from "../../store/user";
import moment from "moment";
import "moment/locale/ko";
import { IoSearch } from "react-icons/io5";
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
  #searching {
    border: 1px solid black;
    width: 70%;
    height: 200px;
    border-radius: 30px;
    div {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 10px 20px;
      input {
        margin-left: 10px;
        font-weight: bold;
      }
      select {
        margin-left: 10px;
        font-weight: bold;
        option {
          font-weight: bold;
        }
      }
    }
    #searchBtn {
      height: 40px;
      button {
        width: 100px;
        border-radius: 10px;
        border: none;
        background-color: gray;
        color: white;
        height: 40px;
        span {
          margin-left: 10px;
          font-weight: bold;
        }
      }
      button:hover {
        background-color: #94b29b;
      }
    }
  }
  #contentsOption {
    margin-top: 18px;
    display: flex;
    width: 67%;
    justify-content: space-between;
    #allCount {
      display: flex;
      #num {
        color: green;
      }
    }
    #sorting {
      display: flex;
      justify-content: right;
      select {
        font-weight: bold;
        option {
          font-weight: bold;
        }
      }
    }
  }
  h2 {
    font-size: 2.5rem;
    margin-bottom: 50px;
    font-weight: bold;
  }
  .addBtn {
    font-weight: bold;
    border-radius: 15px;
    background-color: black;
    color: white;
    font-size: 0.8rem;
    width: 90px;
    height: 50px;
  }
  .addBtn:hover {
    background-color: #94b29b;
    border: none;
    color: black;
  }
  .contentsBody {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 540px 540px 540px;
    grid-row-gap: 20px;
    width: 67%;
    #imageBox {
      width: 100%;
      height: 50%;
      border: 0.2px solid gray;
    }
    #mainImage {
      width: 100%;
      height: 100%;
    }
    #regiDate {
      span {
        width: 75px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 0.9rem;
        margin-top: 10px;
      }
    }
    .contentDetail {
      height: 100%;
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
        height: 34%;
        border-top: 1px dashed black;
        border-bottom: 1px dashed green;
        display: flex;
        align-items: center;
        margin-top: 10px;
      }
    }
    .contentDetail:hover {
      background-color: #e9efeb;
      cursor: pointer;
    }
  }
  .paging {
    margin-bottom: 100px;
    button {
      font-weight: bold;
      width: 25px;
      height: 28px;
      border-radius: 5px;
      border: 1px solid gray;
      background-color: white;
      color: black;
      margin: 5px;
    }
    button:hover {
      background-color: rgb(32, 61, 59);
      color: white;
    }
    .iconPaging {
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

  // 페이징
  const [losts, setLosts] = useState([]); // 전체 정보 불러오기
  const [page, setPage] = useState(1); // 현재 페이지
  const [totalPage, setTotalPage] = useState(0); // 전체 총 페이지
  // const [prev, setPrev] = useState(false); // 앞으로 한칸 버튼
  // const [next, setNext] = useState(false); // 뒤로 한칸 버튼
  const [pages, setPages] = useState([]); // 페이지들

  // 검색
  const [searchKind, setSearchKind] = useState("");
  const [searchGender, setSearchGender] = useState("");
  const [searchNickname, setSearchNickname] = useState("");
  const [searchLostDate, setSearchLostDate] = useState("");
  const [searchLostLocation, setSearchLostLocation] = useState("");
  const [searchAnimalName, setSearchAnimalName] = useState("");
  const [sort, setSort] = useState(0);
  const [allCount, setAllCount] = useState(0);

  // 페이지 변경될 때마다 호출!
  const lostAPI = async () => {
    let response = await viewAllLostBoard(
      page +
        "&lostAnimalKind=" +
        searchKind +
        "&lostAnimalGender=" +
        searchGender +
        "&userNickname=" +
        searchNickname +
        "&lostDate=" +
        searchLostDate +
        "&lostLocation=" +
        searchLostLocation +
        "&lostAnimalName=" +
        searchAnimalName +
        "&sort=" +
        sort
    );
    setLosts(response.data.content);
    setAllCount(response.data.totalElements);
    setTotalPage(response.data.totalPages);
  };

  // 첫페이지, 마지막 페이지, 페이지 리스트 초기 셋팅
  let lastPage = 0;
  let firstPage = 0;
  let pageList = [];

  // 페이지가 변할 때마다 lostAPI() 실행
  useEffect(() => {
    lostAPI();
  }, [page, sort]);

  // totalPage가 바뀔 때 마다 실행
  useEffect(() => {
    lastPage = Math.ceil(page / 5) * 5;
    firstPage = lastPage - 4;

    if (totalPage < lastPage) {
      lastPage = totalPage;
    }
    // setPrev(firstPage > 1);
    // setNext(lastPage < totalPage);
    for (let i = firstPage; i <= lastPage; i++) {
      pageList.push(i);
    }
    setPages(pageList);
  }, [totalPage]);

  const navigate = useNavigate();
  const onCreate = async () => {
    if (Object.keys(user).length !== 0) {
      navigate("/compagno/lostBoard/create");
    } else {
      navigate("/compagno/login");
    }
  };

  const view = async (code) => {
    await viewCountLostBoard(code);
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
      <div id="searching">
        <div id="searchSelect">
          <div id="aniamlKind">
            동물 종류 :
            <select onChange={(e) => setSearchKind(e.target.value)}>
              <option value="">전체</option>
              <option value="개">개</option>
              <option value="고양이">고양이</option>
              <option value="기타">기타</option>
            </select>
          </div>
          <div id="animalGender">
            동물 성별 :
            <select onChange={(e) => setSearchGender(e.target.value)}>
              <option value="">전체</option>
              <option value="수컷">수컷</option>
              <option value="암컷">암컷</option>
              <option value="알수없음">알수없음</option>
            </select>
          </div>
          <div id="lostDate">
            <label>
              분실 날짜{" "}
              <input
                type="date"
                max={moment().format("YYYY-MM-DD")}
                onChange={(e) => setSearchLostDate(e.target.value)}
              />
            </label>
          </div>
        </div>
        <div id="searchText">
          <div id="userNickname">
            <label>
              작성자 닉네임{" "}
              <input
                type="text"
                onChange={(e) => setSearchNickname(e.target.value)}
              />
            </label>
          </div>

          <div id="lostLocation">
            <label>
              분실 지역{" "}
              <input
                type="text"
                onChange={(e) => setSearchLostLocation(e.target.value)}
              />
            </label>
          </div>
          <div id="lostAnimalName">
            <label>
              분실 동물 이름{" "}
              <input
                type="text"
                onChange={(e) => setSearchAnimalName(e.target.value)}
              />
            </label>
          </div>
        </div>
        <div id="searchBtn">
          <button onClick={lostAPI}>
            <IoSearch />
            <span>조회</span>
          </button>
        </div>
      </div>
      <div id="contentsOption">
        <div id="allCount">
          <span>전체</span> <div id="num">&nbsp;{allCount}</div>
          <span>건</span>
        </div>
        <div id="sorting">
          <select onChange={(e) => setSort(e.target.value)}>
            <option value="0">작성일 최신순</option>
            <option value="1">작성일 오래된순</option>
            <option value="2">분실 날짜 최신순</option>
            <option value="3">분실 날짜 오래된순</option>
            <option value="4">조회수 낮은순</option>
            <option value="5">조회수 높은순</option>
          </select>
        </div>
      </div>
      <div className="contentsBody">
        {losts.map((lost) => (
          <div key={lost.lostBoardCode}>
            <div
              className="contentDetail"
              onClick={() => view(lost.lostBoardCode)}
            >
              <h4 id="animalName">{lost.lostAnimalName}</h4>
              <div id="imageBox">
                {lost.lostAnimalImage == "" || lost.lostAnimalImage == null ? (
                  <img src="/img/noImage.jpg" id="mainImage" />
                ) : (
                  <img
                    id="mainImage"
                    // src={lost.lostAnimalImage?.replace(
                    //   "\\\\DESKTOP-U0CNG13\\upload\\lostBoard",
                    //   "http://192.168.10.28:8081/lostBoard/"
                    // )}
                    src={lost.lostAnimalImage?.replace(
                      "C://",
                      "http://localhost:8081/lostBoard"
                    )}
                  />
                )}
              </div>
              <div
                className="topContents"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <div
                  id="viewCount"
                  style={{ display: "flex", marginTop: "10px" }}
                >
                  <span>조회수</span>&nbsp;
                  <span>{lost.lostViewCount}</span>
                </div>
                <div id="regiDate">
                  <span>{moment(lost.lostRegiDate).format("YY-MM-DD")}</span>
                </div>
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
        <FaAnglesLeft className="iconPaging" onClick={() => setPage(1)} />
        <FaAngleLeft
          className="iconPaging"
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
          className="iconPaging"
          onClick={
            () => (page < totalPage ? setPage(page + 1) : setPage(totalPage)) // 현재 페이지에서 한칸 뒤로
          }
        />
        <FaAnglesRight
          className="iconPaging"
          onClick={() => setPage(totalPage)}
        />
        {/* 가장 마지막 페이지로 */}
      </div>
    </Div>
  );
};
export default ViewAllLostBoard;

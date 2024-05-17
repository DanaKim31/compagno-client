import { viewAllAdopBoard, viewCountAdopBoard } from "../../api/adoptionBoard";
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

  /* 제목+게시글작성버튼 */
  .contentHeader {
    width: 70%;
    display: flex;
    justify-content: space-between;
    h2 {
      font-weight: bold;
      font-size: 2.5rem;
    }
    button#addBtn {
      font-weight: bold;
      border-radius: 15px;
      background-color: black;
      color: white;
      font-size: 0.8rem;
      width: 90px;
      height: 50px;
    }
    button#addBtn:hover {
      background-color: #94b29b;
      border: none;
      color: black;
    }
  }
  /* 검색창 */
  .searching {
    margin: 30px 0px;
    border: 1px solid black;
    width: 70%;
    height: 250px;
    border-radius: 30px;
    display: flex;
    flex-direction: column;

    #aboutAnimal {
      display: flex;
      justify-content: center;
      align-items: center;
      div {
        margin: 40px 50px;
        select {
          margin-left: 10px;
          font-weight: bold;
          option {
            font-weight: bold;
          }
        }
      }
    }
    #aboutNotAnimal {
      display: flex;
      justify-content: space-around;
      align-items: center;
      div {
        margin: 20px 0px;
        input {
          margin-left: 20px;
          font-weight: bold;
        }
      }
    }
    #searchBtn {
      display: flex;
      justify-content: center;
      margin: 10px 0px;
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
  /* 전체 게시물수+정렬 */
  .headerOptions {
    display: flex;
    justify-content: space-between;
    width: 67%;
    #allCount {
      display: flex;
      #num {
        color: green;
        margin-left: 8px;
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
  .contentsBody {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 540px 540px 540px;
    grid-row-gap: 20px;
    grid-column-gap: 30px;
    width: 67%;
    margin-top: 40px;

    .contentDetail {
      /* border: 1px solid black; */
      /* border-radius: 10px; */
      border-top: 1px dashed green;
      border-bottom: 1px dashed green;
      #animalKind {
        display: flex;
        justify-content: center;
        padding: 15px 0px;
        border-bottom: 1px dashed green;
        font-weight: bold;
      }
      #imageBox {
        width: 100%;
        height: 260px;
        border: 0.2px solid gray;
        #mainImage {
          width: 100%;
          height: 100%;
        }
      }
      #regiDate {
        /* display: flex; */
        /* justify-content: right; */
        margin-top: 10px;
        span {
          padding-top: 5px;
          margin-right: 10px;
        }
      }
      .contents {
        padding-left: 10px;
        margin-top: 15px;
        margin-bottom: 15px;
        border-top: 1px dashed black;
        padding-top: 10px;
      }
    }
  }
  .contentDetail:hover {
    background-color: #e9efeb;
    cursor: pointer;
  }
  .paging {
    margin-bottom: 30px;
    button {
      border: none;
      border-radius: 50%;
      width: 30px;
      height: 30px;
      font-weight: bold;
      background-color: #cbd6ce;
    }
    .iconPaging {
      cursor: pointer;
    }
  }
`;

const ViewAllAdopBoard = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => {
    return state.user;
  });
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token != null) {
      dispatch(userSave(JSON.parse(localStorage.getItem("user"))));
    }
  }, []);

  // 페이징
  const [adops, setAdops] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [pages, setPages] = useState([]);

  // 검색  -- 추후
  const [searchKind, setSearchKind] = useState("");
  const [searchGender, setSearchGender] = useState("");
  const [searchNeuter, setSearchNeuter] = useState("");
  const [searchFindplace, setSearchFindplace] = useState("");
  const [searchCenterName, setSearchCenterName] = useState("");
  const [sort, setSort] = useState(0);
  const [allCount, setAllCount] = useState(0);

  const adopsAPI = async () => {
    let response = await viewAllAdopBoard(
      page +
        "&adopAnimalKind=" +
        searchKind +
        "&adopAnimalGender=" +
        searchGender +
        "&adopAnimalNeuter=" +
        searchNeuter +
        "&adopAnimalFindplace=" +
        searchFindplace +
        "&adopCenterName=" +
        searchCenterName +
        "&sort=" +
        sort
    );
    setAdops(response.data.content);
    setAllCount(response.data.totalElements);
    setTotalPage(response.data.totalPages);
  };

  let lastPage = 0;
  let firstPage = 0;
  let pageList = [];

  useEffect(() => {
    adopsAPI();
  }, [page, sort]);

  useEffect(() => {
    lastPage = Math.ceil(page / 5) * 5;
    firstPage = lastPage - 4;
    if (totalPage < lastPage) {
      lastPage = totalPage;
    }
    for (let i = firstPage; i <= lastPage; i++) {
      pageList.push(i);
    }
    setPages(pageList);
  }, [totalPage]);

  const navigate = useNavigate();
  const onCreate = async () => {
    if (Object.keys(user).length != 0) {
      navigate("/compagno/adoptionBoard/create");
    } else {
      navigate("/compagno/login");
    }
  };

  const view = async (code) => {
    await viewCountAdopBoard(code);
    navigate("/compagno/adoptionBoard/view/" + code);
  };

  return (
    <Div>
      <div className="contentHeader">
        <h2>동물 입양 게시판</h2>
        <button id="addBtn" onClick={onCreate}>
          게시글 작성
        </button>
      </div>
      {/* 검색창 */}
      <div className="searching">
        <div id="aboutAnimal">
          <div id="animalKind">
            동물 종류
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
          <div id="animalNeuter">
            중성화 :
            <select onChange={(e) => setSearchNeuter(e.target.value)}>
              <option value="">전체</option>
              <option value="예">예</option>
              <option value="아니오">아니오</option>
              <option value="알수없음">알수없음</option>
            </select>
          </div>
        </div>
        <div id="aboutNotAnimal">
          <div id="findPlace">
            <label>발견 장소</label>
            <input
              type="text"
              onChange={(e) => setSearchFindplace(e.target.value)}
            />
          </div>
          <div id="centerNaem">
            <label>보호 센터명</label>
            <input
              type="text"
              onChange={(e) => setSearchCenterName(e.target.vale)}
            />
          </div>
        </div>
        <div id="searchBtn">
          <button onClick={adopsAPI}>
            <IoSearch />
            <span>조회</span>
          </button>
        </div>
      </div>
      {/* 총 게시물수 + 정렬 */}
      <div className="headerOptions">
        <div id="allCount">
          <span>전체 </span>
          <div id="num">{allCount}</div>
          <span>건</span>
        </div>
        <div id="sorting">
          <select onChange={(e) => setSort(e.target.value)}>
            <option value="0">작성일 최신순</option>
            <option value="1">작성일 오래된순</option>
            <option value="2">조회수 낮은순</option>
            <option value="3">조회수 높은순</option>
          </select>
        </div>
      </div>
      {/* 내용 */}
      <div className="contentsBody">
        {adops.map((adop) => (
          <div key={adop.adopBoardCode}>
            <div
              className="contentDetail"
              onClick={() => view(adop.adopBoardCode)}
            >
              <h4 id="animalKind">{adop.adopAnimalKind}</h4>
              <div id="imageBox">
                <img
                  id="mainImage"
                  // src={adop.adopAnimalImage?.replace(
                  //   "C:",
                  //   "http://localhost:8081"
                  // )}
                  src={adop.adopAnimalImage?.replace(
                    "\\\\DESKTOP-U0CNG13\\upload\\adoptionBoard",
                    "http://192.168.10.28:8081/adoptionBoard/"
                  )}
                />
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
                  <span>{adop.adopViewCount}</span>
                </div>
                <div id="regiDate">
                  <span>{moment(adop.adopRegiDate).format("YY-MM-DD")}</span>
                </div>
              </div>

              <div className="contents">
                신고자 닉네임 : {adop.userNickname}
                <br />
                성별 : {adop.adopAnimalGender}
                <br />
                발견 장소 : {adop.adopAnimalFindplace}
                <br />
                특징 : {adop.adopAnimalFeature}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* 페이징 */}
      <div className="paging">
        <FaAnglesLeft className="iconPaging" onClick={() => setPage(1)} />
        <FaAngleLeft
          className="iconPaging"
          onClick={() => (page > 1 ? setPage(page - 1) : setPage(1))}
        />
        {pages.map((num, index) => (
          <button
            key={index}
            value={num}
            onClick={(e) => setPage(Number(e.target.value))}
          >
            {num}
          </button>
        ))}

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
      </div>
    </Div>
  );
};
export default ViewAllAdopBoard;

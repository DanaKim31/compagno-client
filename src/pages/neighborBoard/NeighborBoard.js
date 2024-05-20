import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getNeighborBoards,
  neighborBoardBookmark,
  getProvinces,
  getDistricts,
  getAnimalCategories,
} from "../../api/neighborBoard";
import {
  FaAnglesLeft,
  FaAngleLeft,
  FaAngleRight,
  FaAnglesRight,
} from "react-icons/fa6";
import { FaBookmark, FaRegBookmark } from "react-icons/fa6";
import { userSave } from "../../store/user";
import moment from "moment";
import styled from "styled-components";

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
  width: 90%;
  margin: auto;

  h1 {
    font-size: 2.5rem;
    margin-bottom: 100px;
  }

  .header {
    font-size: 2.5rem;
  }

  .register-search-btn {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin-bottom: 10px;

    #register-btn {
      height: 40px;
      width: 90px;
      margin-right: 10px;
      border-radius: 5px;
      color: #455c58ff;
      background: white;
      border: 2px solid #455c58ff;
    }
    #register-btn:hover {
      background: #455c58ff;
      color: white;
      cursor: pointer;
    }

    #search-btn {
      width: 90px;
      height: 39px;
      border-radius: 5px;
      color: white;
      cursor: pointer;
      background: #455c58ff;
      border: 1px solid #455c58ff;
      margin-right: 10px;
    }
  }

  .search-area {
    padding: 20px 0 10px 20px;
    border: 3px dashed #455c58ff;
    border-radius: 5px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    margin-bottom: 40px;

    span {
      display: inline-block;
      width: 65px;
      line-height: 40px;
    }

    select {
      height: 40px;
      width: 150px;
      padding: 5px;
      margin-right: 20px;
      border-radius: 5px;
    }

    #province {
      display: flex;
      margin-bottom: 10px;
    }
    #district {
      display: flex;
      margin-bottom: 10px;
    }

    #animal-category {
      display: flex;
      margin-bottom: 10px;
    }

    .keyword {
      display: flex;
      margin-bottom: 10px;

      select {
        width: 93px;
        padding: 5px;
        margin-right: 10px;
        border-radius: 5px;
      }

      input {
        width: 300px;
        height: 40px;
        padding: 5px;
        border-radius: 5px;
        margin-right: 20px;
        border: 1px solid #7f7f7fff;
      }
    }
  }

  .sorting {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    align-items: center;

    select {
      padding: 5px;
      border-radius: 5px;
    }
  }

  table {
    text-align: center;
    width: 100%;
    margin: auto;

    th {
      font-weight: bold;
      padding: 10px;
      border-bottom: 2px solid black;
    }
    td {
      padding: 10px;
    }
    .list:hover {
      background: lightgray;
    }
    .list :nth-child(4) {
      text-align: left;
    }
  }

  .paging {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 30px;

    button {
      width: 30px;
      margin: 0 5px;
      background: white;
      color: #455c58ff;
      border: 2px solid #455c58ff;
      border-radius: 5px;
    }

    button:focus {
      background: #455c58ff;
      color: white;
    }
  }
`;

const NeighborBoard = () => {
  const [neighborBoards, setNeighborBoards] = useState({});
  const token = localStorage.getItem("token");
  // ========== 검색조건 ==========
  const [selectedProvince, setSelectedProvince] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState([]);
  const [animalCategories, setAnimalCategories] = useState([]);

  const [searchProvince, setSearchProvince] = useState("");
  const [searchDistrict, setSearchDistrict] = useState("");
  const [searchAnimal, setSearchAnimal] = useState(0);
  const [searchSelect, setSearchSelect] = useState("title");
  const [searchKeyword, setSearchKeyword] = useState("");

  const [sort, setSort] = useState(1);
  // ========== 페이징 ==========
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [prev, setPrev] = useState(false);
  const [next, setNext] = useState(false);
  const [pages, setPages] = useState([]);
  // ========== 유저정보 ==========
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

  // const neighborBoardAPI = async () => {
  //   const result = await getNeighborBoards(
  //     page +
  //       "&locationProvince=" +
  //       searchProvince +
  //       "&locationDistrict=" +
  //       searchDistrict +
  //       "&animalCategoryCode=" +
  //       searchAnimal +
  //       // "&searchSelect=" +
  //       // searchSelect +
  //       // "&searchKeyword=" +
  //       // searchKeyword +
  //       "&sortBy=" +
  //       sort
  //   );
  //   setNeighborBoards(result.data);
  //   setTotalPage(result.data.totalPages);
  // };

  const neighborBoardAPI = async () => {
    const result = await getNeighborBoards(
      page,
      searchProvince,
      searchDistrict,
      searchAnimal,
      searchSelect,
      searchKeyword,
      sort
    );
    setNeighborBoards(result.data);
    setTotalPage(result.data.totalPages);
  };

  const animalCategoryAPI = async () => {
    const result = await getAnimalCategories();
    setAnimalCategories(result.data);
  };

  const provinceAPI = async () => {
    const result = await getProvinces();
    setSelectedProvince(result.data);
  };

  const districtAPI = async (code) => {
    let result = null;
    if (code == "") {
      setSelectedDistrict("전체");
      setSearchDistrict("");
    } else {
      result = await getDistricts(code);
      setSelectedDistrict(result.data);
    }
  };

  const bookmark = async (code) => {
    if (token === null) {
      alert("로그인 화면으로 이동합니다.");
      return false;
    }
    await neighborBoardBookmark({
      neighborBoardCode: code,
      userId: user.userId,
    });
    neighborBoardAPI();
  };

  useEffect(() => {
    neighborBoardAPI();
    provinceAPI();
    animalCategoryAPI();
  }, [page, sort]);

  let lastPage = 0;
  let firstPage = 0;
  let pageList = [];

  useEffect(() => {
    lastPage = Math.ceil(page / 10) * 10;
    firstPage = lastPage - 9;
    if (totalPage < lastPage) {
      lastPage = totalPage;
    }
    setPrev(firstPage > 1);
    setNext(lastPage < totalPage);
    for (let i = firstPage; i <= lastPage; i++) {
      pageList.push(i);
    }
    setPages(pageList);
  }, [totalPage]);

  const handleProvinceChange = (e) => {
    if (e == "") {
      districtAPI("");
    } else {
      districtAPI(e);
    }
    setSearchProvince(e);
  };

  const navigate = useNavigate();
  const registerBoard = async () => {
    if (Object.keys(user).length !== 0) {
      navigate("/compagno/neighborBoard/register");
    } else {
      alert("로그인 해주세요오오오옹");
      navigate("/compagno/login");
    }
  };

  useEffect(() => {
    console.log(searchProvince);
  }, [searchProvince]);
  return (
    <Div>
      <h1>우리동네 게시판</h1>

      <div className="header">우리동네 게시판</div>

      <div className="register-search-btn">
        <button id="register-btn" onClick={registerBoard}>
          등록
        </button>
        <button id="search-btn" onClick={neighborBoardAPI}>
          조회
        </button>
      </div>

      <div className="search-area">
        <div id="province">
          <span>시/도</span>
          <select onChange={(e) => handleProvinceChange(e.target.value)}>
            <option value="">전체</option>
            {selectedProvince.map((province) => (
              <option key={province.locationCode} value={province.locationCode}>
                {province.locationName}
              </option>
            ))}
          </select>
        </div>

        <div id="district">
          <span>시/군/구</span>
          {selectedDistrict == "전체" ? (
            <select>
              <option>전체</option>
            </select>
          ) : (
            <>
              {selectedProvince && (
                <select onChange={(e) => setSearchDistrict(e.target.value)}>
                  <option value="">전체</option>
                  {selectedDistrict.map((district) => (
                    <option
                      key={district.locationCode}
                      value={district.locationCode}
                    >
                      {district.locationName}
                    </option>
                  ))}
                </select>
              )}
            </>
          )}
        </div>

        <div id="animal-category">
          <span>반려동물</span>
          <select onChange={(e) => setSearchAnimal(e.target.value)}>
            <option value={0}>전체</option>
            {animalCategories.map((animalCategory) => (
              <option
                key={animalCategory.animalCategoryCode}
                value={animalCategory.animalCategoryCode}
              >
                {animalCategory.animalType}
              </option>
            ))}
          </select>
        </div>

        <div className="keyword">
          <span>검색어</span>
          <select onChange={(e) => setSearchSelect(e.target.value)}>
            <option value={"title"}>제목</option>
            <option value={"id"}>작성자</option>
          </select>
          <input
            type="text"
            placeholder="검색어 입력"
            className="search-input"
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
        </div>
      </div>

      <div className="sorting">
        <select onChange={(e) => setSort(e.target.value)}>
          <option value="1">작성일 내림차순</option>
          <option value="2">작성일 오름차순</option>
          <option value="3">조회수 내림차순</option>
          <option value="4">조회수 오름차순</option>
        </select>
        <span>총 {neighborBoards.totalElements}건</span>
      </div>

      <table>
        <thead>
          <tr>
            <th>번호</th>
            <th>반려동물</th>
            <th>지역</th>
            <th>제목</th>
            <th>작성자</th>
            <th>작성일</th>
            <th>조회수</th>
            <th>북마크</th>
          </tr>
        </thead>
        <tbody>
          {neighborBoards.content?.map((neighbor) => (
            <tr key={neighbor.neighborBoardCode} className="list">
              <td>{neighbor.neighborBoardCode}</td>
              <td>{neighbor.animalCategoryCode.animalType}</td>
              <td>
                {neighbor.location.parent.locationName +
                  " " +
                  neighbor.location.locationName}
              </td>
              <td>
                <a
                  href={`/compagno/neighborBoard/detail/${neighbor.neighborBoardCode}`}
                >
                  {neighbor.neighborBoardTitle}
                </a>
              </td>
              <td>
                {neighbor.user.userNickname +
                  "  (" +
                  neighbor.user.userId +
                  ")"}
              </td>
              <td>
                {moment(neighbor.neighborBoardRegiDate).format(
                  "YYYY-MM-DD  HH:MM"
                )}
              </td>
              <td>{neighbor.neighborBoardViewCount}</td>
              <td>
                {neighbor.bookmark?.filter(
                  (bookmark) => bookmark.user.userId === user.userId
                ).length === 0 ? (
                  <FaRegBookmark
                    className="bookmark"
                    onClick={(e) => {
                      e.stopPropagation();
                      bookmark(neighbor.neighborBoardCode);
                    }}
                  />
                ) : (
                  <FaBookmark
                    className="bookmark bookmarkChecked"
                    onClick={(e) => {
                      e.stopPropagation();
                      bookmark(neighbor.neighborBoardCode);
                    }}
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="paging">
        <FaAnglesLeft onClick={() => setPage(1)} />
        <FaAngleLeft
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
          onClick={() =>
            page < totalPage ? setPage(page + 1) : setPage(totalPage)
          }
        />
        <FaAnglesRight onClick={() => setPage(totalPage)} />
      </div>
    </Div>
  );
};

export default NeighborBoard;

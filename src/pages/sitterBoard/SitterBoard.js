import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategories,
  getAnimalCategories,
  getSitterBoards,
  getProvinces,
  getDistricts,
} from "../../api/sitterBoard";
import {
  FaAnglesLeft,
  FaAngleLeft,
  FaAngleRight,
  FaAnglesRight,
} from "react-icons/fa6";
import { userSave } from "../../store/user";
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

    #sitter-category {
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
      padding: 15px;
    }
    .list:hover {
      background: lightgray;
    }
    .list :nth-child(5) {
      text-align: left;
    }

    #sitter-date {
      margin-right: 10px;
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

const SitterBoard = () => {
  const [sitterBoards, setSitterBoards] = useState({});
  // ========== 검색조건 ==========
  const [selectedProvince, setSelectedProvince] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState([]);
  const [province, setProvince] = useState(0);
  const [district, setDistrict] = useState(0);
  const [sitterCategories, setSitterCategories] = useState([]);
  const [animalCategories, setAnimalCategories] = useState([]);

  const [searchProvince, setSearchProvince] = useState("");
  const [searchDistrict, setSearchDistrict] = useState("");
  const [searchCategory, setSearchCategory] = useState(0);
  const [searchAnimal, setSearchAnimal] = useState(0);
  const [searchSelect, setSearchSelect] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");

  const [sort, setSort] = useState(1);
  // ========== 페이징 ==========
  const [page, setPage] = useState(1); // 현재 페이지
  const [totalPage, setTotalPage] = useState(0); // 전체 총 페이지
  const [prev, setPrev] = useState(false); // 앞으로 한칸 버튼
  const [next, setNext] = useState(false); // 뒤로 한칸 버튼
  const [pages, setPages] = useState([]); // 페이지네이션 노출 페이지
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

  const sitterBoardAPI = async () => {
    const result = await getSitterBoards(
      page +
        "&locationProvince=" +
        searchProvince +
        "&locationDistrict=" +
        searchDistrict +
        "&sitterCategoryCode=" +
        searchCategory +
        "&animalCategoryCode=" +
        searchAnimal +
        "&searchSelect=" +
        // searchSelect +
        // "&searchKeyword=" +
        // searchKeyword +
        "&sortBy=" +
        sort
    );
    console.log(result.data);
    setSitterBoards(result.data);
    setTotalPage(result.data.totalPages); // result에서 totalPages 불러와서 set으로 담기
  };

  const categoryAPI = async () => {
    const result = await getCategories();
    setSitterCategories(result.data);
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
    console.log(code);
    let result = null;
    if (code == "") {
      setSelectedDistrict("전체");
      setSearchDistrict("");
    } else {
      result = await getDistricts(code);
      setSelectedDistrict(result.data);
    }
  };

  useEffect(() => {
    sitterBoardAPI();
    categoryAPI();
    animalCategoryAPI();
    provinceAPI();
  }, [page, sort]);

  let lastPage = 0;
  let firstPage = 0;
  let pageList = [];

  useEffect(() => {
    lastPage = Math.ceil(page / 10) * 10;
    firstPage = lastPage - 9;
    if (totalPage < lastPage) {
      lastPage = totalPage; // 전체 페이지가 마지막 페이지보다 작은 경우엔 전체 페이지 수가 마지막 페이지 수랑 같음
    }
    setPrev(firstPage > 1);
    setNext(lastPage < totalPage);
    for (let i = firstPage; i <= lastPage; i++) {
      pageList.push(i); // 처음 i는 firstPage, 범위는 lastPage로 반복문 돌려서 i값을 넣은 list 만들기
    }
    setPages(pageList); // 해당 lißst 배열을 setPages에 담기
  }, [totalPage]);

  const handleProvinceChange = (e) => {
    // districtAPI(e.target.value);
    // setProvince(e.target.value);
    console.log(e);
    if (e == "") {
      districtAPI("");
    } else {
      districtAPI(e);
    }
    setSearchProvince(e);
  };

  // const handleDistrictChange = (e) => {
  //   setDistrict(e.target.value);
  // };

  const navigate = useNavigate();
  const registerBoard = async () => {
    if (Object.keys(user).length !== 0) {
      navigate("/compagno/sitterBoard/register");
    } else {
      alert("로그인 해주세요오오오옹");
      navigate("/compagno/login");
    }
  };

  // useEffect(() => {
  //   console.log(searchDistrict);
  // }, [searchDistrict]);

  return (
    <Div>
      <h1>시터 게시판</h1>

      <div className="register-search-btn">
        <button id="register-btn" onClick={registerBoard}>
          등록
        </button>
        <button id="search-btn" onClick={sitterBoardAPI}>
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

        <div id="sitter-category">
          <span>카테고리</span>
          <select onChange={(e) => setSearchCategory(e.target.value)}>
            <option>전체</option>
            {sitterCategories.map((category) => (
              <option
                key={category.sitterCategoryCode}
                value={category.sitterCategoryCode}
              >
                {category.sitterCategoryType}
              </option>
            ))}
          </select>
        </div>

        <div id="animal-category">
          <span>반려동물</span>
          <select onChange={(e) => setSearchAnimal(e.target.value)}>
            <option>전체</option>
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
          <span onChange={(e) => setSearchSelect(e.target.value)}>검색어</span>
          <select>
            <option value="제목">제목</option>
            <option value="작성자">작성자</option>
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
        <span>총 {sitterBoards.totalElements}건</span>
      </div>

      <table>
        <thead>
          <tr>
            <th>번호</th>
            <th>구분</th>
            <th>반려동물</th>
            <th>지역</th>
            <th>제목</th>
            <th>작성자</th>
            <th>작성일</th>
            <th>조회수</th>
          </tr>
        </thead>
        <tbody>
          {sitterBoards.content?.map((sitter) => (
            <tr key={sitter.sitterBoardCode} className="list">
              <td>{sitter.sitterBoardCode}</td>
              <td>{sitter.sitterCategory.sitterCategoryType}</td>
              <td>{sitter.animalCategoryCode.animalType}</td>
              <td>
                {sitter.location.parent?.locationName +
                  " " +
                  sitter.location?.locationName}
              </td>
              <td>
                <a
                  href={`/compagno/sitterBoard/detail/${sitter.sitterBoardCode}`}
                >
                  {sitter.sitterTitle}
                </a>
              </td>
              <td>{sitter.user.userId}</td>
              <td>
                <span id="sitter-date">{`${new Date(
                  sitter.sitterRegiDate
                ).getFullYear()}-${new Date(
                  sitter.sitterRegiDate
                ).getMonth()}-${new Date(
                  sitter.sitterRegiDate
                ).getDate()}`}</span>
                <span>{`${new Date(
                  sitter.sitterRegiDate
                ).getHours()}:${new Date(
                  sitter.sitterRegiDate
                ).getMinutes()}`}</span>
              </td>
              <td>{sitter.sitterViewCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="paging">
        <FaAnglesLeft onClick={() => setPage(1)} />
        <FaAngleLeft
          onClick={() => (page > 1 ? setPage(page - 1) : setPage(1))} // 현재 페이지에서 한칸 앞으로
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
          onClick={
            () => (page < totalPage ? setPage(page + 1) : setPage(totalPage)) // 현재 페이지에서 한칸 뒤로
          }
        />
        <FaAnglesRight onClick={() => setPage(totalPage)} />
      </div>
    </Div>
  );
};

export default SitterBoard;

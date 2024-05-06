import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getNeighborBoards,
  getProvinces,
  getDistricts,
} from "../../api/neighborBoard";
import {
  FaAnglesLeft,
  FaAngleLeft,
  FaAngleRight,
  FaAnglesRight,
} from "react-icons/fa6";
import { userSave } from "../../store/user";
import styled from "styled-components";

const Div = styled.div`
  width: 90%;
  margin: auto;

  h1 {
    font-size: 2.5rem;
    margin-bottom: 100px;
  }

  .keyword-options {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin-bottom: 10px;

    .keyword {
      display: flex;

      select {
        height: 40px;
        width: 100px;
        padding: 5px;
        margin-right: 5px;
        border-radius: 5px;
      }

      input {
        width: 300px;
        height: 40px;
        padding: 5px;
        border-radius: 5px;
        margin-right: 10px;
      }
    }
    button {
      height: 40px;
      width: 90px;
      border-radius: 5px;
      background: black;
      color: white;
      cursor: pointer;
    }
  }

  .search-area {
    background: lightgrey;
    padding: 20px 0 10px 20px;
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
      width: 300px;
      padding: 5px;
      margin-right: 20px;
      border-radius: 5px;
    }

    .location-search {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;

      #province {
        display: flex;
        margin-bottom: 10px;
      }
      #district {
        display: flex;
        margin-bottom: 10px;
      }
    }

    .category-search {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;

      #animal-category {
        display: flex;
        margin-bottom: 10px;
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
      border-radius: 5px;
    }

    button:focus {
      background: black;
      color: white;
    }
  }
`;

const NeighborBoard = () => {
  const [neighborBoards, setNeighborBoards] = useState({});
  // ========== 검색조건 ==========
  const [selectedProvince, setSelectedProvince] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState([]);
  const [province, setProvince] = useState(0);
  const [district, setDistrict] = useState(0);
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

  const neighborBoardAPI = async () => {
    const result = await getNeighborBoards(page);
    setNeighborBoards(result.data);
    setTotalPage(result.data.totalPages);
  };

  const provinceAPI = async () => {
    const result = await getProvinces();
    setSelectedProvince(result.data);
  };

  const districtAPI = async (code) => {
    if (code !== "") {
      const result = await getDistricts(code);
      setSelectedDistrict(result.data);
    } else {
      setSelectedDistrict([]);
    }
  };

  useEffect(() => {
    neighborBoardAPI();
    provinceAPI();
  }, [page]);

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
    districtAPI(e.target.value);
    setProvince(e.target.value);
  };

  const handleDistrictChange = (e) => {
    setDistrict(e.target.value);
  };

  return (
    <Div>
      <h1>우리동네 게시판</h1>

      <div className="keyword-options">
        <div className="keyword">
          <select>
            <option>제목</option>
            <option>작성자</option>
          </select>
          <input
            type="text"
            placeholder="검색어 입력"
            className="search-input"
          />
        </div>

        <div className="search-btn">
          <button>조회</button>
        </div>
      </div>

      <div className="search-area">
        <div className="location-search">
          <div id="province">
            <span>시/도</span>
            <select onChange={handleProvinceChange}>
              <option value="">전체</option>
              {selectedProvince.map((province) => (
                <option
                  key={province.locationCode}
                  value={province.locationCode}
                >
                  {province.locationName}
                </option>
              ))}
            </select>
          </div>
          <div id="district">
            <span>시/군/구</span>
            {selectedProvince && (
              <select onChange={handleDistrictChange}>
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
          </div>
        </div>

        <div className="category-search">
          <div id="animal-category">
            <span>반려동물</span>
            <select>
              <option>전체</option>
            </select>
          </div>
        </div>
      </div>

      <div className="sorting">
        <select>
          <option>최신순</option>
          <option>조회순</option>
        </select>
        <span>총 {neighborBoards.totalElements}건</span>
      </div>

      <table>
        <thead>
          <tr>
            <th>번호</th>
            <th>구분</th>
            <th>지역</th>
            <th>제목</th>
            <th>작성자</th>
            <th>작성일</th>
            <th>조회수</th>
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
              <td>{neighbor.user.userId}</td>
              <td>{`${new Date(
                neighbor.neighborBoardRegiDate
              ).getFullYear()}-${new Date(
                neighbor.neighborBoardRegiDate
              ).getMonth()}-${new Date(
                neighbor.neighborBoardRegiDate
              ).getDate()}`}</td>
              <td>{neighbor.neighborBoardViewCount}</td>
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

import { useState, useEffect } from "react";
import {
  getCategories,
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

      #sitter-category {
        display: flex;
        margin-bottom: 10px;
      }
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

const SitterBoard = () => {
  const [sitterBoards, setSitterBoards] = useState({});
  const [sitterCategories, setSitterCategories] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState([]);
  const [province, setProvince] = useState(0);
  const [district, setDistrict] = useState(0);
  const [page, setPage] = useState(1); // 현재 페이지
  const [totalPage, setTotalPage] = useState(0); // 전체 총 페이지
  const [prev, setPrev] = useState(false); // 앞으로 한칸 버튼
  const [next, setNext] = useState(false); // 뒤로 한칸 버튼
  const [pages, setPages] = useState([]); // 페이지네이션 노출 페이지

  const sitterBoardAPI = async () => {
    const result = await getSitterBoards(page);
    console.log(result.data);
    setSitterBoards(result.data);
    setTotalPage(result.data.totalPages); // result에서 totalPages 불러와서 set으로 담기
  };

  const categoryAPI = async () => {
    const result = await getCategories();
    setSitterCategories(result.data);
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
    sitterBoardAPI();
    categoryAPI();
    provinceAPI();
  }, [page]);

  let lastPage = 0;
  let firstPage = 0;
  let pageList = [];

  useEffect(() => {
    // totalPage가 바뀔 때 마다 실행
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
    setPages(pageList); // 해당 list 배열을 setPages에 담기
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
      <h1>시터 게시판</h1>

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
          <div id="sitter-category">
            <span>카테고리</span>
            <select>
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
        <span>총 {sitterBoards.totalElements}건</span>
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
          {sitterBoards.content?.map((sitter) => (
            <tr key={sitter.sitterBoardCode} className="list">
              <td>{sitter.sitterBoardCode}</td>
              <td>{sitter.sitterCategory.sitterCategoryType}</td>
              <td>
                {sitter.location.parent.locationName +
                  " " +
                  sitter.location.locationName}
              </td>
              <td>
                <a
                  href={`/compagno/sitterBoard/detail/${sitter.sitterBoardCode}`}
                >
                  {sitter.sitterTitle}
                </a>
              </td>
              <td>{sitter.user.userId}</td>
              <td>{`${new Date(sitter.sitterRegiDate).getFullYear()}-${new Date(
                sitter.sitterRegiDate
              ).getMonth()}-${new Date(sitter.sitterRegiDate).getDate()}`}</td>
              <td>{sitter.sitterViewCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="paging">
        <FaAnglesLeft onClick={() => setPage(1)} />
        {/* 가장 첫 페이지로 */}
        <FaAngleLeft
          onClick={() => (page > 1 ? setPage(page - 1) : setPage(1))} // 현재 페이지에서 한칸 앞으로
        />
        {/* 배열 담은 pages를 map으로 만들어서 반복문 페이지번호 생성 */}
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
        {/* 가장 마지막 페이지로 */}
      </div>
    </Div>
  );
};

export default SitterBoard;

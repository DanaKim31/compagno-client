import { useState, useEffect } from "react";
import {
  getCategories,
  getSitterBoards,
  getProvinces,
  getDistricts,
} from "../../api/sitterBoard";
import Pagination from "react-bootstrap/Pagination";
import styled from "styled-components";

const Div = styled.div`
  width: 90%;
  margin: auto;

  h1 {
    font-size: 2.5rem;
    margin-bottom: 100px;
  }

  .location-search {
    display: flex;
    flex-direction: column;

    .selectBox {
      display: flex;
      justify-content: space-evenly;
    }

    select {
      width: 100%;
    }
  }

  table {
    text-align: center;
    white-space: nowrap;
    overflow: hidden;

    th {
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
`;

const SitterBoard = () => {
  const [sitterBoards, setSitterBoards] = useState({});
  const [sitterCategories, setSitterCategories] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState([]);
  const [province, setProvince] = useState(0);
  const [district, setDistrict] = useState(0);
  const items = [1, 2, 3, 4, 5];

  const sitterBoardAPI = async () => {
    const result = await getSitterBoards();
    setSitterBoards(result.data);
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
  }, []);

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

      <div className="location-search">
        <p>지역선택 </p>
        <div className="selectBox">
          <div className="provinceSelect">
            <select id="province" onChange={handleProvinceChange}>
              <option value="">시/도 선택</option>
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
          {selectedProvince && (
            <div className="districtSelect">
              <select id="district" onChange={handleDistrictChange}>
                <option value="">시/군/구 선택</option>
                {selectedDistrict.map((district) => (
                  <option
                    key={district.locationCode}
                    value={district.locationCode}
                  >
                    {district.locationName}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>

      <select>
        <option>카테고리 선택</option>
        {sitterCategories.map((category) => (
          <option
            key={category.sitterCategoryCode}
            value={category.sitterCategoryType}
          >
            {category.sitterCategoryType}
          </option>
        ))}
      </select>
      <input type="text" placeholder="검색어 입력" className="search-input" />
      <button>조회</button>

      <table>
        <thead>
          <tr>
            <th>번호{sitterBoards.totalElements}</th>
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
                <a href={`/sitterBoard/detail/${sitter.sitterBoardCode}`}>
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
      <Pagination>{items}</Pagination>
    </Div>
  );
};

export default SitterBoard;

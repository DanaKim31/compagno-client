import { useState, useEffect } from "react";
import { getSitterBoards } from "../../api/sitterBoard";
import { provinces, districts } from "../../components/LocationSelect";
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
      /* 
      text-overflow: ellipsis;
      display: block; 
      */
    }
  }
`;

const SitterBoard = () => {
  const [sitterBoards, setSitterBoards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");

  const sitterBoardAPI = async () => {
    const result = await getSitterBoards();
    setSitterBoards(result.data);
  };

  useEffect(() => {
    sitterBoardAPI();
  }, []);

  const handleProvinceChange = (e) => {
    setSelectedProvince(e.target.value);
    setSelectedDistrict(""); // 시도 변경 시 시군구 선택 초기화
  };

  const handleDistrictChange = (e) => {
    setSelectedDistrict(e.target.value);
  };

  return (
    <Div>
      <h1>시터 게시판</h1>

      <div className="location-search">
        <p>지역선택 </p>
        <div className="selectBox">
          <div className="provinceSelect">
            <select
              id="province"
              value={selectedProvince}
              onChange={handleProvinceChange}
            >
              <option value="">시/도 선택</option>
              {provinces.map((province) => (
                <option key={province.id} value={province.name}>
                  {province.name}
                </option>
              ))}
            </select>
          </div>
          {selectedProvince && (
            <div className="districtSelect">
              <select
                id="district"
                value={selectedDistrict}
                onChange={handleDistrictChange}
              >
                <option value="">시/군/구 선택</option>
                {districts[selectedProvince].map((district, index) => (
                  <option key={index} value={district}>
                    {district}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>

      <select></select>
      <input type="text" placeholder="검색어 입력" className="search-input" />
      <button>조회</button>

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
          {sitterBoards.map((sitter) => (
            <tr key={sitter.sitterBoardCode} className="list">
              <td>{sitter.sitterBoardCode}</td>
              <td>{sitter.sitterCategory}</td>
              <td>{sitter.sitterLocation}</td>
              <td>
                <a href={`/sitterBoard/detail/${sitter.sitterBoardCode}`}>
                  {sitter.sitterTitle}
                </a>
              </td>
              <td>{sitter.userId}</td>
              <td>{sitter.sitterRegiDate}</td>
              <td>{sitter.sitterViewCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Div>
  );
};

export default SitterBoard;

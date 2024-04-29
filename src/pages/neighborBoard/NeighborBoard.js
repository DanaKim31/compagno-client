import { useState, useEffect } from "react";
import {
  getNeighborBoards,
  getProvinces,
  getDistricts,
} from "../../api/neighborBoard";
import styled from "styled-components";

const Div = styled.div`
  width: 90%;
  margin: auto;

  h1 {
    font-size: 2.5rem;
    margin-bottom: 100px;
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

const NeighborBoard = () => {
  const [neighborBoards, setNeighborBoards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState([]);
  const [province, setProvince] = useState(0);
  const [district, setDistrict] = useState(0);

  const neighborBoardAPI = async () => {
    const result = await getNeighborBoards();
    setNeighborBoards(result.data);
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
      <h1>우리동네 게시판</h1>

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
          {neighborBoards?.map((neighbor) => (
            <tr key={neighbor.neighborBoardCode} className="list">
              <td>{neighbor.neighborBoardCode}</td>
              <td>{neighbor.animalCategoryCode.animalType}</td>
              <td>{neighbor.locationCode.locationName}</td>
              <td>{neighbor.neighborBoardTitle}</td>
              <td>{neighbor.user.userId}</td>
              <td>{neighbor.neighborBoardRegiDate}</td>
              <td>{neighbor.neighborBoardViewCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Div>
  );
};

export default NeighborBoard;

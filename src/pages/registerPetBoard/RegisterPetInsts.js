import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getInsts,
  getProvinces,
  getDistricts,
} from "../../api/registerPetBoard";
import styled from "styled-components";

const Div = styled.div`
  width: 90%;
  margin: auto;

  h1 {
    font-size: 2.5rem;
    margin-bottom: 100px;
  }

  .search-btn {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin-bottom: 10px;

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

    .keyword-search {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      margin-bottom: 10px;

      .keyword {
        display: flex;

        select {
          width: 90px;
          margin-right: 10px;
        }

        input {
          width: 200px;
          height: 40px;
          padding: 5px;
          border-radius: 5px;
          margin-right: 19px;
        }
      }
    }
  }
`;

const RegisterPetInsts = () => {
  const [insts, setInsts] = useState([]);
  // ========================== 유저 ==========================
  const dispatch = useDispatch();
  const user = useSelector((state) => {
    return state.user;
  });
  // ========================== 검색 조건 ==========================
  const [selectedProvince, setSelectedProvince] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState([]);
  const [province, setProvince] = useState(0);
  const [district, setDistrict] = useState(0);
  // ========================== 페이징 ==========================
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const instsAPI = async () => {
    setLoading(true);
    const result = await getInsts(page);
    const newData = result.data;
    console.log(result.data);
    setInsts((prev) => [...prev, ...newData]);
    setPage((prev) => prev + 1);
    setLoading(false);
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
    const scroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight &&
        !loading
      ) {
        instsAPI();
      }
    };
    window.addEventListener("scroll", scroll);
    return () => {
      window.removeEventListener("scroll", scroll);
    };
  }, [page, loading]);

  const handleProvinceChange = (e) => {
    districtAPI(e.target.value);
    setProvince(e.target.value);
  };

  const handleDistrictChange = (e) => {
    setDistrict(e.target.value);
  };

  useEffect(() => {
    provinceAPI();
  }, []);

  return (
    <Div>
      <h1>동물등록 대행기관</h1>

      <div className="search-btn">
        <button>조회</button>
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

        <div className="keyword-search">
          <div className="keyword">
            <span>검색어</span>
            <select>
              <option>기관명</option>
              <option>대표자명</option>
            </select>
            <input
              type="text"
              placeholder="검색어 입력"
              className="search-input"
            />
          </div>
        </div>
      </div>

      {insts.contents?.map((inst) => (
        <div key={inst.regiBoardCode} className="list">
          <div className="title name">
            <span>기관명</span>
            <p>{inst.regiInstName}</p>
          </div>
          <div className="title owner">
            <span>대표자명</span>
            <p>{inst.regiInstOwner}</p>
          </div>
          <div className="title phone">
            <span>전화번호</span>
            <p>{inst.regiInstPhone}</p>
          </div>
          <div className="title addr">
            <span>주소</span>
            <p>{inst.regiInstAddr}</p>
          </div>
        </div>
      ))}
    </Div>
  );
};

export default RegisterPetInsts;

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getInsts,
  getProvinces,
  getDistricts,
} from "../../api/registerPetBoard";
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
    display: flex;
    justify-content: center;
    line-height: 80px;
    font-size: 2rem;
    color: #455c58ff;
    border: 3px solid #455c58ff;
    border-radius: 15px;
    margin-bottom: 60px;
  }

  .search-area {
    width: 98%;
    margin: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    margin-bottom: 40px;

    .keyword {
      display: flex;

      select {
        height: 40px;
        width: 150px;
        padding: 5px;
        margin-right: 10px;
        border-radius: 5px;
      }

      input {
        width: 300px;
        height: 40px;
        padding: 5px;
        border: 1px solid gray;
        border-radius: 5px;
        margin-right: 20px;
      }
    }

    button {
      width: 90px;
      height: 39px;
      border-radius: 5px;
      color: white;
      background: #455c58ff;
      border: 1px solid #455c58ff;
      margin-right: 10px;
    }
  }

  .list {
    width: 98%;
    margin: auto;
    padding: 20px;
    border-top: 1px solid gray;
  }
  .title {
    display: flex;
    line-height: 30px;
  }
  span {
    margin-right: 10px;
    font-weight: bolder;
    color: darkgrey;
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

  const [sort, setSort] = useState(1);

  const instsAPI = async () => {
    setLoading(true);
    const result = await getInsts(page + "&sortBy=" + sort);
    const newData = result.data.content;
    console.log(newData);
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
        window.innerHeight + Math.ceil(document.documentElement.scrollTop) >=
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
  }, [page, loading, sort]);

  const handleProvinceChange = (e) => {
    districtAPI(e.target.value);
    setProvince(e.target.value);
  };

  const handleDistrictChange = (e) => {
    setDistrict(e.target.value);
  };

  useEffect(() => {
    provinceAPI();
    instsAPI();
  }, []);

  return (
    <Div>
      <h1>동물등록 대행기관</h1>

      <div className="header">동물등록 대행기관</div>

      <div className="search-area">
        <div className="keyword">
          <select>
            <option>기관명</option>
            <option>주소</option>
            <option>대표자명</option>
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

      {/* <div className="sort-total">
        <div className="sorting">
          <span>정렬</span>
          <select onChange={(e) => setSort(e.target.value)}>
            <option value="1">기관명 오름차순</option>
            <option value="2">기관명 내림차순</option>
            <option value="3">주소 오름차순</option>
            <option value="4">주소 내림차순</option>
          </select>
        </div>
        <span>총 {insts.totalElements}건</span>
      </div> */}

      {insts?.map((inst) => (
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

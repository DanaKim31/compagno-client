import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getInsts,
  getProvinces,
  getDistricts,
} from "../../api/registerPetBoard";
import { BiSolidCopy } from "react-icons/bi";
import styled from "styled-components";
import Toast from "../../components/registerPet/Toast";

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
  position: relative;

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
    position: relative;

    .title {
      display: flex;
      line-height: 30px;
    }
    span {
      margin-right: 10px;
      font-weight: bolder;
      color: darkgrey;
    }

    #addr {
      display: flex;
      align-items: center;

      svg {
        margin-bottom: 16px;
        margin-left: 5px;
        margin-right: 10px;
        color: gray;
      }

      svg:hover {
        color: black;
        cursor: pointer;
      }
    }

    .toast {
    }
  }
`;

const RegisterPetInsts = () => {
  const [insts, setInsts] = useState([]);
  const [toast, setToast] = useState(false);
  const [addr, setAddr] = useState("");
  // ========================== 유저 ==========================
  const dispatch = useDispatch();
  const user = useSelector((state) => {
    return state.user;
  });
  // ========================== 페이징 ==========================
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const instsAPI = async () => {
    setLoading(true);
    const result = await getInsts(page);
    const newData = result.data.content;
    console.log(newData);
    setInsts((prev) => [...prev, ...newData]);
    setPage((prev) => prev + 1);
    setLoading(false);
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
  }, [page, loading]);

  useEffect(() => {
    instsAPI();
  }, []);

  const copyAddr = async (instId, addr) => {
    await navigator.clipboard.writeText(addr);
    setToast((prev) => ({ ...prev, [instId]: true }));
  };

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
            <div id="addr">
              <p>{inst.regiInstAddr}</p>
              <BiSolidCopy
                onClick={() => copyAddr(inst.regiBoardCode, inst.regiInstAddr)}
              />
              {toast[inst.regiBoardCode] && (
                <Toast
                  setToast={(value) =>
                    setToast((prev) => ({
                      ...prev,
                      [inst.regiBoardCode]: value,
                    }))
                  }
                  text="클립보드에 복사되었습니다!"
                />
              )}
            </div>
          </div>
        </div>
      ))}
    </Div>
  );
};

export default RegisterPetInsts;

import { useState, useEffect } from "react";
import { getInsts } from "../../api/registerPetBoard";
import styled from "styled-components";
import { location } from "../../assets/location";

const Div = styled.div`
  width: 90%;
  margin: auto;

  h1 {
    font-size: 2.5rem;
    margin-bottom: 100px;
  }
  .search-area {
    background: lightgrey;
    padding: 20px;
    margin-bottom: 30px;
    border-radius: 5px;
    box-shadow: 0px 0px 5px #444;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;

    select,
    input {
      width: 90%;
      height: 40px;
      margin: auto;
      margin-bottom: 20px;
      padding: 0 5px;
      border-radius: 5px;
    }

    select {
      border: 1px solid grey;
    }

    button {
      width: 90%;
      height: 40px;
      margin: auto;
      background: black;
      color: white;
      border-radius: 5px;
      border: 1px solid black;
    }
  }

  @media screen and (min-width: 800px) {
    .search-area {
      flex-direction: row;

      select,
      input {
        width: 30%;
        margin-bottom: 0;
        margin-right: 10px;
      }

      button {
        width: 10%;
      }
    }
  }
  /* table {
    width: 90%;
    margin: auto;
  }
  th {
    font-weight: bolder;
    text-align: center;
    height: 40px;
  }
  td {
    text-align: center;
    margin-bottom: 20px;
  }
  tbody tr :nth-child(3) {
    text-align: left;
  } */
  .list {
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

  const instsAPI = async () => {
    const result = await getInsts();
    console.log(result.data);
    setInsts(result.data);
  };

  useEffect(() => {
    instsAPI();
    location();
  }, []);

  return (
    <Div>
      <h1>동물등록 대행기관</h1>

      <div className="search-area">
        <select name="sido1" id="sido1"></select>
        <select name="gugun1" id="gugun1"></select>
        <input id="seach-input" placeholder="검색어 입력" />
        <button>조회</button>
      </div>

      {/* <table>
        <thead>
          <tr>
            <th>no</th>
            <th>기관명</th>
            <th>기관주소</th>
            <th>대표자명</th>
            <th>전화번호</th>
          </tr>
        </thead>
        <tbody>
          {insts.map((inst) => (
            <tr key={inst.regiBoardCode}>
              <td>{inst.regiBoardCode}</td>
              <td>{inst.regiInstName}</td>
              <td>{inst.regiInstAddr}</td>
              <td>{inst.regiInstOwner}</td>
              <td>{inst.regiInstPhone}</td>
            </tr>
          ))}
        </tbody>
      </table> */}

      {insts.map((inst) => (
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

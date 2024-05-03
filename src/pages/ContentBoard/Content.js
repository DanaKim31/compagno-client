import styled from "styled-components";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Div = styled.div`
  position: relative;
  top: 200px;
`;

const Content = () => {
  const navigate = useNavigate();
  const [mainCate, setMainCate] = useState(0);
  const [subCate, setSubCate] = useState(0);
  const [filterCate, setFilterCate] = useState([]);
  const [mainReg, setMainReg] = useState(0);
  const [keyword, setKeyword] = useState("");

  //   const [filterReg, setFilterReg] = useState([]);

  const selectMainCate = [
    { value: 0, name: "카테고리 선택" },
    { value: 1, name: "반려의료" },
    { value: 2, name: "반려동반여행" },
    { value: 3, name: "반려동물 식당 카페" },
    { value: 4, name: "반려동물 서비스" },
  ];

  // 셀렉트 박스 (mainCate onChange=> filter 처리..)
  const selectSubCate = [
    { value: 0, name: "서브 카테고리 선택" },
    { value: 1, name: "동물약국", parent: 1 },
    { value: 2, name: "동물병원", parent: 1 },
    { value: 3, name: "미술관", parent: 2 },
    { value: 4, name: "문예회관", parent: 2 },
    { value: 5, name: "펜션", parent: 2 },
    { value: 6, name: "여행지", parent: 2 },
    { value: 7, name: "박물관", parent: 2 },
    { value: 8, name: "카페", parent: 3 },
    { value: 9, name: "식당", parent: 3 },
    { value: 10, name: "반려동물용품", parent: 4 },
    { value: 11, name: "미용", parent: 4 },
    { value: 12, name: "위탁관리", parent: 4 },
  ];

  const handleselectMainCate = (e) => {
    const code = Number(e.target.value);
    setMainCate(code);
    setFilterCate(
      selectSubCate.filter(
        (item) => item.parent === code || item.parent === undefined
      )
    );
  };

  const handleselectSubCate = (e) => {
    setSubCate(e.target.value);
  };

  const selectMainReg = [
    { value: 0, name: "시도 선택" },
    { value: 1, name: "경기도" },
    { value: 2, name: "서울특별시" },
    { value: 3, name: "인천광역시" },
    { value: 4, name: "세종특별자치시" },
    { value: 5, name: "강원도" },
    { value: 6, name: "부산광역시" },
    { value: 7, name: "광주광역시" },
    { value: 8, name: "경상북도" },
    { value: 9, name: "전라북도" },
    { value: 10, name: "대구광역시" },
    { value: 11, name: "전라남도" },
    { value: 12, name: "경상남도" },
    { value: 13, name: "제주특별자치도" },
    { value: 14, name: "충청남도" },
    { value: 15, name: "대전광역시" },
    { value: 16, name: "울산광역시" },
    { value: 17, name: "충청북도" },
  ];

  const handleselectMainReg = (e) => {
    const code = Number(e.target.value);
    setMainReg(code);
  };

  useEffect(() => {
    if (mainReg !== 0) {
    }
  }, [mainReg]);

  const filtering = () => {
    navigate(
      `/compagno/content/list?mainCate=${mainCate}&subCate=${subCate}&mainReg=${mainReg}&keyword=${keyword}`
    );
  };
  return (
    <>
      <Div>
        {/* select... */}
        <div>
          <span>메인 카테고리</span>
          <select onChange={handleselectMainCate} value={mainCate}>
            {selectMainCate.map((item) => {
              return (
                <option value={item.value} key={item.value}>
                  {item.name}
                </option>
              );
            })}
          </select>

          {mainCate !== 0 ? (
            <>
              <span>서브 카테고리</span>
              <select onChange={handleselectSubCate} value={subCate}>
                {filterCate.map((item) => {
                  return (
                    <option value={item.value} key={item.value}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
            </>
          ) : (
            <></>
          )}

          {subCate !== 0 ? (
            <>
              <span>지역</span>
              <select onChange={handleselectMainReg} value={mainReg}>
                {selectMainReg.map((item) => {
                  return (
                    <option value={item.value} key={item.value}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
            </>
          ) : (
            <></>
          )}

          {mainReg !== 0 ? (
            <>
              <div>
                <Form.Control
                  type="text"
                  placeholder="검색어를 입력하세요"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />
                <Button onClick={filtering}>조회</Button>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </Div>
    </>
  );
};

export default Content;

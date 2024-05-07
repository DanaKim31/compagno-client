import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userSave } from "../../store/user";
import { useSelector, useDispatch } from "react-redux";
import {
  registerSitterBoard,
  getCategories,
  getProvinces,
  getDistricts,
} from "../../api/sitterBoard";
import { Button, Form } from "react-bootstrap";
import styled from "styled-components";

const Div = styled.div`
  width: 90%;
  margin: auto;
  display: flex;
  flex-direction: column;

  h1 {
    font-size: 2.5rem;
    margin-bottom: 100px;
  }

  .btn {
    display: flex;
    justify-content: right;
    margin-left: 20px;
  }
`;

const SitterCreate = () => {
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

  const [sitterBoard, setSitterBoard] = useState({});
  const [sitterCategories, setSitterCategories] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState([]);
  const [province, setProvince] = useState(0);
  const [district, setDistrict] = useState(0);
  const navigate = useNavigate();

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

  const cancelBtn = () => {
    alert("🚨 작성한 내용이 저장되지 않고 목록으로 돌아갑니다.");
    navigate("/compagno/sitterBoard");
  };
  const registerBtn = async () => {
    await registerSitterBoard(sitterBoard);
    navigate("/compagno/sitterBoard");
  };

  return (
    <Div>
      <h1>시터 게시글 등록</h1>

      <Form>
        {["radio"].map((type) => (
          <div key={`inline-${type}`} className="mb-3">
            {/* {sitterCategories.map((category) => (
              <Form.Check
                inline
                label={category.sitterCategoryType}
                name="group1"
                type={type}
                id={`inline-${type}-1`}
                key={category.sitterCategoryCode}
                value={category.sitterCategoryCode}
              />
            ))} */}
            <Form.Check
              inline
              label="구인"
              name="group1"
              type={type}
              id={`inline-${type}-1`}
            />
            <Form.Check
              inline
              label="구직"
              name="group1"
              type={type}
              id={`inline-${type}-2`}
            />
          </div>
        ))}
      </Form>

      <div className="location-search">
        <div id="province">
          <span>시/도</span>
          <select onChange={handleProvinceChange}>
            <option value="">전체</option>
            {selectedProvince.map((province) => (
              <option key={province.locationCode} value={province.locationCode}>
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

      <input
        type="text"
        placeholder="제목 입력"
        value={sitterBoard.sitterTitle}
        onChange={(e) =>
          setSitterBoard((prev) => ({ ...prev, sitterTitle: e.target.value }))
        }
      />
      <input
        type="text"
        placeholder="내용 입력"
        value={sitterBoard.sitterContent}
        onChange={(e) =>
          setSitterBoard((prev) => ({ ...prev, sitterContent: e.target.value }))
        }
      />
      <Form.Group controlId="formFileMultiple" className="mb-3">
        <Form.Label>파일첨부</Form.Label>
        <Form.Control type="file" multiple />
      </Form.Group>

      <div className="btn">
        <Button variant="outline-secondary" onClick={cancelBtn}>
          취소
        </Button>
        <Button variant="outline-dark" onClick={registerBtn}>
          등록
        </Button>
      </div>
    </Div>
  );
};

export default SitterCreate;

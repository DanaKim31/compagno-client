import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userSave } from "../../store/user";
import { useSelector, useDispatch } from "react-redux";
import {
  registerNeighborBoard,
  getAnimalCategories,
  getProvinces,
  getDistricts,
} from "../../api/neighborBoard";
import { Button, Form } from "react-bootstrap";
import moment from "moment";
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
  display: flex;
  flex-direction: column;

  h1 {
    font-size: 2.5rem;
    margin-bottom: 100px;
  }

  .header {
    display: flex;
    justify-content: center;
    line-height: 80px;
    font-size: 2rem;
    border: 3px dashed #455c58ff;
    border-radius: 15px;
    margin-bottom: 60px;
  }

  .board {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;

    span {
      display: inline-block;
      width: 100px;
      margin: 5px 30px 5px 40px;
      border-right: 2px solid #455c58ff;
    }

    .location-category {
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 50px;

      select {
        height: 38px;
        width: 185px;
        padding-left: 10px;
        margin-right: 50px;
        border-radius: 5px;
      }
    }

    .information {
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 20px;
      padding-bottom: 50px;

      input {
        padding-left: 10px;
        border-radius: 5px;
        border: 1px solid gray;
        margin-right: 50px;
        background: #f6f6f6ff;
      }

      .writer {
        display: flex;
        flex-direction: row;
      }

      .register-date {
        display: flex;
        flex-direction: row;
      }
    }

    .board-title {
      width: 100%;
      display: flex;
      flex-direction: column;
      margin-bottom: 30px;

      span {
        border: none;
        padding-bottom: 10px;
      }

      input {
        width: 90%;
        line-height: 35px;
        padding-left: 10px;
        border-radius: 5px;
        border: 1px solid gray;
        margin-left: 40px;
      }
    }

    .board-content {
      display: flex;
      flex-direction: column;
      margin-bottom: 40px;

      span {
        border: none;
        padding-bottom: 10px;
      }

      .content-input {
        width: 90%;
        padding-left: 10px;
        border-radius: 5px;
        border: 1px solid gray;
        margin-left: 40px;
      }
    }

    .upload-btn {
      display: none;
    }
    .upload-btn-custom {
      color: #455c58ff;
      padding: 5px 10px;
      border: 1px solid #455c58ff;
      border-radius: 5px;
      cursor: pointer;
    }
    .upload-btn-custom:hover {
      background: #455c58ff;
      color: white;
    }

    .uploaded-images {
      width: 100%;
      height: 300px;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;

      img {
        height: 200px;
        padding: 0 10px;
        margin-top: 20px;
      }
    }
  }

  .btn {
    display: flex;
    justify-content: center;
    margin-bottom: 40px;

    Button {
      width: 90px;
    }

    #cancel-btn {
      margin-right: 20px;
    }
  }
`;

const NeighborCreate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // =================== 유저정보 ===================
  const user = useSelector((state) => {
    return state.user;
  });

  // =================== 오늘 날짜 ===================
  const [today, setToday] = useState("");
  const dateInformation = () => {
    const today = moment().format("YYYY-MM-DD");
    setToday(today);
  };

  useEffect(() => {
    dateInformation();
  }, []);

  // =================== 게시글 등록 ===================
  const [neighborBoard, setNeighborBoard] = useState({});
  const [animalCategories, setAnimalCategories] = useState([]);
  const [animalCategory, setAnimalCategory] = useState("");
  const [selectedProvince, setSelectedProvince] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState([]);
  const [province, setProvince] = useState(0);
  const [district, setDistrict] = useState(0);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState([]);

  const [imgSrc, setImgSrc] = useState([]);
  const registerImage = (e) => {
    const images = Array.from(e.target.files);
    setFiles(images);

    let file;
    for (let i = 0; i < images.length; i++) {
      file = images[i];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        files[i] = reader.result;
        setImgSrc([...files]);
      };
    }
  };

  const registerBoard = async () => {
    const formData = new FormData();
    formData.append("animalCategoryCode", animalCategory);
    formData.append("locationCode", district);
    formData.append("neighborBoardTitle", title);
    formData.append("neighborBoardContent", content);
    formData.append("userId", user.userId);
    files.forEach((file, index) => {
      formData.append(`files[${index}]`, file);
    });

    await registerNeighborBoard(formData);
    navigate("/compagno/neighborBoard");
  };

  const animalCategoryAPI = async () => {
    const result = await getAnimalCategories();
    setAnimalCategories(result.data);
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
    const token = localStorage.getItem("token");
    if (token !== null) {
      dispatch(userSave(JSON.parse(localStorage.getItem("user"))));
    }
    animalCategoryAPI();
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
    navigate("/compagno/neighborBoard");
  };

  const registerBtn = async () => {
    await registerNeighborBoard(neighborBoard);
    navigate("/compagno/neighborBoard");
  };

  return (
    <Div>
      <h1>우리동네 게시글 등록</h1>

      <div className="header">우리동네 게시글 등록</div>

      <div className="board">
        <div className="location-category">
          <div id="province">
            <span id="title">시/도</span>
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
            <span id="title">시/군/구</span>
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

          <div id="animal-category">
            <span id="title">반려동물</span>
            <select onChange={(e) => setAnimalCategory(e.target.value)}>
              <option>전체</option>
              {animalCategories.map((animalCategory) => (
                <option
                  key={animalCategory.animalCategoryCode}
                  value={animalCategory.animalCategoryCode}
                >
                  {animalCategory.animalType}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="information">
          <div className="writer">
            <span id="title">작성자</span>
            <input type="text" value={user.userId} readOnly />
          </div>

          <div className="register-date">
            <span id="title">작성일</span>
            <input type="text" value={today} readOnly />
          </div>
        </div>

        <div className="board-title">
          <span id="title">제목</span>
          <input
            type="text"
            placeholder="제목 입력"
            value={neighborBoard.neighborBoardTitle}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>

        <div className="board-content">
          <span id="title">내용</span>
          <Form.Control
            className="content-input"
            as="textarea"
            placeholder="내용 입력"
            value={neighborBoard.neighborBoardContent}
            onChange={(e) => {
              setContent(e.target.value);
            }}
          />
        </div>

        <div className="image">
          <span id="title">이미지</span>
          <input
            type="file"
            accept="image/*"
            multiple
            id="upload-btn"
            className="upload-btn"
            onChange={registerImage}
          />
          <label htmlFor="upload-btn" className="upload-btn-custom">
            사진 업로드
          </label>
          <div className="uploaded-images">
            {imgSrc.map((img, i) => (
              <img src={img} key={i} />
            ))}
          </div>
        </div>
      </div>

      <div className="btn">
        <Button variant="outline-secondary" id="cancel-btn" onClick={cancelBtn}>
          취소
        </Button>
        <Button
          variant="outline-dark"
          onClick={() => {
            registerBoard();
          }}
        >
          등록
        </Button>
      </div>
    </Div>
  );
};

export default NeighborCreate;

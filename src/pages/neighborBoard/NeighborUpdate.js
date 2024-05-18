import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userSave } from "../../store/user";
import {
  getAnimalCategories,
  getProvinces,
  getDistricts,
  updateNeighborBoard,
  getNeighborBoard,
} from "../../api/neighborBoard";
import Form from "react-bootstrap/Form";
import moment from "moment";
import { IoClose } from "react-icons/io5";
import { Button } from "react-bootstrap";
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
    width: 100%;
    display: flex;
    justify-content: center;
    margin: auto;
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

      div {
        margin-bottom: 20px;
      }

      select {
        height: 38px;
        width: 200px;
        padding-left: 10px;
        margin-right: 50px;
        border-radius: 5px;
      }

      input {
        height: 38px;
        padding-left: 10px;
        border-radius: 5px;
        border: 1px solid gray;
        margin-right: 50px;
        background: #f6f6f6ff;
      }
    }

    .information {
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 20px;
      padding-bottom: 50px;

      div {
        margin-bottom: 20px;
      }

      input {
        height: 38px;
        padding-left: 10px;
        border-radius: 5px;
        border: 1px solid gray;
        margin-right: 50px;
        background: #f6f6f6ff;
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
        width: 95%;
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
        width: 95%;
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
      width: 95%;
      height: 300px;
      margin-left: 40px;
      margin-top: 20px;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      border-top: 1px solid lightgray;

      .image-list {
        position: absolute;

        svg {
          position: absolute;
          background: lightgray;
          top: 30px;
          right: 22px;
          padding: 1px;
          font-weight: bold;
          font-size: 1.3rem;
          border-radius: 50%;
          cursor: pointer;
        }

        svg:hover {
          background: white;
        }
      }

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

const NeighborUpdate = () => {
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
  const viewNeighborBoard = async () => {
    const response = (await getNeighborBoard(code)).data;
    console.log(response);
    setAnimalCategory(response.animalCategoryCode.animalCategoryCode);
    // setSelectedProvince(response.location.parent.locationCode);
    setSelectedDistrict(response.location.locationCode);
    setRegisterDate(response.neighborBoardRegiDate);
    setUpdateDate(response.neighborBoardUpdateDate);
    setTitle(response.neighborBoardTitle);
    setContent(response.neighborBoardContent);
    setPrevImgSrc(response.images);
    setPrevImg(response.images);
  };
  const { code } = useParams();
  const [animalCategories, setAnimalCategories] = useState([]);
  const [animalCategory, setAnimalCategory] = useState("");
  const [selectedProvince, setSelectedProvince] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState([]);
  const [province, setProvince] = useState(0);
  const [district, setDistrict] = useState(0);
  const [registerDate, setRegisterDate] = useState("");
  const [updateDate, setUpdateDate] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState([]);
  const [imgSrc, setImgSrc] = useState([]);
  const [prevImg, setPrevImg] = useState([]);
  const [prevImgSrc, setPrevImgSrc] = useState([]);

  console.log(title);
  console.log(selectedDistrict);
  const updateBoard = async () => {
    const formData = new FormData();
    formData.append("neighborBoardCode", code);
    formData.append("animalCategoryCode", animalCategory);
    formData.append("selectedDistrict", selectedDistrict);
    formData.append("neighborBoardRegiDate", registerDate);
    formData.append("neighborBoardUpdateDate", updateDate);
    formData.append("neighborBoardTitle", title);
    formData.append("neighborBoardContent", content);
    formData.append("user", user.userId);
    files.forEach((file, index) => {
      formData.append(`files[${index}]`, file);
    });
    prevImgSrc.forEach((image, index) => {
      console.log(image);
      formData.append(`images[${index}]`, image.neighborImage);
    });

    await updateNeighborBoard(formData);
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
    viewNeighborBoard();
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

  const registerImage = (e) => {
    const images = Array.from(e.target.files);
    setFiles(images);

    let file;
    for (let i = 0; i < images.length; i++) {
      file = images[i];
      const reader = new FileReader();
      reader.onloadend = () => {
        files[i] = reader.result;
        setImgSrc([...files]);
      };
      reader.readAsDataURL(file);
    }
  };

  const deletePrevSrc = (code) => {
    const images = prevImgSrc.filter(
      (image) => image.neighborImageCode !== code
    );
    setPrevImgSrc(images);
  };

  const deleteImage = (code) => {
    let newImgSrc = [...imgSrc];
    newImgSrc.splice(code, 1);
    setImgSrc(newImgSrc);
  };

  const cancelBtn = () => {
    alert("🚨 작성한 내용이 저장되지 않습니다.");
    navigate("/compagno/neighborBoard/detail/" + code);
  };

  return (
    <Div>
      <h1>우리동네 게시판 글 수정</h1>

      <div className="header">우리동네 게시글 수정</div>

      <div className="board">
        <div className="location-category">
          <div id="province">
            <span id="title">시/도</span>
            <select onChange={handleProvinceChange}>
              {/* {selectedProvince?.map((province) => (
            <option key={province.locationCode} value={province.locationCode}>
              {province.locationName}
            </option>
          ))} */}
            </select>
          </div>

          <div id="district">
            <span id="title">시/군/구</span>
            {/* {selectedProvince && ( */}
            <select onChange={handleDistrictChange}>
              {/* <option value="">전체</option>
            {selectedDistrict?.map((district) => (
              <option key={district.locationCode} value={district.locationCode}>
                {district.locationName}
              </option>
            ))} */}
            </select>
            {/* )} */}
          </div>

          <div id="animal-category">
            <span id="title">반려동물</span>
            <select
              defaultValue={animalCategory}
              onChange={(e) => {
                setAnimalCategory(e.target.value);
              }}
            >
              {animalCategories?.map((animalCategory) => (
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
            <input type="text" value={user.userNickname || ""} readOnly />
          </div>

          <div className="register-date">
            <span id="title">작성일</span>
            <input
              type="text"
              value={
                `${new Date(registerDate).getFullYear()}-${new Date(
                  registerDate
                ).getMonth()}-${new Date(registerDate).getDate()}   ${new Date(
                  registerDate
                ).getHours()}:${new Date(registerDate).getMinutes()}` || ""
              }
              readOnly
            />
          </div>

          <div className="update-date">
            <span id="title">수정일</span>
            <input type="text" value={today || ""} readOnly />
          </div>
        </div>

        <div className="board-title">
          <span id="title">제목</span>
          <input
            type="text"
            placeholder="제목 입력"
            value={title || ""}
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
            value={content || ""}
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
              <div className="new-images image-list" key={i}>
                <img src={img} key={i} />
                <IoClose
                  onClick={() => {
                    deleteImage(i);
                  }}
                />
              </div>
            ))}
            {prevImgSrc.map((img, i) => (
              <div
                className="prev-images image-list"
                key={img.neighborImageCode}
              >
                <img src={"http://localhost:8081" + img.neighborImageCode} />
                <IoClose onClick={() => deletePrevSrc(img.neighborImageCode)} />
              </div>
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
            updateBoard();
          }}
        >
          수정
        </Button>
      </div>
    </Div>
  );
};

export default NeighborUpdate;

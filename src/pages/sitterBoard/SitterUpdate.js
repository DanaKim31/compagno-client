import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userSave } from "../../store/user";
import {
  getCategories,
  getAnimalCategories,
  getProvinces,
  getDistricts,
  updateSitterBoard,
  getSitterBoard,
} from "../../api/sitterBoard";
import Form from "react-bootstrap/Form";
import moment from "moment";
import { IoClose } from "react-icons/io5";
import { Button } from "react-bootstrap";
import styled from "styled-components";
import "moment/locale/ko";

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

const SitterUpdate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // =================== 유저정보 ===================
  const user = useSelector((state) => {
    return state.user;
  });

  const viewSitterBoard = async () => {
    const response = (await getSitterBoard(code)).data;
    setBoardCategory(response.sitterCategory.sitterCategoryCode);
    setAnimalCategory(response.animalCategoryCode.animalCategoryCode);
    setSelectedDistrict(response.location.locationCode);
    setRegisterDate(response.sitterRegiDate);
    setTitle(response.sitterTitle);
    setContent(response.sitterContent);
    setPrevImgSrc(response.images);
    setPrevImg(response.images);
  };

  const { code } = useParams();
  const [sitterBoard, setSitterBoard] = useState({});
  const [sitterCategories, setSitterCategories] = useState([]);
  const [boardCategory, setBoardCategory] = useState("");
  const [animalCategories, setAnimalCategories] = useState([]);
  const [animalCategory, setAnimalCategory] = useState("");
  const [selectedProvince, setSelectedProvince] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState([]);
  const [registerDate, setRegisterDate] = useState("");

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState([]);
  const [imgSrc, setImgSrc] = useState([]);
  const [prevImg, setPrevImg] = useState([]);
  const [prevImgSrc, setPrevImgSrc] = useState([]);
  const currentUpdateDate = moment().format("yyyy-MM-DD HH:mm:ss");

  const updateBoard = async () => {
    const currentUpdateDate = moment().format("yyyy-MM-DD HH:mm:ss");

    const formData = new FormData();
    formData.append("sitterBoardCode", code);
    formData.append("sitterCategory", boardCategory);
    formData.append("animalCategoryCode", animalCategory);
    formData.append("locationCode", selectedDistrict);
    formData.append("sitterUpdateDate", currentUpdateDate);
    formData.append("sitterTitle", title);
    formData.append("sitterContent", content);
    formData.append("userId", user.userId);
    files.forEach((file, index) => {
      formData.append(`files[${index}]`, file);
    });
    prevImgSrc.forEach((image, index) => {
      console.log(image);
      formData.append(`images[${index}]`, image.sitterImg);
    });

    await updateSitterBoard(formData);
    navigate("/compagno/sitterBoard");
  };

  const sitterBoardAPI = async () => {
    const result = await getSitterBoard(code);
    setSitterBoard(result.data);
  };

  const categoryAPI = async () => {
    const result = await getCategories();
    setSitterCategories(result.data);
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
    sitterBoardAPI(code);
    viewSitterBoard();
    categoryAPI();
    animalCategoryAPI();
    provinceAPI();
  }, []);

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
    const images = prevImgSrc.filter((image) => image.sitterImgCode !== code);
    setPrevImgSrc(images);
  };

  const deleteImage = (code) => {
    let newImgSrc = [...imgSrc];
    newImgSrc.splice(code, 1);
    setImgSrc(newImgSrc);
  };

  const cancelBtn = () => {
    alert("🚨 작성한 내용이 저장되지 않습니다.");
    navigate("/compagno/sitterBoard/detail/" + code);
  };

  return (
    <Div>
      <h1>시터 게시글 수정</h1>

      <div className="header">시터 게시글 수정</div>

      <div className="board">
        <div className="location-category">
          <div id="province">
            <span id="title">시/도</span>
            <input
              value={sitterBoard.location?.parent?.locationName}
              readOnly
            />
          </div>

          <div id="district">
            <span id="title">시/군/구</span>
            <input value={sitterBoard.location?.locationName} readOnly />
          </div>

          <div id="sitter-category">
            <span id="title">카테고리</span>
            <select
              defaultValue={boardCategory}
              onChange={(e) => {
                setBoardCategory(e.target.value);
              }}
            >
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
              value={moment(registerDate).format("YYYY-MM-DD HH:mm")}
              readOnly
            />
          </div>

          <div className="update-date">
            <span id="title">수정일</span>
            <input
              type="text"
              value={moment(currentUpdateDate).format("YYYY-MM-DD")}
              readOnly
            />
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
              <div className="prev-images image-list" key={img.sitterImgCode}>
                <img src={"http://localhost:8081" + img.sitterImg} />
                <IoClose onClick={() => deletePrevSrc(img.sitterImgCode)} />
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
export default SitterUpdate;

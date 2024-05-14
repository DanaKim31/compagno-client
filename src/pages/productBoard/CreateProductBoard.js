import styled from "styled-components";
import { FaStar, FaStarHalfAlt, FaRegStar, FaRegImage } from "react-icons/fa";
import { FaRegCircleXmark } from "react-icons/fa6";
import { useState, useEffect, useRef } from "react";
import { Form, Button } from "react-bootstrap";
import { userSave } from "../../store/user";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addProductBoard, getAnimalCategories } from "../../api/productBoard";

const Main = styled.main`
  width: 1900px;
  padding: 0px 300px;
  padding-top: 120px;
  background-color: rgb(244, 244, 244);
  font-family: "TAEBAEKmilkyway";
  font-weight: bold;
  padding-bottom: 100px;

  input,
  select,
  button,
  option,
  textarea {
    font-weight: bold;
  }

  @font-face {
    font-family: "TAEBAEKmilkyway";
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2310@1.0/TAEBAEKmilkyway.woff2")
      format("woff2");

    font-weight: normal;
    font-style: normal;
  }

  textarea {
    resize: none;
  }
  .createDiv {
    width: 100%;
  }
  .titleInput {
    margin-bottom: 15px;
  }

  .linkLogo {
    font-size: 2.5rem;
    font-weight: bold;
    cursor: pointer;
    margin-bottom: 30px;
    color: black;
    text-decoration: none;
  }

  .linkLogo:hover {
    color: mediumblue;
  }

  .starLeftSpan {
    position: absolute;
    width: 24px;
    height: 48px;
    overflow: hidden;
    left: 0px;
  }
  .starRightSpan {
    position: absolute;
    width: 24px;
    height: 48px;
    overflow: hidden;
    right: 0px;
  }
  .starDiv {
    width: 48px;
    height: 48px;
    position: relative;
    display: flex;
    cursor: pointer;
  }
  .star {
    font-size: 3rem;
    color: orangered;
  }
  .starHalf {
    font-size: 3rem;
    color: orangered;
    padding-top: 3px;
    padding: 1.8px 1.8px;
  }
  .gradeDiv {
    display: inline-flex;
    flex-direction: row;
    line-height: 50px;
    margin-left: 15px;
  }

  .imagesDiv {
    display: flex;
  }
  .mainImageDiv,
  .nullMainImageDiv {
    width: 560px;
    height: 420px;
    border: 1px solid black;
    margin-left: 20px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: relative;
    border-radius: 10px;
    img {
      width: 100%;
      height: 100%;
      border-radius: 8px;
    }
  }

  .mainImageDiv {
    svg {
      position: absolute;
      font-size: 2rem;
      top: 10px;
      right: 10px;
      cursor: pointer;
    }
  }

  .nullMainImageDiv {
    cursor: pointer;
    svg {
      font-size: 3rem;
    }
    span {
      font-weight: bold;
    }
  }

  .productInpoDiv {
    margin-top: 30px;
    margin-bottom: 30px;
  }

  .imageSpan {
    position: relative;
    width: 300px;
    height: 200px;
    margin: 0px 10px;
    margin-bottom: 10px;
    border-radius: 10px;
    border: 1px solid black;

    img {
      width: 100%;
      height: 100%;
      border-radius: 10px;
    }
    svg {
      position: absolute;
      top: 10px;
      right: 10px;
      font-size: 1.5rem;
      color: #212121;
      cursor: pointer;
    }
  }
  .inpoInputDiv {
    width: 700px;
    float: right;
    padding-top: 110px;
    input,
    select {
      display: inline;
      width: 200px;
      margin: 10px;
    }
    .nameInput {
      width: 400px;
    }
  }

  .productContent {
    margin-top: 10px;
  }

  .productImage {
    margin-top: 10px;
  }

  .writeCancle,
  .boardWrite {
    float: right;
    width: 100px;
    height: 40px;
  }

  .writeCancle {
    margin-right: 15px;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const CreateProductBoard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => {
    return state.user;
  });

  const [title, setTitle] = useState("");
  const [grade, setGrade] = useState(0);
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState(0);
  const [animal, setAnimal] = useState(0);
  const [content, setContent] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productMainFile, setProductMainFile] = useState({});
  const [files, setFiles] = useState([]);

  const [imgSrc, setImgSrc] = useState([]);

  const [animalCategories, setAnimalCategories] = useState([]);

  const viewAnimalCategory = async () => {
    const response = await getAnimalCategories();
    setAnimalCategories(response.data);
  };

  const imageCreate = (e) => {
    const images = Array.from(e.target.files);
    if (images.length > 4) {
      alert("이미지는 최대 4장 까지 등록 가능합니다");
      e.target.value = "";
      setFiles([]);
      setImgSrc([]);
    } else {
      setFiles(images);

      let file;
      if (files.length > images.length) {
        files.splice(images.length);
      }
      for (let i = 0; i < images.length; i++) {
        file = images[i];
        const reader = new FileReader();
        reader.onloadend = () => {
          files[i] = reader.result;
          setImgSrc([...files]);
        };
        reader.readAsDataURL(file);
      }
      if (images.length === 0) {
        setImgSrc([]);
        setFiles([]);
      }
    }
  };

  const [mainImgSrc, setMainImgSrc] = useState("");
  const mainImageCreate = (e) => {
    if (e.target.files[0] instanceof File) {
      setProductMainFile(e.target.files[0]);
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setMainImgSrc(reader.result);
      };
    }
  };

  const createBoard = async () => {
    if (title === "") {
      alert("제목을 입력해주세요");
      return false;
    } else if (productName == "") {
      alert("제품명을 입력해주세요");
      return false;
    } else if (productCategory == "") {
      alert("제품 분류를 입력해주세요");
      return false;
    } else if (animal == "") {
      alert("사용 동물을 선택해주세요");
      return false;
    } else if (price == "") {
      alert("가격을 입력해주세요");
      return false;
    } else if (grade == "") {
      alert("평점을 입력해주세요");
      return false;
    } else if (content == "") {
      alert("내용을 입력해주세요");
      return false;
    } else if (files.length !== 0 && JSON.stringify(productMainFile) === "{}") {
      alert("썸네일로 사용할 이미지를 선택해주세요");
      return false;
    }
    const formData = new FormData();
    formData.append("productBoardTitle", title);
    formData.append("productName", productName);
    formData.append("productPrice", price);
    formData.append("productBoardGrade", grade);
    formData.append("productBoardContent", content);
    formData.append("animalCategoryCode", animal);
    formData.append("productCategory", productCategory);
    formData.append("userId", user.userId);

    if (productMainFile instanceof File) {
      formData.append("productMainFile", productMainFile);
    }

    files.forEach((file, index) => {
      formData.append(`files[${index}]`, file);
    });

    await addProductBoard(formData);

    navigate("/compagno/product-board");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== null) {
      dispatch(userSave(JSON.parse(localStorage.getItem("user"))));
    }
    viewAnimalCategory();
  }, []);

  const mainSelectImage = useRef("");
  const selectImage = useRef("");

  const deleteImgSrc = (i) => {
    let newImgSrc = [...imgSrc];
    newImgSrc.splice(i, 1);
    setImgSrc(newImgSrc);
  };

  const imageChange = (i) => {
    const dataTransfer = new DataTransfer();
    files
      .filter((file, index) => file != files[i])
      .forEach((file) => {
        dataTransfer.items.add(file);
      });

    selectImage.current.files = dataTransfer.files;
    setFiles(Array.from(selectImage.current.files));
  };

  return (
    <Main>
      <div className="createDiv">
        <Link to={"/compagno/product-board"} className="linkLogo">
          제품 정보 공유 게시판
        </Link>
        <Form.Control
          className="titleInput"
          type="text"
          placeholder="제목"
          size="lg"
          onChange={(e) => {
            if (e.target.value.length > 30) {
              e.target.value = e.target.value.slice(0, 30);
            }
            setTitle(e.target.value.trim());
          }}
        />
        <div className="productInpoDiv">
          <input
            type="file"
            accept="image/*"
            onChange={mainImageCreate}
            style={{ display: "none" }}
            ref={mainSelectImage}
          />
          {mainImgSrc !== "" ? (
            <div className="mainImageDiv">
              <img src={mainImgSrc} />
              <FaRegCircleXmark
                onClick={(e) => {
                  setProductMainFile({});
                  setMainImgSrc("");
                  mainSelectImage.current.value = "";
                }}
              />
            </div>
          ) : (
            <div
              className="nullMainImageDiv"
              onClick={() => mainSelectImage.current.click()}
            >
              <FaRegImage />
              <span>썸네일로 사용할 이미지 업로드</span>
            </div>
          )}
          <div className="inpoInputDiv">
            <Form.Control
              className="nameInput"
              type="text"
              placeholder="제품명"
              onChange={(e) => {
                if (e.target.value.length > 20) {
                  e.target.value = e.target.value.slice(0, 20);
                }
                setProductName(e.target.value.trim());
              }}
            />
            <Form.Control
              className="cateInput"
              type="text"
              onChange={(e) => {
                if (e.target.value.length > 12) {
                  e.target.value = e.target.value.slice(0, 12);
                }
                setProductCategory(e.target.value.trim());
              }}
              placeholder="제품 분류"
            />
            <Form.Select
              className="animalInput"
              defaultValue="default"
              onChange={(e) => {
                setAnimal(e.target.value);
              }}
            >
              <option value="default" disabled="disabled" hidden>
                동물 선택
              </option>
              {animalCategories.map((animalCategory) => (
                <option
                  value={animalCategory.animalCategoryCode}
                  key={animalCategory.animalCategoryCode}
                >
                  {animalCategory.animalType}
                </option>
              ))}
            </Form.Select>

            <Form.Control
              className="priceInput"
              type="Number"
              placeholder="가격"
              onChange={(e) => {
                if (e.target.value.length > 9) {
                  e.target.value = e.target.value.slice(0, 9);
                }
                setPrice(e.target.value.trim());
              }}
            />
            <div className="gradeDiv">
              <p>평점 : </p>
              {grade >= 1 ? (
                <div className="starDiv">
                  <span
                    className="starLeftSpan"
                    onClick={() => setGrade(0.5)}
                  ></span>
                  <span
                    className="starRightSpan"
                    onClick={() => setGrade(1)}
                  ></span>
                  <FaStar className="star" />
                </div>
              ) : grade === 0.5 ? (
                <div className="starDiv">
                  <span
                    className="starLeftSpan"
                    onClick={() => setGrade(0.5)}
                  ></span>
                  <span
                    className="starRightSpan"
                    onClick={() => setGrade(1)}
                  ></span>
                  <FaStarHalfAlt className="starHalf" />
                </div>
              ) : (
                <div className="starDiv">
                  <span
                    className="starLeftSpan"
                    onClick={() => setGrade(0.5)}
                  ></span>
                  <span
                    className="starRightSpan"
                    onClick={() => setGrade(1)}
                  ></span>
                  <FaRegStar className="star" />
                </div>
              )}
              {grade >= 2 ? (
                <div className="starDiv">
                  <span
                    className="starLeftSpan"
                    onClick={() => setGrade(1.5)}
                  ></span>
                  <span
                    className="starRightSpan"
                    onClick={() => setGrade(2)}
                  ></span>
                  <FaStar className="star" />
                </div>
              ) : grade === 1.5 ? (
                <div className="starDiv">
                  <span
                    className="starLeftSpan"
                    onClick={() => setGrade(1.5)}
                  ></span>
                  <span
                    className="starRightSpan"
                    onClick={() => setGrade(2)}
                  ></span>
                  <FaStarHalfAlt className="starHalf" />
                </div>
              ) : (
                <div className="starDiv">
                  <span
                    className="starLeftSpan"
                    onClick={() => setGrade(1.5)}
                  ></span>
                  <span
                    className="starRightSpan"
                    onClick={() => setGrade(2)}
                  ></span>
                  <FaRegStar className="star" />
                </div>
              )}
              {grade >= 3 ? (
                <div className="starDiv">
                  <span
                    className="starLeftSpan"
                    onClick={() => setGrade(2.5)}
                  ></span>
                  <span
                    className="starRightSpan"
                    onClick={() => setGrade(3)}
                  ></span>
                  <FaStar className="star" />
                </div>
              ) : grade === 2.5 ? (
                <div className="starDiv">
                  <span
                    className="starLeftSpan"
                    onClick={() => setGrade(2.5)}
                  ></span>
                  <span
                    className="starRightSpan"
                    onClick={() => setGrade(3)}
                  ></span>
                  <FaStarHalfAlt className="starHalf" />
                </div>
              ) : (
                <div className="starDiv">
                  <span
                    className="starLeftSpan"
                    onClick={() => setGrade(2.5)}
                  ></span>
                  <span
                    className="starRightSpan"
                    onClick={() => setGrade(3)}
                  ></span>
                  <FaRegStar className="star" />
                </div>
              )}
              {grade >= 4 ? (
                <div className="starDiv">
                  <span
                    className="starLeftSpan"
                    onClick={() => setGrade(3.5)}
                  ></span>
                  <span
                    className="starRightSpan"
                    onClick={() => setGrade(4)}
                  ></span>
                  <FaStar className="star" />
                </div>
              ) : grade === 3.5 ? (
                <div className="starDiv">
                  <span
                    className="starLeftSpan"
                    onClick={() => setGrade(3.5)}
                  ></span>
                  <span
                    className="starRightSpan"
                    onClick={() => setGrade(4)}
                  ></span>
                  <FaStarHalfAlt className="starHalf" />
                </div>
              ) : (
                <div className="starDiv">
                  <span
                    className="starLeftSpan"
                    onClick={() => setGrade(3.5)}
                  ></span>
                  <span
                    className="starRightSpan"
                    onClick={() => setGrade(4)}
                  ></span>
                  <FaRegStar className="star" />
                </div>
              )}
              {grade === 5 ? (
                <div className="starDiv">
                  <span
                    className="starLeftSpan"
                    onClick={() => setGrade(4.5)}
                  ></span>
                  <span
                    className="starRightSpan"
                    onClick={() => setGrade(5)}
                  ></span>
                  <FaStar className="star" />
                </div>
              ) : grade === 4.5 ? (
                <div className="starDiv">
                  <span
                    className="starLeftSpan"
                    onClick={() => setGrade(4.5)}
                  ></span>
                  <span
                    className="starRightSpan"
                    onClick={() => setGrade(5)}
                  ></span>
                  <FaStarHalfAlt className="starHalf" />
                </div>
              ) : (
                <div className="starDiv">
                  <span
                    className="starLeftSpan"
                    onClick={() => setGrade(4.5)}
                  ></span>
                  <span
                    className="starRightSpan"
                    onClick={() => setGrade(5)}
                  ></span>
                  <FaRegStar className="star" />
                </div>
              )}
            </div>
          </div>
        </div>
        <div>
          <Form.Control
            as="textarea"
            placeholder="내용 입력"
            rows={20}
            onChange={(e) => {
              if (e.target.value.length > 1900) {
                e.target.value = e.target.value.slice(0, 1900);
              }
              setContent(e.target.value.trim());
            }}
          />
          <div className="productImage">
            이미지 업로드
            <Form.Group controlId="formFileMultiple" className="mb-3">
              <Form.Control
                type="file"
                accept="image/*"
                multiple
                onChange={imageCreate}
                ref={selectImage}
              />
            </Form.Group>
            <div className="imagesDiv">
              {imgSrc.map((img, i) => (
                <span className="imageSpan" key={i}>
                  <img src={img} />
                  <FaRegCircleXmark
                    onClick={() => {
                      deleteImgSrc(i);
                      imageChange(i);
                    }}
                  />
                </span>
              ))}
            </div>
          </div>
        </div>
        <Button
          className="boardWrite"
          onClick={() => {
            createBoard();
          }}
        >
          글 작성
        </Button>
        <Button
          className="writeCancle"
          onClick={() => navigate("/compagno/product-board")}
          variant="secondary"
        >
          취소
        </Button>
      </div>
    </Main>
  );
};
export default CreateProductBoard;

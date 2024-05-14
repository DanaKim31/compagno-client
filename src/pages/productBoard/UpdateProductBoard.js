import styled from "styled-components";
import { FaStar, FaStarHalfAlt, FaRegStar, FaRegImage } from "react-icons/fa";
import { FaRegCircleXmark } from "react-icons/fa6";
import { useState, useEffect, useRef } from "react";
import { Form, Button } from "react-bootstrap";
import { userSave } from "../../store/user";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  editProductBoard,
  getProductBoard,
  getAnimalCategories,
} from "../../api/productBoard";

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

  .linkLogo {
    font-size: 2.5rem;
    font-weight: bold;
    cursor: pointer;
    margin-bottom: 30px;
    color: black;
    text-decoration: none;
  }

  .titleInput {
    margin-bottom: 15px;
  }

  .createDiv {
    width: 100%;
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
    display: flex;
    flex-direction: row;
    line-height: 50px;
    margin-left: 15px;
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
  .imagesDiv {
    display: flex;
    flex-wrap: wrap;
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

  .imageSpan:nth-child(1) {
    margin-left: 20px;
  }
  .productInpoDiv {
    margin-top: 30px;
    margin-bottom: 30px;
    height: 420px;
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

  .mainImageCancle {
    position: absolute;
    right: -104px;
    bottom: 0px;
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

  .prevImgBtn {
    margin-left: 20px;
  }
`;

const UpdateProductBoard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => {
    return state.user;
  });

  const [title, setTitle] = useState("");
  const [grade, setGrade] = useState(0);
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState(0);
  const [animal, setAnimal] = useState("");
  const [content, setContent] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productMainFile, setProductMainFile] = useState({});
  const [files, setFiles] = useState([]);
  const { code } = useParams();
  const [imgSrc, setImgSrc] = useState([]);
  const [mainImgSrc, setMainImgSrc] = useState("");
  const [prevMainImg, setPrevMainImg] = useState("");
  const [prevImg, setPrevImg] = useState([]);
  const [prevImgSrc, setPrevImgSrc] = useState([]);
  const [animalCategories, setAnimalCategories] = useState([]);

  const viewAnimalCategory = async () => {
    const response = await getAnimalCategories();
    setAnimalCategories(response.data);
  };

  const updateBoard = async () => {
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
    } else if (
      (files.length !== 0 || prevImgSrc.length !== 0) &&
      JSON.stringify(productMainFile) === "{}" &&
      mainImgSrc === ""
    ) {
      alert("썸네일로 사용할 이미지를 선택해주세요");
      return false;
    }

    const formData = new FormData();
    formData.append("productBoardCode", code);
    formData.append("productBoardTitle", title);
    formData.append("productName", productName);
    formData.append("productPrice", price);
    formData.append("productBoardGrade", grade);
    formData.append("productBoardContent", content);
    formData.append("animalCategoryCode", animal);
    formData.append("productCategory", productCategory);
    formData.append("userId", user.userId);
    if (mainImgSrc === "http://192.168.10.28:8081/" + prevMainImg) {
      formData.append("mainImage", prevMainImg);
    }

    if (productMainFile instanceof File) {
      formData.append("productMainFile", productMainFile);
    }

    files.forEach((file, index) => {
      formData.append(`files[${index}]`, file);
    });

    prevImgSrc.forEach((image, index) => {
      formData.append(`images[${index}]`, image.productImage);
    });

    await editProductBoard(formData);
    navigate("/compagno/product-board");
  };

  const viewProductBoard = async () => {
    const response = (await getProductBoard(code)).data;
    setTitle(response.productBoardTitle);
    setProductName(response.productName);
    setPrice(response.productPrice);
    setGrade(response.productBoardGrade);
    setContent(response.productBoardContent);
    setAnimal(response.animalCategory.animalCategoryCode);
    setProductCategory(response.productCategory);
    if (response.productMainImage != null) {
      setMainImgSrc("http://192.168.10.28:8081/" + response.productMainImage);
    }
    setPrevMainImg(response.productMainImage);

    setPrevImgSrc(response.images);
    setPrevImg(response.images);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== null) {
      dispatch(userSave(JSON.parse(localStorage.getItem("user"))));
    }
    viewProductBoard();
    viewAnimalCategory();
  }, []);

  const imageCreate = (e) => {
    const images = Array.from(e.target.files);

    if (images.length + prevImgSrc.length > 4) {
      alert("이미지는 최대 4장 까지 등록 가능합니다");
      e.target.value = "";
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

  const mainSelectImage = useRef("");

  const deletePrevSrc = (code) => {
    const images = prevImgSrc.filter(
      (image) => image.productImageCode !== code
    );
    setPrevImgSrc(images);
  };

  const selectImage = useRef("");
  const deleteImgSrc = (no) => {
    let newImgSrc = [...imgSrc];
    newImgSrc.splice(no, 1);
    setImgSrc(newImgSrc);
  };

  const imageChange = (i) => {
    const dataTransfer = new DataTransfer();
    files
      .filter((file) => file != files[i])
      .forEach((file) => {
        dataTransfer.items.add(file);
      });

    selectImage.current.files = dataTransfer.files;
    setFiles(Array.from(selectImage.current.files));
  };

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

    if (mainSelectImage.current.files.length === 0) {
      setProductMainFile({});
      setMainImgSrc("");
    }
  };

  const imgCancle = () => {
    console.log(prevImgSrc);
    console.log(prevImg);
    selectImage.current.value = "";
    setFiles([]);
    setImgSrc([]);
    setPrevImgSrc(prevImg);
  };

  return (
    <Main>
      <div className="createDiv">
        <Link to={"/compagno/product-board"} className="linkLogo">
          제품 정보 공유 게시판
        </Link>
        <Form.Control
          className="titleInput"
          value={title}
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
            onChange={(e) => {
              mainImageCreate(e);
            }}
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
              <Button
                variant="secondary"
                className="mainImageCancle"
                onClick={() => {
                  setProductMainFile({});
                  setMainImgSrc("http://192.168.10.28:8081/" + prevMainImg);
                }}
              >
                기존 이미지
              </Button>
            </div>
          ) : (
            <div
              className="nullMainImageDiv"
              onClick={() => mainSelectImage.current.click()}
            >
              <FaRegImage />
              <span>썸네일로 사용할 이미지 업로드</span>
              <Button
                variant="secondary"
                className="mainImageCancle"
                onClick={(e) => {
                  e.stopPropagation();
                  setProductMainFile({});
                  setMainImgSrc("http://192.168.10.28:8081/" + prevMainImg);
                }}
              >
                기존 이미지
              </Button>
            </div>
          )}

          <div className="inpoInputDiv">
            <Form.Control
              className="nameInput"
              value={productName}
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
                setProductCategory(e.target.value);
              }}
              placeholder="제품 분류"
            />
            <Form.Select
              className="animalInput"
              defaultValue={animal}
              onChange={(e) => {
                setAnimal(e.target.value);
              }}
            >
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
              value={price}
              type="text"
              placeholder="가격"
              onChange={(e) => {
                if (e.target.value.length > 9) {
                  e.target.value = e.target.value.slice(0, 9);
                }
                setPrice(e.target.value.trim());
              }}
            />
            <div className="gradeDiv">
              평점 :
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
            value={content}
            placeholder="내용 입력"
            as="textarea"
            rows={20}
            onChange={(e) => {
              if (e.target.value.length > 1900) {
                e.target.value = e.target.value.slice(0, 1900);
              }
              setContent(e.target.value.trim());
            }}
          />
        </div>
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
            {prevImgSrc.map((img, i) => (
              <span className="imageSpan" key={img.productImageCode}>
                <img src={"http://192.168.10.28:8081/" + img.productImage} />
                <FaRegCircleXmark
                  onClick={() => deletePrevSrc(img.productImageCode)}
                />
              </span>
            ))}
          </div>
          <Button
            className="prevImgBtn"
            variant="secondary"
            onClick={() => {
              imgCancle();
            }}
          >
            기존 이미지
          </Button>
        </div>

        <Button
          className="boardWrite"
          onClick={() => {
            updateBoard();
          }}
        >
          글 작성
        </Button>
        <Button
          className="writeCancle"
          onClick={() => navigate("/compagno/product-board")}
          variant="secondary"
        >
          메인으로
        </Button>
      </div>
    </Main>
  );
};
export default UpdateProductBoard;

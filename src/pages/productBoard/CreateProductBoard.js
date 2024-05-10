import styled from "styled-components";
import { FaStar, FaStarHalfAlt, FaRegStar, FaRegImage } from "react-icons/fa";
import { FaRegCircleXmark } from "react-icons/fa6";
import { useState, useEffect, useRef } from "react";
import { Form, Button } from "react-bootstrap";
import { userSave } from "../../store/user";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addProductBoard } from "../../api/productBoard";

const Main = styled.main`
  padding-top: 120px;
  width: 1200px;
  margin: 0px auto;
  .createDiv {
    width: 100%;
  }
  .titleInput {
    margin-bottom: 15px;
  }

  .productInpoDiv {
    div {
    }
  }

  h1 {
    font-size: 2.5;
    font-weight: bold;
    cursor: pointer;
    margin-bottom: 30px;
  }

  h1:hover {
    color: mediumblue;
  }

  .inpoInputDiv {
    width: 700px;
    float: right;
    padding-top: 60px;
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
  }

  .imagesDiv {
    display: flex;

    img {
      width: 300px;
      height: 200px;
      margin: 0px 10px;
      margin-bottom: 10px;
    }
  }
  .mainImageDiv,
  .nullMainImageDiv {
    width: 400px;
    height: 300px;
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

  .imageSpan {
    position: relative;
    width: 300px;
    height: 200px;
    margin: 0px 10px;
    margin-bottom: 10px;

    img {
      width: 100%;
      height: 100%;
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
  h2 {
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
  const imageCreate = (e) => {
    const images = Array.from(e.target.files);
    if (images.length > 3) {
      alert("이미지는 최대 3장 까지 등록 가능합니다");
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
        <h1>제품 정보 공유 게시판</h1>
        <Form.Control
          className="titleInput"
          type="text"
          placeholder="제목"
          size="lg"
          onChange={(e) => {
            setTitle(e.target.value);
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
                setProductName(e.target.value);
              }}
            />
            <Form.Control
              className="cateInput"
              type="text"
              onChange={(e) => setProductCategory(e.target.value)}
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
              <option value="1">강아지</option>
              <option value="2">고양이</option>
              <option value="3">비둘기</option>
              <option value="4">기타</option>
            </Form.Select>

            <Form.Control
              className="priceInput"
              type="text"
              placeholder="가격"
              onChange={(e) => {
                setPrice(e.target.value);
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
              setContent(e.target.value);
            }}
          />
          <div>
            이미지 :
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={imageCreate}
              ref={selectImage}
            />
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
        <button
          onClick={() => {
            createBoard();
          }}
          style={{ width: "100px" }}
        >
          글 작성
        </button>
        <Link to="/compagno/product-board">메인으로</Link>
      </div>
    </Main>
  );
};
export default CreateProductBoard;

import styled from "styled-components";
import { FaStar, FaStarHalfAlt, FaRegStar, FaRegImage } from "react-icons/fa";
import { FaRegCircleXmark } from "react-icons/fa6";
import { useState, useEffect, useRef } from "react";
import Form from "react-bootstrap/Form";
import { userSave } from "../../store/user";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { editProductBoard, getProductBoard } from "../../api/productBoard";

const Main = styled.main`
  padding-top: 120px;
  display: flex;
  flex-direction: column;
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
  }
  .mainImageDiv,
  .nullMainImageDiv {
    width: 400px;
    height: 300px;
    border: 1px solid black;
    margin-left: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    cursor: pointer;
    img {
      width: 100%;
      height: 100%;
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

  .imageDiv {
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

  const updateBoard = async () => {
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
      console.log(image);
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
  }, []);

  const imageCreate = (e) => {
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

  const mainSelectImage = useRef("");

  const deletePrevSrc = (code) => {
    const images = prevImgSrc.filter(
      (image) => image.productImageCode !== code
    );
    setPrevImgSrc(images);
  };

  const deleteImgSrc = (no) => {
    let newImgSrc = [...imgSrc];
    newImgSrc.splice(no, 1);
    setImgSrc(newImgSrc);
  };
  return (
    <Main>
      <span>
        제목 :{" "}
        <input
          value={title}
          type="text"
          placeholder="제목"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
      </span>
      <div>
        썸네일 이미지 :
        <input
          type="file"
          accept="image/*"
          onChange={mainImageCreate}
          style={{ display: "none" }}
          ref={mainSelectImage}
        />
        {mainImgSrc !== "" ? (
          <div
            className="mainImageDiv"
            onClick={() => mainSelectImage.current.click()}
          >
            <img src={mainImgSrc} />
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
        <button
          onClick={() => {
            setProductMainFile({});
            setMainImgSrc("");
          }}
        >
          지우기
        </button>
        <button
          onClick={() => {
            setProductMainFile({});
            setMainImgSrc("http://192.168.10.28:8081/" + prevMainImg);
          }}
        >
          취소
        </button>
      </div>
      <span>
        상품명 :{" "}
        <input
          value={productName}
          type="text"
          placeholder="상품명"
          onChange={(e) => {
            setProductName(e.target.value);
          }}
        />
      </span>
      <div>
        사용 동물 :{" "}
        <select
          defaultValue={animal}
          onChange={(e) => {
            setAnimal(e.target.value);
          }}
        >
          <option value="1">강아지</option>
          <option value="2">고양이</option>
          <option value="3">비둘기</option>
          <option value="4">기타</option>
        </select>
      </div>
      <div>
        상품 분류 :
        <input
          type="text"
          value={productCategory}
          onChange={(e) => setProductCategory(e.target.value)}
          placeholder="제품 분류"
        />
      </div>
      <div>
        가격 :{" "}
        <input
          value={price}
          type="text"
          placeholder="가격"
          onChange={(e) => {
            setPrice(e.target.value);
          }}
        />
      </div>
      <div className="gradeDiv">
        평점 :
        {grade >= 1 ? (
          <div className="starDiv">
            <span className="starLeftSpan" onClick={() => setGrade(0.5)}></span>
            <span className="starRightSpan" onClick={() => setGrade(1)}></span>
            <FaStar className="star" />
          </div>
        ) : grade === 0.5 ? (
          <div className="starDiv">
            <span className="starLeftSpan" onClick={() => setGrade(0.5)}></span>
            <span className="starRightSpan" onClick={() => setGrade(1)}></span>
            <FaStarHalfAlt className="starHalf" />
          </div>
        ) : (
          <div className="starDiv">
            <span className="starLeftSpan" onClick={() => setGrade(0.5)}></span>
            <span className="starRightSpan" onClick={() => setGrade(1)}></span>
            <FaRegStar className="star" />
          </div>
        )}
        {grade >= 2 ? (
          <div className="starDiv">
            <span className="starLeftSpan" onClick={() => setGrade(1.5)}></span>
            <span className="starRightSpan" onClick={() => setGrade(2)}></span>
            <FaStar className="star" />
          </div>
        ) : grade === 1.5 ? (
          <div className="starDiv">
            <span className="starLeftSpan" onClick={() => setGrade(1.5)}></span>
            <span className="starRightSpan" onClick={() => setGrade(2)}></span>
            <FaStarHalfAlt className="starHalf" />
          </div>
        ) : (
          <div className="starDiv">
            <span className="starLeftSpan" onClick={() => setGrade(1.5)}></span>
            <span className="starRightSpan" onClick={() => setGrade(2)}></span>
            <FaRegStar className="star" />
          </div>
        )}
        {grade >= 3 ? (
          <div className="starDiv">
            <span className="starLeftSpan" onClick={() => setGrade(2.5)}></span>
            <span className="starRightSpan" onClick={() => setGrade(3)}></span>
            <FaStar className="star" />
          </div>
        ) : grade === 2.5 ? (
          <div className="starDiv">
            <span className="starLeftSpan" onClick={() => setGrade(2.5)}></span>
            <span className="starRightSpan" onClick={() => setGrade(3)}></span>
            <FaStarHalfAlt className="starHalf" />
          </div>
        ) : (
          <div className="starDiv">
            <span className="starLeftSpan" onClick={() => setGrade(2.5)}></span>
            <span className="starRightSpan" onClick={() => setGrade(3)}></span>
            <FaRegStar className="star" />
          </div>
        )}
        {grade >= 4 ? (
          <div className="starDiv">
            <span className="starLeftSpan" onClick={() => setGrade(3.5)}></span>
            <span className="starRightSpan" onClick={() => setGrade(4)}></span>
            <FaStar className="star" />
          </div>
        ) : grade === 3.5 ? (
          <div className="starDiv">
            <span className="starLeftSpan" onClick={() => setGrade(3.5)}></span>
            <span className="starRightSpan" onClick={() => setGrade(4)}></span>
            <FaStarHalfAlt className="starHalf" />
          </div>
        ) : (
          <div className="starDiv">
            <span className="starLeftSpan" onClick={() => setGrade(3.5)}></span>
            <span className="starRightSpan" onClick={() => setGrade(4)}></span>
            <FaRegStar className="star" />
          </div>
        )}
        {grade === 5 ? (
          <div className="starDiv">
            <span className="starLeftSpan" onClick={() => setGrade(4.5)}></span>
            <span className="starRightSpan" onClick={() => setGrade(5)}></span>
            <FaStar className="star" />
          </div>
        ) : grade === 4.5 ? (
          <div className="starDiv">
            <span className="starLeftSpan" onClick={() => setGrade(4.5)}></span>
            <span className="starRightSpan" onClick={() => setGrade(5)}></span>
            <FaStarHalfAlt className="starHalf" />
          </div>
        ) : (
          <div className="starDiv">
            <span className="starLeftSpan" onClick={() => setGrade(4.5)}></span>
            <span className="starRightSpan" onClick={() => setGrade(5)}></span>
            <FaRegStar className="star" />
          </div>
        )}
      </div>
      <div>
        이미지 :
        <input type="file" accept="image/*" multiple onChange={imageCreate} />
        <div className="imagesDiv">
          {imgSrc.map((img, i) => (
            <span className="imageDiv" key={i}>
              <img src={img} key={i} />
              <FaRegCircleXmark
                onClick={() => {
                  deleteImgSrc(i);
                }}
              />
            </span>
          ))}
          {prevImgSrc.map((img, i) => (
            <span className="imageDiv" key={img.productImageCode}>
              <img src={"http://192.168.10.28:8081/" + img.productImage} />
              <FaRegCircleXmark
                onClick={() => deletePrevSrc(img.productImageCode)}
              />
            </span>
          ))}
        </div>
      </div>
      <div>
        글 내용 :{" "}
        <Form.Control
          value={content}
          as="textarea"
          rows={20}
          onChange={(e) => {
            setContent(e.target.value);
          }}
        />
      </div>
      <button
        onClick={() => {
          updateBoard();
        }}
        style={{ width: "100px" }}
      >
        글 작성
      </button>
      <Link to="/compagno/product-board">메인으로</Link>
    </Main>
  );
};
export default UpdateProductBoard;

import styled from "styled-components";
import { FaStar, FaStarHalfAlt, FaRegStar, FaRegImage } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import Form from "react-bootstrap/Form";
import { userSave } from "../../store/user";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addProductBoard } from "../../api/productBoard";

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
  const [animal, setAnimal] = useState("");
  const [content, setContent] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productMainFile, setProductMainFile] = useState({});
  const [files, setFiles] = useState([]);

  const [imgSrc, setImgSrc] = useState([]);
  const imageCreate = (e) => {
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

  return (
    <Main>
      <span>
        제목 :{" "}
        <input
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
          취소
        </button>
      </div>
      <span>
        제품명 :{" "}
        <input
          type="text"
          placeholder="제품명"
          onChange={(e) => {
            setProductName(e.target.value);
          }}
        />
      </span>
      <div>
        사용 동물 :{" "}
        <select
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
        </select>
      </div>
      <div>
        제품 분류 :
        <input
          type="text"
          onChange={(e) => setProductCategory(e.target.value)}
          placeholder="제품 분류"
        />
      </div>
      <div>
        가격 :{" "}
        <input
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
            <img src={img} key={i} />
          ))}
        </div>
      </div>
      <div>
        글 내용 :{" "}
        <Form.Control
          as="textarea"
          rows={20}
          onChange={(e) => {
            setContent(e.target.value);
          }}
        />
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
    </Main>
  );
};
export default CreateProductBoard;

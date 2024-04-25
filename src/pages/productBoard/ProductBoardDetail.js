import { useState, useEffect } from "react";
import {
  getProductBoard,
  getProductBoardComment,
  productBoardRecommend,
} from "../../api/productBoard";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import moment from "moment";
import Form from "react-bootstrap/Form";
import { FaThumbsUp, FaRegThumbsUp } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";
import { userSave } from "../../store/user";

const Main = styled.main`
  padding-top: 150px;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin: 0px 20%;

  .boardDiv {
    margin-bottom: 40px;
  }

  .BoardRegiDate {
    float: right;
  }

  p {
    margin-bottom: 20px;
    font-size: 1.5rem;
  }

  .viewCount {
    float: right;
    margin-right: 40px;
  }

  h2 {
    font-size: 2rem;
    margin-bottom: 20px;
  }

  .writeComment {
    width: 92%;
  }
  .writeCommentDiv {
    display: flex;
    justify-content: space-between;
    button {
      height: 40px;
      width: 60px;
    }
  }
  .recommendDiv {
    margin: 10px auto;
    display: flex;
    justify-content: center;
    font-size: 2rem;
    cursor: pointer;
    width: 100px;

    .recommend {
      font-size: 3rem;
    }

    span {
      margin-left: 10px;
      line-height: 50px;
    }
  }
`;

const ProductBoardDetail = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => {
    return state.user;
  });

  const { code } = useParams();
  const [productBoard, setProductBoard] = useState([]);
  const [comments, setComments] = useState([]);
  const [checkRec, setCheckRec] = useState("");
  const [checkBook, setCheckBook] = useState("");

  const viewProductBoard = async () => {
    const response = await getProductBoard(code);
    setProductBoard(response.data);

    //   const checkBookmark = response.data.bookmark?.filter(
    //     (book) => book.user.userId === "ghldud5"
    //   );
    //   if (checkBookmark?.length === 1) {
    //     setCheckBook(true);
    //   } else {
    //     setCheckBook(false);
    //   }
  };

  const viewProductBoardComment = async () => {
    const response = await getProductBoardComment(code);
    setComments(response.data);
  };

  const recommend = async () => {
    productBoardRecommend({
      productBoardCode: code,
      userId: user.userId,
    });
    viewProductBoard();
  };

  const star = (no) => {
    const result = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= no) {
        result.push(<FaStar color="orangered" key={i} />);
      } else if (i > no) {
        if (i - no === 0.5) {
          result.push(<FaStarHalfAlt color="orangered" key={i} />);
        } else {
          result.push(<FaRegStar color="orangered" key={i} />);
        }
      }
    }
    return result;
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== null) {
      dispatch(userSave(JSON.parse(localStorage.getItem("user"))));
    }
    viewProductBoard();
    viewProductBoardComment();
  }, []);

  useEffect(() => {
    const checkRecommend = productBoard.recommend?.filter(
      (rec) => rec.user.userId === user.userId
    );
    if (checkRecommend?.length === 1) {
      setCheckRec(true);
    } else {
      setCheckRec(false);
    }
  }, [productBoard]);

  return (
    <Main>
      <div className="boardDiv">
        <p className="boardTitle">
          제목 : {productBoard.productBoardTitle}{" "}
          <span className="BoardRegiDate">
            작성 일 :{" "}
            {moment(productBoard.productBoardRegiDate).format(
              "MM월 DD일 HH시 mm분"
            )}
          </span>
          <span className="viewCount">
            조회 수 : {productBoard.productBoardViewCount}
          </span>
        </p>
        <p>작성자 : {productBoard.user?.userNickname}</p>
        <img
          src={productBoard.productMainImage?.replace(
            "\\DESKTOP-U0CNG13",
            "http://localhost:8081"
          )}
          style={{
            height: "400px",
            width: "600px",
            objectFit: "cover",
            margin: "20px auto",
          }}
        />
        <p>상품명 : {productBoard.productName}</p>
        <p>사용 동물 : {productBoard.animalCategory?.animalType}</p>
        <p>상품 분류 : {productBoard.productCategory}</p>
        <p>가격 : {productBoard.productPrice}</p>
        <p>
          만족도 : {star(productBoard.productBoardGrade)}
          &nbsp;&nbsp;{productBoard.productBoardGrade}
        </p>
        {productBoard.images?.map((image) => (
          <img
            key={image.productImageCode}
            src={image.productImage?.replace("C:", "http://localhost:8081")}
            style={{
              height: "300px",
              width: "500px",
              objectFit: "cover",
              marginRight: "60px",
              marginBottom: "30px",
            }}
          />
        ))}
        <Form.Control
          as="textarea"
          rows={20}
          readOnly
          value={productBoard.productBoardContent}
        />
        <div className="recommendDiv">
          {checkRec === false ? (
            <FaRegThumbsUp className="recommend" onClick={() => recommend()} />
          ) : (
            <FaThumbsUp className="recommend" onClick={() => recommend()} />
          )}
          <span>{productBoard.recommend?.length}</span>
        </div>
      </div>
      <div className="boardCommentDiv">
        <h2>댓글</h2>
        <div className="writeCommentDiv">
          <Form.Control as="textarea" rows={4} className="writeComment" />
          <button>작성</button>
        </div>
      </div>
    </Main>
  );
};

export default ProductBoardDetail;

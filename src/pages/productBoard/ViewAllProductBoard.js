import {
  productBoardBookmark,
  searchProductBoard,
} from "../../api/productBoard";
import { useState, useEffect } from "react";
import moment from "moment";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userSave } from "../../store/user";

const StyledProductBoard = styled.main`
  padding-top: 130px;
  display: grid;
  h1 {
    font-size: 3rem;
    text-align: center;
    font-weight: bold;
  }

  span {
    margin-right: 15px;
  }

  .boardView {
    background-color: pink;
  }

  .boardList {
    height: 30vh;
    display: grid;
    padding: 0px 120px;
    grid-template-columns: repeat(4, 390px);
    grid-template-rows: repeat(3, 220);
    gap: 30px;
    cursor: pointer;
  }

  .bookmark {
    float: right;
    font-size: 3rem;
    cursor: pointer;
  }
`;

const ViewAllProductBoard = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => {
    return state.user;
  });

  const navigate = useNavigate();
  const [productBoards, setProductBoards] = useState([]);

  const getProductBoards = async () => {
    const result = await searchProductBoard();
    setProductBoards(result.data);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== null) {
      dispatch(userSave(JSON.parse(localStorage.getItem("user"))));
    }
    getProductBoards();
  }, []);

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

  const bookmark = async (code) => {
    await productBoardBookmark({
      productBoardCode: code,
      userId: user.userId,
    });
    getProductBoards();
  };

  const productBoardDetail = (code) => {
    navigate("/compagno/product-board/" + code);
  };

  return (
    <StyledProductBoard>
      <h1>제품 정보 공유 게시판</h1>
      <Link to="/compagno/product-board/create"> 글쓰기 </Link>
      <div className="boardList">
        {productBoards.content?.map((productBoard) => (
          <div
            className="boardView"
            onClick={() => productBoardDetail(productBoard.productBoardCode)}
            key={productBoard.productBoardCode}
          >
            {productBoard.bookmark?.filter(
              (bookmark) => bookmark.user.userId === user.userId
            ).length === 0 ? (
              <FaRegStar
                className="bookmark"
                onClick={(e) => {
                  e.stopPropagation();
                  bookmark(productBoard.productBoardCode);
                }}
              />
            ) : (
              <FaStar
                className="bookmark"
                style={{ color: "yellow" }}
                onClick={(e) => {
                  e.stopPropagation();
                  bookmark(productBoard.productBoardCode);
                }}
              />
            )}
            <img
              className="mainImage"
              src={productBoard.productMainImage?.replace(
                "C:",
                "http://localhost:8081"
              )}
              style={{ height: "160px", width: "100%", objectFit: "cover" }}
            />
            <br />
            <span>작성자 : {productBoard.user?.userNickname}</span>
            <span>제목 : {productBoard.productBoardTitle}</span>
            <br />
            <span>추천수 : {productBoard.recommend.length}</span>
            <span>
              {" "}
              댓글수 :{" "}
              {
                productBoard.comments.filter(
                  (commentCount) => commentCount.productCommentDelete !== "Y"
                ).length
              }
            </span>
            <span>조회수 : {productBoard.productBoardViewCount}</span>
            <span>
              <br />
              <span>상품명 : {productBoard.productName}</span>
              평점 : {star(productBoard.productBoardGrade)}
              {productBoard.productBoardGrade}
            </span>
            <br />
            <span>
              날짜 :
              {moment(productBoard.productBoardRegiDate).format(
                "MM월 DD일 HH시 mm분"
              )}
            </span>
          </div>
        ))}
      </div>
    </StyledProductBoard>
  );
};
export default ViewAllProductBoard;

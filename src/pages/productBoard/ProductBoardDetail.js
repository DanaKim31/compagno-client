import { useState, useEffect } from "react";
import {
  getProductBoard,
  getProductBoardComments,
  productBoardRecommend,
  delProductBoardcomment,
  addProductBoardComment,
  updateProductBoardComment,
  delProductBoard,
} from "../../api/productBoard";
import { useParams, useNavigate } from "react-router-dom";
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
  .viewReply {
    margin-top: 5px;
    padding: 5px;
    padding-left: 50px;
    border-top: 1px black solid;
  }

  .writeCommentDiv {
    margin-bottom: 30px;
  }

  .viewComment {
    padding: 5px;
    border: 1px black solid;
  }
`;

const ProductBoardDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => {
    return state.user;
  });

  const { code } = useParams();
  const [productBoard, setProductBoard] = useState([]);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState([]);
  const [edit, setEdit] = useState({});

  const viewProductBoards = async () => {
    const response = await getProductBoard(code);
    setProductBoard(response.data);
  };

  const viewProductBoardComment = async () => {
    const response = await getProductBoardComments(code);
    setComments(response.data);
  };

  const recommend = async () => {
    await productBoardRecommend({
      productBoardCode: code,
      userId: user.userId,
    });
    viewProductBoards();
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
    viewProductBoards();
    viewProductBoardComment();
  }, []);

  const checkRecommend = productBoard.recommend?.filter(
    (rec) => rec.user.userId === user.userId
  );

  const commentDelete = async (no) => {
    await delProductBoardcomment(no);
    viewProductBoardComment();
  };

  const addComment = async () => {
    await addProductBoardComment({
      productBoardCode: code,
      productCommentContent: comment,
    });
    viewProductBoardComment();
  };

  const editComment = async (no) => {
    await updateProductBoardComment({
      productCommentcode: no,
    });
  };

  const removeProductBoard = async () => {
    await delProductBoard(code);
    navigate("/compagno/product-board");
  };

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
          {checkRecommend?.length === 0 ? (
            <FaRegThumbsUp className="recommend" onClick={() => recommend()} />
          ) : (
            <FaThumbsUp className="recommend" onClick={() => recommend()} />
          )}
          <span>{productBoard.recommend?.length}</span>
        </div>
        {user.userId === productBoard.user?.userId && (
          <button
            onClick={() => {
              removeProductBoard();
            }}
          >
            삭제
          </button>
        )}
      </div>
      <div className="boardCommentDiv">
        <h2>댓글</h2>
        <div className="writeCommentDiv">
          <Form.Control
            as="textarea"
            rows={4}
            className="writeComment"
            onChange={(e) => {
              setComment(e.target.value);
            }}
          />
          <button onClick={addComment}>작성</button>
        </div>
        <div className="viewCommentsDiv">
          {comments?.map((comment) =>
            comment.productCommentDelete === "N" ? (
              <div className="viewComment" key={comment.productCommentCode}>
                작성자 : {comment.user.userNickname}
                날짜 :{" "}
                {moment(comment.productBoardRegiDate).format(
                  "MM월 DD일 HH시 mm분"
                )}
                <br />
                내용 : {comment.productCommentContent}
                {user.userId === comment.user?.userId && (
                  <span>
                    <button>수정</button>
                    <button
                      onClick={() => commentDelete(comment.productCommentCode)}
                    >
                      삭제
                    </button>
                  </span>
                )}
                {comment?.replies.map((reply) =>
                  reply.productCommentDelete === "N" ? (
                    <div className="viewReply" key={reply.productCommentCode}>
                      작성자 :{reply.user.userNickname}
                      날짜 :{" "}
                      {moment(reply.productBoardRegiDate).format(
                        "MM월 DD일 HH시 mm분"
                      )}
                      <br />
                      내용 : {reply.productCommentContent}
                      {user.userId === reply.user?.userId && (
                        <span>
                          <button>수정</button>
                          <button
                            onClick={() =>
                              commentDelete(reply.productCommentCode)
                            }
                          >
                            삭제
                          </button>
                        </span>
                      )}
                    </div>
                  ) : (
                    <div className="viewReply" key={comment.productCommentCode}>
                      삭제된 댓글입니다.
                    </div>
                  )
                )}
              </div>
            ) : (
              <div className="viewComment" key={comment.productCommentCode}>
                삭제된 댓글입니다.
                {comment?.replies.map((reply) =>
                  reply.productCommentDelete === "N" ? (
                    <div className="viewReply" key={reply.productCommentCode}>
                      작성자 :{reply.user.userNickname}
                      날짜 :{" "}
                      {moment(reply.productBoardRegiDate).format(
                        "MM월 DD일 HH시 mm분"
                      )}
                      <br />
                      내용 : {reply.productCommentContent}
                      {user.userId === reply.user?.userId && (
                        <span>
                          <button>수정</button>
                          <button
                            onClick={() =>
                              commentDelete(reply.productCommentCode)
                            }
                          >
                            삭제
                          </button>
                        </span>
                      )}
                    </div>
                  ) : (
                    <div key={reply.productCommentCode} className="viewReply">
                      삭제된 댓글입니다.
                    </div>
                  )
                )}
              </div>
            )
          )}
        </div>
      </div>
    </Main>
  );
};

export default ProductBoardDetail;

import { useState, useEffect } from "react";
import {
  getProductBoard,
  getProductBoardComments,
  productBoardRecommend,
  delProductBoardcomment,
  addProductBoardComment,
  editProductBoardComment,
  delProductBoard,
} from "../../api/productBoard";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import moment from "moment";
import { Form, Button, InputGroup } from "react-bootstrap";
import { FaThumbsUp, FaRegThumbsUp } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";
import { userSave } from "../../store/user";
import { FiCornerDownRight } from "react-icons/fi";
import Pagination from "react-js-pagination";
const Main = styled.main`
  padding-top: 150px;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin: 0px 20%;
  padding-bottom: 90px;
  width: 1200px;
  .boardDiv {
    margin-bottom: 40px;
  }

  .boardRegiDate {
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

  .viewCommentsDiv {
    border-top: 2px solid silver;
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
      height: 86px;
      width: 8%;
    }
  }
  .commentRegiDate {
    font-size: 0.8rem;
    color: gray;
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
    padding: 16px 0px;
    padding-right: 10px;
    padding-left: 50px;
    border-bottom: 1px dashed gainsboro;
    .commentContentDiv {
      cursor: auto;
      margin-left: 60px;
    }
    .deleteComment {
      cursor: auto;
    }
  }

  .replyIcon {
    height: 30px;
  }

  .writeCommentDiv {
    margin-bottom: 30px;
  }
  .commentDiv {
    overflow: hidden;
    padding: 16px 10px;
    border-bottom: 1px solid gainsboro;
  }

  .writeReplyDiv {
    padding-top: 15px;
    button {
      height: 86px;
      width: 80px;
    }
  }

  .userInfo {
    margin-right: 20px;
    font-weight: bold;
    img {
      margin-right: 5px;
    }
  }
  .commentUserImage {
    width: 40px;
    height: 40px;
    border-radius: 100%;
    object-fit: fill;
    display: inline;
  }
  .commentChangeSpan {
    float: right;
    span {
      padding: 0px 7.5px;
      cursor: pointer;
    }
    span:hover {
      color: black;
    }
    span:nth-child(1) {
      border-right: 1px solid grey;
    }
    span:nth-child(2) {
      margin-right: 15px;
    }
  }

  .commentContentDiv {
    margin-left: 45px;
    cursor: pointer;
    margin-right: 130px;
  }

  .deleteReply {
    color: gray;
    padding: 15px 80px;
  }

  .deleteComment {
    color: gray;
    cursor: pointer;
  }

  .editGroup {
    button {
      width: 80px;
    }
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
  const [replyNo, setReplyNo] = useState(0);
  const [replyContent, setReplyContent] = useState("");
  const [editNo, setEditNo] = useState(0);
  const [editContent, setEditContent] = useState("");
  const [page, setPage] = useState("");

  const viewProductBoard = async () => {
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

  const checkRecommend = productBoard.recommend?.filter(
    (rec) => rec.user.userId === user.userId
  );

  const commentDelete = async (no) => {
    await delProductBoardcomment(no);
    viewProductBoard();
    viewProductBoardComment();
  };

  const addComment = async () => {
    await addProductBoardComment({
      productBoardCode: code,
      productCommentContent: comment,
    });
    viewProductBoard();
    viewProductBoardComment();
  };

  const addReply = async () => {
    await addProductBoardComment({
      productBoardCode: code,
      productParentCode: replyNo,
      productCommentContent: replyContent,
    });
    setReplyNo(0);
    setReplyContent("");
    viewProductBoard();
    viewProductBoardComment();
  };

  const editComment = async () => {
    await editProductBoardComment({
      productCommentCode: editNo,
      productCommentContent: editContent,
    });
    setReplyContent("");
    setEditNo(0);
    viewProductBoardComment();
  };

  const removeProductBoard = async () => {
    await delProductBoard(code);
    navigate("/compagno/product-board");
  };

  const editProductBoard = () => {
    navigate("/compagno/product-board/edit/" + code);
  };

  return (
    <Main>
      <div className="boardDiv">
        <p className="boardTitle">
          제목 : {productBoard.productBoardTitle}{" "}
          <span className="boardRegiDate">
            작성 일 :{" "}
            {moment(productBoard.productCommentRegiDate).format(
              "YYYY.MM.DD HH:mm"
            )}
          </span>
          <span className="viewCount">
            조회 수 : {productBoard.productBoardViewCount}
          </span>
        </p>
        <p>작성자 : {productBoard.user?.userNickname}</p>
        {productBoard.productMainImage != undefined && (
          <img
            src={"http://192.168.10.28:8081/" + productBoard.productMainImage}
            style={{
              height: "400px",
              width: "600px",
              objectFit: "cover",
              margin: "20px auto",
            }}
          />
        )}
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
            src={"http://192.168.10.28:8081/" + image.productImage}
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
          <>
            <button
              onClick={() => {
                removeProductBoard();
              }}
            >
              삭제
            </button>
            <button
              onClick={() => {
                editProductBoard();
              }}
            >
              수정
            </button>
          </>
        )}
      </div>
      <div className="boardCommentDiv">
        <h2>
          댓글{" "}
          {
            productBoard.comments?.filter(
              (commentCount) => commentCount.productCommentDelete !== "Y"
            ).length
          }
        </h2>
        <div className="writeCommentDiv">
          <InputGroup>
            <Form.Control
              as="textarea"
              rows={3}
              className="writeComment"
              onChange={(e) => {
                setComment(e.target.value);
              }}
            />
            <Button
              onClick={() => {
                addComment();
              }}
            >
              작성
            </Button>
          </InputGroup>
        </div>
        <div className="viewCommentsDiv">
          {comments?.map((comment) =>
            comment.productCommentDelete === "N" ? (
              <div className="viewComment" key={comment.productCommentCode}>
                <div className="commentDiv">
                  <span className="userInfo">
                    <img
                      className="commentUserImage"
                      src={
                        "http://192.168.10.28:8081/" +
                        productBoard.user?.userImg
                      }
                    />
                    {comment.user.userNickname}
                  </span>
                  <span className="commentRegiDate">
                    {moment(comment.productCommentRegiDate).isSame(
                      moment(),
                      "day"
                    )
                      ? moment(comment.productCommentRegiDate).from(moment())
                      : moment(comment.productCommentRegiDate).format(
                          "YYYY.MM.DD. HH:mm"
                        )}
                    {user.userId === comment.user?.userId && (
                      <span className="commentChangeSpan">
                        <span
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditNo(comment.productCommentCode);
                            setReplyNo("");
                          }}
                        >
                          수정
                        </span>
                        <span
                          onClick={(e) => {
                            e.stopPropagation();
                            commentDelete(comment.productCommentCode);
                          }}
                        >
                          삭제
                        </span>
                      </span>
                    )}
                  </span>
                  <br />
                  {editNo === comment.productCommentCode ? (
                    <>
                      <InputGroup className="editGroup">
                        <Form.Control
                          defaultValue={comment.productCommentContent}
                          as="textarea"
                          rows={3}
                          className="writeReply"
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                          onChange={(e) => {
                            setEditContent(e.target.value);
                          }}
                        />
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            editComment();
                          }}
                        >
                          수정
                        </Button>
                        <Button
                          variant="secondary"
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditNo(0);
                            setEditContent("");
                          }}
                        >
                          취소
                        </Button>
                      </InputGroup>
                    </>
                  ) : (
                    <>
                      <div
                        className="commentContentDiv"
                        onClick={(e) => {
                          replyNo === comment.productCommentCode
                            ? setReplyNo("")
                            : setReplyNo(comment.productCommentCode);
                          setEditNo("");
                        }}
                      >
                        {" "}
                        {comment.productCommentContent}{" "}
                      </div>
                    </>
                  )}
                </div>
                {replyNo === comment.productCommentCode && (
                  <div className="writeReplyDiv">
                    <InputGroup className="editGroup">
                      <Form.Control
                        as="textarea"
                        rows={3}
                        className="writeReply"
                        onChange={(e) => {
                          setReplyContent(e.target.value);
                        }}
                      />
                      <Button onClick={() => addReply()}>작성</Button>
                      <Button
                        variant="secondary"
                        onClick={() => {
                          setReplyNo(0);
                          setReplyContent("");
                        }}
                      >
                        취소
                      </Button>
                    </InputGroup>
                  </div>
                )}
                {comment?.replies.map((reply) =>
                  reply.productCommentDelete === "N" ? (
                    <div className="viewReply" key={reply.productCommentCode}>
                      <FiCornerDownRight className="replyIcon" />
                      <span className="userInfo">
                        <img
                          className="commentUserImage"
                          src={
                            "http://192.168.10.28:8081/" +
                            productBoard.user?.userImg
                          }
                        />
                        {reply.user.userNickname}
                      </span>
                      <span className="commentRegiDate">
                        {moment(reply.productCommentRegiDate).isSame(
                          moment(),
                          "day"
                        )
                          ? moment(reply.productCommentRegiDate).from(moment())
                          : moment(reply.productCommentRegiDate).format(
                              "YYYY.MM.DD"
                            )}
                        {user.userId === reply.user?.userId && (
                          <span className="commentChangeSpan">
                            <span
                              onClick={(e) => {
                                e.stopPropagation();
                                setEditNo(reply.productCommentCode);
                                setReplyNo("");
                              }}
                            >
                              수정
                            </span>
                            <span
                              onClick={(e) => {
                                e.stopPropagation();
                                commentDelete(reply.productCommentCode);
                              }}
                            >
                              삭제
                            </span>
                          </span>
                        )}
                      </span>
                      <br />
                      {editNo === reply.productCommentCode ? (
                        <>
                          <InputGroup className="editGroup">
                            <Form.Control
                              defaultValue={reply.productCommentContent}
                              as="textarea"
                              rows={3}
                              className="writeReply"
                              onClick={(e) => {
                                e.stopPropagation();
                              }}
                              onChange={(e) => {
                                setEditContent(e.target.value);
                              }}
                            />
                            <Button
                              onClick={(e) => {
                                e.stopPropagation();
                                editComment();
                              }}
                            >
                              수정
                            </Button>
                            <Button
                              variant="secondary"
                              onClick={(e) => {
                                e.stopPropagation();
                                setEditNo(0);
                                setEditContent("");
                              }}
                            >
                              취소
                            </Button>
                          </InputGroup>
                        </>
                      ) : (
                        <>
                          <div className="commentContentDiv">
                            {" "}
                            {reply.productCommentContent}{" "}
                          </div>
                        </>
                      )}
                    </div>
                  ) : (
                    <div
                      className="viewReply deleteReply"
                      key={reply.productCommentCode}
                    >
                      삭제된 댓글입니다.
                    </div>
                  )
                )}
              </div>
            ) : (
              <div className="viewComment" key={comment.productCommentCode}>
                <div
                  key={comment.productCommentCode}
                  className="commentDiv deleteComment"
                  onClick={(e) => {
                    replyNo === comment.productCommentCode
                      ? setReplyNo("")
                      : setReplyNo(comment.productCommentCode);
                    setEditNo("");
                  }}
                >
                  삭제된 댓글입니다.
                </div>
                {replyNo === comment.productCommentCode && (
                  <div className="writeReplyDiv">
                    <InputGroup className="editGroup">
                      <Form.Control
                        as="textarea"
                        rows={3}
                        className="writeReply"
                        onChange={(e) => {
                          setReplyContent(e.target.value);
                        }}
                      />
                      <Button onClick={() => addReply()}>작성</Button>
                      <Button
                        variant="secondary"
                        onClick={() => {
                          setReplyNo(0);
                          setReplyContent("");
                        }}
                      >
                        취소
                      </Button>
                    </InputGroup>
                  </div>
                )}
                {comment?.replies.map((reply) =>
                  reply.productCommentDelete === "N" ? (
                    <div className="viewReply" key={reply.productCommentCode}>
                      <FiCornerDownRight className="replyIcon" />
                      <span className="userInfo">
                        <img
                          className="commentUserImage"
                          src={
                            "http://192.168.10.28:8081/" +
                            productBoard.user?.userImg
                          }
                        />
                        {reply.user.userNickname}
                      </span>

                      <span className="commentRegiDate">
                        {moment(reply.productCommentRegiDate).isSame(
                          moment(),
                          "day"
                        )
                          ? moment(reply.productCommentRegiDate).from(moment())
                          : moment(reply.productCommentRegiDate).format(
                              "YYYY.MM.DD"
                            )}
                        {user.userId === reply.user?.userId && (
                          <span className="commentChangeSpan">
                            <span
                              onClick={(e) => {
                                e.stopPropagation();
                                setEditNo(reply.productCommentCode);
                                setReplyNo("");
                              }}
                            >
                              수정
                            </span>
                            <span
                              onClick={(e) => {
                                e.stopPropagation();
                                commentDelete(reply.productCommentCode);
                              }}
                            >
                              삭제
                            </span>
                          </span>
                        )}
                      </span>
                      <br />
                      {editNo === reply.productCommentCode ? (
                        <>
                          <InputGroup className="editGroup">
                            <Form.Control
                              defaultValue={reply.productCommentContent}
                              as="textarea"
                              rows={3}
                              className="writeReply"
                              onClick={(e) => {
                                e.stopPropagation();
                              }}
                              onChange={(e) => {
                                setEditContent(e.target.value);
                              }}
                            />
                            <Button
                              variant="secondary"
                              onClick={(e) => {
                                e.stopPropagation();
                                editComment();
                              }}
                            >
                              수정
                            </Button>
                            <Button
                              onClick={(e) => {
                                e.stopPropagation();
                                setEditNo(0);
                                setEditContent("");
                              }}
                            >
                              취소
                            </Button>
                          </InputGroup>
                        </>
                      ) : (
                        <>
                          <div className="commentContentDiv">
                            {" "}
                            {reply.productCommentContent}{" "}
                          </div>
                        </>
                      )}
                    </div>
                  ) : (
                    <div
                      key={reply.productCommentCode}
                      className="viewReply deleteReply"
                    >
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

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
import MyToggleBar from "../../components/note/MyToggleBar";

const Main = styled.main`
  min-width: 1903px;
  width: 100%;

  padding: 0px 300px;
  padding-top: 120px;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-bottom: 90px;

  font-family: "TAEBAEKmilkyway";
  font-weight: bold;

  input,
  select,
  button,
  option,
  h2,
  textarea {
    font-weight: bold;
    resize: none;
  }

  @font-face {
    font-family: "TAEBAEKmilkyway";
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2310@1.0/TAEBAEKmilkyway.woff2")
      format("woff2");

    font-weight: normal;
    font-style: normal;
  }

  h1 {
    font-size: 2.5rem;
    font-weight: bold;
    cursor: pointer;
    padding-bottom: 10px;
  }
  h1:hover {
    color: #94b29b;
  }

  .boardDiv {
    padding-bottom: 20px;
    border-bottom: 2px black solid;
  }

  .boardRegiDate {
    float: right;
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
    margin-bottom: 30px;
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
    margin-top: 20px;

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

    div:not(.noteCreate) {
      display: inline-flex;
      svg {
        cursor: pointer;
      }
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
  o .deleteReply {
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

  .boardUserInfo {
    div:not(.noteCreate) {
      display: inline-flex;
      font-size: 1rem;
    }
    svg {
      cursor: pointer;
    }

    span {
      line-height: 40px;
    }

    border-bottom: 2px solid #dcdcdc;
    padding: 4px 0px;
  }

  .boardTitle {
    font-size: 1.8rem;
    padding-bottom: 6px;
    border-bottom: 2px solid gray;
  }

  .boardUserImage {
    width: 40px;
    height: 40px;
    border-radius: 100%;
  }

  .boardImage {
    margin-top: 20px;
    position: relative;
    img {
      object-fit: "fill";
      margin-left: 9px;
    }
    img:nth-child(1) {
      width: 620px;
      height: 405px;
      margin-left: 31px;
    }
    img:nth-child(2) {
      position: absolute;
      top: 0px;
    }
    img:nth-child(3) {
      position: absolute;
      top: 0px;
      right: 31px;
    }
    img:nth-child(4) {
      position: absolute;
      bottom: 0px;
    }
    img:nth-child(5) {
      position: absolute;
      bottom: 0px;
      right: 31px;
    }

    img:not(:nth-child(1)) {
      width: 300px;
      height: 200px;
    }
  }

  .boardContent {
    padding: 20px;
    border-top: 2px solid #dcdcdc;
    border-bottom: 2px solid #dcdcdc;
    background-color: ghostwhite;
  }

  .boardCommentDiv {
    margin-top: 20px;
  }

  .boardBtnNav {
    padding-top: 10px;
    padding-right: 10px;
    button {
      margin: 0px 5px;
      float: right;
      width: 75px;
      height: 45px;
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
  const [comment, setComment] = useState("");
  const [replyNo, setReplyNo] = useState(0);
  const [replyContent, setReplyContent] = useState("");
  const [editNo, setEditNo] = useState(0);
  const [editContent, setEditContent] = useState("");
  const [page, setPage] = useState("");
  const token = localStorage.getItem("token");

  const viewProductBoard = async () => {
    const response = await getProductBoard(code);
    setProductBoard(response.data);
  };

  const viewProductBoardComment = async () => {
    const response = await getProductBoardComments(code);
    setComments(response.data);
  };

  const recommend = async () => {
    if (token === null) {
      alert("로그인이 필요합니다.");
      return false;
    }
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
    if (window.confirm("댓글을 삭제하시겠습니까?")) {
      await delProductBoardcomment(no);
      viewProductBoard();
      viewProductBoardComment();
    }
  };

  const addComment = async () => {
    if (token === null) {
      alert("로그인이 필요합니다.");
      return false;
    }
    if (comment === "") {
      alert("내용을 입력해주세요.");
      return false;
    }
    if (window.confirm("댓글을 작성하시겠습니까?")) {
      await addProductBoardComment({
        productBoardCode: code,
        productCommentContent: comment,
      });
      viewProductBoard();
      viewProductBoardComment();
      alert("댓글이 등록되었습니다.");
    }
  };

  const addReply = async () => {
    if (token === null) {
      alert("로그인이 필요합니다.");
      return false;
    }
    if (replyContent === "") {
      alert("내용을 입력해주세요.");
      return false;
    }
    if (window.confirm("댓글을 작성하시겠습니까?")) {
      await addProductBoardComment({
        productBoardCode: code,
        productParentCode: replyNo,
        productCommentContent: replyContent,
      });
      setReplyNo(0);
      setReplyContent("");
      viewProductBoard();
      viewProductBoardComment();
      alert("댓글이 등록되었습니다.");
    }
  };

  const editComment = async () => {
    if (editContent === "") {
      alert("내용을 입력해주세요.");
      return false;
    }
    if (window.confirm("수정 하시겠습니까?")) {
      await editProductBoardComment({
        productCommentCode: editNo,
        productCommentContent: editContent,
      });
      setReplyContent("");
      setEditNo(0);
      viewProductBoardComment();
      alert("댓글이 수정되었습니다.");
    }
  };

  const removeProductBoard = async () => {
    if (window.confirm("게시물을 삭제 하시겠습니까?")) {
      await delProductBoard(code);
      navigate("/compagno/product-board");
      window.alert("게시물이 삭제되었습니다.");
    }
  };

  const editProductBoard = () => {
    navigate("/compagno/product-board/edit/" + code);
  };

  return (
    <Main>
      <div className="boardDiv">
        <h1 onClick={() => navigate("/compagno/product-board")}>
          제품 정보 공유 게시판
        </h1>
        <div className="boardTitle">{productBoard.productBoardTitle} </div>
        <div className="boardUserInfo">
          {productBoard.user?.userImg !== undefined && (
            <img
              className="boardUserImage"
              src={"http://192.168.10.28:8081/" + productBoard.user?.userImg}
            />
          )}
          <MyToggleBar name={productBoard.user?.userNickname} />
          <span className="boardRegiDate">
            작성 일 :{" "}
            {moment(productBoard.productBoardRegiDate).format(
              "YYYY-MM-DD HH:mm"
            )}
          </span>
          <span className="viewCount">
            조회 수 : {productBoard.productBoardViewCount}
          </span>
        </div>
        {productBoard.productMainImage != undefined && (
          <div className="boardImage">
            <img
              src={"http://192.168.10.28:8081/" + productBoard.productMainImage}
            />
            {productBoard.images?.map((image) => (
              <img
                key={image.productImageCode}
                src={"http://192.168.10.28:8081/" + image.productImage}
              />
            ))}
          </div>
        )}
        <p>제품명 : {productBoard.productName}</p>
        <p>사용 동물 : {productBoard.animalCategory?.animalType}</p>
        <p>제품 품목 : {productBoard.productCategory}</p>
        <p>가격 : {productBoard.productPrice?.toLocaleString("ko-KR")}원</p>
        <p>
          만족도 : {star(productBoard.productBoardGrade)}
          &nbsp;&nbsp;{productBoard.productBoardGrade}
        </p>
        <div className="boardContent">{productBoard.productBoardContent}</div>
        <div className="recommendDiv">
          {checkRecommend?.length === 0 ? (
            <FaRegThumbsUp className="recommend" onClick={() => recommend()} />
          ) : (
            <FaThumbsUp className="recommend" onClick={() => recommend()} />
          )}
          <span>{productBoard.recommend?.length}</span>
        </div>
      </div>
      <nav className="boardBtnNav">
        <Button
          variant="secondary"
          onClick={() => navigate("/compagno/product-board")}
        >
          목록
        </Button>
        {user.userId === productBoard.user?.userId && (
          <>
            <Button
              variant="warning"
              onClick={() => {
                editProductBoard();
              }}
            >
              수정
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                removeProductBoard();
              }}
            >
              삭제
            </Button>
          </>
        )}
      </nav>
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
                if (e.target.value.length > 250) {
                  e.target.value = e.target.value.slice(0, 250);
                }
                setComment(e.target.value.trim());
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
                      src={"http://192.168.10.28:8081/" + comment.user?.userImg}
                    />
                    <MyToggleBar name={comment.user.userNickname} />
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
                            setEditContent(comment.productCommentContent);
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
                            if (e.target.value.length > 250) {
                              e.target.value = e.target.value.slice(0, 250);
                            }
                            setEditContent(e.target.value.trim());
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
                          if (e.target.value.length > 250) {
                            e.target.value = e.target.value.slice(0, 250);
                          }
                          setReplyContent(e.target.value.trim());
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
                            "http://192.168.10.28:8081/" + reply.user?.userImg
                          }
                        />
                        <MyToggleBar name={reply.user.userNickname} />
                      </span>
                      <span className="commentRegiDate">
                        {moment(reply.productCommentRegiDate).isSame(
                          moment(),
                          "day"
                        )
                          ? moment(reply.productCommentRegiDate).from(moment())
                          : moment(reply.productCommentRegiDate).format(
                              "YYYY.MM.DD. HH:mm"
                            )}
                        {user.userId === reply.user?.userId && (
                          <span className="commentChangeSpan">
                            <span
                              onClick={(e) => {
                                e.stopPropagation();
                                setEditNo(reply.productCommentCode);
                                setEditContent(reply.productCommentContent);
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
                                if (e.target.value.length > 250) {
                                  e.target.value = e.target.value.slice(0, 250);
                                }
                                setEditContent(e.target.value.trim());
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
                          if (e.target.value.length > 250) {
                            e.target.value = e.target.value.slice(0, 250);
                          }
                          setReplyContent(e.target.value.trim());
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
                            "http://192.168.10.28:8081/" + reply.user?.userImg
                          }
                        />
                        <MyToggleBar name={reply.user.userNickname} />
                      </span>

                      <span className="commentRegiDate">
                        {moment(reply.productCommentRegiDate).isSame(
                          moment(),
                          "day"
                        )
                          ? moment(reply.productCommentRegiDate).from(moment())
                          : moment(reply.productCommentRegiDate).format(
                              "YYYY.MM.DD. HH:mm"
                            )}
                        {user.userId === reply.user?.userId && (
                          <span className="commentChangeSpan">
                            <span
                              onClick={(e) => {
                                e.stopPropagation();
                                setEditNo(reply.productCommentCode);
                                setEditContent(reply.productCommentContent);
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
                                if (e.target.value.length > 250) {
                                  e.target.value = e.target.value.slice(0, 250);
                                }
                                setEditContent(e.target.value.trim());
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

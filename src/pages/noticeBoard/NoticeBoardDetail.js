import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";
import { Form, Button, InputGroup } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { userSave } from "../../store/user";
import MyToggleBar from "../../components/note/MyToggleBar";
import {
  getNoticeBoard,
  delNoticeBoard,
  delNoticeBoardcomment,
  editNoticeBoardComment,
  addNoticeBoardComment,
  getNoticeBoardComments,
} from "../../api/noticeBoard";
import { FiCornerDownRight } from "react-icons/fi";

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

  * {
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
    padding-bottom: 30px;
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

  .viewCommentsDiv {
    border-top: 2px solid silver;
  }

  .commentRegiDate {
    font-size: 0.8rem;
    color: gray;
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

    div {
      display: inline-flex;
      font-size: 0.8rem;
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
    div {
      display: inline-flex;
      font-size: 0.8rem;
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

  .boardContent {
    padding: 20px;
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

const NoticeBoardDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => {
    return state.user;
  });
  const { code } = useParams();

  const [noticeBoard, setNoticeBoard] = useState([]);

  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [replyNo, setReplyNo] = useState(0);
  const [replyContent, setReplyContent] = useState("");
  const [editNo, setEditNo] = useState(0);
  const [editContent, setEditContent] = useState("");
  const [page, setPage] = useState("");
  const token = localStorage.getItem("token");

  const viewNoticeBoard = async () => {
    const response = await getNoticeBoard(code);
    setNoticeBoard(response.data);
  };

  const viewNoticeBoardComment = async () => {
    const response = await getNoticeBoardComments(code);
    setComments(response.data);
  };

  useEffect(() => {
    if (token !== null) {
      dispatch(userSave(JSON.parse(localStorage.getItem("user"))));
    }
    viewNoticeBoard();
    viewNoticeBoardComment();
  }, []);

  const commentDelete = async (no) => {
    if (window.confirm("댓글을 삭제하시겠습니까?")) {
      await delNoticeBoardcomment(no);
      viewNoticeBoard();
      viewNoticeBoardComment();
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
      await addNoticeBoardComment({
        noticeBoardCode: code,
        noticeCommentContent: comment,
      });
      viewNoticeBoard();
      viewNoticeBoardComment();
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
      await addNoticeBoardComment({
        noticeBoardCode: code,
        noticeParentCode: replyNo,
        noticeCommentContent: replyContent,
      });
      setReplyNo(0);
      setReplyContent("");
      viewNoticeBoard();
      viewNoticeBoardComment();
      alert("댓글이 등록되었습니다.");
    }
  };

  const editComment = async () => {
    if (editContent === "") {
      alert("내용을 입력해주세요.");
      return false;
    }
    if (window.confirm("수정 하시겠습니까?")) {
      await editNoticeBoardComment({
        noticeCommentCode: editNo,
        noticeCommentContent: editContent,
      });
      setReplyContent("");
      setEditNo(0);
      viewNoticeBoardComment();
      alert("댓글이 수정되었습니다.");
    }
  };

  const removeNoticeBoard = async () => {
    if (window.confirm("게시물을 삭제 하시겠습니까?")) {
      await delNoticeBoard(code);
      navigate("/compagno/notice-board");
      window.alert("게시물이 삭제되었습니다.");
    }
  };

  const editNoticeBoard = () => {
    navigate("/compagno/notice-board/edit/" + code);
  };

  const writeCommentInput = useRef("");

  return (
    <Main>
      <div className="boardDiv">
        <h1 onClick={() => navigate("/compagno/notice-board")}>공지 사항</h1>
        <div className="boardTitle">{noticeBoard.noticeBoardTitle} </div>
        <div className="boardUserInfo">
          {noticeBoard.user?.userImg !== undefined && (
            <img
              className="boardUserImage"
              src={"http://192.168.10.28:8081/" + noticeBoard.user?.userImg}
            />
          )}
          {noticeBoard.user?.userNickname}
          <span className="boardRegiDate">
            작성 일 :{" "}
            {moment(noticeBoard.noticeBoardRegiDate).format("YYYY-MM-DD HH:mm")}
          </span>
          <span className="viewCount">
            조회 수 : {noticeBoard.noticeBoardViewCount}
          </span>
        </div>
        <div className="boardImage">
          {noticeBoard.images?.map((image) => (
            <img
              key={image.noticeImageCode}
              src={"http://192.168.10.28:8081/" + image.noticeImage}
            />
          ))}
        </div>

        <div className="boardContent">{noticeBoard.noticeBoardContent}</div>
      </div>
      <nav className="boardBtnNav">
        <Button
          variant="secondary"
          onClick={() => navigate("/compagno/notice-board")}
        >
          목록
        </Button>
        {user.userRole === "ROLE_ADMIN" && (
          <>
            <Button
              variant="warning"
              onClick={() => {
                editNoticeBoard();
              }}
            >
              수정
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                removeNoticeBoard();
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
            noticeBoard.comments?.filter(
              (commentCount) => commentCount.noticeCommentDelete !== "Y"
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
              ref={writeCommentInput}
            />
            <Button
              onClick={() => {
                writeCommentInput.current.value = "";
                addComment();
              }}
            >
              작성
            </Button>
          </InputGroup>
        </div>
        <div className="viewCommentsDiv">
          {comments?.map((comment) =>
            comment.noticeCommentDelete === "N" ? (
              <div className="viewComment" key={comment.noticeCommentCode}>
                <div className="commentDiv">
                  <span className="userInfo">
                    <img
                      className="commentUserImage"
                      src={"http://192.168.10.28:8081/" + comment.user?.userImg}
                    />
                    <MyToggleBar name={comment.user.userNickname} />
                  </span>
                  <span className="commentRegiDate">
                    {moment(comment.noticeCommentRegiDate).isSame(
                      moment(),
                      "day"
                    )
                      ? moment(comment.noticeCommentRegiDate).from(moment())
                      : moment(comment.noticeCommentRegiDate).format(
                          "YYYY.MM.DD. HH:mm"
                        )}
                    {user.userId === comment.user?.userId && (
                      <span className="commentChangeSpan">
                        <span
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditNo(comment.noticeCommentCode);
                            setEditContent(comment.noticeCommentContent);
                            setReplyNo("");
                          }}
                        >
                          수정
                        </span>
                        <span
                          onClick={(e) => {
                            e.stopPropagation();
                            commentDelete(comment.noticeCommentCode);
                          }}
                        >
                          삭제
                        </span>
                      </span>
                    )}
                  </span>
                  <br />
                  {editNo === comment.noticeCommentCode ? (
                    <>
                      <InputGroup className="editGroup">
                        <Form.Control
                          defaultValue={comment.noticeCommentContent}
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
                          replyNo === comment.noticeCommentCode
                            ? setReplyNo("")
                            : setReplyNo(comment.noticeCommentCode);
                          setEditNo("");
                        }}
                      >
                        {" "}
                        {comment.noticeCommentContent}{" "}
                      </div>
                    </>
                  )}
                </div>
                {replyNo === comment.noticeCommentCode && (
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
                  reply.noticeCommentDelete === "N" ? (
                    <div className="viewReply" key={reply.noticeCommentCode}>
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
                        {moment(reply.noticeCommentRegiDate).isSame(
                          moment(),
                          "day"
                        )
                          ? moment(reply.noticeCommentRegiDate).from(moment())
                          : moment(reply.noticeCommentRegiDate).format(
                              "YYYY.MM.DD. HH:mm"
                            )}
                        {user.userId === reply.user?.userId && (
                          <span className="commentChangeSpan">
                            <span
                              onClick={(e) => {
                                e.stopPropagation();
                                setEditNo(reply.noticeCommentCode);
                                setEditContent(reply.noticeCommentContent);
                                setReplyNo("");
                              }}
                            >
                              수정
                            </span>
                            <span
                              onClick={(e) => {
                                e.stopPropagation();
                                commentDelete(reply.noticeCommentCode);
                              }}
                            >
                              삭제
                            </span>
                          </span>
                        )}
                      </span>
                      <br />
                      {editNo === reply.noticeCommentCode ? (
                        <>
                          <InputGroup className="editGroup">
                            <Form.Control
                              defaultValue={reply.noticeCommentContent}
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
                            {reply.noticeCommentContent}{" "}
                          </div>
                        </>
                      )}
                    </div>
                  ) : (
                    <div
                      className="viewReply deleteReply"
                      key={reply.noticeCommentCode}
                    >
                      삭제된 댓글입니다.
                    </div>
                  )
                )}
              </div>
            ) : (
              <div className="viewComment" key={comment.noticeCommentCode}>
                <div
                  key={comment.noticeCommentCode}
                  className="commentDiv deleteComment"
                  onClick={(e) => {
                    replyNo === comment.noticeCommentCode
                      ? setReplyNo("")
                      : setReplyNo(comment.noticeCommentCode);
                    setEditNo("");
                  }}
                >
                  삭제된 댓글입니다.
                </div>
                {replyNo === comment.noticeCommentCode && (
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
                  reply.noticeCommentDelete === "N" ? (
                    <div className="viewReply" key={reply.noticeCommentCode}>
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
                        {moment(reply.noticeCommentRegiDate).isSame(
                          moment(),
                          "day"
                        )
                          ? moment(reply.noticeCommentRegiDate).from(moment())
                          : moment(reply.noticeCommentRegiDate).format(
                              "YYYY.MM.DD. HH:mm"
                            )}
                        {user.userId === reply.user?.userId && (
                          <span className="commentChangeSpan">
                            <span
                              onClick={(e) => {
                                e.stopPropagation();
                                setEditNo(reply.noticeCommentCode);
                                setEditContent(reply.noticeCommentContent);
                                setReplyNo("");
                              }}
                            >
                              수정
                            </span>
                            <span
                              onClick={(e) => {
                                e.stopPropagation();
                                commentDelete(reply.noticeCommentCode);
                              }}
                            >
                              삭제
                            </span>
                          </span>
                        )}
                      </span>
                      <br />
                      {editNo === reply.noticeCommentCode ? (
                        <>
                          <InputGroup className="editGroup">
                            <Form.Control
                              defaultValue={reply.noticeCommentContent}
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
                            {reply.noticeCommentContent}{" "}
                          </div>
                        </>
                      )}
                    </div>
                  ) : (
                    <div
                      key={reply.noticeCommentCode}
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
export default NoticeBoardDetail;

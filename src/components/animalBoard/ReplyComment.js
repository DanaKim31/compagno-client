import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaReplyAll } from "react-icons/fa";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { delComment, writeComment } from "../../api/animalBoard";
import Dropdown from "react-bootstrap/Dropdown";
import React from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { userSave } from "../../store/user";
import { updateComment } from "../../api/animalBoard";

import MyToggleBar from "../note/MyToggleBar";
import moment from "moment";
import Writer from "./Writer";
const InnerComment = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  width: 800px;

  padding-top: 10px;
  /* background-color: blue; */
  .animal-board-reply {
    display: flex;

    .user-action-container {
      /* background-color: yellow; */
      display: flex;
      flex-direction: column;
      margin: 10px 0px 30px 10px;
      .text-area-flexbox {
        display: flex;
        .btn-container {
          .complete {
            background-color: rgba(219, 235, 231, 1);
            color: black;
            border: 1px solid rgb(70, 92, 88);
            margin-right: 5px;
            margin-left: 5px;

            &:hover {
              background-color: rgb(70, 92, 88);
              color: rgb(244, 245, 219);
            }
          }
          .cancel {
            background-color: lightgrey;
            color: black;
            border: 1px solid grey;
            &:hover {
              background-color: whitesmoke;
            }
          }
        }
      }
      .animal-board-comment-userability {
        margin-bottom: 15px;
        display: flex;
        .comment-user-info {
          display: flex;
        }

        .response {
          cursor: pointer;
        }
      }
      .dropdown-toggle {
        cursor: pointer;
      }
    }
    .comment-date {
      padding-top: 8px;
      font-size: 0.8rem;
    }
  }
`;

const ReplyComment = ({
  replies,
  receiveComments,
  boardAuthor,
  currentUser,
  countCommentAPI,
}) => {
  // console.log(boardAuthor); // 글 저자 정보 잘 가져옴
  const { animalBoardCode } = useParams();
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const user = useSelector((state) => {
    return state.user;
  });

  // 대댓글 수정버튼 - 기존 해당 댓글내용 가져오기
  const [editReply, setEditReply] = useState({});
  const onAccessUpdate = async (prevReply) => {
    setEditReply({
      animalBoardCode: animalBoardCode,
      animalParentCode: prevReply.animalParentCode,
      animalCommentContent: prevReply.animalCommentContent,
      animalCommentCode: prevReply.animalCommentCode,
      animalCommentDate: prevReply.animalCommentDate,
      user: {
        userId: user.userId,
      },
      animalCommentTag: prevReply.animalCommentTag,
    });
    // console.log(prevReply);
  };
  // 대댓글 수정하기
  const onUpdateR = async () => {
    await updateComment(editReply);
    setEditReply({});
    receiveComments();
  };
  // 토글
  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <HiOutlineDotsHorizontal
      className="dropdown-toggle"
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    />
  ));
  // 대댓글 창 불러오기
  const [boolean, setBoolean] = useState(false);
  const accessReply = async (reply) => {
    if (currentUser === undefined || currentUser === null) {
      return alert("로그인이 필요합니다.");
    }
    setResponse(reply); // 댓글달 댓글 정보 들어옴.
    if (boolean) {
      setBoolean(false);
    } else {
      setBoolean(true);
    }
  };
  const onCancelR = () => {
    setEditReply({});
  };
  // 대댓글에 댓글 달기
  const [response, setResponse] = useState({});
  const addReplyR = async (parentCode) => {
    await writeComment({
      animalBoardCode: animalBoardCode,
      user: {
        userId: user.userId,
      },
      animalCommentContent: response.animalCommentContent,
      animalParentCode: parentCode,
      animalCommentTag: response.user.userNickname,
    });
    setResponse({});
    receiveComments();
  };
  // 대댓글 삭제
  const onDelete = async (commentCodes) => {
    await delComment({
      animalCommentCode: commentCodes.animalCommentCode,
      animalParentCode: commentCodes.animalParentCode,
      user: {
        userId: user.userId,
      },
    });
    receiveComments();
    countCommentAPI();
  };
  // const onDelete = async (commentCode) => {
  //   await delComment(commentCode);
  //   receiveComments();
  // };

  // useEffect(() => {
  //   receiveComments();
  // }, []);
  useEffect(() => {
    if (token !== null) {
      dispatch(userSave(JSON.parse(localStorage.getItem("user"))));
    }
    // console.log(user);
    // console.log(token);
  }, []);
  return (
    <>
      {replies.map((reply) => (
        <InnerComment key={reply.animalCommentCode}>
          {editReply.animalCommentCode === reply.animalCommentCode ? (
            <>
              <div className="animal-board-reply">
                <label>
                  <img
                    src={"http://192.168.10.28:8081/" + reply.user.userImg}
                  />
                </label>
                <div className="user-action-container">
                  <div className="animal-board-comment-userability">
                    <p>
                      {reply.user.userNickname}{" "}
                      {moment(editReply.animalBoardDate).format(
                        "YYYY.MM.DD HH:mm  "
                      )}
                    </p>
                    <FaReplyAll />
                  </div>
                  <div className="text-area-flexbox">
                    <textarea
                      className="update-comment-content"
                      style={{
                        width: "600px",
                        height: "40px",
                        "border-radius": "10px",
                        resize: "none",
                      }}
                      value={editReply.animalCommentContent}
                      onChange={(e) =>
                        setEditReply((prev) => ({
                          ...prev,
                          animalCommentContent: e.target.value,
                        }))
                      }
                    ></textarea>
                    <div className="btn-container">
                      <Button className="complete" onClick={onUpdateR}>
                        완료
                      </Button>
                      <Button className="cancel" onClick={onCancelR}>
                        취소
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="animal-board-reply">
                <label>
                  <img
                    src={"http://192.168.10.28:8081/" + reply.user.userImg}
                  />
                </label>
                <div className="user-action-container">
                  <div className="animal-board-comment-userability">
                    <div className="comment-user-info">
                      <MyToggleBar name={reply.user.userNickname} />
                      {boardAuthor === reply.user.userId ? (
                        <>
                          <Writer />
                        </>
                      ) : (
                        <></>
                      )}{" "}
                    </div>
                    <FaReplyAll
                      className="response"
                      onClick={() => accessReply(reply)}
                    />
                    {user.userId === reply.user.userId ? (
                      <>
                        <Dropdown>
                          <Dropdown.Toggle
                            as={CustomToggle}
                            id="dropdown-custom-components"
                          ></Dropdown.Toggle>

                          <Dropdown.Menu className="dropdown-menu">
                            <Dropdown.Item
                              onClick={() => onAccessUpdate(reply)}
                            >
                              수정하기
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => onDelete(reply)}>
                              삭제하기
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>

                  <div>
                    {reply.animalCommentTag === null ? (
                      <></>
                    ) : (
                      <>
                        <a href="/compagno/animal-board">
                          {"@" + reply.animalCommentTag}
                        </a>
                      </>
                    )}

                    {reply.animalCommentContent}
                  </div>
                  <div className="comment-date">
                    {moment(reply.animalBoardDate).format("YYYY.MM.DD HH:mm  ")}
                  </div>
                </div>
              </div>
              <div className="response-to-reply">
                {boolean &&
                reply.animalCommentCode === response.animalCommentCode ? (
                  <>
                    <InputGroup>
                      <InputGroup.Text>
                        @{reply.user.userNickname}
                      </InputGroup.Text>
                      <Form.Control
                        as="textarea"
                        aria-label="With textarea"
                        value={response.value}
                        onChange={(e) =>
                          setResponse((prev) => ({
                            ...prev,
                            animalCommentContent: e.target.value,
                          }))
                        }
                      />
                      <Button
                        variant="secondary"
                        onClick={() => addReplyR(reply.animalParentCode)}
                      >
                        대댓글추가!
                      </Button>
                      <Button variant="light" onClick={() => setBoolean(false)}>
                        취소
                      </Button>
                    </InputGroup>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </>
          )}
        </InnerComment>
      ))}
    </>
  );
};
export default ReplyComment;

import { useState, useEffect } from "react";
import React from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import Dropdown from "react-bootstrap/Dropdown";
import FavoriteBoard from "./FavoriteBoard";
import ViewMoreReply from "./ViewMoreReply";
import {
  getComments,
  writeComment,
  updateComment,
  delComment,
} from "../../api/animalBoard";
import { InputGroup, Form, Button } from "react-bootstrap";
import moment from "moment";
import { FaPencilAlt, FaReply } from "react-icons/fa";
// import { FaReply } from "react-icons/fa";
import styled from "styled-components";
const Comment = styled.div`
  /* background-color: red; */
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  width: 70%;
  .animal-board-write-comment {
    width: 100%;
  }
  img {
    width: 70px;
  }
  .dropdown {
    display: block;
    width: auto;
    height: auto;
    right: 0;
    top: 0;
  }

  .contents-container {
    /* background-color: greenyellow; */
    width: 800px;
  }
  .animal-board-comment {
    margin: auto;
    display: flex;

    .user-action-container {
      display: flex;
      flex-direction: column;
      margin: 10px 0px 30px 10px;
      /* background-color: red; */
      /* width: 1200px; */
      .animal-board-comment-userability {
        margin-bottom: 15px;
        display: flex;
        .writer {
          font-weight: 1.2rem;
          color: brown;
        }
        .response {
          cursor: pointer;
        }
      }
      .update-comment-content {
        border: 1px solid grey;
      }
      .dropdown-toggle {
        cursor: pointer;
      }
    }
  }
  .repl-toggle-button {
    border: none;
    border-radius: 15px;
    width: 300px;
    .repl-toggle {
      cursor: pointer;
      font-size: 1.5rem;
    }
  }
`;
const ParentComments = ({
  user,
  token,
  animalBoardCode,
  detailInfo,
  animalBoardAPI,
  commentsBoolean,
  // countCommentAPI,
}) => {
  // 댓글 불러오기

  const [comments, setComments] = useState([]);
  const animalBoardCommentAPI = async () => {
    const response = await getComments(animalBoardCode);
    console.log(response.data);
    setComments(response.data);
  };
  // const commentCounts = Object.keys(comments).length; // 댓글 수
  // 댓글쓰기
  const [comment, setComment] = useState({
    animalBoardCode: animalBoardCode,
    animalCommentContent: "",
    user: user,
  });
  const [animalComment, setAnimalComment] = useState("");
  const addComment = async () => {
    console.log(animalComment);
    if (token === null) {
      alert("로그인해주세요");
    } else {
      await writeComment({
        animalBoardCode: animalBoardCode,
        animalCommentContent: animalComment,
        user: {
          userId: user.userId,
        },
      });
      setAnimalComment("");
      animalBoardCommentAPI();
      // countCommentAPI();
    }
  };
  //댓글 수정버튼 - 기존 해당 댓글내용 가져오기
  const [edit, setEdit] = useState({});
  const onUpdate = async (comment) => {
    console.log(comment);
    setEdit({
      animalCommentCode: comment.animalCommentCode,
      animalCommentContent: comment.animalCommentContent,
      animalBoardCode: comment.animalBoardCode,
      animalCommentDate: comment.animalCommentDate,
      user: {
        userId: user.userId,
        userNickname: user.userNickname,
      },
    });
  };
  //댓글 수정하기
  const updateCommentC = async () => {
    await updateComment(edit);
    setEdit({});
    animalBoardCommentAPI();
  };
  // 댓글 수정 취소
  const onCancel = () => {
    setEdit({});
  };
  // 댓글 삭제
  const onDelete = async (commentCodes) => {
    await delComment({
      animalCommentCode: commentCodes.animalCommentCode,
      animalParentCode: commentCodes.animalParentCode,
    });
    animalBoardCommentAPI();
    // countCommentAPI();
  };

  // 대댓글 달기
  const [boolean, setBoolean] = useState(false); // 추후 유저정보 토대로 boolean 예정
  const [response, setResponse] = useState({}); // 부모 댓글 정보

  const accessReply = async (comment) => {
    if (user.userId === undefined || user.userId === null) {
      return alert("로그인이 필요합니다.");
    }
    setResponse(comment); // 현재 클릭한 아이의 댓글정보
    console.log(comment);
    if (boolean) {
      setBoolean(false);
    } else {
      setBoolean(true);
    }
  };
  const addReply = async (commentCode) => {
    await writeComment({
      animalBoardCode: animalBoardCode,
      animalParentCode: commentCode,
      animalCommentContent: response.animalCommentContent,
      user: {
        userId: user.userId,
      },
      animalCommentTag: response.user.userNickname,
    });
    setResponse({});
    animalBoardCommentAPI();
    // countCommentAPI();
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
  // 댓글 전체보기? 아님 그냥?
  const [allCommentsBool, setAllCommentsBool] = useState(true);
  useEffect(() => {
    setAllCommentsBool(commentsBoolean);
  }, [commentsBoolean]);
  useEffect(() => {
    animalBoardCommentAPI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    animalBoardCommentAPI();
  }, [comment.replies]);
  return (
    <>
      <Comment className="animal-board-comment-contents">
        <div className="animal-board-write-comment ">
          <InputGroup>
            <Form.Control
              as="textarea"
              aria-label="With textarea"
              value={animalComment}
              onChange={(e) => setAnimalComment(e.target.value)}
            />

            {allCommentsBool ? (
              <>
                <InputGroup.Text>
                  <FavoriteBoard
                    userId={user.userId}
                    boardCode={animalBoardCode}
                    count={detailInfo.animalBoardFavoriteCount}
                    // addFav={() => addFav()}
                    // delFav={() => delFav()}
                    animalBoardAPI={() => animalBoardAPI()}
                  />
                  {detailInfo.animalBoardFavoriteCount}
                </InputGroup.Text>
              </>
            ) : (
              <></>
            )}

            <Button variant="secondary" onClick={addComment}>
              댓글추가!
            </Button>
          </InputGroup>
        </div>
        {allCommentsBool ? (
          <>
            {comments.slice(0, 3).map((comment) => (
              <div
                className="contents-container"
                key={comment.animalCommentCode}
              >
                {edit.animalCommentCode === comment.animalCommentCode ? (
                  <>
                    <div className="animal-board-comment ">
                      <label>
                        <img
                          src={
                            "http://192.168.10.28:8081/" + comment.user.userImg
                          }
                        />
                      </label>
                      <div className="user-action-container">
                        <div className="animal-board-comment-userability">
                          <p>
                            {edit.user.userNickname}
                            {moment(edit.animalBoardDate).format("MM.DD HH:mm")}
                          </p>

                          <FaReply />
                        </div>
                        <textarea
                          className="update-comment-content"
                          value={edit.animalCommentContent}
                          onChange={(e) =>
                            setEdit((prev) => ({
                              ...prev,
                              animalCommentContent: e.target.value,
                            }))
                          }
                        ></textarea>
                      </div>
                      <div className="btn-container">
                        <Button
                          variant="primary"
                          onClick={() => {
                            updateCommentC(edit);
                          }}
                        >
                          완료
                        </Button>
                        <Button variant="info" onClick={onCancel}>
                          취소
                        </Button>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="animal-board-comment ">
                      <label>
                        <img
                          src={
                            "http://192.168.10.28:8081/" + comment.user.userImg
                          }
                        />
                      </label>
                      <div className="user-action-container">
                        <div className="animal-board-comment-userability">
                          <p>
                            {comment.user.userNickname}
                            {detailInfo.user.userId === comment.user.userId ? (
                              <>
                                <FaPencilAlt className="writer" />
                                작성자
                              </>
                            ) : (
                              <></>
                            )}{" "}
                            {moment(comment.animalBoardDate).format(
                              "MM.DD HH:mm"
                            )}
                          </p>
                          <FaReply
                            className="response"
                            onClick={() => accessReply(comment)}
                          />
                          {user.userId === comment.user.userId ? (
                            <>
                              <Dropdown>
                                <Dropdown.Toggle
                                  as={CustomToggle}
                                  id="dropdown-custom-components"
                                ></Dropdown.Toggle>
                                <Dropdown.Menu className="dropdown-menu">
                                  <Dropdown.Item
                                    onClick={() => onUpdate(comment)}
                                  >
                                    수정하기
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    onClick={() => onDelete(comment)}
                                  >
                                    삭제하기
                                  </Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </>
                          ) : (
                            <></>
                          )}
                        </div>
                        <div>{comment.animalCommentContent}</div>
                      </div>
                    </div>
                    <div className="response-to-comment">
                      {boolean &&
                      comment.animalCommentCode ===
                        response.animalCommentCode ? (
                        <>
                          <InputGroup>
                            <InputGroup.Text>
                              @{comment.user.userNickname}
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
                              onClick={() =>
                                addReply(comment.animalCommentCode)
                              }
                            >
                              대댓글추가!
                            </Button>
                            <Button
                              variant="light"
                              onClick={() => setBoolean(false)}
                            >
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
                <ViewMoreReply
                  comment={comment}
                  receiveComments={() => animalBoardCommentAPI()}
                  boardAuthor={detailInfo.user.userId}
                  currentUser={user.userId}
                />
              </div>
            ))}
          </>
        ) : (
          <>
            {comments.map((comment) => (
              <div
                className="contents-container"
                key={comment.animalCommentCode}
              >
                {edit.animalCommentCode === comment.animalCommentCode ? (
                  <>
                    <div className="animal-board-comment ">
                      <label>
                        <img
                          src={
                            "http://192.168.10.28:8081/" + comment.user.userImg
                          }
                        />
                      </label>
                      <div className="user-action-container">
                        <div className="animal-board-comment-userability">
                          <p>
                            {edit.user.userNickname}
                            {moment(edit.animalBoardDate).format("MM.DD HH:mm")}
                          </p>

                          <FaReply />
                        </div>
                        <textarea
                          className="update-comment-content"
                          value={edit.animalCommentContent}
                          onChange={(e) =>
                            setEdit((prev) => ({
                              ...prev,
                              animalCommentContent: e.target.value,
                            }))
                          }
                        ></textarea>
                      </div>
                      <div className="btn-container">
                        <Button
                          variant="primary"
                          onClick={() => {
                            updateCommentC(edit);
                          }}
                        >
                          완료
                        </Button>
                        <Button variant="info" onClick={onCancel}>
                          취소
                        </Button>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="animal-board-comment ">
                      <label>
                        <img
                          src={
                            "http://192.168.10.28:8081/" + comment.user.userImg
                          }
                        />
                      </label>
                      <div className="user-action-container">
                        <div className="animal-board-comment-userability">
                          <p>
                            {comment.user.userNickname}
                            {detailInfo.user.userId === comment.user.userId ? (
                              <>
                                <FaPencilAlt className="writer" />
                                작성자
                              </>
                            ) : (
                              <></>
                            )}{" "}
                            {moment(comment.animalBoardDate).format(
                              "MM.DD HH:mm"
                            )}
                          </p>
                          <FaReply
                            className="response"
                            onClick={() => accessReply(comment)}
                          />
                          {user.userId === comment.user.userId ? (
                            <>
                              <Dropdown>
                                <Dropdown.Toggle
                                  as={CustomToggle}
                                  id="dropdown-custom-components"
                                ></Dropdown.Toggle>
                                <Dropdown.Menu className="dropdown-menu">
                                  <Dropdown.Item
                                    onClick={() => onUpdate(comment)}
                                  >
                                    수정하기
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    onClick={() => onDelete(comment)}
                                  >
                                    삭제하기
                                  </Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </>
                          ) : (
                            <></>
                          )}
                        </div>
                        <div>{comment.animalCommentContent}</div>
                      </div>
                    </div>
                    <div className="response-to-comment">
                      {boolean &&
                      comment.animalCommentCode ===
                        response.animalCommentCode ? (
                        <>
                          <InputGroup>
                            <InputGroup.Text>
                              @{comment.user.userNickname}
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
                              onClick={() =>
                                addReply(comment.animalCommentCode)
                              }
                            >
                              대댓글추가!
                            </Button>
                            <Button
                              variant="light"
                              onClick={() => setBoolean(false)}
                            >
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
                <ViewMoreReply
                  comment={comment}
                  receiveComments={() => animalBoardCommentAPI()}
                  boardAuthor={detailInfo.user.userId}
                  currentUser={user.userId}
                  // countCommentAPI={() => countCommentAPI()}
                  // commentCounts={commentCounts}
                />
              </div>
            ))}
          </>
        )}
      </Comment>
    </>
  );
};
export default ParentComments;

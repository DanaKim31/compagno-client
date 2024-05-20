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
  countComment,
} from "../../api/animalBoard";
import { InputGroup, Form, Button } from "react-bootstrap";
import moment from "moment";
import { FaReply } from "react-icons/fa";
import styled from "styled-components";
import MyToggleBar from "../note/MyToggleBar";
import Writer from "./Writer";
import { RxHamburgerMenu } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import AllReplies from "./AllReplies";
const Comment = styled.div`
  display: flex;
  flex-direction: column;

  margin: auto;
  width: 70%;
  .animal-board-write-comment {
    padding-top: 20px;
    width: 100%;
    border-top: 1px solid lightgrey;
    .additional-comment-info {
      display: flex;
      padding-bottom: 20px;
      .back-to-list {
        border: 1px solid lightgray;
        border-radius: 10px;
        width: 110px;
        padding: 3px;
        text-align: center;
        background-color: white;
        cursor: pointer;
        &:hover {
          background-color: whitesmoke;
        }
      }
      .inner-flexbox {
        margin-left: 20px;
        display: flex;

        .comment-count {
          border: 1px solid lightgray;
          border-radius: 10px;
          width: 110px;
          padding: 3px;
          text-align: center;
          cursor: pointer;
          &:hover {
            background-color: whitesmoke;
          }
        }
      }
    }
  }
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
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
    border-bottom: 1px solid lightgrey;
  }
  .animal-board-comment-container {
    padding-left: 20px;
  }
  .animal-board-comment {
    margin-top: 10px;

    padding-top: 10px;
    /* margin: auto; */
    display: flex;

    .user-action-container {
      display: flex;
      flex-direction: column;
      margin: 10px 0px 30px 10px;
      /* background-color: red; */
      /* width: 1200px; */
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
          /* justify-content: flex-end; */
        }
      }
      .update-comment-content {
        border: 1px solid grey;
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
  .repl-toggle-button {
    border: none;
    border-radius: 15px;
    width: 100px;
    margin-left: 10px;
    .repl-toggle {
      cursor: pointer;
      font-size: 1.5rem;
    }
  }
`;
const Div = styled.div`
  padding-bottom: 100px;
`;
const ParentComments = ({
  user,
  token,
  animalBoardCode,
  detailInfo,
  animalBoardAPI,
  commentsBoolean,
}) => {
  // 댓글 불러오기
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const animalBoardCommentAPI = async () => {
    const response = await getComments(animalBoardCode);
    // console.log(response.data);
    setComments(response.data);
  };
  // 댓글수 불러오기
  const [commentCounts, setCommentCounts] = useState(0);
  const countAPI = async () => {
    const response = await countComment(animalBoardCode);
    setCommentCounts(response.data);
  };
  // console.log(commentCounts);
  // const commentCounts = Object.keys(comments).length; // 댓글 수
  // 댓글쓰기
  const [comment, setComment] = useState({
    animalBoardCode: animalBoardCode,
    animalCommentContent: "",
    user: user,
  });
  const [animalComment, setAnimalComment] = useState("");
  const addComment = async () => {
    // console.log(animalComment);
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
      countAPI();
    }
  };
  //댓글 수정버튼 - 기존 해당 댓글내용 가져오기
  const [edit, setEdit] = useState({});
  const onUpdate = async (comment) => {
    // console.log(comment);
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
    countAPI();
  };

  // 대댓글 달기
  const [boolean, setBoolean] = useState(false); // 추후 유저정보 토대로 boolean 예정
  const [response, setResponse] = useState({}); // 부모 댓글 정보

  const accessReply = async (comment) => {
    if (user.userId === undefined || user.userId === null) {
      return alert("로그인이 필요합니다.");
    }
    setResponse(comment); // 현재 클릭한 아이의 댓글정보
    // console.log(comment);
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
    countAPI();
  };
  const backToDetail = () => {
    navigate("/compagno/animal-board");
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
    countAPI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    animalBoardCommentAPI();
  }, [comment.replies]);
  return (
    <>
      <Comment className="animal-board-comment-contents">
        <div className="animal-board-write-comment ">
          <div className="additional-comment-info">
            <button className="back-to-list" onClick={backToDetail}>
              <RxHamburgerMenu /> 목록으로
            </button>
            <div className="inner-flexbox">
              <FavoriteBoard
                userId={user.userId}
                boardCode={animalBoardCode}
                count={detailInfo.animalBoardFavoriteCount}
                animalBoardAPI={() => animalBoardAPI()}
              />
              <div className="comment-count">댓글 수 : {commentCounts}</div>
            </div>
          </div>
          <InputGroup>
            <Form.Control
              as="textarea"
              aria-label="With textarea"
              value={animalComment}
              onChange={(e) => setAnimalComment(e.target.value)}
            />

            <Button variant="secondary" onClick={addComment}>
              댓글추가!
            </Button>
          </InputGroup>
        </div>
        <div className="animal-board-comment-container">
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
                              "http://192.168.10.28:8081/" +
                              comment.user.userImg
                            }
                          />
                        </label>
                        <div className="user-action-container">
                          <div className="animal-board-comment-userability">
                            <p>
                              {edit.user.userNickname}
                              {moment(edit.animalBoardDate).format(
                                "MM.DD HH:mm"
                              )}
                            </p>

                            <FaReply />
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
                              value={edit.animalCommentContent}
                              onChange={(e) =>
                                setEdit((prev) => ({
                                  ...prev,
                                  animalCommentContent: e.target.value,
                                }))
                              }
                            ></textarea>
                            <div className="btn-container">
                              <Button
                                className="complete"
                                onClick={() => {
                                  updateCommentC(edit);
                                }}
                              >
                                완료
                              </Button>
                              <Button className="cancel" onClick={onCancel}>
                                취소
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="animal-board-comment ">
                        <label>
                          <img
                            src={
                              "http://192.168.10.28:8081/" +
                              comment.user.userImg
                            }
                          />
                        </label>
                        <div className="user-action-container">
                          <div className="animal-board-comment-userability">
                            <div className="comment-user-info">
                              <MyToggleBar name={comment.user.userNickname} />
                              {detailInfo.user.userId ===
                              comment.user.userId ? (
                                <>
                                  <Writer />
                                </>
                              ) : (
                                <></>
                              )}{" "}
                            </div>
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
                          <div className="comment-date">
                            {moment(comment.animalBoardDate).format(
                              "YYYY.MM.DD HH:mm"
                            )}
                            <ViewMoreReply
                              comment={comment}
                              receiveComments={() => animalBoardCommentAPI()}
                              boardAuthor={detailInfo.user.userId}
                              currentUser={user.userId}
                            />
                          </div>
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
                              "http://192.168.10.28:8081/" +
                              comment.user.userImg
                            }
                          />
                        </label>
                        <div className="user-action-container">
                          <div className="animal-board-comment-userability">
                            <p>
                              {edit.user.userNickname}
                              {moment(edit.animalBoardDate).format(
                                "YYYY.MM.DD HH:mm"
                              )}
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
                              "http://192.168.10.28:8081/" +
                              comment.user.userImg
                            }
                          />
                        </label>
                        <div className="user-action-container">
                          <div className="animal-board-comment-userability">
                            <p>
                              {comment.user.userNickname}
                              {detailInfo.user.userId ===
                              comment.user.userId ? (
                                <>
                                  <Writer />
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
        </div>
      </Comment>
      {Object.keys(comments).length > 3 ? (
        <>
          <Div>
            <AllReplies
              user={user}
              token={token}
              animalBoardCode={animalBoardCode}
              detailInfo={detailInfo}
              animalBoardAPI={() => animalBoardAPI()}
              // countInfo={commentCounts}
              // countAPI={() => countAPI()}
            />
          </Div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};
export default ParentComments;

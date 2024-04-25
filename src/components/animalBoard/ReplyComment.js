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
import { updateComment, getComments } from "../../api/animalBoard";
const InnerComment = styled.div`
  display: flex;
  flex-direction: column;
  width: 800px;
  padding-left: 40px;
  /* background-color: blue; */
  .animal-board-reply {
    display: flex;

    .user-action-container {
      /* background-color: yellow; */
      display: flex;
      flex-direction: column;
      margin: 10px 0px 30px 10px;
      .animal-board-comment-userability {
        margin-bottom: 15px;
        display: flex;
        .response {
          cursor: pointer;
        }
      }
      .dropdown-toggle {
        cursor: pointer;
      }
    }
  }
`;

const ReplyComment = ({ replies }) => {
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
    });
    console.log(prevReply);
  };
  // 대댓글 수정하기
  const onUpdateR = async () => {
    await updateComment(editReply);
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
  };
  // 대댓글 삭제
  const onDelete = async (animalCommentCode) => {
    await delComment(animalCommentCode);
  };
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
                <label>userImage</label>
                <div className="user-action-container">
                  <div className="animal-board-comment-userability">
                    <p>
                      {editReply.user.userNickname}
                      {editReply.animalCommentDate}
                    </p>
                    <FaReplyAll />

                    <div className="btn-container">
                      <Button variant="primary" onClick={onUpdateR}>
                        완료
                      </Button>
                      <Button variant="info" onClick={onCancelR}>
                        취소
                      </Button>
                    </div>
                  </div>
                  <textarea
                    className="update-comment-content"
                    value={editReply.animalCommentContent}
                    onChange={(e) =>
                      setEditReply((prev) => ({
                        ...prev,
                        animalCommentContent: e.target.value,
                      }))
                    }
                  ></textarea>
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
                    <p>
                      {reply.user.userNickname} {reply.animalCommentDate}
                    </p>
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
                            <Dropdown.Item
                              onClick={() => onDelete(reply.animalCommentCode)}
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

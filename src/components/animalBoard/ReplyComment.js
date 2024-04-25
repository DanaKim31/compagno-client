import { useState } from "react";
import { useParams } from "react-router-dom";
import { FaReplyAll } from "react-icons/fa";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { delComment } from "../../api/animalBoard";
import Dropdown from "react-bootstrap/Dropdown";
import React from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
import styled from "styled-components";

const InnerComment = styled.div`
  display: flex;
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
      }
      .dropdown-toggle {
        cursor: pointer;
      }
    }
  }
`;

const ReplyComment = ({ replies }) => {
  const { animalBoardCode } = useParams();
  // console.log(replies); // 기존 대댓글 정보 가져와짐
  // 댓글 수정버튼 - 기존 해당 댓글내용 가져오기
  const [editReply, setEditReply] = useState({
    userId: "pigeon222",
  });
  // console.log(editReply);
  const onUpdateR = async (reply) => {
    console.log(reply);
    // console.log(editReply);
    setEditReply(reply);
    // console.log(editReply.animalBoardCommentCode)
  };
  // console.log(editReply);
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
  const [response, setResponse] = useState({});
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
  // 대댓글 S
  const addReplyR = async () => {};
  const onDelete = async (animalCommentCode) => {
    await delComment(animalCommentCode);
  };
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
                      <Button
                        variant="primary"
                        onClick={() => onUpdateR(editReply)}
                      >
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
                    <FaReplyAll onClick={() => accessReply(reply)} />
                    <Dropdown>
                      <Dropdown.Toggle
                        as={CustomToggle}
                        id="dropdown-custom-components"
                      ></Dropdown.Toggle>

                      <Dropdown.Menu className="dropdown-menu">
                        <Dropdown.Item onClick={() => onUpdateR(reply)}>
                          수정하기
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => onDelete(reply.animalCommentCode)}
                        >
                          삭제하기
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                  <div>{reply.animalCommentContent}</div>
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
                        onClick={() => addReplyR(reply.animalCommentCode)}
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

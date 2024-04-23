import { useState } from "react";
import { FaReplyAll } from "react-icons/fa";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import Dropdown from "react-bootstrap/Dropdown";
import React from "react";
import { Button } from "react-bootstrap";
import styled from "styled-components";

const InnerComment = styled.div`
  display: flex;
  width: 800px;
  padding-left: 40px;
  /* background-color: blue; */

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
`;

const ReplyComment = ({ replies }) => {
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

  const onCancelR = () => {
    setEditReply({});
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
              <label>userImage</label>
              <div className="user-action-container">
                <div className="animal-board-comment-userability">
                  <p>
                    {reply.user.userNickname} {reply.animalCommentDate}
                  </p>
                  <FaReplyAll />
                  <Dropdown>
                    <Dropdown.Toggle
                      as={CustomToggle}
                      id="dropdown-custom-components"
                    ></Dropdown.Toggle>

                    <Dropdown.Menu className="dropdown-menu">
                      <Dropdown.Item onClick={() => onUpdateR(reply)}>
                        수정하기
                      </Dropdown.Item>
                      <Dropdown.Item>삭제하기</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
                <div>{reply.animalCommentContent}</div>
              </div>
            </>
          )}
        </InnerComment>
      ))}
    </>
  );
};
export default ReplyComment;

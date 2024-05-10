import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import styled from "styled-components";
import ParentComments from "./ParentComments";
import { countComment } from "../../api/animalBoard";
const Div = styled.div`
  margin-right: 500px;
  button {
    border: none;
    border-radius: 15px;
    width: 300px;
    margin-top: 20px;
    color: rgb(244, 245, 219);
    background-color: rgb(70, 92, 88);
  }
`;
const AllReplies = ({
  user,
  token,
  animalBoardCode,
  detailInfo,
  animalBoardAPI,
}) => {
  // 댓글 전체 보여주기
  const [all, setAll] = useState(false);
  // 댓글 수
  const [count, setCount] = useState(0);
  const countCommentAPI = async () => {
    const response = await countComment(animalBoardCode);
    setCount(response.data);
  };
  useEffect(() => {
    countCommentAPI();
  }, []);
  return (
    <Div>
      <button onClick={() => setAll(true)}>댓글 전체 보기</button>
      <Modal
        size="xl"
        show={all}
        onHide={() => setAll(false)}
        dialogClassName="custom-modal-dialog modal-content modal-1000px"
        scrollable
        centered
        style={{ "padding-top": "150px" }}
      >
        <Modal.Header closeButton>
          <Modal.Title>댓글 : {count}개</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ParentComments
            user={user}
            token={token}
            animalBoardCode={animalBoardCode}
            detailInfo={detailInfo}
            animalBoardAPI={() => animalBoardAPI()}
            // countCommentAPI={() => countCommentAPI()}
          />
        </Modal.Body>
      </Modal>
    </Div>
  );
};
export default AllReplies;

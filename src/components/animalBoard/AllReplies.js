import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import styled from "styled-components";
import ParentComments from "./ParentComments";
import { countComment, getComments } from "../../api/animalBoard";
const Div = styled.div`
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
  countInfo,
  // countAPI,
}) => {
  // 댓글 전체 보여주기
  const [all, setAll] = useState(false);
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
          <Modal.Title>전체 댓글</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ParentComments
            user={user}
            token={token}
            animalBoardCode={animalBoardCode}
            detailInfo={detailInfo}
            animalBoardAPI={() => animalBoardAPI()}
          />
        </Modal.Body>
      </Modal>
    </Div>
  );
};
export default AllReplies;

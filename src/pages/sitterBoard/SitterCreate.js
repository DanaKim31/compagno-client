import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userSave } from "../../store/user";
import { useSelector, useDispatch } from "react-redux";
import { registerSitterBoard } from "../../api/sitterBoard";
import { Button, Form } from "react-bootstrap";
import styled from "styled-components";

const Div = styled.div`
  width: 90%;
  margin: auto;
  display: flex;
  flex-direction: column;

  h1 {
    font-size: 2.5rem;
    margin-bottom: 100px;
  }

  .btn {
    display: flex;
    justify-content: right;
    margin-left: 20px;
  }
`;

const SitterCreate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => {
    return state.user;
  });

  const [sitterBoard, setSitterBoard] = useState({});

  const cancelBtn = () => {
    alert("🚨 작성한 내용이 저장되지 않고 목록으로 돌아갑니다.");
    navigate("/compagno/sitterBoard");
  };
  const registerBtn = async () => {
    await registerSitterBoard(sitterBoard);
    navigate("/compagno/sitterBoard");
  };

  return (
    <Div>
      <h1>시터 게시글 등록</h1>

      <Form>
        {["radio"].map((type) => (
          <div key={`inline-${type}`} className="mb-3">
            <Form.Check
              inline
              label="구인"
              name="group1"
              type={type}
              id={`inline-${type}-1`}
            />
            <Form.Check
              inline
              label="구직"
              name="group1"
              type={type}
              id={`inline-${type}-2`}
            />
          </div>
        ))}
      </Form>

      <input
        type="text"
        placeholder="제목 입력"
        value={sitterBoard.sitterTitle}
        onChange={(e) =>
          setSitterBoard((prev) => ({ ...prev, sitterTitle: e.target.value }))
        }
      />
      <input
        type="text"
        placeholder="내용 입력"
        value={sitterBoard.sitterContent}
        onChange={(e) =>
          setSitterBoard((prev) => ({ ...prev, sitterContent: e.target.value }))
        }
      />
      <Form.Group controlId="formFileMultiple" className="mb-3">
        <Form.Label>파일첨부</Form.Label>
        <Form.Control type="file" multiple />
      </Form.Group>

      <div className="btn">
        <Button variant="outline-secondary" onClick={cancelBtn}>
          취소
        </Button>
        <Button variant="outline-dark" onClick={registerBtn}>
          등록
        </Button>
      </div>
    </Div>
  );
};

export default SitterCreate;

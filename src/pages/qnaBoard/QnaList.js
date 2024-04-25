import { getQuestions } from "../../api/Question";
import { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Div = styled.div`
  position: relative;
  top: 200px;
`;

const Table = styled.table`
  padding-top: 200px;
  margin-left: 400px;
  width: 50%;
  tbody {
    text-align: center;
  }
`;

const QnaList = () => {
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();

  // 입력한 비밀번호
  const [secretPwd, setSecret] = useState("");
  const [code, setCode] = useState("");

  // 모달창 구현
  const [modalShow, setModalShow] = useState(false);

  const CenterModal = (props) => {
    const [pwd, setPwd] = useState("");

    const pwdCheck = () => {
      console.log(secretPwd === pwd);
      console.log(code);
      if (secretPwd === pwd) {
        navigate("/compagno/question/detail/" + code);
      } else {
        alert("비밀번호가 일치하지 않습니다!");
        document.querySelector("#password").focus();
      }
    };

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            비밀글 확인 !
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>비밀글입니다. 비밀번호를 입력하세요.</p>
          <input
            type="password"
            id="password"
            onChange={(e) => {
              setPwd(e.target.value);
            }}
          />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>
            닫기
          </Button>
          <Button variant="primary" onClick={pwdCheck}>
            확인
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  const questionAPI = async () => {
    const result = await getQuestions();
    console.log(result.data);
    setQuestions(result.data);
  };

  useEffect(() => {
    questionAPI();
  }, []);

  return (
    <Div>
      <CenterModal show={modalShow} onHide={() => setModalShow(false)} />
      <Table>
        <thead>
          <tr>
            <th>질문 번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>답변 여부</th>
            <th>비밀글</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((question) => (
            <tr key={question.qnaQCode}>
              <td>{question.qnaQCode}</td>
              <td>
                {question.secret === "" || question.secret == null ? (
                  // 비밀번호가 걸려있지 않을 때
                  <a href={`/compagno/question/detail/${question.qnaQCode}`}>
                    {question.qnaQTitle}
                  </a>
                ) : (
                  // 비밀번호가 걸려있을 때
                  <a
                    href={`/compagno/question/detail/${question.qnaQCode}`}
                    onClick={(e) => {
                      e.preventDefault();
                      setModalShow(true);
                      setSecret(question.secret);
                      setCode(question.qnaQCode);
                      console.log(question.secret);
                    }}
                  >
                    {question.qnaQTitle}
                  </a>
                )}
              </td>
              <td>{question.userId}</td>
              <td>{question.qnaQStatus}</td>
              <td>
                {question.secret === "" || question.secret == null ? "N" : "Y"}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button
        onClick={() => {
          navigate("/compagno/question/register");
        }}
      >
        등록
      </Button>
    </Div>
  );
};
export default QnaList;

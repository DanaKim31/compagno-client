import { Form, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getAnswer,
  addAnswer,
  updateAnswer,
  deleteAnswer,
} from "../../api/Answer";

const QnaADetail = () => {
  const { qnaQCode } = useParams();

  const [answer, setAnswer] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [editA, setEditA] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    answerAPI();
  }, []);

  // 1. CREATE =======================================================
  // 1-1. 폼 전송
  const answerSubmit = async () => {
    const formData = new FormData();

    formData.append("qnaQCode", qnaQCode);
    formData.append("qnaATitle", title);
    console.log(title);
    formData.append("qnaAContent", content);
    images.forEach((image, index) => {
      formData.append(`files[${index}]`, image);
    });
    await addAnswer(formData);

    console.log(formData.data);
    // navigate(현재 페이지로1!);
  };

  // 1-2. 이미지 변경
  const imageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  // 2. READ =========================================================
  // 2-1. Answer 세팅 (불러오기)
  const answerAPI = async () => {
    const response = await getAnswer(qnaQCode);
    setAnswer(response.data);
  };

  // 2. UPDATE ========================================================
  // 답변 수정
  const onUpdateAnswer = async (answer) => {
    setEditA(answer);
  };

  // 답변 취소
  const cancelAnswer = () => {
    setEditA(null);
  };

  // 3. DELETE ========================================================
  const onDeleteAnswer = async (code) => {
    await deleteAnswer(code);
    answerAPI();
  };

  return (
    <>
      {answer === "" ? (
        // 답변이 없는 경우
        <div className="Answer">
          <h1>답변 작성 폼</h1>
          <Form.Control
            type="text"
            placeholder="제목 작성"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Form.Control
            as="textarea"
            placeholder="내용 작성"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <Form.Control
            type="file"
            multiple
            accept="image/*"
            onChange={imageChange}
          />
          <Button variant="dark" onClick={answerSubmit}>
            답변 등록
          </Button>
          <Button onClick={cancelAnswer}>취소</Button>
        </div>
      ) : (
        <div>
          <div>
            <h1>Answer</h1>
            {/* 관리자 && (작성자 id = 로그인 유저 id) */}
            <button>수정</button>
            <button onClick={() => onDeleteAnswer(answer.qnaACode)}>
              삭제
            </button>
          </div>
          <p>{answer.qnaATitle}</p>
          <p>{answer.qnaAContent}</p>
        </div>
      )}

      <button onClick={() => navigate("/compagno/question")}>목록</button>
    </>
  );
};

export default QnaADetail;

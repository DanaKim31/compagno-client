import { useParams, useNavigate } from "react-router-dom";
import { getQuestion, updateQuestion } from "../../api/Question";
import {
  getAnswer,
  addAnswer,
  updateAnswer,
  deleteAnswer,
} from "../../api/Answer";
import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";

const Detail = () => {
  // 해당 페이지 qnaQCode
  const { qnaQCode } = useParams();

  const [question, setQuestion] = useState({});
  const [user, setUser] = useState({});
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [answer, setAnswer] = useState([]);
  const [editQ, setEditQ] = useState(null);
  const [editA, setEditA] = useState(null);

  const navigate = useNavigate();

  // Q 세팅
  const questionAPI = async () => {
    const response = await getQuestion(qnaQCode);
    setQuestion(response.data);
  };

  // A 세팅
  const answerAPI = async () => {
    const response = await getAnswer(qnaQCode);
    setAnswer(response.data);
  };

  // 첫 로딩 시 세팅
  useEffect(() => {
    answerAPI();
    questionAPI();
    console.log(answer === "");
    console.log(answer);
  }, []);

  // 답변 등록
  const answerSubmit = async () => {
    const formData = new FormData();

    formData.append("id", user.id);
    formData.append("qnaQCode", qnaQCode);
    formData.append("qnaATitle", title);
    formData.append("qnaAContent", content);
    images.forEach((image, index) => {
      formData.append(`files[${index}]`, image);
    });
    await addAnswer(formData);
    console.log("전송");
  };

  const imageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  // 답변 삭제
  const onDeleteAnswer = async (code) => {
    await deleteAnswer(code);
    answerAPI();
  };

  // 답변 수정
  const onUpdateAnswer = async (answer) => {
    setEditA(answer);
    console.log("수정 버튼 눌렀어염");
  };

  const deleteImage = () => {};

  const cancelAnswer = () => {
    setEditA(null);
  };

  const answerUpdate = async () => {
    const formData = new FormData();
    formData.append("id", user.id);
    formData.append("qnaQCode", editA.qnaQCode);
    formData.append("qnaATitle", editA.title);
    formData.append("qnaAContent", editA.content);
    editA.images.forEach((image, index) => {
      formData.append(`files[${index}]`, image.qnaAUrl);
    });

    await updateAnswer(formData);
    setImages([]);
    setEditA(null);
    answerAPI();
  };

  return (
    <>
      <div className="question">
        <h1>Question</h1>
        <p>{question.qnaQTitle}</p>
        <p>{question.qnaQDate}</p>
        <p>{question.userId}</p>
        <p>{question.userNickname}</p>
        <p>{question.qnaQContent}</p>
      </div>

      {/* {answer.map((answer) => ( */}
      {/* <div key={answer.qnaACode} className="answer"></div> */}
      {/* ))} */}
      <hr />
      {/* 관리자의 경우만 볼 수 있는 Answer 작성란 */}
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
          <Button>취소</Button>
        </div>
      ) : (
        <div>
          <div>
            <h1>Answer</h1>
            {/* 관리자 && (작성자 id = 로그인 유저 id) */}
            <button onClick={onUpdateAnswer}>수정</button>
            <button>삭제</button>
          </div>
          <p>{answer.qnaATitle}</p>
          <p>{answer.qnaAContent}</p>
        </div>
      )}

      <button onClick={() => navigate("/question")}>목록</button>
    </>
  );
};

export default Detail;

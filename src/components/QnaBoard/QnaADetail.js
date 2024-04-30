import { Form, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getAnswer,
  addAnswer,
  updateAnswer,
  deleteAnswer,
} from "../../api/Answer";
import { useSelector, useDispatch } from "react-redux";
import { userSave } from "../../store/user";

const QnaADetail = () => {
  const { qnaQCode } = useParams();

  const [userId, setUserId] = useState("");
  const [userNickname, setUserNickname] = useState("");
  const [answer, setAnswer] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [editA, setEditA] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // user 세팅
  const user = useSelector((state) => {
    return state.user;
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== null) {
      dispatch(userSave(JSON.parse(localStorage.getItem("user"))));
    }
  }, []);

  useEffect(() => {
    answerAPI();
  }, []);

  // 1. CREATE =======================================================
  // 1-1. 폼 전송
  const answerSubmit = async () => {
    const formData = new FormData();

    formData.append("userId", user.userId);
    setUserId(user.userId);

    formData.append("userNickname", user.userNickname);
    setUserNickname(user.userNickname);

    formData.append("qnaQCode", qnaQCode);
    formData.append("qnaATitle", title);
    console.log(title);
    formData.append("qnaAContent", content);
    images.forEach((image, index) => {
      formData.append(`files[${index}]`, image);
    });
    await addAnswer(formData);
    answerAPI();
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
  // 2-1. 답변 수정 클릭 시 정보를 담은 폼 화면이 나옴!
  const onUpdateAnswer = async (answer) => {
    setEditA(answer);
    console.log("!!!!!");
  };

  // 답변 취소
  const cancelAnswer = () => {
    setEditA(null);
  };

  // 3. DELETE ========================================================
  const onDeleteAnswer = async (code) => {
    await deleteAnswer(code);
    console.log(code);
    answerAPI();
    setEditA(null);
    answerAPI();
  };

  return (
    <>
      {user.userRole === "ROLE_ADMIN" ? (
        // 관리자의 경우!
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
            <>
              <h1>ANSWER!!!</h1>

              <button onClick={() => onUpdateAnswer(answer)}>수정</button>
              <button onClick={() => onDeleteAnswer(answer.qnaACode)}>
                삭제
              </button>
              <div>
                <p>{answer.qnaATitle}</p>
                <p>{answer.qnaAContent}</p>
              </div>
            </>
          )}
        </>
      ) : (
        // 회원의 경우
        <>
          {answer === "" ? (
            // 답변이 없을 때
            <>
              <h1>답변이 아직 작성되지 않았습니다.</h1>
            </>
          ) : (
            // 답변이 있을 때
            <>
              <div>
                <h1>ANSWER!!!!!</h1>
                <p>{answer.qnaATitle}</p>
                <p>{answer.qnaAContent}</p>
              </div>
            </>
          )}
        </>
      )}
      <button onClick={() => navigate("/compagno/question")}>목록</button>
    </>
  );
};

export default QnaADetail;

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
// import { useSelector } from "react-redux";
import styled from "styled-components";

const Div = styled.div`
  position: relative;
  top: 200px;
`;

const QnaDetail = () => {
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

  // user 세팅
  // const info = useSelector((state) => {
  // return state.user;
  // });

  // Q 세팅
  const questionAPI = async () => {
    const response = await getQuestion(qnaQCode);
    setQuestion(response.data);
  };

  // 수정할 질문 세팅
  const questionUpdate = async () => {
    const formData = new FormData();

    formData.append("qnaQCode", editQ.qnaQCode);
    formData.append("qnaQTitle", editQ.qnaQTitle);
    formData.append("qnaQContent", editQ.qnaQContent);

    // 새로 추가된 이미지
    images.forEach((image, index) => {
      console.log("image");
      console.log(`files[${index}]`);
      formData.append(`files[${index}]`, image);
    });

    formData.append("qnaQCode", editQ.qnaQCode);

    // formData.append("images", []);

    editQ.images?.forEach((image, index) => {
      formData.append(`images[${index}]`, image.qnaQUrl);
    });

    await updateQuestion(formData);
    setImages([]);
    setEditQ(null);

    questionAPI();
  };

  // 질문 수정 폼으로 질문 정보 전달
  const onUpdateQuestion = async (data) => {
    await setEditQ(data);
  };

  // A 세팅
  const answerAPI = async () => {
    const response = await getAnswer(qnaQCode);
    setAnswer(response.data);
  };

  // 첫 로딩 시 세팅
  useEffect(() => {
    questionAPI();
    console.log(editQ?.qnaQCode === question.qnaQCode);
    answerAPI();
    // if (Object.keys(info).legnth === 0) {
    // setUser(JSON.parse(localStorage.getItem("user")));
    // } else {
    // setUser(info);
    // }
  }, []);

  // 답변 등록
  const answerSubmit = async () => {
    const formData = new FormData();

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
    const images = Array.from(e.target.files);
    setImages(images);
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

  // 답변 취소
  const cancelAnswer = () => {
    setEditA(null);
  };

  // 답변 수정
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
    <Div>
      <h1>Question</h1>
      <div key={question.qnaQCode} className="question">
        {editQ !== null && editQ?.qnaQCode === question.qnaQCode ? (
          <>
            <h1>수정중..</h1>
            <Form.Control
              type="text"
              placeholder="제목"
              value={editQ.qnaQTitle}
              onChange={(e) =>
                setEditQ((prev) => ({ ...prev, qnaQTitle: e.target.value }))
              }
            />
            <Form.Control
              type="textarea"
              placeholder="내용"
              value={editQ.qnaQContent}
              onChange={(e) => {
                setEditQ((prev) => ({ ...prev, qnaQContent: e.target.value }));
              }}
            />
            <Form.Control
              type="file"
              multiple
              accept="image/*"
              onChange={imageChange}
            />
            <Button variant="warning" onClick={questionUpdate}>
              수정
            </Button>
            <Button
              onClick={() => {
                navigate("/compagno/question");
              }}
            >
              취소
            </Button>
          </>
        ) : (
          <>
            <Button onClick={() => onUpdateQuestion(question)}>수정</Button>
            <Button>삭제</Button>

            <div>
              <img src={question.image?.replace("")} />
            </div>
            <div>
              <p>{question.qnaQTitle}</p>
              <p>{question.qnaQDate}</p>
              <p>{question.userId}</p>
              <p>{question.userNickname}</p>
              <p>{question.qnaQContent}</p>
            </div>
          </>
        )}
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
            <button>수정</button>
            <button>삭제</button>
          </div>
          <p>{answer.qnaATitle}</p>
          <p>{answer.qnaAContent}</p>
        </div>
      )}

      <button onClick={() => navigate("/compagno/question")}>목록</button>
    </Div>
  );
};

export default QnaDetail;

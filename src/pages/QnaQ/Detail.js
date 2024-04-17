import { useParams, useNavigate } from "react-router-dom";
import { getQuestion, updateQuestion } from "../../api/QnaQ/Question";
import { useEffect, useState } from "react";

const Detail = () => {
  const [question, setQuestion] = useState({});

  const navigate = useNavigate();
  const { qnaQCode } = useParams();

  const questionAPI = async () => {
    const response = await getQuestion(qnaQCode);
    setQuestion(response.data);
  };

  const update = async () => {
    await updateQuestion(question);
    navigate("/");
  };

  useEffect(() => {
    questionAPI();
  }, []);

  return (
    <>
      <div>
        <p>{qnaQCode}</p>
        <p>{question.qnaQTitle}</p>
        <p>{question.qnaQDate}</p>
        <p>{question.userId}</p>
        <p>{question.userNickname}</p>
        <p>{question.qnaQContent}</p>
      </div>
    </>
  );
};

export default Detail;

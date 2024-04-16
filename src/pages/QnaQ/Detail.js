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
      <div>내용을 어떻게 넣어야 할까용용이?</div>
    </>
  );
};

export default Detail;

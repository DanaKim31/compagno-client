import { getQuestions } from "../../api/QnaQ/Question";
import { useState, useEffect } from "react";

const List = () => {
  const [questions, setQuestions] = useState([]);

  const questionAPI = async () => {
    const result = await getQuestions();
    console.log(result.data);
    setQuestions(result.data);
  };

  useEffect(() => {
    questionAPI();
  }, []);

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>질문 번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>답변 여부</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((question) => (
            <tr key={question.qnaQCode}>
              <td>{question.qnaQCode}</td>
              <td>
                <a href={`/detail/${question.qnaQCode}`}>
                  {question.qnaQTitle}
                </a>
              </td>
              <td>{question.userId}</td>
              <td>{question.qnaQStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default List;

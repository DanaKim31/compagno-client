import { useState, useEffect } from "react";
import { getUserQuestion } from "../../api/userQnaQuestion";
import { getUserAnswers } from "../../api/userQnaAnswer";
import { useParams, useNavigate } from "react-router-dom";
import { userSave } from "../../store/user";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";

const UserQnaAnswer = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => {
    return state.user;
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== null) {
      dispatch(userSave(JSON.parse(localStorage.getItem("user"))));
    }
  }, []);

  const { userQuestionBoardCode } = useParams();
  const [userQuestion, setUserQuestion] = useState({});
  const [userAnswers, setUserAnswers] = useState([]);
  const [userAnswer, setUserAnswer] = useState({});
  const [answercount, setAnswerCount] = useState(0);

  const answersAPI = async () => {
    console.log(userQuestionBoardCode);
    const set = await getUserQuestion(userQuestionBoardCode);
    setUserQuestion(set.data);

    const response = await getUserAnswers(userQuestionBoardCode);
    setUserAnswers(response.data);

    setAnswerCount(response.data.length);
  };

  useEffect(() => {
    answersAPI();
  }, []);

  console.log(userAnswers);
  return (
    <>
      <p>{userQuestionBoardCode}</p>
      <div>
        {answercount == 0 ? (
          <>
            {/* 답변이 없는 경우 */}
            <p>답변 없는디요</p>
          </>
        ) : (
          <>
            <div>
              <p>di!</p>
              {userAnswers?.map((answer) => (
                <div key={answer.userAnswerBoardCode}>
                  <div>
                    하.. {answer}
                    작성자 : {answer.userId}
                    날짜 :
                    {moment(answer.userAnswerDate).format("YY-MM-DD HH:mm")}
                  </div>
                  <div>
                    {/* 비회원의 경우 */}
                    {userAnswers?.map((answer) => {
                      user === "" ? (
                        <>
                          <p>비회원~ 보기만 할 수 있음</p>
                        </>
                      ) : (
                        <>
                          {user.userId === userQuestion.userId ? (
                            <>
                              {/* 접속 유저 = 질문 작성자 */}
                              <p>질문 작성자!</p>
                            </>
                          ) : (
                            <>
                              {user.userId === answer.user.userId ? (
                                <>
                                  {/* 접속 유저 = 답변 작성자 */}
                                  <p>딥변 작성자!</p>
                                </>
                              ) : (
                                <>
                                  <p>뉘신지</p>
                                </>
                              )}
                            </>
                          )}
                        </>
                      );
                    })}
                  </div>
                  <div>{answer.userAnswerContent}</div>;
                  {/* 대댓글인지 미친인지 */}
                  <div key={answer.userAnswerBoardCode}>
                    {answer.reanswer === "" ? (
                      <>
                        {/* 대댓글이 없는 경우 */}
                        <p>대댓글 없슴두</p>
                      </>
                    ) : (
                      <>
                        {/* 대댓글이 있는 경우 */}
                        {answer.reanswer?.map((reanswer) => (
                          <div>{reanswer.user.userId}</div>
                        ))}
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <p>왜안나와</p>
    </>
  );
};

export default UserQnaAnswer;

import { useState, useEffect } from "react";
import {
  getUserAnswers,
  addUserAnswer,
  updateUserAnswer,
  deleteUserAnswer,
} from "../../api/userQnaAnswer";
import { useParams, useNavigate } from "react-router-dom";
import { userSave } from "../../store/user";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import useDidMountEffect from "../../assets/useDidMountEffect";
import MyToggleBar from "../../components/note/MyToggleBar";
import { Form, Button } from "react-bootstrap";
import styled from "styled-components";

const Div = styled.div`
  #answer {
    background-color: gray;
    border: 1px solid;
    border-radius: 25px;
    padding-top: 30px;
    padding-left: 30px;
    margin-bottom: 20px;

    #reanswer {
      margin-top: 20px;
      margin-bottom: 10px;
      background-color: lightgray;
      padding-top: 10px;
      padding-left: 30px;
      margin-right: 50px;
      margin-left: 50px;
      border: 1px solid;
      border-radius: 25px;
      button {
        margin: 5px;
      }
    }

    #reanswerregister {
      padding-top: 30px;
      padding-left: 30px;
      margin-left: 50px;
      margin-right: 50px;
      margin-bottom: 10px;
      button {
        margin: 5px;
      }

      #reanswerregistercontent {
        display: flex;
        height: 50px;
        button {
          width: 80px;
          height: 41px;
          margin-left: 10px;
          padding-right: 10px;
        }
      }
    }
  }

  #answerregister {
    display: flex;
    button {
      width: 80px;
      height: 41px;
      margin-left: 10px;
    }

    padding-bottom: 30px;
  }

  #topmenu {
    background-color: skyblue;
    display: flex;
    flex-direction: column;
  }
`;

const UserQnaAnswer = ({ question }) => {
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

  useDidMountEffect(() => {
    answersAPI();
  }, [question]);

  const { userQuestionBoardCode } = useParams();

  const [userId, setUserId] = useState("");
  const [userNickname, setUserNickname] = useState("");
  const [userAnswer, setUserAnswer] = useState([]);

  const [content, setContent] = useState("");
  const [reanswerContent, setReanswerContent] = useState("");

  const [code, setCode] = useState(0);

  const [editA, setEditA] = useState(null);

  const [userAnswers, setUserAnswers] = useState([]);
  const [answercount, setAnswerCount] = useState(0);

  const answersAPI = async () => {
    const response = await getUserAnswers(userQuestionBoardCode);
    setUserAnswers(response.data);
    console.log(response.data);
  };

  // 1. CREATE ==========================
  // 1.1 상위 답변 작성
  const UseranswerSubmit = async () => {
    const formData = new FormData();

    formData.append("userQuestionBoardCode", userQuestionBoardCode);

    formData.append("userId", user.userId);
    setUserId(user.userId);

    formData.append("userNickname", user.userNickname);
    setUserNickname(user.userNickname);

    formData.append("userAnswerContent", content);

    await addUserAnswer(formData);
    answersAPI();
    setContent("");
  };

  // 1.2 하위 답변 작성
  const UserReanswerSubmit = async () => {
    const formData = new FormData();
    formData.append("userQuestionBoardCode", userQuestionBoardCode);

    formData.append("answerParentCode", code);
    formData.append("userId", user.userId);
    setUserId(user.userId);

    formData.append("userNickname", user.userNickname);
    setUserNickname(user.userNickname);

    formData.append("userAnswerContent", reanswerContent);

    await addUserAnswer(formData);
    answersAPI();
    setReanswerContent("");
  };

  // 2. UPDATE ==========================
  // 2-1. 답변 수정 클릭 시 정보를 담은 폼 화면!
  const onUpdateUserAnswer = async (answer) => {
    setEditA(answer);
  };

  const userAnswerUpdate = async () => {
    const formData = new FormData();

    formData.append("userId", user.userId);
    setUserId(user.userId);

    formData.append("userNickname", user.userNickname);
    setUserNickname(user.userNickname);

    formData.append("userQuestionBoardCode", editA.userQuestionBoardCode);
    formData.append("userAnswerBoardCode", editA.userAnswerBoardCode);

    formData.append("userAnswerContent", editA.userAnswerContent);
    await updateUserAnswer(formData);
    setEditA(null);
    answersAPI();
  };

  // 2-2. 하위 답변 수정
  const onUpdateUserReAnswer = async (reanswer) => {
    setCode(reanswer.userAnswerBoardCode);
    setEditA(reanswer);
  };

  const userReAnswerUpdate = async () => {
    const formData = new FormData();

    formData.append("userId", user.userId);
    setUserId(user.userId);

    formData.append("userNickname", user.userNickname);
    setUserNickname(user.userNickname);

    formData.append("userQuestionBoardCode", editA.userQuestionBoardCode);
    formData.append("userAnswerBoardCode", editA.userAnswerBoardCode);
    formData.append("answerParentCode", code);

    formData.append("userAnswerContent", editA.userAnswerContent);
    await updateUserAnswer(formData);
    setEditA(null);
    answersAPI();
  };

  // 3. DELETE ==========================
  const onDeleteUserAnswer = async (no) => {
    await deleteUserAnswer(no);
    answersAPI();
    setEditA(null);
    answersAPI();
  };

  return (
    <Div>
      <div>
        {userAnswers?.length === 0 ? (
          <>
            {/* 답변이 없는 경우 */}
            <p>답변 없는디요</p>
            <div id="answerregister">
              <Form.Control
                type="textarea"
                placeholder="답변 작성"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <Button onClick={UseranswerSubmit}>등록</Button>
            </div>
          </>
        ) : (
          <>
            {/* 답변이 있는 경우 */}
            {userAnswers.map((answer) => (
              <div key={answer.userAnswerBoardCode} id="answer">
                <div id="topmenu">
                  <div>
                    <p>상위 답변=====================================</p>
                    <p>
                      <MyToggleBar name={question.userNickname} />
                    </p>
                    <p>
                      날짜 :
                      {moment(answer.userAnswerDate).format("YY-MM-DD HH:mm")}
                    </p>

                    {user.userId === undefined ? (
                      <>
                        <p>비회원인데용</p>
                      </>
                    ) : (
                      <div id="editdeletebutton">
                        {user.userId === question.userId ? (
                          <>
                            {/* 접속 유저 = 질문 작성자 */}
                            <p>접속 유저 = 질문 작성자!</p>

                            <div>
                              <Button
                                variant="dark"
                                onClick={() => onUpdateUserAnswer(answer)}
                              >
                                수정
                              </Button>
                              <Button variant="dark"> 삭제</Button>
                            </div>
                          </>
                        ) : (
                          <>
                            {user.userId === answer.user.userId ? (
                              <>
                                {/* 접속 유저 = 댓글 작성자 */}
                                <p> 접속 유저 = 해당 댓글 작성자</p>
                                <Button
                                  variant="dark"
                                  onClick={() => onUpdateUserAnswer(answer)}
                                >
                                  수정
                                </Button>
                                <Button
                                  onClick={() =>
                                    onDeleteUserAnswer(
                                      answer.userAnswerBoardCode
                                    )
                                  }
                                >
                                  삭제
                                </Button>
                              </>
                            ) : (
                              <>
                                <p>남의 글이니까 보기만하세요</p>
                              </>
                            )}
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                {editA !== null &&
                editA?.userAnswerBoardCode === answer.userAnswerBoardCode ? (
                  <>
                    <div style={{ display: "flex" }}>
                      <Form.Control
                        type="textarea"
                        placeholder="답변 작성"
                        value={editA.userAnswerContent}
                        onChange={(e) =>
                          setEditA((prev) => ({
                            ...prev,
                            userAnswerContent: e.target.value,
                          }))
                        }
                      />
                      <Button variant="dark" onClick={userAnswerUpdate}>
                        수정
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <div>{answer.userAnswerContent}</div>
                  </>
                )}

                {answer.answers.map((reanswer) => (
                  <div key={reanswer.userAnswerBoardCode} id="reanswer">
                    {user.userId === reanswer.user.userId ? (
                      <>
                        {/* 접속 유저 = 댓글 작성자 */}
                        <p>{reanswer.user.userId}</p>
                        <Button
                          variant="dark"
                          onClick={() => onUpdateUserReAnswer(reanswer)}
                        >
                          수정
                        </Button>
                        <Button
                          variant="dark"
                          onClick={() =>
                            onDeleteUserAnswer(reanswer.userAnswerBoardCode)
                          }
                        >
                          삭제
                        </Button>
                      </>
                    ) : (
                      <>
                        {reanswer.user.userId === question.userId ? (
                          <>
                            {/* 글 작성자 본인! */}
                            <p>{reanswer.user.userId}</p>
                            <p>{question.userId}</p>
                            <p>유저 이름 옆에 작성자 달려있으면 좋겠군</p>
                          </>
                        ) : (
                          <>
                            <p>남의 글이니까 보기만하세요</p>
                          </>
                        )}
                      </>
                    )}
                    {editA !== null &&
                    editA?.userAnswerBoardCode ===
                      reanswer.userAnswerBoardCode ? (
                      <>
                        <p>대댓글 수정하자고</p>

                        <div id="answerregister">
                          <Form.Control
                            type="textarea"
                            placeholder="답변 작성"
                            value={editA.userAnswerContent}
                            onChange={(e) =>
                              setEditA((prev) => ({
                                ...prev,
                                userAnswerContent: e.target.value,
                              }))
                            }
                          />
                          <Button variant="dark" onClick={userReAnswerUpdate}>
                            수정
                          </Button>
                        </div>
                      </>
                    ) : (
                      <>{reanswer.userAnswerContent}</>
                    )}
                  </div>
                ))}
                <div id="reanswerregister">
                  <Button
                    variant="dark"
                    onClick={(e) => setCode(answer.userAnswerBoardCode)}
                  >
                    답변 달기
                  </Button>
                  {code === answer.userAnswerBoardCode ? (
                    <>
                      <div id="reanswerregistercontent">
                        <Form.Control
                          type="textarea"
                          placeholder="하위댓글 작성"
                          value={reanswerContent}
                          onChange={(e) => setReanswerContent(e.target.value)}
                        />
                        <Button variant="dark" onClick={UserReanswerSubmit}>
                          등록
                        </Button>
                      </div>
                    </>
                  ) : (
                    <>
                      <p>여기답변달타이밍아닌디요</p>
                    </>
                  )}
                </div>

                {/* 하위 답변 작성! */}
              </div>
            ))}
          </>
        )}
        {userAnswers?.length === 0 ? (
          <></>
        ) : (
          <>
            {/* 상위 답변 작성 */}
            <div id="answerregister">
              <Form.Control
                type="textarea"
                placeholder="답변 작성"
                variant="dark"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <Button variant="dark" onClick={UseranswerSubmit}>
                등록
              </Button>
            </div>
          </>
        )}
      </div>
    </Div>
  );
};

export default UserQnaAnswer;

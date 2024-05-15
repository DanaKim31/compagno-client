import { useState, useEffect } from "react";
import {
  getUserAnswers,
  addUserAnswer,
  updateUserAnswer,
  deleteUserAnswer,
} from "../../api/userQnaAnswer";

import {
  ChooseAnswer,
  deleteChoose,
  getChoose,
} from "../../api/userQnaQuestion";
import { useParams, useNavigate } from "react-router-dom";
import { userSave } from "../../store/user";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import useDidMountEffect from "../../assets/useDidMountEffect";
import MyToggleBar from "../../components/note/MyToggleBar";
import { Form, Button } from "react-bootstrap";
import styled from "styled-components";

const Div = styled.div`
  padding-bottom: 100px;
  #topanswer {
    background-color: lightgray;
    border: 2px dashed;
    border-radius: 15px;
    padding-top: 30px;
    padding-left: 30px;
    margin-bottom: 20px;
  }
  #answer {
    background-color: lightgray;
    border: 1px solid;
    border-radius: 15px;
    padding-top: 30px;
    padding-left: 30px;
    margin-bottom: 20px;

    #reanswer {
      margin-top: 20px;
      margin-bottom: 10px;
      background-color: white;
      padding-top: 10px;
      padding-left: 20px;
      margin-right: 80px;
      margin-left: 20px;
      border: 1px solid;
      border-radius: 15px;
      button {
        margin: 5px;
      }
      #reanswertopbar {
        display: flex;
        justify-content: space-between;
        margin-right: 10px;
        background-color: gray;
      }
    }
    #reansweredit {
      margin-top: 10px;
      margin-left: 25px;
      margin-right: 25px;
      margin-bottom: 10px;
      button {
        margin: 5px;
        width: 70px;
      }
      display: flex;
    }

    #reanswerregister {
      margin-left: 25px;
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
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  #choosetopbar {
    display: flex;
    justify-content: space-between;
    button {
      height: 40px;
      margin-right: 10px;
    }
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
    chooseAPI();
    answersAPI();
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

  const answersAPI = async () => {
    const response = await getUserAnswers(userQuestionBoardCode);
    setUserAnswers(response.data);
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
    setCode(0);
  };

  // 1-3. 하위 답변 취소
  const UserReanswerCancel = async () => {
    setCode(0);
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

  // 2-3. 하위 답변 수정 취소
  const userReAnswerUpdateCancel = () => {
    setEditA(null);
  };

  // 3. DELETE ==========================
  const onDeleteUserAnswer = async (no) => {
    await deleteUserAnswer(no);
    answersAPI();
    navigate("/compagno/userQna/detail/" + userQuestionBoardCode);
  };

  // 4-1. 답변 채택하기=========================

  // 채택된 답변이 있는지 확인하기
  const [checkChoose, setCheckChoose] = useState(0);

  // 채택된 답변이 없을 경우에만 버튼이 보여야 함..
  const choose = async (answer) => {
    console.log(answer);

    const formData = new FormData();

    formData.append("userQuestionBoardCode", answer.userQuestionBoardCode);
    formData.append("userAnswerBoardCode", answer.userAnswerBoardCode);
    setCheckChoose(1);
    await ChooseAnswer(formData);
    chooseAPI();
    // 채택후 새로고침
  };

  // 4-2. 채택 취소하기 (채택된 답변에만 보이게)
  const chooseDelete = async (no) => {
    setCheckChoose(0);
    await deleteChoose(no);
    chooseAPI();
    // 채택취소후 새로고침
  };

  // 4-3. 채택 보기
  const [topChoose, setTopChoose] = useState({});
  const chooseAPI = async () => {
    const response = await getChoose(userQuestionBoardCode);
    setTopChoose(response.data);
  };

  return (
    <Div>
      <div>
        {userAnswers?.length === 0 ? (
          <>
            {user.userId !== undefined ? (
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
              <></>
            )}
          </>
        ) : (
          <>
            {/* 답변이 있는 경우 */}
            {/* 채택된 답변 출력 */}
            {topChoose.length !== 0 ? (
              <>
                <div key={topChoose.userAnswerBoardCode}>
                  <div id="topanswer">
                    <div id="choosetopbar">
                      <div id="default">
                        <h3>채택된 답변</h3>
                        <div>
                          <MyToggleBar name={topChoose.user.userNickname} />
                        </div>
                        <p>
                          날짜 :
                          {moment(topChoose.userAnswerDate).format(
                            "YY-MM-DD HH:mm"
                          )}
                        </p>
                      </div>
                      {user.userId === question.userId ? (
                        <>
                          <Button
                            variant="dark"
                            onClick={() =>
                              chooseDelete(topChoose.userQuestionBoardCode)
                            }
                          >
                            채택 취소하기
                          </Button>
                        </>
                      ) : (
                        <></>
                      )}
                    </div>

                    <p>{topChoose.userAnswerContent}</p>
                  </div>
                </div>
                <hr />
              </>
            ) : (
              <>
                <div></div>
              </>
            )}
            {/* 채택된 답변 제외 출력 */}
            {userAnswers
              .filter(
                (answer) =>
                  answer.userAnswerBoardCode !== topChoose.userAnswerBoardCode
              )
              .map((answer) => (
                <div key={answer.userAnswerBoardCode} id="answer">
                  <div id="topmenu">
                    <div id="default">
                      <div>
                        <MyToggleBar name={answer.user.userNickname} />
                      </div>
                      <p>
                        날짜 :
                        {moment(answer.userAnswerDate).format("YY-MM-DD HH:mm")}
                      </p>
                    </div>
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
                            {topChoose.length === 0 ? (
                              <>
                                {/* 채택 답변이 없는 경우 */}
                                <button onClick={() => choose(answer)}>
                                  채택하기
                                </button>
                              </>
                            ) : (
                              <></>
                            )}

                            <div>
                              <Button
                                variant="dark"
                                onClick={() => onUpdateUserAnswer(answer)}
                              >
                                수정
                              </Button>
                              <Button
                                onClick={() =>
                                  onDeleteUserAnswer(answer.userAnswerBoardCode)
                                }
                              >
                                삭제
                              </Button>
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
                      <div id="reanswertopbar">
                        {user.userId === reanswer.user.userId ? (
                          <>
                            {/* 접속 유저 = 댓글 작성자 */}
                            <div>
                              <MyToggleBar name={reanswer.user.userNickname} />
                            </div>
                            <div>
                              <Button
                                variant="dark"
                                onClick={() => onUpdateUserReAnswer(reanswer)}
                              >
                                수정
                              </Button>
                              <Button
                                variant="dark"
                                onClick={() =>
                                  onDeleteUserAnswer(
                                    reanswer.userAnswerBoardCode
                                  )
                                }
                              >
                                삭제
                              </Button>
                            </div>
                          </>
                        ) : (
                          <>
                            {reanswer.user.userId === question.userId ? (
                              <>
                                {/* 글 작성자 본인! */}
                                <div>
                                  {reanswer.user.userId}
                                  <span
                                    id="writer"
                                    style={{ border: "2px solid" }}
                                  >
                                    작성자
                                  </span>
                                </div>
                              </>
                            ) : (
                              <>
                                <p>남의 글이니까 보기만하세요</p>
                              </>
                            )}
                          </>
                        )}
                      </div>
                      {editA !== null &&
                      editA?.userAnswerBoardCode ===
                        reanswer.userAnswerBoardCode ? (
                        <>
                          <div>
                            <p>대댓글 수정하자고</p>
                            <div id="reansweredit">
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
                              <Button
                                variant="dark"
                                onClick={userReAnswerUpdate}
                              >
                                수정
                              </Button>
                              <Button
                                variant="dark"
                                onClick={userReAnswerUpdateCancel}
                              >
                                취소
                              </Button>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>{reanswer.userAnswerContent}</>
                      )}
                    </div>
                  ))}
                  <div id="reanswerregister">
                    {user.userId === undefined ? (
                      <></>
                    ) : (
                      <>
                        {code !== 0 ? (
                          <></>
                        ) : (
                          <>
                            <Button
                              variant="dark"
                              onClick={(e) =>
                                setCode(answer.userAnswerBoardCode)
                              }
                            >
                              답변 달기
                            </Button>
                          </>
                        )}
                      </>
                    )}

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
                          <Button variant="dark" onClick={UserReanswerCancel}>
                            취소
                          </Button>
                        </div>
                      </>
                    ) : (
                      <></>
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
            {user.userId === undefined ? (
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
          </>
        )}
      </div>
    </Div>
  );
};

export default UserQnaAnswer;

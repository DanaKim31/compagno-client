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
import { Form } from "react-bootstrap";
import styled from "styled-components";
import { FaRegLightbulb } from "react-icons/fa6";
import { FaLightbulb } from "react-icons/fa6";

const Div = styled.div`
  padding-bottom: 100px;

  // ======== 폰트 관련
  @font-face {
    font-family: "TAEBAEKmilkyway";
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2310@1.0/TAEBAEKmilkyway.woff2")
      format("woff2");
    font-weight: normal;
    font-style: normal;
  }

  // ========  버튼 관련
  .content a {
    text-decoration: none;
    border-radius: 5px;
    border: 2px solid;
    color: rgb(32, 61, 59);
    text-decoration: none;
    padding: 10px;
    font-size: 1rem;
    align-items: center;
  }
  .content a:hover {
    background-color: rgb(32, 61, 59);
    color: white;
  }

  #writer {
    background-color: #94B29B;
    border: none;
    border-radius: 7px;
    margin: 10px;
    height: 25px;
    font-size: 12px;
    margin-top: 5px;
    padding-top: 3px;
    padding-right: 5px;
    padding-left: 5px;
  }

  #rewriter{
    background-color: #94B29B;
    border: none;
    border-radius: 7px;
    margin: 10px;
    height: 25px;
    font-size: 12px;
    margin-top: 5px;
    padding-top: 3px;
    padding-right: 5px;
    padding-left: 5px;
  }

  #content{
    padding: 30px;
    padding-left: 70px;
  }

  // 채택된 상위 답변
  #topanswer {
    font-family: "TAEBAEKmilkyway";
    font-weight: bold;
    background-color: rgba(32, 61, 59, 0.17);
    border: 2px dashed rgba(32, 61, 59, 0.17);
    border-radius: 15px;
    padding-top: 30px;
    padding-left: 30px;
    margin-bottom: 20px;
    width: 80%;
    margin: 0 auto;

    #choosetopbar {
      display: flex;
      justify-content: space-between;
      button {
        height: 40px;
        margin-right: 10px;
      }
    }
  }
  #topChoosereanswerregistercontent {
      display: flex;
      height: 50px;
      input{
        font-weight: bold;
      }
      button {
        width: 80px;
        height: 41px;
        margin-left: 10px;
        padding-right: 10px;
      }
      margin: 10px 110px;
    }

  // 상위 답변
  #answer {
    font-family: "TAEBAEKmilkyway";
    font-weight: bold;
    background-color: rgba(32, 61, 59, 0.08);
    border: 1px solid rgba(32, 61, 59, 0.2);
    border-radius: 15px;
    padding-top: 15px;
    padding-left: 30px;
    margin-bottom: 20px;
    width: 80%;
    margin: 0 auto;
    margin-bottom: 20px;
  }

  /* 하위 답변 */
  #reanswer {
    margin-top: 20px;
    margin-bottom: 10px;
    background-color: white;
    padding-top: 15px;
    padding-left: 20px;
    border: none;
    border-radius: 15px;
    width: 75%;
    margin: 20px auto;
    button {
      margin: 5px;
    }

    /* 하위 답변 */
    #reanswertopbar {
      display: flex;
      justify-content: space-between;
      margin-right: 10px;
    }
  }

  #default {
    width: 100%;
    margin-right: 30px;
    display: flex;
    justify-content: space-between;
    padding: 20px;
    h3{
      padding-left: 10px;
      font-weight: bold;
    }
    #topbarright {
      #choosebutton {
      }
      button {
        margin: 0px;
      }
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      p{
        margin-right: 10px;
      }
    }
  }
  /* content */
  #desc {
    padding: 30px;
    margin: 20px;
    height: 80px;
  }
  #answeredit{
    display: flex;
    padding: 30px;
    margin: 20px auto;
    input{
      font-weight: bold;
    }
  }
  
  #reansweredit {
    padding: 10px;
    margin: 20px auto;
    margin-left: 20px;
    input {
      margin: auto;
      height: 40px;
      font-weight: bold;
    }
    button {
      margin: 5px;
      width: 80px;
    }
    display: flex;

  }
  #editdeletebutton{
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;  
#buttons{
  width: 150px;
  display: flex;
justify-content: space-evenly;
}
    }

  #reanswerregister {
    font-family: "TAEBAEKmilkyway";
    font-weight: bold;
    margin-left: 80px;
    margin-right: 50px;
    margin-bottom: 10px;
    button {
      margin: 5px;
    }

    input{
      font-weight: bold;
    }


  }
  #reanswerregistercontent {
      display: flex;
      height: 50px;
      input{
        font-weight: bold;
      }
      button {
        width: 80px;
        height: 41px;
        margin-left: 10px;
        padding-right: 10px;
      }
    }


  /* 프로필 */
  #profile {
    padding-top: 10px;
    margin-left: 10px;
    display: flex;
    flex-direction: row;
    height: 65px;
    img {
      width: 65px;
      height: 65px;
      border-radius: 50%;
      margin-right: 15px;
    }
  }

  #answerregister {
    font-family: "TAEBAEKmilkyway";
    font-weight: bold;
    display: flex;
    width: 80%;
    margin: 0 auto;
    input{
      font-weight: bold;
    }
    button {
      width: 80px;
      height: 41px;
      margin-left: 10px;
      font-weight: bold;
    }

    padding-bottom: 30px;
  }

  #topmenu {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  #buttons {
    display: flex;
    justify-content: center;
    button {
      font-family: "TAEBAEKmilkyway";
      font-weight: bold;
      width: 60px;
    }
    margin-right: 40px;
  }

  button {
    border: none;
    border-radius: 5px;
    padding: 5px;
    background-color: black;
    color: white;
    font-weight: bold;
  }
  button:hover {
    background-color: #94b29b;
  }

  #list{
    display:flex;
    justify-content: center;
    font-family: "TAEBAEKmilkyway";
      font-weight: bold;
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
    if(content === "" || content === undefined){
      alert("내용을 입력하세요!");
    } else {
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
    }
    
  };

  // 1.2 하위 답변 작성
  const UserReanswerSubmit = async () => {
    if(reanswerContent === "" || reanswerContent === undefined){
      alert("내용을 입력하세요!");
    } else {
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
      chooseAPI();
      setReanswerContent("");
      setCode(0);
    }
    
  };

  // 1-3. 하위 답변 취소
  const UserReanswerCancel = async () => {
    setReanswerContent("");
    setCode(0);
  };
  // 2. UPDATE ==========================
  // 2-1. 답변 수정 클릭 시 정보를 담은 폼 화면!
  const onUpdateUserAnswer = async (answer) => {
    setEditA(answer);
  };

  const userAnswerUpdate = async () => {
    if (editA.userAnswerContent === "" || editA.userAnswerContent === undefined){
      alert("내용을 입력하세요!");
    } else {
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
    }
    
  };

  // 2-2. 상위 답변 수정
  const onUpdateUserReAnswer = async (reanswer) => {
    setCode(reanswer.userAnswerBoardCode);
    setEditA(reanswer);
  };

  // 2-3. 상위 답변 수정 취소
  const userAnswerUpdateCancel = async () => {
    setEditA(null);
  };

  // 2-4. 하위 답변 수정
  const userReAnswerUpdate = async () => {
    if(editA.userAnswerContent === "" || editA.userAnswerContent === undefined){
      alert("내용을 입력하세요!");
    } else {
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
    }
    
  };

  // 2-3. 하위 답변 수정 취소
  const userReAnswerUpdateCancel = () => {
    setEditA(null);
  };

  // 3. DELETE ==========================
  const onDeleteUserAnswer = async (no) => {
    await deleteUserAnswer(no);
    answersAPI();
    chooseAPI();
  };

  // 4-1. 답변 채택하기=========================

  // 채택된 답변이 있는지 확인하기
  const [checkChoose, setCheckChoose] = useState(0);

  // 채택된 답변이 없을 경우에만 버튼이 보여야 함..
  const choose = async (answer) => {
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
                <div id="answerregister">
                  <Form.Control
                    type="textarea"
                    placeholder="답변 작성"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                  <button onClick={UseranswerSubmit}>등록</button>
                </div>
                <div id="list">
                  <button onClick={() => navigate("/compagno/userQna")}>목록</button>
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
                        <div>
                          <h3><FaLightbulb style={{color:"#FFCC01"}}/>&nbsp; 채택된 답변</h3>
                          <div id="profile">
                            <img
                              alt=""
                              key={topChoose.userAnswerBoardCode}
                              // src={"http://localhost:8081/" + question.userImg}
                              src={
                                "http://192.168.10.28:8081/" + topChoose.user.userImg
                              }
                            />
                            <div>
                              <MyToggleBar
                                name={topChoose.user?.userNickname}
                              />
                            </div>
                          </div>
                        </div>
                        <div id="topbarright">
                          <div>
                            {user.userId === question.userId ? (
                              <>
                                <button
                                  onClick={() =>
                                    chooseDelete(
                                      topChoose.userQuestionBoardCode
                                    )
                                  }
                                >
                                  채택 취소하기
                                </button>
                              </>
                            ) : (
                              <></>
                            )}
                          </div>
                          <div>
                            <p>
                              날짜 :
                              {moment(topChoose.userAnswerDate).format(
                                "YY-MM-DD HH:mm"
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div id="desc">
                      <p>{topChoose.userAnswerContent}</p>
                    </div>

                    {/* 채택된 답변 하위 답변 출력하기 */}
                    {topChoose.answers?.map((reanswer) => (
                      <div key={reanswer.userAnswerBoardCode} id="reanswer">
                        <div id="reanswertopbar">
                          {user.userId === reanswer.user.userId ? (
                            <>
                              {/* 접속 유저 = 댓글 작성자 */}
                              <div id="profile">
                                <img
                                  alt=""
                                  key={reanswer.userAnswerBoardCode}
                                  // src={
                                  //   "http://localhost:8081/" + question.userImg
                                  // }
                                  src={
                                    "http://192.168.10.28:8081/" +
                                    reanswer.user.userImg
                                  }
                                />
                                  <MyToggleBar
                                    name={reanswer.user.userNickname}
                                  />
                                  {question.userId === reanswer.user.userId ? (<>
                                  <p id="rewriter">작성자</p>
                                </>) :(<></>)}
                              </div>

                              <div>
                                {editA !== null ? (
                                  <>{/* 수정중 */}<p>수정중</p></>
                                ) : (
                                  <>
                                    {/* 안 수정중 */}
                                    <div id="buttons">
                                      <button
                                        onClick={() =>
                                          onUpdateUserReAnswer(reanswer)
                                        }
                                      >
                                        수정
                                      </button>
                                      <button
                                        onClick={() =>
                                          onDeleteUserAnswer(
                                            reanswer.userAnswerBoardCode
                                          )
                                        }
                                      >
                                        삭제
                                      </button>
                                    </div>
                                  </>
                                )}
                              </div>
                            </>
                          ) : (
                            <>
                              {topChoose.user.userId === question.userId &&
                              editA === null ? (
                                <>
                                  {/* 글 작성자 본인! */}

                                  <div>
                                    {topChoose.user.userId}
                                    {question.userId === reanswer.user.userId ? (<>
                                  <p id="rewriter">작성자</p>
                                </>) :(<></>)}
                                  </div>
                                </>
                              ) : (
                                <>
                                  <div id="profile">
                                    <img
                                      alt=""
                                      key={topChoose.userAnswerBoardCode}
                                      // src={
                                      //   "http://localhost:8081/" +
                                      //   question.userImg
                                      // }
                                      src={
                                        "http://192.168.10.28:8081/" +
                                        reanswer.user.userImg
                                      }
                                    />
                                      <MyToggleBar
                                        name={reanswer.user.userNickname}
                                      />
                                      {question.userId === reanswer.user.userId ? (<>
                                  <p id="rewriter">작성자</p>
                                </>) :(<></>)}
                                  </div>
                                </>
                              )}
                            </>
                          )}
                        </div>
                        {editA !== null &&
                        editA?.userAnswerBoardCode ===
                          topChoose.userAnswerBoardCode ? (
                          <>
                            <div>
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
                                <button onClick={userReAnswerUpdate}>
                                  수정
                                </button>
                                <button onClick={userReAnswerUpdateCancel}>
                                  취소
                                </button>
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            <div id="desc">{reanswer.userAnswerContent}</div>
                          </>
                        )}
                      </div>
                    ))}
                    <div id="reanswerregister">
                      {code !== 0 ? (
                        <></>
                      ) : (
                        <>
                          {user.userId !== undefined ? (
                            <>
                              <button
                                onClick={(e) =>
                                  setCode(topChoose.userAnswerBoardCode)
                                }
                              >
                                답변 달기
                              </button>
                            </>
                          ) : (
                            <></>
                          )}
                        </>
                      )}
                    </div>
                    {code === topChoose.userAnswerBoardCode ? (
                      <>
                        <div id="topChoosereanswerregistercontent">
                          <Form.Control
                            type="textarea"
                            placeholder="하위댓글 작성"
                            value={reanswerContent}
                            onChange={(e) => setReanswerContent(e.target.value)}
                          />
                          <button onClick={UserReanswerSubmit}>등록</button>
                          <button onClick={UserReanswerCancel}>취소</button>
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                  <hr />
                </div>
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
                      <div id="profile">
                        <img
                          alt=""
                          key={answer.userQuestionBoardCode}
                          // src={"http://localhost:8081/" + question.userImg}
                          src={
                            "http://192.168.10.28:8081/" + answer.user.userImg
                          }
                        />
                        <MyToggleBar name={answer.user.userNickname} />
                        {question.userId === answer.user.userId ? (<>                               
                                  <p id="writer">작성자</p>
                                </>) :(<></>)}
                      </div>
                      <div id="topbarright">
                        <p>
                          작성일 :
                          {moment(answer.userAnswerDate).format(
                            "YY-MM-DD HH:mm"
                          )}
                        </p>
                        {user.userId === undefined ? (
                          <></>
                        ) : (
                          <div id="editdeletebutton">
                            {user.userId === question.userId ? (
                              <>
                                {/* 접속 유저 = 질문 작성자 */}
                                {topChoose.length === 0 &&
                                // 접속자가 해당 답변 작성자가 아닌 경우
                                user.userId !== answer.user.userId ? (
                                  <>
                                    {/* 채택 답변이 없는 경우 */}
                                    <button
                                      id="choosebutton"
                                      onClick={() => choose(answer)}
                                    >
                                      채택하기
                                    </button>
                                  </>
                                ) : (
                                  <>
                                    {user.userId === answer.user.userId && editA === null ? (
                                      <>
                                        <div id="buttons">
                                          <button
                                            onClick={() =>
                                              onUpdateUserAnswer(answer)
                                            }
                                          >
                                            수정
                                          </button>
                                          <button
                                            onClick={() =>
                                              onDeleteUserAnswer(
                                                answer.userAnswerBoardCode
                                              )
                                            }
                                          >
                                            삭제
                                          </button>
                                        </div>
                                      </>
                                    ) : (
                                      <></>
                                    )}
                                  </>
                                )}
                              </>
                            ) : (
                              <>
                                {user.userId === answer.user.userId &&
                                editA === null ? (
                                  <>
                                    {/* 접속 유저 = 댓글 작성자 */}
                                    <div id="buttons">
                                      <button
                                        onClick={() =>
                                          onUpdateUserAnswer(answer)
                                        }
                                      >
                                        수정
                                      </button>
                                      <button
                                        onClick={() =>
                                          onDeleteUserAnswer(
                                            answer.userAnswerBoardCode
                                          )
                                        }
                                      >
                                        삭제
                                      </button>
                                    </div>
                                  </>
                                ) : (
                                  <></>
                                )}
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  {editA !== null &&
                  editA?.userAnswerBoardCode === answer.userAnswerBoardCode ? (
                    <>
                      <div id="answeredit">
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
                        <div id="buttons">
                          <button onClick={userAnswerUpdate}>수정</button>
                          <button onClick={userAnswerUpdateCancel}>취소</button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div id="content">{answer.userAnswerContent}</div>
                    </>
                  )}

                  {answer.answers.map((reanswer) => (
                    <div key={reanswer.userAnswerBoardCode} id="reanswer">
                      <div id="reanswertopbar">
                        {user.userId === reanswer.user.userId ? (
                          <>
                            {/* 접속 유저 = 댓글 작성자 */}
                            <div id="profile">
                              <img
                                alt=""
                                key={question.userQuestionBoardCode}
                                // src={
                                //   "http://localhost:8081/" + question.userImg
                                // }
                                src={
                                  "http://192.168.10.28:8081/" +
                                  reanswer.user.userImg
                                }
                              />
                                <MyToggleBar
                                  name={reanswer.user.userNickname}
                                />
                                {question.userId === reanswer.user.userId ? (<>                             
                                  <p id="rewriter">작성자</p>
                                </>) :(<></>)}
                            </div>
                            <div>
                              {editA !== null ? (
                                <>{/* 수정중 */}</>
                              ) : (
                                <>
                                  {/* 안 수정중 */}
                                  <button
                                    onClick={() =>
                                      onUpdateUserReAnswer(reanswer)
                                    }
                                  >
                                    수정
                                  </button>
                                  <button
                                    onClick={() =>
                                      onDeleteUserAnswer(
                                        reanswer.userAnswerBoardCode
                                      )
                                    }
                                  >
                                    삭제
                                  </button>
                                </>
                              )}
                            </div>
                          </>
                        ) : (
                          <>
                            {reanswer.user.userId === question.userId &&
                            editA === null ? (
                              <>
                                {/* 글 작성자 본인! */}
                                <div id="profile">
                                <img
                                    alt=""
                                    key={question.userQuestionBoardCode}
                                    // src={
                                    //   "http://localhost:8081/" +
                                    //   question.userImg
                                    // }
                                    src={
                                      "http://192.168.10.28:8081/" +
                                      reanswer.user.userImg
                                    }
                                  />
                                  <MyToggleBar name={question.userNickname} />
                                  <p id="rewriter">작성자</p>
                                </div>
                              </>
                            ) : (
                              <>
                                <div id="profile">
                                  <img
                                    alt=""
                                    key={question.userQuestionBoardCode}
                                    // src={
                                    //   "http://localhost:8081/" +
                                    //   question.userImg
                                    // }
                                    src={
                                      "http://192.168.10.28:8081/" +
                                      reanswer.user.userImg
                                    }
                                  />
                                  <div>
                                    <MyToggleBar
                                      name={reanswer.user.userNickname}
                                    />
                                  </div>
                                </div>
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
                              <button onClick={userReAnswerUpdate}>수정</button>
                              <button onClick={userReAnswerUpdateCancel}>
                                취소
                              </button>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div id="content">{reanswer.userAnswerContent}</div>
                        </>
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
                            {user.userId !== undefined ? (
                              <>
                                <button
                                  onClick={(e) =>
                                    setCode(answer.userAnswerBoardCode)
                                  }
                                >
                                  답변 달기
                                </button>
                              </>
                            ) : (
                              <></>
                            )}
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
                          <button onClick={UserReanswerSubmit}>등록</button>
                          <button onClick={UserReanswerCancel}>취소</button>
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
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                  <button onClick={UseranswerSubmit}>등록</button>
                </div>
                <div id="list">
                  <button onClick={() => navigate("/compagno/userQna")}>목록</button>
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

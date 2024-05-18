import { Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";
import {
  getAnswer,
  addAnswer,
  updateAnswer,
  deleteAnswer,
} from "../../api/Answer";
import { useSelector, useDispatch } from "react-redux";
import { userSave } from "../../store/user";
import styled from "styled-components";

const Div = styled.div`
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
  /* 등록 */
  #register {
    padding: 20px;
    h1 {
      margin-bottom: 20px;
    }
    font-family: "TAEBAEKmilkyway";
    font-weight: bold;
    input {
      font-family: "TAEBAEKmilkyway";
      font-weight: bold;
    }
    textarea{
      font-weight: bold;
    }
  }

  #input {
    display: flex;
    flex-direction: column;
    height: 350px;
    font-family: "TAEBAEKmilkyway";
    font-weight: bold;
    input {
      font-family: "TAEBAEKmilkyway";
      font-weight: bold;
    }
    p {
      font-size: 1.2rem;
      margin-left: 10px;
    }
    div {
      margin-left: 10px;
      margin-top: 10px;
      margin-bottom: 10px;
    }
  }

  #buttons {
    display: flex;
    justify-content: space-between;
    button {
      margin: 10px;
      font-family: "TAEBAEKmilkyway";
      font-weight: bold;
    }
  }

  button {
    border: none;
    border-radius: 5px;
    padding: 5px;
    background-color: black;
    color: white;
    font-family: "TAEBAEKmilkyway";
    font-weight: bold;
  }
  button:hover {
    background-color: #94b29b;
  }

  /* 보기 */
  #atopbar {
    font-family: "TAEBAEKmilkyway";
    font-weight: bold;
    width: 100%;
    display: flex;
    justify-content: space-between;
    #answerbuttons{
      padding-top: 20px;
      padding-right: 20px;
      margin-right: 10px;
      display: flex;
      flex-direction: column;
      font-weight: bold;
      button{
        font-family: "TAEBAEKmilkyway";
       font-weight: bold;
      }
    }
    #buttons {
      justify-content: end;
    }
    h2 {
      padding-top: 25px;
      font-weight: bold;
      padding-left: 25px;
    }
  }

  background-color: rgba(32, 61, 59, 0.15);
  border-radius: 10px;

  p {
    font-family: "TAEBAEKmilkyway";
    font-weight: bold;
  }
  #content {
    padding: 30px;
    font-family: "TAEBAEKmilkyway";
    font-weight: bold;
    height: 200px;
  }
  #list {
    display: flex;
    justify-content: center;
    margin-bottom: 200px;
    button{
      margin-bottom: 20px;
      font-family: "TAEBAEKmilkyway";
      font-weight: bold;
    }
  }
`;

const QnaADetail = () => {
  const { qnaQCode } = useParams();

  const [userId, setUserId] = useState("");
  const [userNickname, setUserNickname] = useState("");
  const [answer, setAnswer] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [showImages, setShowImages] = useState([]);
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
  // // 2-1. 답변 수정 클릭 시 정보를 담은 폼 화면이 나옴!
  const onUpdateAnswer = async (answer) => {
    setEditA(answer);
  };

  // // 2-2. 수정 폼 제출
  const answerUpdate = async () => {
    const formData = new FormData();

    formData.append("userId", user.userId);
    setUserId(user.userId);

    formData.append("qnaQCode", editA.qnaQCode);
    formData.append("qnaACode", editA.qnaACode);
    formData.append("qnaATitle", editA.qnaATitle);
    formData.append("qnaAContent", editA.qnaAContent);

    editA.images?.forEach((image, index) => {
      formData.append(`images[${index}].qnaAImgCode`, image.qnaAImgCode);
      formData.append(`images[${index}].qnaAUrl`, image.qnaAUrl);
      formData.append(`images[${index}].qnaACode`, editA.qnaACode);
    });

    images.forEach((image, index) => {
      formData.append(`files[${index}]`, image);
    });

    await updateAnswer(formData);
    setImages([]);
    setEditA(null);
    answerAPI();
  };

  // 2-3. 이미지 선택 시 이미지 삭제
  const deleteImage = (code) => {
    setEditA((prev) => {
      const images = prev.images.filter((image) => image.qnaQImgCode !== code);
      return { ...prev, images: images };
    });
  };

  // 2-4. 수정 삭제 이미지 관리
  const handleDeleteImage = (id) => {
    setShowImages(showImages.filter((_, index) => index !== id));
  };

  // 2-5. 답변 취소
  const cancelAnswer = () => {
    setEditA(null);
  };

  // 3. DELETE ========================================================
  const onDeleteAnswer = async (code) => {
    await deleteAnswer(code);
    answerAPI();
    setEditA(null);
    answerAPI();
  };

  return (
    <Div>
      {user.userRole === "ROLE_ADMIN" ? (
        // 관리자의 경우!
        <>
          {answer === "" ? (
            // 답변이 없는 경우
            <div className="Answer">
              <div id="register">
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
              </div>

              <div id="buttons">
                <div>
                  <button onClick={() => navigate("/compagno/question")}>
                    목록
                  </button>
                </div>
                <div>
                  <button onClick={answerSubmit}>답변 등록</button>
                </div>
              </div>
            </div>
          ) : (
            <>
              {editA !== null && editA?.qnaACode === answer.qnaACode ? (
                <>
                  {/* 수정 페이지!!! */}
                  {/* 기존 이미지 */}
                  <div id="edit">
                    {editA.images?.map((image) => (
                      <img
                        alt=""
                        key={image.qnaAImgCode}
                        src={"http://localhost:8081" + image.qnaAUrl}
                        onClick={() => deleteImage(image.qnaAImgCode)}
                      />
                    ))}
                    {/* 수정 이미지 */}
                    {showImages.map((image, id) => {
                      <div key={id}>
                        <img src={image} alt={`${image}-${id}`} />
                        <button onClick={() => handleDeleteImage(id)}>
                          삭제
                        </button>
                      </div>;
                    })}
                  </div>
                  <div id="input">
                    <div>
                      <p>제목</p>
                      <Form.Control
                        type="text"
                        placeholder="제목 작성"
                        value={editA.qnaATitle}
                        onChange={(e) =>
                          setEditA((prev) => ({
                            ...prev,
                            qnaATitle: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div>
                      <p>내용</p>
                      <Form.Control
                        as="textarea"
                        placeholder="내용 작성"
                        value={editA.qnaAContent}
                        onChange={(e) =>
                          setEditA((prev) => ({
                            ...prev,
                            qnaAContent: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div>
                      <p>이미지</p>
                      <Form.Control
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={imageChange}
                      />
                    </div>
                  </div>
                  <div id="buttons">
                    <button onClick={answerUpdate}>답변 등록</button>
                    <button variant="secondary" onClick={cancelAnswer}>
                      취소
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div id="atopbar">
                    <h2>{answer.qnaATitle}</h2>
                    <div id="answerbuttons">
                      <div id="buttons">
                        <button onClick={() => onUpdateAnswer(answer)}>
                          수정
                        </button>
                        <button onClick={() => onDeleteAnswer(answer.qnaACode)}>
                          삭제
                        </button>
                      </div>
                      <span>
                        날짜 :{" "}
                        {moment(answer.qnaADate).format("YY-MM-DD hh:mm")}
                      </span>
                    </div>
                  </div>
                  <div>
                    {answer.images?.map((image) => (
                      <img
                        alt=""
                        key={image.qnaAImgCode}
                        // src={"http://localhost:8081" + image.qnaAUrl}
                        src={"http://192.168.10.28:8081/QnaA/" + image.qnaQUrl}
                      />
                    ))}
                  </div>
                  <div id="content">
                    <p>{answer.qnaAContent}</p>
                  </div>
                </>
              )}
            </>
          )}
        </>
      ) : (
        // 회원의 경우
        <>
          {answer === "" ? (
            // 답변이 없을 때
            <>
            <div id="content">
            <p>답변이 아직 작성되지 않았습니다.</p>

            </div>
              <div id="list">
                <button onClick={() => navigate("/compagno/question")}>
                  목록
                </button>
              </div>
            </>
          ) : (
            // 답변이 있을 때
            <>
              <div id="atopbar">
                <h2>{answer.qnaATitle}</h2>
                <div id="answerbuttons">
                  <p>
                    날짜 : {moment(answer.qnaADate).format("YY-MM-DD hh:mm")}
                  </p>
                  <p>{answer.userId}</p>
                </div>
              </div>
              <div>
                {answer.images?.map((image) => (
                  <img
                    alt=""
                    key={image.qnaAImgCode}
                    // src={"http://localhost:8081" + image.qnaAUrl}
                    src={"http://192.168.10.28:8081/QnaA/" + image.qnaQUrl}
                  />
                ))}
              </div>
              <div id="content">
                <p>{answer.qnaAContent}</p>
              </div>

              <div id="list">
                <button onClick={() => navigate("/compagno/question")}>
                  목록
                </button>
              </div>
            </>
          )}
        </>
      )}
    </Div>
  );
};

export default QnaADetail;

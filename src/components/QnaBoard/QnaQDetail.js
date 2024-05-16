import { getQuestion, updateQuestion, delQuestion } from "../../api/Question";
import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Form, Button } from "react-bootstrap";
import styled from "styled-components";
import { userSave } from "../../store/user";
import QnaADetail from "./QnaADetail";
import moment from "moment";
import MyToggleBar from "../../components/note/MyToggleBar";

const Div = styled.div`
  /* // ======== 폰트 관련
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
  } */

  position: relative;
  width: 80%;
  margin: 0 auto;
  top: 150px;
  #qtopbar {
    h1 {
      text-align: center;
    }

    /* 프로필, 작성일, 수정/삭제 or 상태보기 */
    #quserbar {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }

    /* 프로필 */
    #profile {
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
  }

  /* 질문 이미지들 */
  #images {
    width: 80%;
    margin: 0 auto;
    img {
      width: 30%;
      vertical-align: top;
    }
  }

  #prevImages {
    width: 500px;

    img {
      width: 100px;
      height: 100px;
    }
  }

  /* 편집 이미지들 */
  #editImage {
    width: 500px;
    margin: 0 auto;
    display: flex;
    background-color: pink;

    img {
      width: 100px;
      height: 100px;
    }
  }
`;

const QnaQDetail = () => {
  const [userId, setUserId] = useState("");
  const [userNickname, setUserNickname] = useState("");
  const [userImg, setUserImg] = useState("");

  const [question, setQuestion] = useState({});
  const [images, setImages] = useState([]);
  const [showImages, setShowImages] = useState([]);
  const [editQ, setEditQ] = useState(null);

  const [answer, setAnswer] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editA, setEditA] = useState(null);

  const fileRef = useRef();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { qnaQCode } = useParams();

  // user 세팅
  const user = useSelector((state) => {
    return state.user;
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== null) {
      dispatch(userSave(JSON.parse(localStorage.getItem("user"))));
    }
    // 1. Question 세팅 (불러오기)
    questionAPI();
  }, []);

  // 1. READ =========================================================
  // 1. Question 세팅 (불러오기)
  const questionAPI = async () => {
    const response = await getQuestion(qnaQCode);
    setQuestion(response.data);
  };

  // 2. Q UPDATE ========================================================
  // 2-1. 상세 정보 보는 페이지에서 수정 버튼 클릭 (정보를 전달한 채 수정 폼이 나오도록!)
  const onUpdateQuestion = (data) => {
    navigate(`/compagno/question/detail/${data.qnaQCode}`);
    setEditQ(data);
  };

  // 2-2. 수정 폼 제출
  const questionUpdate = async () => {
    const formData = new FormData();

    formData.append("userId", user.userId);
    setUserId(user.userId);

    formData.append("userNickname", user.userNickname);
    setUserNickname(user.userNickname);

    formData.append("userImg", user.userImg);
    setUserImg(user.userImg);

    formData.append("qnaQCode", editQ.qnaQCode);
    formData.append("qnaQTitle", editQ.qnaQTitle);
    formData.append("qnaQContent", editQ.qnaQContent);

    if (editQ.images.length + images.length <= 3) {
      editQ.images?.forEach((image, index) => {
        formData.append(`images[${index}].qnaQImgCode`, image.qnaQImgCode);
        formData.append(`images[${index}].qnaQUrl`, image.qnaQUrl);
        formData.append(`images[${index}].qnaQCode`, editQ.qnaQCode);
      });
      // 새로 추가된 이미지
      images.forEach((image, index) => {
        formData.append(`files[${index}]`, image);
      });

      // setEditQ("images", showImages);
      await updateQuestion(formData);
      setImages([]);
      setEditQ(null);
      questionAPI();
    } else {
      alert("파일 업로드는 최대 3개까지만 가능합니다!");
    }

    //   // 새로 추가된 이미지
    //   images.forEach((image, index) => {
    //     formData.append(`files[${index}]`, image);
    //   });
    //   await updateQuestion(formData);
    //   setImages([]);
    //   setEditQ(null);
    //   questionAPI();
    // }
  };

  // 2-3. 이미지 선택 시 이미지 삭제
  const deleteImage = (code) => {
    setEditQ((prev) => {
      const images = prev.images.filter((image) => image.qnaQImgCode !== code);
      return { ...prev, images: images };
    });
  };

  // 2-4. 수정 추가 이미지 미리보기 및 관리
  const preview = (e) => {
    const files = Array.from(e.target.files);
    setImages((prev) => [...prev, ...files]);

    const imageLists = e.target.files;
    let imageUrlLists = [...showImages];

    for (let i = 0; i < imageLists.length; i++) {
      const currentImageUrl = URL.createObjectURL(imageLists[i]);
      imageUrlLists.push(currentImageUrl);
    }
    setShowImages(imageUrlLists);
    // setImages에 .. filtering 해야하나..
  };

  // 2-5. 수정 삭제 이미지 관리
  const handleDeleteImage = (id) => {
    setShowImages(showImages.filter((_, index) => index !== id));
    setImages(images.filter((_, index) => index !== id));
    // fileRef.current = showImages.filter((_, index) => index !== id).length;
    // console.log(fileRef);
    console.log(showImages.filter((_, index) => index !== id));
  };

  // 3. A UPDATE ===================================================
  // 3-1. 답변 수정 클릭 시 정보를 담은 폼 화면이 나옴!
  const onUpdateAnswer = async (answer) => {
    setEditA(answer);
  };

  // 4. DELETE ========================================================
  const onDeleteQuestion = (qnaQCode) => {
    delQuestion(qnaQCode);
    questionAPI();
    navigate("/compagno/question");
  };

  return (
    <>
      <Div>
        <>
          {question.userId === user.userId ? (
            <>
              <div key={question.qnaQCode} className="question">
                {editQ !== null && editQ?.qnaQCode === question.qnaQCode ? (
                  <>
                    {/* 수정 페이지! ==================================================================================*/}
                    {/* 이미지들 */}
                    <div>
                      <div id="prevImages">
                        {/* 기존 이미지들 */}
                        {editQ.images?.map((image) => (
                          <img
                            alt=""
                            key={image.qnaQImgCode}
                            // src={"http://localhost:8081" + image.qnaQUrl}
                            src={"http://192.168.10.28:8081/QnaQ/" + image.qnaQUrl}
                            onClick={() => deleteImage(image.qnaQImgCode)}
                          />
                        ))}
                      </div>
                      <div id="editImages">
                        {/* 수정 이미지들 */}
                        {showImages.map((image, id) => (
                          <div key={id}>
                            <img
                              src={image}
                              alt={`${image}-${id}`}
                              style={{ width: "100px", height: "100px" }}
                            />
                            <button onClick={() => handleDeleteImage(id)}>
                              삭제
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* 수정 폼 */}
                    <Form.Control
                      type="text"
                      placeholder="제목"
                      value={editQ.qnaQTitle}
                      onChange={(e) =>
                        setEditQ((prev) => ({
                          ...prev,
                          qnaQTitle: e.target.value,
                        }))
                      }
                    />
                    <Form.Control
                      type="textarea"
                      placeholder="내용"
                      value={editQ.qnaQContent}
                      onChange={(e) => {
                        setEditQ((prev) => ({
                          ...prev,
                          qnaQContent: e.target.value,
                        }));
                      }}
                    />
                    <Form.Control
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={preview}
                    />

                    {/* 수정, 취소 버튼 */}
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
                    {/* 그냥 보는 페이지 ==========================================================================*/}
                    <div id="qtopbar">
                      <h1>{question.qnaQTitle}</h1>
                      <hr />
                      <div id="quserbar">
                        {/* 프로필 + 작성자 이름, 아이디 */}
                        <div id="profile">
                          <img
                            alt=""
                            key={question.qnaQCode}
                            src={
                              "http://192.168.10.28:8081/" + question.userImg
                            }
                          />
                          <div>
                            <p>
                              <MyToggleBar name={question.userNickname} />
                            </p>
                            <p>아이디 : {question.userId}</p>
                          </div>
                        </div>
                        <div>
                          <p>
                            작성일 :{" "}
                            {moment(question.qnaQDate).format("YY-MM-DD hh:mm")}
                          </p>

                          {question.qnaQStatus === "N" ||
                          question.qnaQStatus == null ? (
                            <>
                              {/* 상태가 N: 수정, 삭제 버튼 */}
                              <div id="status">
                                <Button
                                  variant="warning"
                                  onClick={() => onUpdateQuestion(question)}
                                >
                                  수정
                                </Button>
                                <Button
                                  variant="danger"
                                  onClick={() =>
                                    onDeleteQuestion(question.qnaQCode)
                                  }
                                >
                                  삭제
                                </Button>
                              </div>
                            </>
                          ) : (
                            <></>
                          )}
                        </div>
                      </div>
                    </div>
                    <hr />
                    {/* 상세 정보 */}
                    <div>
                      <p>{question.qnaQContent}</p>
                    </div>
                    <div id="images">
                      {question.images?.map((image) => (
                        <img
                          alt=""
                          key={image.qnaQImgCode}
                          // src={"http://localhost:8081/" + image.qnaQUrl}
                          src={"http://192.168.10.28:8081/QnaQ/" + image.qnaQUrl}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
              <hr />
              <QnaADetail />
            </>
          ) : (
            <>
              {user.userRole === "ROLE_ADMIN" ? (
                <>
                  <div id="qtopbar">
                    <h1>{question.qnaQTitle}</h1>
                    <hr />
                    <div id="quserbar">
                      {/* 프로필 + 작성자 이름, 아이디 */}
                      <div id="profile">
                        <img
                          alt=""
                          key={question.qnaQCode}
                          src={"http://192.168.10.28:8081/" + question.userImg}
                        />
                        <div>
                          <p>작성자 : {question.userNickname}</p>
                          <p>아이디 : {question.userId}</p>
                        </div>
                      </div>
                      <div>
                        <p>
                          작성일 :{" "}
                          {moment(question.qnaQDate).format("YY-MM-DD hh:mm")}
                        </p>
                        <div id="status">
                          <Button
                            variant="danger"
                            onClick={() => onDeleteQuestion(question.qnaQCode)}
                          >
                            삭제
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <p>{question.qnaQContent}</p>
                  </div>
                  <div id="images">
                    {question.images?.map((image) => (
                      <img
                        alt=""
                        key={image.qnaQImgCode}
                        src={"http://localhost:8081" + image.qnaQUrl}
                        // src={"http://192.168.10.28:8081/QnaQ/" + image.qnaQUrl}
                      />
                    ))}
                  </div>
                  <hr />
                  <QnaADetail />
                </>
              ) : (
                <>
                  <div>
                    <h1>public</h1>
                    <div id="qtopbar">
                      <h1>{question.qnaQTitle}</h1>
                      <hr />
                      <div id="quserbar">
                        {/* 프로필 + 작성자 이름, 아이디 */}
                        <div id="profile">
                          <img
                            alt=""
                            key={question.qnaQCode}
                            src={
                              "http://192.168.10.28:8081/" + question.userImg
                            }
                          />
                          <div>
                            <p>
                              <MyToggleBar name={question.userNickname} />
                            </p>
                            <p>아이디 : {question.userId}</p>
                          </div>
                        </div>
                        <div>
                          <p>
                            작성일 :
                            {moment(question.qnaQDate).format("YY-MM-DD hh:mm")}
                          </p>

                          {(question.qnaQStatus === "N" ||
                            question.qnaQStatus == null) &&
                          question.userId === user.userId ? (
                            <>
                              {/* 상태가 N: 수정, 삭제 버튼 */}
                              <div id="status">
                                <Button
                                  variant="warning"
                                  onClick={() => onUpdateQuestion(question)}
                                >
                                  수정
                                </Button>
                                <Button
                                  variant="danger"
                                  onClick={() =>
                                    onDeleteQuestion(question.qnaQCode)
                                  }
                                >
                                  삭제
                                </Button>
                              </div>
                            </>
                          ) : (
                            <></>
                          )}
                        </div>
                      </div>
                    </div>
                    <hr />
                    {/* 상세 정보 */}
                    <div>
                      <p>{question.qnaQContent}</p>
                    </div>
                    <div id="images">
                      {question.images?.map((image) => (
                        <img
                          alt=""
                          key={image.qnaQImgCode}
                          src={"http://localhost:8081" + image.qnaQUrl}
                          // src={"http://192.168.10.28:8081/QnaQ/" + image.qnaQUrl}
                        />
                      ))}
                    </div>
                  </div>
                  <hr />
                  <QnaADetail />
                </>
              )}
            </>
          )}
        </>
      </Div>
    </>
  );
};

export default QnaQDetail;

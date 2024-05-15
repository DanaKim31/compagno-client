import {
  getUserQuestion,
  updateUserQuestion,
  deleteUserQuestion,
  addLike,
  selectLike,
  deletelike,
} from "../../api/userQnaQuestion";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Form, Button } from "react-bootstrap";
import styled from "styled-components";
import { userSave } from "../../store/user";
import moment from "moment";
import UserQnaAnswer from "../../components/UserQnaAnswerBoard/UserQnaAnswer";
import { FaRegHeart, FaHeart } from "react-icons/fa";

const Div = styled.div`
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

const UserQuestionDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userQuestionBoardCode } = useParams();

  // user 세팅
  const user = useSelector((state) => {
    return state.user;
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== null) {
      dispatch(userSave(JSON.parse(localStorage.getItem("user"))));
      checklikeAPI();
    }
  }, []);

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

  const [checklike, setCheckLike] = useState(0);

  // 1. 상세보기
  const questionAPI = async () => {
    const response = await getUserQuestion(userQuestionBoardCode);
    setQuestion(response.data);
  };

  useEffect(() => {
    questionAPI();
  }, []);

  // 2. Q UPDATE ========================================================
  // 2-1. 상세 정보 보는 페이지에서 수정 버튼 클릭 (정보를 전달한 채 수정 폼이 나오도록!)
  const onUpdateQuestion = (data) => {
    navigate(`/compagno/userQna/detail/${data.userQuestionBoardCode}`);
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

    formData.append("userQuestionBoardCode", editQ.userQuestionBoardCode);
    formData.append("userQuestionBoardTitle", editQ.userQuestionBoardTitle);
    formData.append("userQuestionBoardContent", editQ.userQuestionBoardContent);

    if (editQ.images.length + images.length <= 3) {
      editQ.images?.forEach((image, index) => {
        formData.append(
          `images[${index}].userQuestionImgCode`,
          image.userQuestionImgCode
        );
        formData.append(
          `images[${index}].userQuestionImgUrl`,
          image.userQuestionImgUrl
        );
        formData.append(
          `images[${index}].userQuestionBoardCode`,
          editQ.userQuestionBoardCode
        );
      });

      // 새로 추가된 이미지
      images.forEach((image, index) => {
        formData.append(`files[${index}]`, image);
      });

      // setEditQ("images", showImages);
      await updateUserQuestion(formData);
      setImages([]);
      setEditQ(null);
      questionAPI();
    } else {
      alert("파일 업로드는 최대 3개까지만 가능합니다!");
    }
  };

  // 2-3. 이미지 선택 시 이미지 삭제
  const deleteImage = (code) => {
    setEditQ((prev) => {
      const images = prev.images.filter(
        (image) => image.userQuestionImgCode !== code
      );
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
    console.log(showImages.filter((_, index) => index !== id));
  };

  // 3. A UPDATE ===================================================
  // 3-1. 답변 수정 클릭 시 정보를 담은 폼 화면이 나옴!
  const onUpdateAnswer = async (answer) => {
    setEditA(answer);
  };

  // 4. DELETE ========================================================
  const onDeleteQuestion = (userQuestionBoardCode) => {
    deleteUserQuestion(userQuestionBoardCode);
    questionAPI();
    navigate("/compagno/userQna");
  };

  // 5.-1 좋아요 추가하기
  const [likedesc, setLikedesc] = useState({});
  const like = async () => {
    const formData = new FormData();

    formData.append("userId", user.userId);
    formData.append("userQuestionBoardCode", userQuestionBoardCode);
    setCheckLike(1);
    await addLike(formData);
    questionAPI();
  };

  // 5-2. 좋아요 확인하기
  const checklikeAPI = async () => {
    const response = await selectLike(userQuestionBoardCode);
    setCheckLike(response.data);
  };

  // 5-3. 좋아요 취소하기
  const unlike = async () => {
    setCheckLike(0);
    await deletelike(userQuestionBoardCode);
    questionAPI();
  };

  return (
    <Div>
      <>
        {question.userId === user.userId ? (
          <>
            <div key={question.userQuestionBoardCode} className="question">
              {editQ !== null &&
              editQ?.userQuestionBoardCode ===
                question.userQuestionBoardCode ? (
                <>
                  {/* 수정 페이지! */}
                  {/* 이미지들 */}
                  <div>
                    <div id="prevImages">
                      {/* 기존 이미지들 */}
                      {editQ.images?.map((image) => (
                        <img
                          alt=""
                          key={image.userQuestionImgCode}
                          src={
                            "http://localhost:8081" + image.userQuestionImgUrl
                          }
                          // src={"http://192.168.10.28:8081/userQuestion/" + image.userQuestionImgUrl}
                          onClick={() => deleteImage(image.userQuestionImgCode)}
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
                    value={editQ.userQuestionBoardTitle}
                    onChange={(e) =>
                      setEditQ((prev) => ({
                        ...prev,
                        userQuestionBoardTitle: e.target.value,
                      }))
                    }
                  />
                  <Form.Control
                    type="textarea"
                    placeholder="내용"
                    value={editQ.userQuestionBoardContent}
                    onChange={(e) => {
                      setEditQ((prev) => ({
                        ...prev,
                        userQuestionBoardContent: e.target.value,
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
                      navigate("/compagno/userQna");
                    }}
                  >
                    취소
                  </Button>
                </>
              ) : (
                <>
                  {/* 그냥 보는 페이지 */}
                  <div id="qtopbar">
                    <h1>{question.userQuestionBoardTitle}</h1>
                    <hr />
                    <div id="quserbar">
                      {/* 프로필 + 작성자 이름, 아이디 */}
                      <div id="profile">
                        <img
                          alt=""
                          key={question.userQuestionBoardCode}
                          src={"http://localhost:8081/" + question.userImg}
                          //   src={"http://192.168.10.28:8081/" + question.userImg}
                        />
                        <div>
                          <p>작성자 : {question.userNickname}</p>
                          <p>아이디 : {question.userId}</p>
                        </div>
                      </div>
                      <div>
                        <p>
                          작성일 :{" "}
                          {moment(question.userQuestionBoardDate).format(
                            "YY-MM-DD hh:mm"
                          )}
                        </p>
                        <p>조회수 : {question.viewcount}</p>
                        {question.userQuestionBoardStatus === "N" ||
                        question.userQuestionBoardStatus == null ? (
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
                                  onDeleteQuestion(
                                    question.userQuestionBoardCode
                                  )
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
                    <p>{question.animalCategoryCode}</p>
                    <p>{question.userQuestionBoardContent}</p>
                  </div>
                  <div id="images">
                    {question.images?.map((image) => (
                      <img
                        alt=""
                        key={image.userQuestionImgCode}
                        src={"http://localhost:8081" + image.userQuestionImgUrl}
                        // src={"http://192.168.10.28:8081/userQuestion/" + image.userQuestionImgUrl}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </>
        ) : (
          <>
            {user.userRole === "ROLE_ADMIN" ? (
              <>
                <h1>관리자!!! 수정 x, 삭제 버튼만</h1>
                <Button
                  variant="danger"
                  onClick={() =>
                    onDeleteQuestion(question.userQuestionBoardCode)
                  }
                >
                  삭제
                </Button>
                {/* 상세 정보 */}
                {question.images?.map((image) => (
                  <img
                    alt=""
                    key={image.userQuestionImgCode}
                    src={"http://localhost:8081" + image.userQuestionImgUrl}
                    // src={"http://192.168.10.28:8081/userQuestion/" + image.userQuestionImgUrl}
                  />
                ))}
                <div>
                  <p>{question.userQuestionBoardTitle}</p>
                  <p>
                    날짜 :{" "}
                    {moment(question.userQuestionBoardDate).format(
                      "YY-MM-DD hh:mm"
                    )}
                  </p>
                  <p>{question.userId}</p>
                  <p>{question.userNickname}</p>
                  <p>{question.userQuestionBoardContent}</p>
                </div>
              </>
            ) : (
              <>
                <div>
                  <h1>public</h1>
                  <div id="qtopbar">
                    <h1>{question.userQuestionBoardTitle}</h1>
                    <hr />
                    <div id="quserbar">
                      {/* 프로필 + 작성자 이름, 아이디 */}
                      <div id="profile">
                        <img
                          alt=""
                          key={question.userQuestionBoardCode}
                          src={"http://192.168.10.28.8081/" + question.userImg}
                        />
                        <div>
                          <span>작성자 : {question.userId}</span>
                          <span>아이디 : {question.userNickname}</span>
                        </div>
                      </div>
                      <p>
                        작성일 :
                        {moment(question.userQuestionBoardDate).format(
                          "YY-MM-DD hh:mm"
                        )}
                      </p>
                      <p>조회수 : {question.viewcount}</p>
                      {user.userId !== undefined ? (
                        <>
                          {checklike === 1 ? (
                            <>
                              <FaHeart onClick={() => unlike()} />
                            </>
                          ) : (
                            <>
                              <FaRegHeart onClick={() => like()} />
                            </>
                          )}
                        </>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <p>{question.userQuestionBoardContent}</p>
                </div>
                <div id="images">
                  {question.images?.map((image) => (
                    <img
                      alt=""
                      key={image.userQuestionImgCode}
                      src={"http://localhost:8081" + image.userQuestionImgUrl}
                      //   src={
                      //     "http://192.168.10.28:8081/userQuestion/" +
                      //     image.userQuestionImgUrl
                      //   }
                    />
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </>
      <hr />
      <UserQnaAnswer question={question} />
    </Div>
  );
};

export default UserQuestionDetail;

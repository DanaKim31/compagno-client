import { getQuestion, updateQuestion, delQuestion } from "../../api/Question";
import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Form, Button } from "react-bootstrap";
import styled from "styled-components";
import { userSave } from "../../store/user";
import QnaADetail from "./QnaADetail";
import moment from "moment";

const Div = styled.div`
  position: relative;
  top: 200px;
  #qtopbar {
    display: flex;
    justify-content: space-between;
  }
  #images {
    background-color: skyblue;
    height: 300px;
    width: 80%;
    margin: 0 auto;
    img {
      width: 30%;
    }
  }
`;

const QnaQDetail = () => {
  const [userId, setUserId] = useState("");
  const [userNickname, setUserNickname] = useState("");

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

    formData.append("qnaQCode", editQ.qnaQCode);
    formData.append("qnaQTitle", editQ.qnaQTitle);
    formData.append("qnaQContent", editQ.qnaQContent);

    // editQ.images?.forEach((image, index) => {
    //   formData.append(`images[${index}].qnaQImgCode`, image.qnaQImgCode);
    //   formData.append(`images[${index}].qnaQUrl`, image.qnaQUrl);
    //   formData.append(`images[${index}].qnaQCode`, editQ.qnaQCode);
    // });

    if (editQ.images.length + showImages.length > 3) {
      console.log(editQ.images);
      console.log(images);
      console.log(showImages);
      alert("파일 첨부는 최대 3개까지 가능합니다!");
      setImages([]);
    } else {
      editQ.images?.forEach((image, index) => {
        formData.append(`images[${index}].qnaQImgCode`, image.qnaQImgCode);
        formData.append(`images[${index}].qnaQUrl`, image.qnaQUrl);
        formData.append(`images[${index}].qnaQCode`, editQ.qnaQCode);
      });

      // 새로 추가된 이미지
      images.forEach((image, index) => {
        formData.append(`files[${index}]`, image);
      });
      await updateQuestion(formData);
      setImages([]);
      setEditQ(null);
      questionAPI();
    }

    // 새로 추가된 이미지
    // images.forEach((image, index) => {
    //   formData.append(`files[${index}]`, image);
    // });

    // setEditQ("images", showImages);
    // await updateQuestion(formData);
    // setImages([]);
    // setEditQ(null);
    // questionAPI();
  };

  // 2-3. 이미지 선택 시 이미지 삭제
  const deleteImage = (code) => {
    setEditQ((prev) => {
      const images = prev.images.filter((image) => image.qnaQImgCode !== code);
      return { ...prev, images: images };
    });
    console.log(images.length);
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
  };

  // 2-5. 수정 삭제 이미지 관리
  const handleDeleteImage = (id) => {
    setShowImages(showImages.filter((_, index) => index !== id));
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
                    {/* 수정 페이지! */}
                    {/* 이미지들 */}
                    <div>
                      {/* 기존 이미지들 */}
                      {editQ.images?.map((image) => (
                        <img
                          alt=""
                          key={image.qnaQImgCode}
                          src={"http://localhost:8081" + image.qnaQUrl}
                          onClick={() => deleteImage(image.qnaQImgCode)}
                        />
                      ))}
                      {/* 수정 이미지들 */}
                      {showImages.map((image, id) => (
                        <div key={id}>
                          <img src={image} alt={`${image}-${id}`} />
                          <button onClick={() => handleDeleteImage(id)}>
                            삭제
                          </button>
                        </div>
                      ))}
                    </div>
                    {/* 수정 폼 */}
                    <h1>수정중..</h1>
                    <Form.Control
                      type="text"
                      placeholder="제목"
                      value={user.userId}
                      // onChange={(e) => setUserId(e.target.value)}
                      readOnly
                    />
                    <Form.Control
                      type="text"
                      placeholder="비밀글 비밀번호"
                      value={user.userNickname}
                      // onChange={(e) => setUserNickname(e.target.value)}
                      readOnly
                    />
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
                      ref={fileRef}
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
                    {/* 그냥 보는 페이지 */}
                    <div id="qtopbar">
                      <h1>{question.qnaQTitle}</h1>
                      {/* 수정, 삭제 버튼 */}
                      <div>
                        <Button
                          variant="warning"
                          onClick={() => onUpdateQuestion(question)}
                        >
                          수정
                        </Button>
                        <Button
                          variant="danger"
                          onClick={() => onDeleteQuestion(question.qnaQCode)}
                        >
                          삭제
                        </Button>
                      </div>
                    </div>

                    {/* 상세 정보 */}

                    <div>
                      <p>
                        날짜 :{" "}
                        {moment(question.qnaQDate).format("YY-MM-DD hh:mm")}
                      </p>
                      <p>{question.userId}</p>
                      <p>{question.userNickname}</p>
                      <p>{question.qnaQContent}</p>
                    </div>
                    <div id="images">
                      {question.images?.map((image) => (
                        <img
                          alt=""
                          key={image.qnaQImgCode}
                          src={"http://localhost:8081" + image.qnaQUrl}
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
                    onClick={() => onDeleteQuestion(question.qnaQCode)}
                  >
                    삭제
                  </Button>
                  {/* 상세 정보 */}
                  {question.images?.map((image) => (
                    <img
                      alt=""
                      key={image.qnaQImgCode}
                      src={"http://localhost:8081" + image.qnaQUrl}
                    />
                  ))}
                  <div>
                    <p>{question.qnaQTitle}</p>
                    <p>{question.qnaQDate}</p>
                    <p>{question.userId}</p>
                    <p>{question.userNickname}</p>
                    <p>{question.qnaQContent}</p>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <h1>public</h1>
                    {question.images?.map((image) => (
                      <img
                        alt=""
                        key={image.qnaQImgCode}
                        src={"http://localhost:8081" + image.qnaQUrl}
                      />
                    ))}
                    <div>
                      <p>{question.qnaQTitle}</p>
                      <p>{question.qnaQDate}</p>
                      <p>{question.userId}</p>
                      <p>{question.userNickname}</p>
                      <p>{question.qnaQContent}</p>
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </>
        <QnaADetail />
      </Div>
    </>
  );
};

export default QnaQDetail;

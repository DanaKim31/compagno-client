import { Form, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getAnswer,
  addAnswer,
  updateAnswer,
  deleteAnswer,
} from "../../api/Answer";
import { useSelector, useDispatch } from "react-redux";
import { userSave } from "../../store/user";

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
    console.log(title);
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
      console.log(images);
      return { ...prev, images: images };
    });
  };

  // // 2-4. 수정 추가 이미지 미리보기 및 관리
  // const preview = (e) => {
  //   const files = Array.from(e.target.files);
  //   setImages((prev) => [...prev, ...files]);

  //   const imageLists = e.target.files;
  //   let imageUrlLists = [...showImages];

  //   for (let i = 0; i < imageLists.length; i++) {
  //     const currentImageUrl = URL.createObjectURL(imageLists[i]);
  //     imageUrlLists.push(currentImageUrl);
  //   }
  //   setShowImages(imageUrlLists);
  // };

  // 2-5. 수정 삭제 이미지 관리
  const handleDeleteImage = (id) => {
    setShowImages(showImages.filter((_, index) => index !== id));
  };

  // 답변 취소
  const cancelAnswer = () => {
    setEditA(null);
  };

  // 3. DELETE ========================================================
  const onDeleteAnswer = async (code) => {
    await deleteAnswer(code);
    console.log(code);
    answerAPI();
    setEditA(null);
    answerAPI();
  };

  return (
    <>
      {user.userRole === "ROLE_ADMIN" ? (
        // 관리자의 경우!
        <>
          {answer === "" ? (
            // 답변이 없는 경우
            <div className="Answer">
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
              <Button variant="dark" onClick={answerSubmit}>
                답변 등록
              </Button>
              <Button onClick={cancelAnswer}>취소</Button>
            </div>
          ) : (
            <>
              {editA !== null && editA?.qnaACode === answer.qnaACode ? (
                <>
                  {/* 수정 페이지!!! */}
                  <h1>답변 수정 폼</h1>
                  {/* 기존 이미지 */}
                  <div>
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
                  <Form.Control
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={imageChange}
                  />
                  <Button variant="dark" onClick={answerUpdate}>
                    답변 등록
                  </Button>
                  <Button onClick={cancelAnswer}>취소</Button>
                </>
              ) : (
                <>
                  <h1>ANSWER!!!</h1>

                  <button onClick={() => onUpdateAnswer(answer)}>수정</button>
                  <button onClick={() => onDeleteAnswer(answer.qnaACode)}>
                    삭제
                  </button>
                  <div>
                    <h1>사진</h1>
                    {answer.images?.map((image) => (
                      <img
                        alt=""
                        key={image.qnaAImgCode}
                        src={"http://localhost:8081" + image.qnaAUrl}
                      />
                    ))}
                  </div>
                  <div>
                    <p>{answer.qnaATitle}</p>
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
              <h1>답변이 아직 작성되지 않았습니다.</h1>
            </>
          ) : (
            // 답변이 있을 때
            <>
              <div>
                <h1>ANSWER!!!!!</h1>
                <p>{answer.qnaATitle}</p>
                <p>{answer.qnaAContent}</p>
              </div>
            </>
          )}
        </>
      )}
      <button onClick={() => navigate("/compagno/question")}>목록</button>
    </>
  );
};

export default QnaADetail;

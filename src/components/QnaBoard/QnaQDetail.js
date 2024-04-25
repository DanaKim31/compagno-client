import { getQuestion, updateQuestion, delQuestion } from "../../api/Question";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import styled from "styled-components";

const Div = styled.div`
  position: relative;
  top: 200px;
`;

const QnaQDetail = () => {
  const [question, setQuestion] = useState({});
  const [images, setImages] = useState([]);
  const [showImages, setShowImages] = useState([]);
  const [editQ, setEditQ] = useState(null);

  const navigate = useNavigate();
  const { qnaQCode } = useParams();

  useEffect(() => {
    // 1. Question 세팅 (불러오기)
    questionAPI();
  });

  // 1. READ =========================================================
  // 1. Question 세팅 (불러오기)
  const questionAPI = async () => {
    const response = await getQuestion(qnaQCode);
    setQuestion(response.data);
  };

  // 2. UPDATE ========================================================
  // 2-1. 상세 정보 보는 페이지에서 수정 버튼 클릭 (정보를 전달한 채 수정 폼이 나오도록!)
  const onUpdateQuestion = (data) => {
    navigate(`/compagno/question/detail/${data.qnaQCode}`);
    setEditQ(data);
  };

  // 2-2. 수정 폼 제출
  const questionUpdate = async () => {
    const formData = new FormData();

    formData.append("qnaQCode", editQ.qnaQCode);
    formData.append("qnaQTitle", editQ.qnaQTitle);
    formData.append("qnaQContent", editQ.qnaQContent);

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
  };

  // 2-3. 이미지 선택 시 이미지 삭제
  const deleteImage = (code) => {
    setEditQ((prev) => {
      const images = prev.images.filter((image) => image.qnaQImgCode !== code);
      console.log(images);
      return { ...prev, images: images };
    });
  };

  // 2-4. 수정 추가 이미지 관리
  const handleAddImages = () => {};

  // 2-5. 수정 삭제 이미지 관리
  const handleDeleteImage = () => {};

  // 3. DELETE ========================================================
  const onDeleteQuestion = async (qnaQCode) => {
    await delQuestion(qnaQCode);
    navigate("/compagno/question");
  };

  return (
    <>
      <Div>
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
      </Div>
      <Div>
        <h1>작성자와 접속자 아이디가 같을 때 (수정 가능!)</h1>
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
                    <button onClick={() => handleDeleteImage(id)}>삭제</button>
                  </div>
                ))}
              </div>
              {/* 수정 폼 */}
              <h1>수정중..</h1>
              <Form.Control
                type="text"
                placeholder="제목"
                value={editQ.qnaQTitle}
                onChange={(e) =>
                  setEditQ((prev) => ({ ...prev, qnaQTitle: e.target.value }))
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
                onChange={handleAddImages}
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
              {/* 수정, 삭제 버튼 */}
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
          )}
        </div>
      </Div>
    </>
  );
};

export default QnaQDetail;

import { useParams, useNavigate } from "react-router-dom";
import { getQuestion, updateQuestion } from "../../api/Question";
import {
  getAnswer,
  addAnswer,
  updateAnswer,
  deleteAnswer,
} from "../../api/Answer";
import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
// import { useSelector } from "react-redux";
import styled from "styled-components";

const Div = styled.div`
  position: relative;
  top: 200px;
`;

const QnaDetail = () => {
  // 해당 페이지 qnaQCode
  const { qnaQCode } = useParams();

  const [question, setQuestion] = useState({});
  const [user, setUser] = useState({});
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [answer, setAnswer] = useState([]);
  const [editQ, setEditQ] = useState(null);
  const [editA, setEditA] = useState(null);

  const navigate = useNavigate();

  // user 세팅
  // const info = useSelector((state) => {
  // return state.user;
  // });

  // 파일을 파일 길이만큼 돌려서 FileReader()를 통해 onload로 반복문 돌려서 reader.result;
  // [...images]
  // reader.readAsDataURL(file)
  // const [preview, setPreview] = useState([]);
  const [showImages, setShowImages] = useState([]);

  const imageChange = (e) => {
    const images = Array.from(e.target.files);
    setImages(images);
  };

  // const prevSet = (e) => {
  //   const files = Array.from(e.target.files);
  //   // setImages(files);

  //   let file;
  //   for (let i = 0; i < files.length; i++) {
  //     file = files[i];
  //     let reader = new FileReader();

  //     reader.onload = () => {
  //       images[i] = reader.result;
  //       setPreview([...images]);
  //     };
  //     reader.readAsDataURL(file);
  //   }

  const handleAddImages = (e) => {
    imageChange(e);

    const imageLists = e.target.files;
    let imageUrlLists = [...showImages];

    for (let i = 0; i < imageLists.length; i++) {
      const currentImageUrl = URL.createObjectURL(imageLists[i]);
      imageUrlLists.push(currentImageUrl);
    }
    setShowImages(imageUrlLists);
  };

  const handleDeleteImage = (id) => {
    setShowImages(showImages.filter((_, index) => index !== id));
  };

  // setEditQ((prev) => {
  //   return { ...prev, images: files };
  // });
  // console.log(Array.from(editQ.images));
  // console.log(files);
  // const editQImages = Array.from(editQ.images);

  // files.push(editQImages);
  // console.log(editQImages);
  // console.log(files);

  // Q 세팅
  const questionAPI = async () => {
    const response = await getQuestion(qnaQCode);
    let question = response.data;
    setQuestion(question);
    console.log(question);
  };

  // 수정할 질문 세팅
  const questionUpdate = async () => {
    const formData = new FormData();

    formData.append("qnaQCode", editQ.qnaQCode);
    formData.append("qnaQTitle", editQ.qnaQTitle);
    formData.append("qnaQContent", editQ.qnaQContent);

    editQ.images?.forEach((image, index) => {
      formData.append(`images[${index}].qnaQImgCode`, image.qnaQImgCode);
      formData.append(`images[${index}].qnaQUrl`, image.qnaQUrl);
      formData.append(`images[${index}].qnaQCode`, editQ.qnaQCode);
      console.log(image);
      console.log(showImages);
    });

    // 새로 추가된 이미지
    images.forEach((image, index) => {
      formData.append(`files[${index}]`, image);
    });
    // setEditQ("images", showImages);

    await updateQuestion(formData);
    setImages([]);
    setEditQ(null);
    console.log(showImages);

    questionAPI();
  };

  // 질문 수정 폼으로 질문 정보 전달
  const onUpdateQuestion = async (data) => {
    await setEditQ(data);
  };

  // A 세팅
  const answerAPI = async () => {
    const response = await getAnswer(qnaQCode);
    setAnswer(response.data);
  };

  // 첫 로딩 시 세팅
  useEffect(() => {
    questionAPI();
    console.log(editQ?.qnaQCode === question.qnaQCode);
    answerAPI();

    // if (Object.keys(info).legnth === 0) {
    // setUser(JSON.parse(localStorage.getItem("user")));
    // } else {
    // setUser(info);
    // }
  }, []);

  // 답변 등록
  const answerSubmit = async () => {
    const formData = new FormData();

    formData.append("qnaQCode", qnaQCode);
    formData.append("qnaATitle", title);
    formData.append("qnaAContent", content);
    images.forEach((image, index) => {
      formData.append(`files[${index}]`, image);
    });
    await addAnswer(formData);
    console.log("전송");
  };

  // 답변 삭제
  const onDeleteAnswer = async (code) => {
    await deleteAnswer(code);
    answerAPI();
  };

  // 답변 수정
  const onUpdateAnswer = async (answer) => {
    setEditA(answer);
    console.log("수정 버튼 눌렀어염");
  };

  useEffect(() => {
    console.log(images);
  }, [images]);

  const deleteImage = (code) => {
    setEditQ((prev) => {
      const images = prev.images.filter((image) => image.qnaQImgCode !== code);
      console.log(images);
      return { ...prev, images: images };
    });
  };

  // 답변 취소
  const cancelAnswer = () => {
    setEditA(null);
  };

  // 답변 수정
  const answerUpdate = async () => {
    const formData = new FormData();
    formData.append("id", user.id);
    formData.append("qnaQCode", editA.qnaQCode);
    formData.append("qnaATitle", editA.title);
    formData.append("qnaAContent", editA.content);
    editA.images.forEach((image, index) => {
      formData.append(`files[${index}]`, image.qnaAUrl);
    });

    await updateAnswer(formData);
    setImages([]);
    setEditA(null);
    answerAPI();
  };

  return (
    <Div>
      <h1>Question</h1>
      <div key={question.qnaQCode} className="question">
        {editQ !== null && editQ?.qnaQCode === question.qnaQCode ? (
          <>
            <div>
              {editQ.images?.map((image) => (
                <img
                  alt=""
                  key={image.qnaQImgCode}
                  src={"http://localhost:8081" + image.qnaQUrl}
                  onClick={() => deleteImage(image.qnaQImgCode)}
                />
              ))}
              {/* {preview.map((imgSrc, i) => (
                <div key={i}>
                  <button type="button">업로드 이미지 제거</button>
                  <img src={imgSrc} />
                </div>
              ))} */}
              {showImages.map((image, id) => (
                <div key={id}>
                  <img src={image} alt={`${image}-${id}`} />
                  <button onClick={() => handleDeleteImage(id)}>
                    이미지 삭제하기
                  </button>
                </div>
              ))}
            </div>
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
                setEditQ((prev) => ({ ...prev, qnaQContent: e.target.value }));
              }}
            />
            <Form.Control
              type="file"
              multiple
              accept="image/*"
              onChange={handleAddImages}
            />
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
            <Button onClick={() => onUpdateQuestion(question)}>수정</Button>
            <Button>삭제</Button>

            {/* <div>
              {preview.map((preview, i) => (
                <div key={i}>
                  <img
                    // src={"http://192.168.10.37:8081/upload/QnaQ" + question.images}
                    src={preview}
                    alt={preview}
                  />
                </div>
              ))}
            </div> */}

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

      {/* {answer.map((answer) => ( */}
      {/* <div key={answer.qnaACode} className="answer"></div> */}
      {/* ))} */}
      <hr />
      {/* 관리자의 경우만 볼 수 있는 Answer 작성란 */}
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
            onChange={handleAddImages}
          />
          <Button variant="dark" onClick={answerSubmit}>
            답변 등록
          </Button>
          <Button>취소</Button>
        </div>
      ) : (
        <div>
          <div>
            <h1>Answer</h1>
            {/* 관리자 && (작성자 id = 로그인 유저 id) */}
            <button>수정</button>
            <button>삭제</button>
          </div>
          <p>{answer.qnaATitle}</p>
          <p>{answer.qnaAContent}</p>
        </div>
      )}

      <button onClick={() => navigate("/compagno/question")}>목록</button>
    </Div>
  );
};

export default QnaDetail;

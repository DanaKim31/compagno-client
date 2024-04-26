import { useEffect, useState } from "react";
import { addQuestion } from "../../api/Question";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { userSave } from "../../store/user";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

const Div = styled.div`
  position: relative;
  top: 200px;
`;

const QnaRegister = () => {
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

  const [questionInfo, setQuestionInfo] = useState({
    qnaQTitle: "",
    qnaQContent: "",
    secret: "",
    images: [],
    user: {
      userId: user.userId,
      userNickname: user.userNickname,
    },
  });

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [secret, setSecret] = useState("");
  const [images, setImages] = useState([]);
  const [user, setUser] = useState({
    userId: user.userId,
    userNickname: user.userNickname,
  });

  const dispatch = useDispatch();

  const imageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  const cancel = () => {
    navigate("/compagno/question");
  };

  const add = async () => {
    const formData = new FormData();

    console.log(user.userId);
    console.log(user.userNickname);

    formData.append("userId", user.userId);
    formData.append("userNickname", user.userNickname);

    formData.append("qnaQTitle", title);

    formData.append("qnaQContent", content);

    images.forEach((image, index) => {
      formData.append(`images[${index}]`, image);
    });

    formData.append("secret", secret);

    console.log(formData.get("qnaQTitle"));
    console.log(formData.get("qnaQContent"));

    await addQuestion(formData);
    navigate("/compagno/question");
  };

  return (
    <Div>
      <h1>Question?</h1>

      <div>
        <Form.Control
          type="text"
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Form.Control
          type="text"
          placeholder="비밀글 비밀번호"
          value={secret}
          onChange={(e) => setSecret(e.target.value)}
        />
        <Form.Control
          type="textarea"
          placeholder="내용"
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
        />
        <Form.Control
          type="file"
          multiple
          accept="image/*"
          onChange={imageChange}
        />
        <Button variant="warning" onClick={add}>
          등록
        </Button>
        <Button onClick={cancel}>취소</Button>
      </div>
    </Div>
  );
};

export default QnaRegister;

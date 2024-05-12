import { useNavigate } from "react-router-dom";
import { addUserQuestion } from "../../api/userQnaQuestion";
import { useSelector, useDispatch } from "react-redux";
import { userSave } from "../../store/user";
import { Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import styled from "styled-components";

const Div = styled.div`
  position: relative;
  top: 200px;
`;

const UserQuestionRegister = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 1. user 세팅
  const user = useSelector((state) => {
    return state.user;
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== null) {
      dispatch(userSave(JSON.parse(localStorage.getItem("user"))));
    }
  }, []);

  // 2. 정보 담을 곳 세팅
  // user 에서 가져온 유저 정보 저장
  const [userId, setUserId] = useState("");
  const [userNickname, setUserNickname] = useState("");
  const [userImg, setUserImg] = useState("");

  // form을 통해 사용자에게 입력받을 곳
  const [animalCatecode, setAnimalCateCode] = useState(0);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);

  // 파일 변환 시 담긴 파일 재배치
  const imageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  const handleselectaniCate = (e) => {
    setAnimalCateCode(e.target.value);
  };

  // 등록 취소 시 리스트로 되돌아오기
  const cancel = () => {
    navigate("/compagno/userQna");
  };

  // 등록할 폼 정보 폼데이터 형식에 담아서 추가하는 api 호출
  const add = async () => {
    const formData = new FormData();

    formData.append("userId", user.userId);
    setUserId(user.userId);

    formData.append("userNickname", user.userNickname);
    setUserNickname(user.userNickname);

    formData.append("userImg", user.userImg);
    setUserImg(user.userImg);

    formData.append("animalCategoryCode", animalCatecode);

    formData.append("userQuestionBoardTitle", title);

    formData.append("userQuestionBoardContent", content);

    if (images.length > 3) {
      alert("파일 업로드는 최대 3개까지 가능합니다!");
    } else {
      images.forEach((image, index) => {
        formData.append(`files[${index}]`, image);
      });
      await addUserQuestion(formData);
      navigate("/compagno/userQna");
    }
  };

  return (
    <Div>
      <h1>Question!</h1>

      <div>
        <select onChange={handleselectaniCate} value={animalCatecode}>
          <option value={1}>개</option>
          <option value={2}>고양이</option>
          <option value={3}>기타</option>
        </select>
        <Form.Control
          type="text"
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
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

export default UserQuestionRegister;

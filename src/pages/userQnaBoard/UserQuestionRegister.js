import { useNavigate } from "react-router-dom";
import { addUserQuestion } from "../../api/userQnaQuestion";
import { useSelector, useDispatch } from "react-redux";
import { userSave } from "../../store/user";
import { Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
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

  width: 70%;
  margin: 0 auto;
  position: relative;
  top: 150px;
  h1 {
    font-family: "TAEBAEKmilkyway";
    font-weight: bold;
    padding: 10px;
    text-align: center;
    border-radius: 15px;
    margin-bottom: 50px;
  }

  #register {
    border: 1px solid gray;
    border-radius: 15px;
    padding: 20px;
  }

  #select {
    font-size: 1.2rem;
    height: 50px;
    width: 300px;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 10px;

    select {
      height: 35px;
      font-size: 1.1rem;
      border-radius: 5px;
      font-family: "TAEBAEKmilkyway";
      font-weight: bold;
      option{
        font-family: "TAEBAEKmilkyway";
        font-weight: bold;
      }
    }
    span {
      font-family: "TAEBAEKmilkyway";
      font-weight: bold;
      margin-top: 5px;
      margin-left: 15px;
      height: 35px;
      width: 50px;
    }
  }

  #input {
    display: flex;
    flex-direction: column;
    height: 400px;
    font-family: "TAEBAEKmilkyway";
      font-weight: bold;
    
    input{
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
    justify-content: center;
    button {
      margin: 10px;
      font-family: "TAEBAEKmilkyway";
      font-weight: bold;
    }
  }
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

    if(title === "" || title === undefined){
      alert("제목을 입력해주세요!")
    } else if (content === "" || title === undefined){
      alert("내용을 입력해주세요!");
    } else {
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
    }

  };

  return (
    <Div>
      <h1>질문 등록하기</h1>

      <div id="register">
        <div id="select">
          <span>동물</span>
          <select onChange={handleselectaniCate}>
            <option value={0}>전체</option>
            <option value={1}>개</option>
            <option value={2}>고양이</option>
            <option value={3}>기타</option>
          </select>
        </div>

        <div id="input">
          <div>
            <p>제목</p>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <p>내용</p>
            <Form.Control
              as="textarea"
              rows={3}
              value={content}
              style={{fontWeight: "bold"}}
              onChange={(e) => {
                setContent(e.target.value);
              }}
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
          <Button variant="dark" onClick={add}>
            등록
          </Button>
          <Button variant="secondary" onClick={cancel}>
            취소
          </Button>
        </div>
      </div>
    </Div>
  );
};

export default UserQuestionRegister;

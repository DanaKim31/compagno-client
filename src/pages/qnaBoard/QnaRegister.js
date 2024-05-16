import { useEffect, useState } from "react";
import { addQuestion } from "../../api/Question";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { userSave } from "../../store/user";
import { useSelector, useDispatch } from "react-redux";
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

    select {
      height: 35px;
      font-size: 1.1rem;
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

  #secret{
  }
  #input {
    display: flex;
    flex-direction: column;
    height: 500px;
    font-family: "TAEBAEKmilkyway";
    font-weight: bold;
    
      #title{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        p{
          margin-left: 0px;
        }
        div{
          flex-direction: column;
        }
        #secret{
          width: 30%;
          margin-right: 50px;
        }
      }
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

const QnaRegister = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const [userId, setUserId] = useState("");
  const [userNickname, setUserNickname] = useState("");
  const [userImg, setUserImg] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [secret, setSecret] = useState("");
  const [images, setImages] = useState([]);

  const imageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  const cancel = () => {
    navigate("/compagno/question");
  };

  const add = async () => {
    const formData = new FormData();

    formData.append("userId", user.userId);
    setUserId(user.userId);

    formData.append("userNickname", user.userNickname);
    setUserNickname(user.userNickname);

    formData.append("userImg", user.userImg);
    setUserImg(user.userImg);

    formData.append("qnaQTitle", title);

    formData.append("qnaQContent", content);

    formData.append("secret", secret);

    if (images.length > 3) {
      alert("파일 업로드는 최대 3개까지 가능합니다!");
    } else {
      images.forEach((image, index) => {
        formData.append(`files[${index}]`, image);
      });
      await addQuestion(formData);
      navigate("/compagno/question");
    }
  };

  const [pwd, setPwd] = useState(0);

  const setPassword = async (e) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      setPwd(1);
    } else {
      setPwd(0);
      setSecret(null);
    }
  };



  return (
    <Div>
      <h1>질문 등록하기</h1>

    <div id="register">

      <div id="input">
        <div id="title">
          <div>
            <p>제목</p>
            <Form.Control
              type="text"
              value={title}
              style={{width:"700px"}}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div  id="secret" class="form-check form-switch">
                <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" onChange={(e) => setPassword(e)}/>
                <label class="form-check-label" for="flexSwitchCheckDefault">비밀글 설정</label>
            {pwd === 1 ? (<>
            
              <Form.Control
              type="password"
              placeholder="비밀글 비밀번호"
              value={secret}
              style={{marginTop:"20px"}}
              onChange={(e) => setSecret(e.target.value)}
              /></>) : (<></>)}
          </div>

        </div>
          


        <div>
          <p>내용</p>
          <Form.Control
            as="textarea"
            rows={3}
            value={content}
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
        <Button variant="secondary" onClick={cancel}>취소</Button>
        </div>
      </div>
    </Div>
  );
};

export default QnaRegister;

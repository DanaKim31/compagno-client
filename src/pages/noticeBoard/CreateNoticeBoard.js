import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import { Form, Button } from "react-bootstrap";
import { userSave } from "../../store/user";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { addNoticeBoard } from "../../api/noticeBoard";
import { FaRegCircleXmark } from "react-icons/fa6";

const Main = styled.main`
  width: 100%;
  min-width: 1900px;
  font-family: "TAEBAEKmilkyway";
  font-weight: bold;

  * {
    font-weight: bold;
  }

  @font-face {
    font-family: "TAEBAEKmilkyway";
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2310@1.0/TAEBAEKmilkyway.woff2")
      format("woff2");

    font-weight: normal;
    font-style: normal;
  }
  padding: 0px 300px;
  padding-top: 120px;
  padding-bottom: 100px;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 1900px;

  textarea {
    resize: none;
  }

  .linkLogo {
    font-size: 2.5rem;
    font-weight: bold;
    cursor: pointer;
    margin-bottom: 30px;
    color: black;
    text-decoration: none;
  }
  .linkLogo:hover {
    color: #94b29b;
  }
  .imagesDiv {
    display: flex;
  }

  .imageSpan {
    position: relative;
    width: 240px;
    height: 240px;
    margin: 0px 10px;
    margin-bottom: 10px;
    border-radius: 10px;
    border: 1px solid black;
    img {
      width: 100%;
      height: 100%;
      border-radius: 10px;
      object-fit: fill;
    }
    svg {
      position: absolute;
      top: -8px;
      right: -8px;
      font-size: 1.5rem;
      color: #212121;
      cursor: pointer;
      background-color: white;
    }
  }

  .writeCancle,
  .boardWrite {
    float: right;
    width: 100px;
    height: 40px;
  }

  .writeCancle {
    margin-right: 15px;
  }
`;

const CreateNoticeBoard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => {
    return state.user;
  });

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState([]);

  const [imgSrc, setImgSrc] = useState([]);

  const imageCreate = (e) => {
    const images = Array.from(e.target.files);
    if (images.length > 5) {
      alert("이미지는 최대 5장 까지 등록 가능합니다.");
      e.target.value = "";
      setFiles([]);
      setImgSrc([]);
    } else {
      setFiles(images);

      let file;
      if (files.length > images.length) {
        files.splice(images.length);
      }
      for (let i = 0; i < images.length; i++) {
        file = images[i];
        const reader = new FileReader();
        reader.onloadend = () => {
          files[i] = reader.result;
          setImgSrc([...files]);
        };
        reader.readAsDataURL(file);
      }
      if (images.length === 0) {
        setImgSrc([]);
        setFiles([]);
      }
    }
  };

  const createBoard = async () => {
    if (title === "") {
      alert("제목을 입력해주세요.");
      return false;
    } else if (content == "") {
      alert("내용을 입력해주세요.");
      return false;
    }
    if (window.confirm("게시물을 등록하시겠습니까?")) {
      const formData = new FormData();
      formData.append("noticeBoardTitle", title);
      formData.append("noticeBoardContent", content);
      formData.append("userId", user.userId);

      files.forEach((file, index) => {
        formData.append(`files[${index}]`, file);
      });

      await addNoticeBoard(formData);

      navigate("/compagno/notice-board");
      window.alert("게시물이 등록되었습니다. ");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== null) {
      dispatch(userSave(JSON.parse(localStorage.getItem("user"))));
    }
  }, []);

  const selectImage = useRef("");

  const deleteImgSrc = (i) => {
    let newImgSrc = [...imgSrc];
    newImgSrc.splice(i, 1);
    setImgSrc(newImgSrc);
  };

  const imageChange = (i) => {
    const dataTransfer = new DataTransfer();
    files
      .filter((file, index) => file != files[i])
      .forEach((file) => {
        dataTransfer.items.add(file);
      });

    selectImage.current.files = dataTransfer.files;
    setFiles(Array.from(selectImage.current.files));
  };

  return (
    <Main>
      <Link to={"/compagno/notice-board"} className="linkLogo">
        공지사항
      </Link>
      <p style={{ margin: "10px", fontSize: "1.1rem" }}>제목</p>
      <Form.Control
        className="titleInput"
        type="text"
        placeholder="제목"
        size="lg"
        onChange={(e) => {
          if (e.target.value.length > 30) {
            e.target.value = e.target.value.slice(0, 30);
          }
          setTitle(e.target.value.trim());
        }}
      />
      <p style={{ margin: "10px", fontSize: "1.1rem" }}>내용</p>
      <Form.Control
        as="textarea"
        placeholder="내용 입력"
        rows={20}
        onChange={(e) => {
          if (e.target.value.length > 1900) {
            e.target.value = e.target.value.slice(0, 1900);
          }
          setContent(e.target.value.trim());
        }}
      />
      <div className="noticeImage">
        <p style={{ margin: "10px", fontSize: "1.1rem" }}>이미지 업로드</p>
        <Form.Group controlId="formFileMultiple" className="mb-3">
          <Form.Control
            type="file"
            accept="image/*"
            multiple
            onChange={imageCreate}
            ref={selectImage}
          />
        </Form.Group>
        <div className="imagesDiv">
          {imgSrc.map((img, i) => (
            <span className="imageSpan" key={i}>
              <img src={img} />
              <FaRegCircleXmark
                onClick={() => {
                  deleteImgSrc(i);
                  imageChange(i);
                }}
              />
            </span>
          ))}
        </div>
      </div>
      <div>
        <Button
          className="boardWrite"
          onClick={() => {
            createBoard();
          }}
        >
          글 작성
        </Button>
        <Button
          className="writeCancle"
          onClick={() => navigate("/compagno/notice-board")}
          variant="secondary"
        >
          취소
        </Button>
      </div>
    </Main>
  );
};
export default CreateNoticeBoard;

import { useEffect, useState } from "react";
import { createNote } from "../../api/note";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { userSave } from "../../store/user";
import moment from "moment";
import "moment/locale/ko";
import { useNavigate } from "react-router-dom";
import { FaRegPaperPlane } from "react-icons/fa6";
import MyPageMyNote from "../../pages/user/MyPageMyNote";

const Div = styled.div`
  @font-face {
    font-family: "TAEBAEKmilkyway";
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2310@1.0/TAEBAEKmilkyway.woff2")
      format("woff2");
    font-weight: normal;
    font-style: normal;
  }
  font-family: "TAEBAEKmilkyway";
  font-weight: bold;
  width: 100%;
  height: 100%;

  .notePerson {
    display: flex;
    justify-content: space-around;
    padding-top: 20px;
    border-bottom: 1px dashed green;
    padding-bottom: 30px;
    input {
      margin-left: 20px;
    }
  }
  #okCreate {
    border: 1px solid #94b29b;
    background-color: white;
  }
`;

const NoteCreate = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => {
    return state.user;
  });
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== null) {
      dispatch(userSave(JSON.parse(localStorage.getItem("user"))));
    }
  }, []);

  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [sender, setSender] = useState("");
  const [receiver, setReceiver] = useState("");
  const [files, setFiles] = useState([]);
  const [noteRegiDate, setNoteRegiDate] = useState("");

  const noteRegiDateAPI = () => {
    const nowTime = moment().format("YYYY-MM-DD hh:mm:ss");
    setNoteRegiDate(nowTime);
  };
  useEffect(() => {
    noteRegiDateAPI();
  }, []);

  const filesCreate = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 5) {
      alert("최대 파일 갯수는 5개입니다. 다시 선택하여 주세요.");
    } else {
      setFiles(files);
    }
  };

  // 전송 버튼 클릭 시
  const okCreate = async () => {
    const formData = new FormData();
    formData.append("noteTitle", noteTitle);
    formData.append("noteContent", noteContent);
    formData.append("sender", user.userNickname);
    formData.append("receiver", props.nickName);
    formData.append("noteRegiDate", noteRegiDate);
    files.forEach((file, index) => {
      formData.append(`files[${index}]`, file);
    });

    if (noteTitle == "") {
      alert("제목은 필수입니다.");
    } else {
      createNote(formData);
      // navigate("/compagno/mypage/mynote");
      window.location.reload();
    }
  };

  // 전송 취소
  const delCreate = () => {
    window.location.reload();
  };

  return (
    <Div className="noteCreate">
      <FaRegPaperPlane
        style={{ fontSize: "2.5rem", marginTop: "30px", marginLeft: "25px" }}
      />
      <div className="notePerson" style={{ margin: "5px 20px" }}>
        <div id="sender">
          <span>보내는 사람</span>
          <input
            type="text"
            value={user.userNickname}
            readOnly
            style={{ fontWeight: "bold" }}
          />
        </div>
        <div id="receiver">
          <span>받는 사람</span>
          <input
            type="text"
            value={props.nickName}
            readOnly
            style={{ fontWeight: "bold" }}
          />
        </div>
      </div>
      <div
        className="noteContents"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "60%",
          marginTop: "30px",
        }}
      >
        <div
          id="noteTitle"
          style={{
            display: "flex",
            flexDirection: "column",
            width: "70%",
            marginBottom: "30px",
          }}
        >
          <span style={{ marginBottom: "15px", fontSize: "1.3rem" }}>제목</span>
          <textarea
            type="text"
            placeholder="제목을 입력해주세요"
            value={noteTitle}
            onChange={(e) => setNoteTitle(e.target.value)}
            style={{ resize: "none", height: "70px", fontWeight: "bold" }}
          />
        </div>
        <div
          id="noteContent"
          style={{ display: "flex", flexDirection: "column", width: "70%" }}
        >
          <span style={{ marginBottom: "15px", fontSize: "1.3rem" }}>내용</span>
          <textarea
            type="text"
            placeholder="내용을 입력해주세요"
            value={noteContent}
            onChange={(e) => setNoteContent(e.target.value)}
            style={{ resize: "none", height: "150px", fontWeight: "bold" }}
          />
        </div>
        <div id="files" style={{ marginTop: "30px", width: "70%" }}>
          <input
            type="file"
            multiple
            onChange={filesCreate}
            style={{ fontWeight: "bold" }}
          />
        </div>
      </div>
      <div className="btn" style={{ width: "100%", marginTop: "13px" }}>
        <button
          id="okCreate"
          style={{
            marginRight: "30px",
            fontWeight: "bold",
            border: "none",
            borderRadius: "10px",
            backgroundColor: "#94b29b",
            padding: "4px 10px",
          }}
          onClick={okCreate}
        >
          전송 확인
        </button>
        <button
          id="delCreate"
          onClick={delCreate}
          style={{
            fontWeight: "bold",
            border: "none",
            borderRadius: "10px",
            backgroundColor: "black",
            color: "white",
            padding: "4px 10px",
          }}
        >
          전송 취소
        </button>
      </div>
    </Div>
  );
};
export default NoteCreate;

import { viewOneNote, deleteReceiver, deleteSender } from "../../api/note";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userSave } from "../../store/user";
import { MdOutlineFileDownload } from "react-icons/md";
import styled from "styled-components";
import moment from "moment";
import "moment/locale/ko";
import NoteCreate from "./NoteCreate";
import { useNavigate } from "react-router-dom";

const ModalNoteWrite = styled.div`
  position: fixed;
  left: 50%;
  width: 40%;
  top: 50%;
  background-color: white;
  border: 2px solid black;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.3) 0 0 0 9999px;
  z-index: 100;
  transform: translate(-50%, -50%);
`;

const Div = styled.div`
  a {
    text-decoration: none;
    color: black;
    &:hover {
      color: green;
    }
  }
`;
const NoteViewDetail = (props) => {
  // 유저정보 가지고온다
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

  //   const { code } = useParams();
  const [note, setNote] = useState({});
  const noteAPI = async () => {
    const response = await viewOneNote(props.name);
    setNote(response.data);
  };
  useEffect(() => {
    noteAPI();
  }, []);

  const navigate = useNavigate();
  // 삭제하기
  const delNote = async (data) => {
    if (note.sender == user.userNickname) {
      await deleteSender(data);
    }
    if (note.receiver == user.userNickname) {
      await deleteReceiver(data);
    }
    window.location.reload();
  };

  // 답장
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const sendNote = () => {
    setModalIsOpen(!modalIsOpen);
  };
  return (
    <div style={{ height: "75%", marginTop: "20px" }}>
      {/* {note.noteCode} */}
      <div
        className="noteTop"
        style={{
          textAlign: "start",
          marginLeft: "20px",
          borderBottom: "1px solid gray",
          paddingBottom: "10px",
        }}
      >
        <div
          className="detailBtn"
          style={{
            marginBottom: "15px",
            width: "70%",
            position: "relative",
            left: "5%",
          }}
        >
          {note.sender == user.userNickname ? (
            <></>
          ) : (
            <>
              <button
                style={{
                  border: "none",
                  borderRadius: "10px",
                  margin: "0px 10px",
                  width: "50px",
                  fontWeight: "bold",
                  backgroundColor: "#CBD9CE",
                }}
                onClick={sendNote}
              >
                답장
              </button>
            </>
          )}
          <button
            onClick={() => delNote(note.noteCode)}
            style={{
              border: "none",
              borderRadius: "10px",
              margin: "0px 10px",
              width: "50px",
              fontWeight: "bold",
              backgroundColor: "black",
              color: "white",
            }}
          >
            삭제
          </button>
        </div>
        <div id="noteSender">
          <span>보낸 사람</span>
          &nbsp;
          <span>{note.sender}</span>
        </div>
        <div id="noteReceiver">
          <span>받은 사람</span> &nbsp;<span>{note.receiver}</span>
        </div>
        <div id="noteRegiDate">
          <span>날짜</span>
          &nbsp;
          <span> {moment(note.noteRegiDate).format("YY-MM-DD hh:mm")}</span>
        </div>
      </div>
      <div
        className="noteText"
        style={{
          textAlign: "start",
          marginLeft: "20px",
          marginTop: "10px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div id="noteTitle">
          <span>제목 : </span>
          <span> {note.noteTitle}</span>
        </div>
        <div id="noteFiles" style={{ marginRight: "20px" }}>
          {note.files?.map((file) => (
            <Div key={file.noteFileCode}>
              <a
                href={file.noteFileUrl?.replace(
                  "\\\\DESKTOP-U0CNG13\\upload\\note",
                  "http://192.168.10.28:8081/note/"
                )}
                download
              >
                <MdOutlineFileDownload style={{ fontSize: "1.5rem;" }} />
                첨부 파일 다운로드
              </a>
            </Div>
          ))}
        </div>
      </div>

      <div id="noteContent" style={{ margin: "40px 20px", height: "70%" }}>
        {note.noteContent}
      </div>
      {modalIsOpen ? (
        <ModalNoteWrite
          isOpen={true}
          araiHideApp={false}
          onRequestClose={() => setModalIsOpen(false)}
        >
          <NoteCreate nickName={note.sender} />
        </ModalNoteWrite>
      ) : null}
    </div>
  );
};
export default NoteViewDetail;

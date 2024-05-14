import React, { useState, useEffect } from "react";
import { BsCaretDownFill, BsCaretUpFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { userSave } from "../../store/user";
import styled from "styled-components";
import Modal from "react-modal";
import NoteCreate from "./NoteCreate";

const Div = styled.div`
  display: flex;
  #noteToggle {
    width: 72px;
    flex-direction: column;
    margin-left: 10px;
    border-right: 1px dashed green;
    padding-right: 5px;
    a {
      text-decoration: none;
      color: black;
      display: block;
    }
    a:hover {
      color: green;
    }
  }
  .ReactModalPortal {
    background-color: pink;
  }

  .ReactModal__Overlay,
  .ReactModal__Overlay--after-open {
    width: 200px;
    height: 200px;
  }
  .modals {
    width: 200px;
    height: 200px;
    background-color: yellow;
  }
`;

const ModalContariner = styled.div`
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

const DivNote = styled.div`
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
    padding-bottom: 20px;
    input {
      margin-left: 20px;
    }
  }
`;

const MyToggleBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

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

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const sendNote = () => {
    setModalIsOpen(!modalIsOpen);
  };
  return (
    <>
      <Div>
        <div style={{ display: "flex" }}>
          {props.name == "" || user.userNickname == props.name ? (
            <>{user.userNickname}</>
          ) : (
            <>{props.name}</>
          )}
          {isOpen ? (
            <BsCaretUpFill onClick={handleToggle} />
          ) : (
            <BsCaretDownFill onClick={handleToggle} />
          )}
        </div>
        <div
          id="noteToggle"
          style={{
            display: isOpen ? "flex" : "none",
          }}
        >
          {props.name == "" || user.userNickname == props.name ? (
            <>
              <a
                href="/compagno/mypage/mynote"
                style={{ color: "#94b29b", fontWeight: "bold" }}
              >
                쪽지함
              </a>
              <a
                href="/compagno/mypage/myanimalfav"
                style={{ color: "#94b29b", fontWeight: "bold" }}
              >
                활동 내역
              </a>
            </>
          ) : (
            <>
              <button
                onClick={sendNote}
                style={{
                  border: "none",
                  borderRadius: "10px",
                  color: "black",
                  fontWeight: "bold",
                  backgroundColor: "#94b29b",
                  fontSize: "0.7rem",
                }}
              >
                쪽지 보내기
              </button>
            </>
          )}
        </div>
      </Div>
      {modalIsOpen ? (
        <ModalContariner
          isOpen={true}
          araiHideApp={false}
          onRequestClose={() => setModalIsOpen(false)}
        >
          <NoteCreate nickName={props.name} />
        </ModalContariner>
      ) : null}
    </>
  );
};
export default MyToggleBar;

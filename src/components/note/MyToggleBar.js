import React, { useState, useEffect } from "react";
import { BsCaretDownFill, BsCaretUpFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { userSave } from "../../store/user";
import styled from "styled-components";

const Div = styled.div`
  display: flex;
  #noteToggle {
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
  return (
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
            <a href="/compagno/mypage/myanimalfav">쪽지함</a>
            <a href="/compagno/mypage/myanimalfav">활동 내역</a>
          </>
        ) : (
          <>
            <a href="/compagno/mypage/myanimalfav" style={{ width: "62px" }}>
              쪽지 보내기
            </a>
          </>
        )}
        {/* <a href="/compagno/mypage/myactivity">쪽지 보내기</a> */}
        {/* <a href="/compagno/mypage/myactivity">활동 내역</a> */}
      </div>
    </Div>
  );
};
export default MyToggleBar;

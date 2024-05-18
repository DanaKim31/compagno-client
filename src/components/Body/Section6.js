import "../../assets/style.css";
import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { userSave } from "../../store/user";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Section6 = () => {
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

  const navigate = useNavigate();
  const sendNote = () => {
    if (Object.keys(user).length === 0) {
      navigate("/compagno/login");
    } else {
      navigate("/compagno/mypage/mynote");
    }
  };
  return (
    <>
      <section id="section6">
        <div className="message">
          <div className="content">
            <h1>Note</h1>
            <p>
              The note function on the homepage makes it easy to communicate
              between users. <br />
              Sending a note is simple, and you can write a message directly
              from the other person's profile.
              <br /> The notebox can manage both sent and received notes.
              <br /> Users can also attach files and send and receive various
              types of documents through the note function.
              <br /> Important notes can be managed separately.
            </p>
            <p>
              홈페이지의 쪽지 기능으로 사용자간 쉽게 소통할 수 있습니다. <br />
              상대의 프로필을 통해 쪽지를 전송 할 수 있습니다.
              <br />
              쪽지함에서 전체 쪽지들을 관리 할 수 있습니다.
            </p>
            {/* <a href="">유저들과의 쪽지를 원하시나요</a> */}
            <button onClick={sendNote}>유저들과의 쪽지를 원하시나요</button>
          </div>
          <div className="photo">
            <img src="/img/section6-1.jpg" alt="logo image" />
            <img src="/img/section6-(2).jpg" alt="logo image" />
          </div>
        </div>
      </section>
    </>
  );
};

export default Section6;

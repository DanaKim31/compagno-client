import styled from "styled-components";
import MyPageSidebar from "../../components/user/MyPageSidebar";
import MyPageTab from "../../components/user/MyPageTab";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useDidMountEffect from "../../components/user/useDidMountEffect";
import moment from "moment";

const Div = styled.div`
  @font-face {
    font-family: "TAEBAEKmilkyway";
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2310@1.0/TAEBAEKmilkyway.woff2")
      format("woff2");
    font-weight: normal;
    font-style: normal;
  }

  display: flex;
  height: 100vh;
  padding-top: 112px;
  font-family: "TAEBAEKmilkyway";
  font-weight: bold;

  .mySitterMain {
    width: calc(100vw - 300px);
    display: flex;
    flex-direction: column;
    padding-top: 20px;

    .contentZone {
      width: 100%;
      height: calc(100vh - 66px);
      display: flex;
      align-items: center;
      flex-direction: column;
    }
  }
`;

const MyPageSitter = () => {
  return (
    <Div>
      <MyPageSidebar />
      <div className="mySitterMain">
        <MyPageTab />
        <div className="contentZone">
          <p>시터게시판</p>
        </div>
      </div>
    </Div>
  );
};

export default MyPageSitter;

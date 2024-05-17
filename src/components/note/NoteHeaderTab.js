import styled from "styled-components";
import { FaStar } from "react-icons/fa";
import { BsEnvelopePaper } from "react-icons/bs";
import { RiFolderSharedLine, RiFolderReceivedLine } from "react-icons/ri";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

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
  .noteHeader {
    width: calc(100vw - 300px);
    height: fit-content;
    display: flex;
    justify-content: left;
    padding-left: 8px;
    button {
      width: 25%;
      margin: 0px 2px;
      padding: 10px 10px;
      height: fit-content;
      text-decoration-line: none;
      font-weight: bold;
      /* background-color: rgb(241, 239, 239); */
      background-color: #94b29b;
      border: 2px dashed #94b29b;
      text-align: center;
      border-radius: 10px;
      color: white;
    }
    button:hover {
      background-color: white;
      color: black;
    }
    .select {
      background-color: white;
      color: black;
    }
  }
`;
const NoteHeaderTap = () => {
  const location = useLocation();
  const [nowLoca, setNowLoca] = useState("");
  useEffect(() => {
    // console.log(location.pathname);
    setNowLoca(location.pathname);
  }, [location]);

  const [click, setClick] = useState("");
  const navigate = useNavigate();
  const noteNevi = (data) => {
    setClick(data);
    if (data == "all") {
      navigate("/compagno/mypage/mynote");
    }
    if (data == "receive") {
      navigate("/compagno/mypage/mynote/viewReceiveBox");
    }
    if (data == "send") {
      navigate("/compagno/mypage/mynote/viewSendBox");
    }
    if (data == "star") {
      navigate("/compagno/mypage/mynote/viewStar");
    }
  };
  useEffect(() => {
    noteNevi();
  }, []);

  return (
    <Div>
      <div className="noteHeader">
        <button
          id="viewAll"
          className={`${nowLoca === "/compagno/mypage/mynote" ? "select" : ""}`}
          onClick={() => noteNevi("all")}
        >
          <BsEnvelopePaper
            style={{ marginRight: "15px", fontSize: "1.3rem" }}
          />
          전체 쪽지함
        </button>

        <button
          id="receive"
          className={`${
            nowLoca === "/compagno/mypage/mynote/viewReceiveBox" ? "select" : ""
          }`}
          onClick={() => noteNevi("receive")}
        >
          <RiFolderReceivedLine
            style={{ marginRight: "15px", fontSize: "1.3rem" }}
          />
          받은 쪽지함
        </button>

        <button
          id="send"
          className={`${
            nowLoca === "/compagno/mypage/mynote/viewSendBox" ? "select" : ""
          }`}
          onClick={() => noteNevi("send")}
        >
          <RiFolderSharedLine
            style={{ marginRight: "15px", fontSize: "1.3rem" }}
          />
          보낸 쪽지함
        </button>

        <button
          id="star"
          className={`${
            nowLoca === "/compagno/mypage/mynote/viewStar" ? "select" : ""
          }`}
          onClick={() => noteNevi("star")}
        >
          <FaStar style={{ marginRight: "15px", fontSize: "1.3rem" }} />
          중요 쪽지함
        </button>
      </div>
    </Div>
  );
};
export default NoteHeaderTap;

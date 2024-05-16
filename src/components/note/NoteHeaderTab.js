import styled from "styled-components";
import { FaStar } from "react-icons/fa";
import { BsEnvelopePaper } from "react-icons/bs";
import { RiFolderSharedLine, RiFolderReceivedLine } from "react-icons/ri";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  /* margin-bottom: 30px; */
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
      background-color: pink;
      color: black;
    }
    .select {
      background-color: pink;
    }
    a {
      width: 25%;
      margin: 0px 2px;
      padding: 10px 10px;
      height: fit-content;
      text-decoration-line: none;

      /* background-color: rgb(241, 239, 239); */
      background-color: #94b29b;
      border: 2px dashed #94b29b;
      text-align: center;
      border-radius: 10px;
      color: white;
    }

    a:hover {
      background-color: white;
      color: black;
    }
  }
`;
const NoteHeaderTap = () => {
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
        {/* <a
          href="/compagno/mypage/mynote"
          id="viewAll"
          onClick={() => setClick("all")}
          className={`${click === "all" ? "select" : "holy"}`}
        >
          <BsEnvelopePaper
            style={{ marginRight: "15px", fontSize: "1.3rem" }}
          />
          전체 쪽지함
        </a> */}
        <button
          id="viewAll"
          className={`${click === "all" ? "select" : ""}`}
          onClick={() => noteNevi("all")}
        >
          <BsEnvelopePaper
            style={{ marginRight: "15px", fontSize: "1.3rem" }}
          />
          전체 쪽지함
        </button>

        <button
          id="receive"
          className={`${click === "receive" ? "select" : ""}`}
          onClick={() => noteNevi("receive")}
        >
          <BsEnvelopePaper
            style={{ marginRight: "15px", fontSize: "1.3rem" }}
          />
          받은 쪽지함
        </button>

        <button
          id="send"
          className={`${click === "send" ? "select" : ""}`}
          onClick={() => noteNevi("send")}
        >
          <BsEnvelopePaper
            style={{ marginRight: "15px", fontSize: "1.3rem" }}
          />
          보낸 쪽지함
        </button>

        <button
          id="star"
          className={`${click === "star" ? "select" : ""}`}
          onClick={() => noteNevi("star")}
        >
          <BsEnvelopePaper
            style={{ marginRight: "15px", fontSize: "1.3rem" }}
          />
          중요 쪽지함
        </button>

        {/* <a href="/compagno/mypage/mynote/viewReceiveBox" id="receiveBox">
          <RiFolderReceivedLine
            style={{ marginRight: "15px", fontSize: "1.3rem" }}
          />
          받은 쪽지함
        </a>
        <a href="/compagno/mypage/mynote/viewSendBox" id="sendBox">
          <RiFolderSharedLine
            style={{ marginRight: "15px", fontSize: "1.3rem" }}
          />
          보낸 쪽지함
        </a>
        <a href="/compagno/mypage/mynote/viewStar" id="starBox">
          <FaStar style={{ marginRight: "15px", fontSize: "1.3rem" }} />
          중요 쪽지함
        </a> */}
      </div>
    </Div>
  );
};
export default NoteHeaderTap;

import MyPageSidebar from "../../components/user/MyPageSidebar";
import styled from "styled-components";
import { useState } from "react";
import NoteViewAll from "../../components/note/NoteViewAll";
import NoteCreate from "../../components/note/NoteCreate";
import { FaRegPaperPlane } from "react-icons/fa6";
import { BsEnvelopePaper } from "react-icons/bs";
import { RiFolderSharedLine, RiFolderReceivedLine } from "react-icons/ri";

const Div = styled.div`
  display: flex;
  height: 100vh;
  padding-top: 112px;

  .note-zone {
    width: calc(100vw - 300px);
    box-sizing: border-box;
    display: flex;
    align-items: center;
    flex-direction: column;
    background-color: aliceblue;

    /* 여기서부터 */
    #noteAll {
      border: 1px solid black;
      height: 100%;
    }
  }
`;

const TabMenu = styled.ul`
  @font-face {
    font-family: "TAEBAEKmilkyway";
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2310@1.0/TAEBAEKmilkyway.woff2")
      format("woff2");
    font-weight: normal;
    font-style: normal;
  }
  font-family: "TAEBAEKmilkyway";
  font-weight: bold;
  background-color: #94b29b;
  color: black;
  display: flex;
  flex-direction: row;
  align-items: center;
  list-style: none;
  margin-bottom: 3rem;
  margin-top: 30px;
  width: 90%;
  border-radius: 10px;
  padding-left: 0px;

  .submenu {
    // 기본 Tabmenu 에 대한 CSS를 구현
    display: flex;
    width: calc(100% / 4);
    padding: 10px;
    font-size: 15px;
    transition: 0.5s;
    border-radius: 10px 10px 10px 10px;
    font-weight: bold;
    padding-left: 20px;
    align-items: center;
  }

  .focused {
    //선택된 Tabmenu 에만 적용되는 CSS를 구현
    background-color: white;
    border: 1px dashed gray;
    color: rgb(21, 20, 20);
    font-size: 1.2rem;
  }

  & div.desc {
    text-align: center;
    font-weight: bold;
  }
  li {
    cursor: pointer;
    padding-left: 20px;
  }
`;
const Desc = styled.div`
  text-align: center;
  width: "80%";
`;

const MyPageMyNote = () => {
  const [currentTab, clickTab] = useState(0);
  const noteBar = [
    {
      name: (
        <>
          <BsEnvelopePaper
            style={{ marginRight: "15px", fontSize: "1.3rem" }}
          />
          전체 쪽지함
        </>
      ),
      content: <NoteViewAll />,
    },
    {
      name: (
        <>
          <RiFolderReceivedLine
            style={{ marginRight: "15px", fontSize: "1.3rem" }}
          />
          받은 쪽지함
        </>
      ),
      content: "받은 쪽지함",
    },
    {
      name: (
        <>
          <RiFolderSharedLine
            style={{ marginRight: "15px", fontSize: "1.3rem" }}
          />
          보낸 쪽지함
        </>
      ),
      content: "보낸 쪽지함",
    },
    {
      name: (
        <>
          <FaRegPaperPlane
            style={{ marginRight: "15px", fontSize: "1.3rem" }}
          />
          쪽지 보내기
        </>
      ),
      content: <NoteCreate />,
    },
  ];
  const selectMenuHandler = (index) => {
    // parameter로 현재 선택한 인덱스 값을 전달해야 하며, 이벤트 객체(event)는 쓰지 않는다
    // 해당 함수가 실행되면 현재 선택된 Tab Menu 가 갱신.
    clickTab(index);
  };

  return (
    <Div>
      <MyPageSidebar />
      <div className="note-zone">
        <div
          id="noteAll"
          style={{
            width: "100%",
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <TabMenu>
            {noteBar.map((note, index) => (
              <li
                className={index === currentTab ? "submenu focused" : "submenu"}
                onClick={() => selectMenuHandler(index)}
              >
                {note.name}
              </li>
            ))}
          </TabMenu>
          <Desc>{noteBar[currentTab].content}</Desc>
        </div>
      </div>
    </Div>
  );
};

export default MyPageMyNote;

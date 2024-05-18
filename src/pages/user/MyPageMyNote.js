import MyPageSidebar from "../../components/user/MyPageSidebar";
import styled from "styled-components";
import { useState } from "react";
import NoteCreate from "../../components/note/NoteCreate";
import { FaRegPaperPlane } from "react-icons/fa6";
import { BsEnvelopePaper } from "react-icons/bs";
import { RiFolderSharedLine, RiFolderReceivedLine } from "react-icons/ri";
import NoteViewSendBox from "../../components/note/NoteViewSendBox";

import NoteViewReceiveBox from "../note/NoteViewReceiveBox";
import { FaStar } from "react-icons/fa";
import NoteViewStar from "../../components/note/NoteViewStar";
import NoteViewAll from "../note/NoteViewAll";

const Div = styled.div`
  display: flex;
  height: 100vh;
  padding-top: 112px;

  .noteHeader {
    width: calc(100vw - 300px);
    box-sizing: border-box;
    display: flex;
    align-items: center;
    flex-direction: column;
    background-color: aliceblue;

    /* 여기서부터 */
    #noteAll {
      height: 100%;
      background-color: white;
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
  margin-bottom: 1.6rem;
  margin-top: 2rem;
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
  height: 80%;
  width: 80%;
`;

const MyPageMyNote = () => {
  // const [currentTab, clickTab] = useState(0);
  // const noteBar = [
  //   {
  //     name: (
  //       <>
  //         <BsEnvelopePaper
  //           style={{ marginRight: "15px", fontSize: "1.3rem" }}
  //         />
  //         전체 쪽지함
  //       </>
  //     ),
  //     content: <NoteViewAll />,
  //   },
  //   {
  //     name: (
  //       <>
  //         <RiFolderReceivedLine
  //           style={{ marginRight: "15px", fontSize: "1.3rem" }}
  //         />
  //         받은 쪽지함
  //       </>
  //     ),
  //     content: <NoteViewReceiveBox />,
  //   },
  //   {
  //     name: (
  //       <>
  //         <RiFolderSharedLine
  //           style={{ marginRight: "15px", fontSize: "1.3rem" }}
  //         />
  //         보낸 쪽지함
  //       </>
  //     ),
  //     content: <NoteViewSendBox />,
  //   },
  //   {
  //     name: (
  //       <>
  //         <FaStar style={{ marginRight: "15px", fontSize: "1.3rem" }} />
  //         중요 쪽지함
  //       </>
  //     ),
  //     content: <NoteViewStar />,
  //   },
  // ];
  // const selectMenuHandler = (index) => {
  //   clickTab(index);
  // };

  return (
    <Div>
      <MyPageSidebar />
      <TabMenu>
        <div className="noteHeader">
          <a href="/compagno/mypage/mynote/viewAll">
            <BsEnvelopePaper
              style={{ marginRight: "15px", fontSize: "1.3rem" }}
            />
            전체 쪽지함
          </a>
          <a href="/compagno/mypage/mynote/viewReceiveBox">
            <RiFolderSharedLine
              style={{ marginRight: "15px", fontSize: "1.3rem" }}
            />
            받은 쪽지함
          </a>
          <a href="/compagno/mypage/mynote/viewSendBox">
            <RiFolderSharedLine
              style={{ marginRight: "15px", fontSize: "1.3rem" }}
            />
            보낸 쪽지함
          </a>
          <a href="/compagno/mypage/mynote/viewStar">
            <FaStar style={{ marginRight: "15px", fontSize: "1.3rem" }} />
            중요 쪽지함
          </a>
        </div>
      </TabMenu>

      {/* <div
          id="noteAll"
          style={{
            width: "100%",
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }} */}

      {/* <TabMenu>
            {noteBar.map((note, index) => (
              <li
                className={index === currentTab ? "submenu focused" : "submenu"}
                onClick={() => selectMenuHandler(index)}
              >
                {note.name}
              </li>
            ))}
          </TabMenu>
          <Desc>{noteBar[currentTab].content}</Desc> */}
      {/* </div> */}
    </Div>
  );
};

export default MyPageMyNote;

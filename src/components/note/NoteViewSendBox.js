import { sendBox, starSenderUpdate, delSenderCount } from "../../api/note";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import "moment/locale/ko";
import NoteViewDetail from "./NoteViewDetail";
import { BsEnvelopePaper } from "react-icons/bs";
import { IoSearch } from "react-icons/io5";
import {
  FaAngleLeft,
  FaAnglesLeft,
  FaAngleRight,
  FaAnglesRight,
} from "react-icons/fa6";
import styled from "styled-components";
import { FaStar, FaRegStar } from "react-icons/fa";
import { FaRegFileLines } from "react-icons/fa6";
import MyPageSidebar from "../user/MyPageSidebar";
import NoteHeaderTap from "./NoteHeaderTab";

const DivTotal = styled.div`
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

  .mySendBoxView {
    width: calc(100vw - 300px);
    display: flex;
    flex-direction: column;
    padding-top: 20px;
    .contentZone {
      width: 100%;
      height: 94%;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
    }
  }
`;

const ModalContariner = styled.div`
  @font-face {
    font-family: "TAEBAEKmilkyway";
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2310@1.0/TAEBAEKmilkyway.woff2")
      format("woff2");
    font-weight: normal;
    font-style: normal;
  }
  font-family: "TAEBAEKmilkyway";
  border: 1px solid black;
  width: 80%;
  font-weight: bold;
  /* height: 300px; */
  height: 80%;
`;
const Div = styled.div`
  @font-face {
    font-family: "TAEBAEKmilkyway";
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2310@1.0/TAEBAEKmilkyway.woff2")
      format("woff2");
    font-weight: normal;
    font-style: normal;
  }
  font-family: "TAEBAEKmilkyway";
  width: 100%;
  height: 100%;
  font-weight: bold;
  input {
    font-weight: bold;
  }
  span {
    font-weight: bold;
  }
  #pageBtn {
    font-weight: bold;
    border-radius: 50%;
    /* border: 1px solid; */
    border: none;
    color: rgb(32, 61, 59);
    width: 25px;
    height: 25px;
    font-size: 0.8rem;
    margin: 0px 5px;
    background-color: #cbd6ce;
  }
`;

const NoteViewSendBox = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const info = useSelector((state) => {
    return state.user;
  });
  useEffect(() => {
    if (Object.keys(info).length === 0) {
      setUser(JSON.parse(localStorage.getItem("user")));
    } else {
      setUser(info);
    }
  }, []);

  // 검색
  const [receiver, setReceiver] = useState("");
  const [noteTitle, setNoteTitle] = useState("");
  const [noteRegiDate, setNoteRegiDate] = useState("");

  const [notes, setNotes] = useState([]); // 전체 리스트 확인
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [pages, setPages] = useState([]);
  const [allCount, setAllCount] = useState(0);

  const notesAPI = async () => {
    let response = await sendBox(
      user.userNickname +
        "?page=" +
        page +
        "&receiver=" +
        receiver +
        "&noteTitle=" +
        noteTitle +
        "&noteRegiDate=" +
        noteRegiDate
    );
    setNotes(response.data.content);
    setAllCount(response.data.totalElements);
    setTotalPage(response.data.totalPages);
  };

  let lastPage = 0;
  let firstPage = 0;
  let pageList = [];

  useEffect(() => {
    notesAPI();
  }, [user, page]);

  useEffect(() => {
    lastPage = Math.ceil(page / 5) * 5;
    firstPage = lastPage - 4;

    if (totalPage < lastPage) {
      lastPage = totalPage;
    }
    for (let i = firstPage; i <= lastPage; i++) {
      pageList.push(i);
    }
    setPages(pageList);
  }, [totalPage]);

  //1개 보기
  const [code, setCode] = useState(0);
  const [openDetail, setOpenDetail] = useState(false);
  const onDetail = (e) => {
    setCode(e);
    setOpenDetail(true);
  };

  // 중요 표시
  // sender
  const starSenderCheck = (code) => {
    window.location.reload();
    starSenderUpdate(code);
  };

  // 삭제 된 쪽지 수
  const [num, setNum] = useState(0);
  const numAPI = async () => {
    const response = await delSenderCount(user.userNickname);
    setNum(response.data);
  };

  useEffect(() => {
    numAPI();
  }, [user]);

  return (
    <DivTotal>
      <MyPageSidebar />
      <div className="mySendBoxView">
        <NoteHeaderTap />
        <div className="contentZone" style={{ height: "94%" }}>
          {!openDetail ? (
            <>
              <Div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div
                  className="search"
                  style={{
                    border: "1px dashed green",
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    borderRadius: "20px",
                    paddingBottom: "20px",
                    paddingTop: "30px",
                    width: "85%",
                    alignItems: "center",
                  }}
                >
                  <div
                    id="searchItems"
                    style={{
                      display: "flex",
                      justifyContent: "space-evenly",
                      width: "100%",
                    }}
                  >
                    <div id="searchReceiver">
                      <label>
                        받는 사람
                        <input
                          type="text"
                          onChange={(e) => setReceiver(e.target.value)}
                          style={{ marginLeft: "15px" }}
                        />
                      </label>
                    </div>
                    <div id="searchTitle">
                      <label>
                        제목
                        <input
                          type="text"
                          onChange={(e) => setNoteTitle(e.target.value)}
                          style={{ marginLeft: "15px" }}
                        />
                      </label>
                    </div>

                    <div id="searchNoteRegiDate">
                      <label>
                        보낸 날짜
                        <input
                          type="date"
                          max={moment().format("YYYY-MM-DD")}
                          onChange={(e) => setNoteRegiDate(e.target.value)}
                          style={{ marginLeft: "15px" }}
                        />
                      </label>
                    </div>
                  </div>
                  <div id="searchBtn" style={{ marginTop: "20px" }}>
                    <button
                      onClick={notesAPI}
                      style={{
                        border: "none",
                        borderRadius: "10px",
                        width: "75px",
                        height: "30px",
                        backgroundColor: "#94b29b",
                      }}
                    >
                      <IoSearch />
                      <span>조회</span>
                    </button>
                  </div>
                </div>
                <div
                  id="totalNotes"
                  style={{
                    display: "flex",
                    paddingTop: "15px",
                    marginLeft: "15px",
                    marginBottom: "15px",
                    alignItems: "center",
                    width: "85%",
                  }}
                >
                  <BsEnvelopePaper />
                  <span style={{ marginLeft: "10px" }}>
                    총 {allCount - num}개
                  </span>
                </div>
                <table style={{ width: "85%", height: "60%" }}>
                  <thead
                    style={{ height: "30px", borderBottom: "1px dashed black" }}
                  >
                    <tr>
                      <th>중요</th>
                      <th>받는 사람</th>
                      <th>제목</th>
                      <th>내용</th>
                      <th>보낸 날짜</th>
                      <th>첨부파일 유무</th>
                    </tr>
                  </thead>
                  <tbody>
                    {notes.map((note) => (
                      <tr
                        key={note.noteCode}
                        // onClick={() => onDetail(note.noteCode)}
                        // style={{ cursor: "pointer" }}
                      >
                        {note.deletedBySender == 0 ? (
                          <>
                            <td>
                              {note.starSender == 1 ? (
                                <FaStar
                                  onClick={() => starSenderCheck(note.noteCode)}
                                  style={{
                                    color: "yellow",
                                    cursor: "pointer",
                                  }}
                                />
                              ) : (
                                <FaRegStar
                                  onClick={() => starSenderCheck(note.noteCode)}
                                  style={{ cursor: "pointer" }}
                                />
                              )}
                            </td>
                            <td>{note.receiver}</td>
                            <td
                              onClick={() => onDetail(note.noteCode)}
                              style={{ cursor: "pointer" }}
                            >
                              {note.noteTitle}
                            </td>
                            <td
                              onClick={() => onDetail(note.noteCode)}
                              style={{ cursor: "pointer" }}
                            >
                              {note.noteContent}
                            </td>
                            <td>
                              {moment(note.noteRegiDate).format(
                                "YY-MM-DD hh:mm"
                              )}
                            </td>
                            <td>
                              {note.files.length !== 0 ? (
                                <FaRegFileLines
                                  onClick={() => onDetail(note.noteCode)}
                                  style={{ cursor: "pointer" }}
                                />
                              ) : (
                                <></>
                              )}
                            </td>
                          </>
                        ) : (
                          <></>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="paging" style={{ marginTop: "15px" }}>
                  <FaAnglesLeft
                    className="iconPaging"
                    onClick={() => setPage(1)}
                  />
                  <FaAngleLeft
                    className="iconPaging"
                    onClick={() => (page > 1 ? setPage(page - 1) : setPage(1))}
                  />
                  {pages.map((num, index) => (
                    <button
                      key={index}
                      value={num}
                      onClick={(e) => setPage(Number(e.target.value))}
                      id="pageBtn"
                    >
                      {num}
                    </button>
                  ))}

                  <FaAngleRight
                    className="iconPaging"
                    onClick={
                      () =>
                        page < totalPage
                          ? setPage(page + 1)
                          : setPage(totalPage) // 현재 페이지에서 한칸 뒤로
                    }
                  />
                  <FaAnglesRight
                    className="iconPaging"
                    onClick={() => setPage(totalPage)}
                  />
                </div>
              </Div>
            </>
          ) : (
            <>
              {" "}
              <ModalContariner>
                <div
                  style={{ position: "absolute", top: "29.4%", left: "25%" }}
                >
                  <button
                    onClick={() => setOpenDetail(false)}
                    style={{
                      border: "none",
                      borderRadius: "10px",
                      margin: "0px 10px",
                      width: "50px",
                      fontWeight: "bold",
                      backgroundColor: "gray",
                      color: "white",
                    }}
                  >
                    목록
                  </button>
                </div>
                <NoteViewDetail name={code} />
              </ModalContariner>
            </>
          )}
        </div>
      </div>
    </DivTotal>
  );
};
export default NoteViewSendBox;

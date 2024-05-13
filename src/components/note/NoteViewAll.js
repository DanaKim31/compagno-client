import { viewAllNote, deleteReceiver, deleteSender } from "../../api/note";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { userSave } from "../../store/user";
import moment from "moment";
import "moment/locale/ko";
import { useNavigate } from "react-router-dom";

import { BsEnvelopePaper } from "react-icons/bs";
import { IoSearch } from "react-icons/io5";
import {
  FaAngleLeft,
  FaAnglesLeft,
  FaAngleRight,
  FaAnglesRight,
} from "react-icons/fa6";
import NoteViewDetail from "./NoteViewDetail";

const Div = styled.div`
  @font-face {
    font-family: "TAEBAEKmilkyway";
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2310@1.0/TAEBAEKmilkyway.woff2")
      format("woff2");
    font-weight: normal;
    font-style: normal;
  }
  font-family: "TAEBAEKmilkyway";
  /* border: 1px solid black; */
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
  width: 100%;
  font-weight: bold;
  height: 300px;
`;

const NoteViewAll = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  // 유저정보 가지고 오기
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
  const [sender, setSender] = useState("");
  const [receiver, setReceiver] = useState("");
  const [noteTitle, setNoteTitle] = useState("");
  const [noteRegiDate, setNoteRegiDate] = useState("");

  const [notes, setNotes] = useState([]); // 전체 리스트 확인
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [pages, setPages] = useState([]);
  const [allCount, setAllCount] = useState(0);
  console.log(user.userNickname);
  const notesAPI = async () => {
    let response = await viewAllNote(
      user.userNickname +
        "?page=" +
        page +
        "&sender=" +
        sender +
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
  }, []);

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
  const navigate = useNavigate();
  const [code, setCode] = useState(0);
  const [openDetail, setOpenDetail] = useState(false);
  const onDetail = (e) => {
    setCode(e);
    setOpenDetail(true);
  };

  // 삭제하기
  const delNote = () => {};

  return (
    <>
      {!openDetail ? (
        <>
          <Div>
            <div
              className="search"
              style={{
                border: "1px dashed green",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                borderRadius: "20px",
                paddingBottom: "20px",
              }}
            >
              <div
                id="searchPerson"
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  width: "100%",
                  paddingTop: "20px",
                }}
              >
                <div id="searchSender">
                  <label>
                    보내는 사람
                    <input
                      type="text"
                      onChange={(e) => setSender(e.target.value)}
                      style={{ marginLeft: "15px" }}
                    />
                  </label>
                </div>
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
              </div>

              <div
                id="searchTitleDate"
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  width: "100%",
                  paddingTop: "20px",
                }}
              >
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
                    날짜
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
              }}
            >
              <BsEnvelopePaper />
              <span style={{ marginLeft: "10px" }}>총 {allCount}개</span>
            </div>
            <table style={{ width: "100%", height: "60%" }}>
              <thead
                style={{ height: "30px", borderBottom: "1px dashed black" }}
              >
                <tr>
                  <th>보내는 사람</th>
                  <th>제목</th>
                  <th>내용</th>
                  <th>받는 사람</th>
                  <th>날짜</th>
                  <th>첨부파일 유무</th>
                </tr>
              </thead>
              <tbody>
                {notes.map((note) => (
                  <tr
                    key={note.noteCode}
                    onClick={() => onDetail(note.noteCode)}
                    style={{ cursor: "pointer" }}
                  >
                    <td>{note.sender}</td>
                    <td>{note.noteTitle}</td>
                    <td>{note.noteContent}</td>
                    <td>{note.receiver}</td>
                    <td>
                      {moment(note.noteRegiDate).format("YY-MM-DD hh:mm")}
                    </td>
                    {/* <td>{note.files == null ? <>얌</> : <>욥</>}</td> */}
                    <td>
                      {note.files.map((note) => (
                        <div key={note.noteFileCode}>
                          {note.noteFileUrl != "" ? <>Y</> : <>N</>}
                        </div>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="paging" style={{ marginTop: "15px" }}>
              <FaAnglesLeft className="iconPaging" onClick={() => setPage(1)} />
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
                    page < totalPage ? setPage(page + 1) : setPage(totalPage) // 현재 페이지에서 한칸 뒤로
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
            <NoteViewDetail name={code} /> <button>답장</button>
            <button onClick={() => delNote()}>삭제</button>
            <button onClick={() => setOpenDetail(false)}>목록보기</button>
          </ModalContariner>
        </>
      )}
    </>
  );
};
export default NoteViewAll;

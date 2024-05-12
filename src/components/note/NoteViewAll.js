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
  border: 1px solid black;
  width: 100%;
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
    border: 2px solid;
    color: rgb(32, 61, 59);
    width: 30px;
    font-size: 1rem;
    align-items: center;
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
            <div className="search">
              <div id="searchSender">
                <label>
                  보내는 사람
                  <input
                    type="text"
                    onChange={(e) => setSender(e.target.value)}
                  />
                </label>
              </div>
              <div id="searchReceiver">
                <label>
                  받는 사람
                  <input
                    type="text"
                    onChange={(e) => setReceiver(e.target.value)}
                  />
                </label>
              </div>
              <div id="searchTitle">
                <label>
                  제목
                  <input
                    type="text"
                    onChange={(e) => setNoteTitle(e.target.value)}
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
                  />
                </label>
              </div>
              <div id="searchBtn">
                <button onClick={notesAPI}>
                  <IoSearch />
                  <span>조회</span>
                </button>
              </div>
            </div>
            <BsEnvelopePaper />
            <span>총 {allCount}개</span>
            <table style={{ width: "100%" }}>
              <thead>
                <tr>
                  <th>보내는 사람</th>
                  <th>제목</th>
                  <th>내용</th>
                  <th>받는 사람</th>
                  <th>날짜</th>
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
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="paging">
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

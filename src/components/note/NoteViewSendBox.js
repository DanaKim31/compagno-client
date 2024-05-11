import { sendBox } from "../../api/note";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import "moment/locale/ko";

import { BsEnvelopePaper } from "react-icons/bs";
import { IoSearch } from "react-icons/io5";
import {
  FaAngleLeft,
  FaAnglesLeft,
  FaAngleRight,
  FaAnglesRight,
} from "react-icons/fa6";
import styled from "styled-components";

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

  return (
    <Div>
      <div className="search">
        <div id="searchReceiver">
          <label>
            받는 사람
            <input type="text" onChange={(e) => setReceiver(e.target.value)} />
          </label>
        </div>
        <div id="searchTitle">
          <label>
            제목
            <input type="text" onChange={(e) => setNoteTitle(e.target.value)} />
          </label>
        </div>

        <div id="searchNoteRegiDate">
          <label>
            보낸 날짜
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
            <th>받는 사람</th>
            <th>제목</th>
            <th>내용</th>
            <th>보낸 날짜</th>
          </tr>
        </thead>
        <tbody>
          {notes.map((note) => (
            <tr key={note.noteCode}>
              <td>{note.receiver}</td>
              <td>{note.noteTitle}</td>
              <td>{note.noteContent}</td>
              <td>{moment(note.noteRegiDate).format("YY-MM-DD hh:mm")}</td>
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
            () => (page < totalPage ? setPage(page + 1) : setPage(totalPage)) // 현재 페이지에서 한칸 뒤로
          }
        />
        <FaAnglesRight
          className="iconPaging"
          onClick={() => setPage(totalPage)}
        />
      </div>
    </Div>
  );
};
export default NoteViewSendBox;

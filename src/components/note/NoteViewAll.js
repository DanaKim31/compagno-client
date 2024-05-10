import { viewAllNote } from "../../api/note";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { userSave } from "../../store/user";
import moment from "moment";
import "moment/locale/ko";
import { useNavigate } from "react-router-dom";
import { BsEnvelopePaper } from "react-icons/bs";

const NoteViewAll = () => {
  const navigate = useNavigate();
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

  // 검색
  const [sender, setSender] = useState("");
  const [receiver, setReceiver] = useState("");
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [noteRegiDate, setNoteRegiDate] = useState("");

  const [notes, setNotes] = useState([]); // 전체 리스트 확인
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [pages, setPages] = useState([]);
  const [allCount, setAllCount] = useState(0);

  const notesAPI = async () => {
    let response = await viewAllNote(
      page +
        "&sender=" +
        sender +
        "&receiver=" +
        receiver +
        "&noteTitle=" +
        noteTitle +
        "&noteContent=" +
        noteContent +
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
  }, [page]);

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
    <div style={{ border: "1px solid black", width: "100%" }}>
      <BsEnvelopePaper />
      <table style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>보내는 사람</th>
            <th>제목</th>
            <th>내용</th>
            <th>받는 사람</th>
            <th>보낸 날짜</th>
          </tr>
        </thead>
        <tbody>
          {notes.map((note) => (
            <tr key={note.noteCode}>
              <td>{note.sender}</td>
              <td>{note.noteTitle}</td>
              <td>{note.noteContent}</td>
              <td>{note.receiver}</td>
              <td>{note.noteRegiDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default NoteViewAll;

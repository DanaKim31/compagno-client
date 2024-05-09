import { viewAllNote } from "../../api/note";
import { useState, useEffect } from "react-redux";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { userSave } from "../../store/user";
import moment from "moment";
import "moment/locale/ko";
import { useNavigate } from "react-router-dom";

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

  const [notes, setNotes] = useState([]);
  const notesAPI = async () => {
    await viewAllNote(
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
  };

  return (
    <>
      <h2>안녕</h2>
      <h4>클레오파트라</h4>
    </>
  );
};
export default NoteViewAll;

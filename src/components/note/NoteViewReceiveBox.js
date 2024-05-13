import { receivBox } from "../../api/note";
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
  /* height: 300px; */
  height: 80%;
`;
const ModalNoteWrite = styled.div`
  position: fixed;
  left: 50%;
  width: 40%;
  top: 50%;
  background-color: white;
  border: 2px solid black;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.3) 0 0 0 9999px;
  z-index: 100;
  transform: translate(-50%, -50%);
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
const NoteViewReceiveBox = () => {
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
  const [sender, setSender] = useState("");
  const [noteTitle, setNoteTitle] = useState("");
  const [noteRegiDate, setNoteRegiDate] = useState("");

  const [notes, setNotes] = useState([]); // 전체 리스트 확인
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [pages, setPages] = useState([]);
  const [allCount, setAllCount] = useState(0);

  const notesAPI = async () => {
    let response = await receivBox(
      user.userNickname +
        "?page=" +
        page +
        "&sender=" +
        sender +
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
  // 삭제하기
  const delNote = () => {};

  // 답장
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const sendNote = () => {
    setModalIsOpen(!modalIsOpen);
  };

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
                paddingTop: "30px",
              }}
            >
              <div
                id="searchItems"
                style={{ display: "flex", justifyContent: "space-evenly" }}
              >
                <div id="searchSender">
                  <label>
                    보낸 사람
                    <input
                      type="text"
                      onChange={(e) => setSender(e.target.value)}
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
                    받은 날짜
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
                  <th>보낸 사람</th>
                  <th>제목</th>
                  <th>내용</th>
                  <th>받은 날짜</th>
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
                    <td>
                      {moment(note.noteRegiDate).format("YY-MM-DD hh:mm")}
                    </td>
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
            <div style={{ position: "absolute", top: "25.5%", left: "25%" }}>
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
    </>
  );
};
export default NoteViewReceiveBox;

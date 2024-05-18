import { searchNoticeBoard } from "../../api/noticeBoard";
import { useState, useEffect } from "react";
import moment from "moment";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userSave } from "../../store/user";
import {
  FaAngleLeft,
  FaAnglesLeft,
  FaAngleRight,
  FaAnglesRight,
} from "react-icons/fa6";
import { Form, Button } from "react-bootstrap";
import { IoSearch } from "react-icons/io5";

const Main = styled.main`
  @font-face {
    font-family: "TAEBAEKmilkyway";
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2310@1.0/TAEBAEKmilkyway.woff2")
      format("woff2");
    font-weight: normal;
    font-style: normal;
  }

  font-family: "TAEBAEKmilkyway";
  * {
    font-weight: bold;
  }

  width: 90%;
  margin: auto;
  padding-top: 150px;
  display: flex;
  flex-direction: column;
  max-width: 1100px;

  h1 {
    font-size: 2.5;
    font-weight: bold;
    cursor: pointer;
  }
  h1:hover {
    color: #94b29b;
  }

  table {
    text-align: center;
    thead {
      border-bottom: 2px solid black;
      th {
        padding: 10px;
      }
      th:nth-child(1) {
        width: 70px;
      }
      th:nth-child(3) {
        width: 240px;
      }
      th:nth-child(4) {
        width: 200px;
      }
      th:nth-child(5) {
        width: 110px;
      }
    }
    tbody {
      td {
        padding: 10px;
      }
    }
    .boardList:hover {
      background: lightgray;
    }
  }

  .paging {
    margin: 20px 0px;
    display: flex;
    justify-content: center;
    svg {
      margin-top: 5px;
      cursor: pointer;
      height: 20px;
      width: 20px;
    }
    svg:hover {
      color: #78e150;
    }
  }
  .pageNoBtn {
    width: 30px;
    height: 30px;
    border: 2px solid black;
    margin: 0px 1px;
    border-radius: 5px;
  }

  .pageNoBtn:hover {
    background-color: #78e150;
  }

  .titleTd {
    text-align: left;
  }

  .commentsCount {
    font-size: 0.8rem;
    color: orangered;
    margin-left: 3px;
  }

  .writeBtn {
    display: inline;
    width: 100px;
    float: right;
  }

  .searchInput {
    font-weight: bold;
    width: 300px;
    margin-top: 2px;
    height: 30px;
    border: 1px solid gray;
  }

  .searchBtn {
    border: none;
    border-radius: 5px;
    padding: 5px;
    background-color: black;
    color: white;
    width: 90px;
    height: 35px;
    margin-left: 5px;
  }

  .searchWriteNav {
    width: 100%;
    text-align: center;
    input {
      display: inline;
    }
    margin-top: 30px;
    margin-bottom: 20px;
  }
  .searchInput {
    margin: auto;
  }
`;

const ViewAllNoticeBoard = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => {
    return state.user;
  });
  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  const [noticeBoards, setNoticeBoards] = useState([]);
  const [page, setPage] = useState(1); // 현재 페이지
  const [totalPage, setTotalPage] = useState(0); // 전체 총 페이지
  const [prev, setPrev] = useState(false); // 앞으로 한칸 버튼
  const [next, setNext] = useState(false); // 뒤로 한칸 버튼
  const [pages, setPages] = useState([]); // 페이지들
  const [keyword, setKeyword] = useState("");

  const getNoticeBoards = async () => {
    const result = await searchNoticeBoard(keyword, page);
    setNoticeBoards(result.data);
    setTotalPage(result.data.totalPages);
  };

  let lastPage = 0;
  let firstPage = 0;
  let pageList = [];

  useEffect(() => {
    getNoticeBoards();
    paging();
  }, [page]);

  const paging = () => {
    lastPage = Math.ceil(page / 5) * 5;
    firstPage = lastPage - 4;

    if (totalPage < lastPage) {
      lastPage = totalPage; // 전체 페이지가 마지막 페이지보다 작은 경우엔 전체 페이지 수가 마지막 페이지 수랑 같음
    }
    setPrev(firstPage > 1);
    setNext(lastPage < totalPage);
    for (let i = firstPage; i <= lastPage; i++) {
      pageList.push(i); // 처음 i는 firstPage, 범위는 lastPage로 반복문 돌려서 i값을 넣은 list 만들기
    }
    setPages(pageList); // 해당 list 배열을 setPages에 담기
  };

  useEffect(() => {
    paging();
  }, [totalPage]);

  useEffect(() => {
    if (token !== null) {
      dispatch(userSave(JSON.parse(localStorage.getItem("user"))));
    }
    getNoticeBoards();
  }, []);

  return (
    <Main>
      <h1 onClick={() => navigate("/compagno/notice-board")}>공지 사항</h1>
      <nav className="searchWriteNav">
        <span className="searchSpan">
          <Form.Control
            className="searchInput"
            placeholder="검색할 제목을 입력해주세요"
            onChange={(e) => setKeyword(e.target.value.trim())}
          />
          <Button
            className="searchBtn"
            onClick={() => {
              getNoticeBoards();
            }}
          >
            <IoSearch />
            검색
          </Button>
        </span>

        {user.userRole === "ROLE_ADMIN" && (
          <Button
            className="writeBtn"
            variant="secondary"
            onClick={() => navigate("/compagno/notice-board/create")}
          >
            글 작성
          </Button>
        )}
      </nav>
      <table>
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>작성일</th>
            <th>조회수</th>
          </tr>
        </thead>
        <tbody>
          {noticeBoards.content?.map((noticeBoard) => (
            <tr
              key={noticeBoard.noticeBoardCode}
              className="boardList"
              onClick={() =>
                navigate(
                  "/compagno/notice-board/" + noticeBoard.noticeBoardCode
                )
              }
            >
              <td>{noticeBoard.noticeBoardCode}</td>
              <td className="titleTd">
                {noticeBoard.noticeBoardTitle}
                {noticeBoard.comments.filter(
                  (commentCount) => commentCount.noticeCommentDelete !== "Y"
                ).length > 0 && (
                  <span className="commentsCount">
                    [
                    {
                      noticeBoard.comments.filter(
                        (commentCount) =>
                          commentCount.noticeCommentDelete !== "Y"
                      ).length
                    }
                    ]
                  </span>
                )}
              </td>
              <td>{noticeBoard.user?.userNickname}</td>
              <td>
                {moment(noticeBoard.noticeBoardRegiDate).format(
                  "YY-MM-DD HH:mm"
                )}
              </td>
              <td>{noticeBoard.noticeBoardViewCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <nav className="paging">
        {prev && (
          <FaAnglesLeft onClick={() => setPage(Math.ceil(page / 5) * 5 - 9)} />
          /* 가장 첫 페이지로 */
        )}
        {page !== 1 && (
          <FaAngleLeft
            onClick={() => (page > 1 ? setPage(page - 1) : setPage(1))} // 현재 페이지에서 한칸 앞으로
          />
        )}
        {pages.map(
          (
            num,
            index // 배열 담은 pages를 map으로 만들어서 반복문 페이지번호 생성
          ) => (
            <button
              className="pageNoBtn"
              key={index}
              value={num}
              onClick={(e) => setPage(Number(e.target.value))}
              style={num === page ? { backgroundColor: "#94B29B" } : {}}
            >
              {num}
            </button>
          )
        )}
        {page !== totalPage && totalPage !== 0 && (
          <FaAngleRight
            onClick={
              () => (page < totalPage ? setPage(page + 1) : setPage(totalPage)) // 현재 페이지에서 한칸 뒤로
            }
          />
        )}
        {next && (
          <FaAnglesRight onClick={() => setPage(Math.ceil(page / 5) * 5 + 1)} />
          /* 가장 마지막 페이지로 */
        )}
      </nav>
    </Main>
  );
};
export default ViewAllNoticeBoard;

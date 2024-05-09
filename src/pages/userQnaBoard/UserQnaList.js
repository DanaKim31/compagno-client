import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { userSave } from "../../store/user";
import { getUserQuestions } from "../../api/userQnaQuestion";
import { Button, Form } from "react-bootstrap";
import {
  FaAnglesLeft,
  FaAngleLeft,
  FaAngleRight,
  FaAnglesRight,
} from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import moment from "moment";

const Div = styled.div`
  position: relative;
  top: 150px;
  #topbar {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    padding-top: 5px;
    height: 90px;

    Button {
      height: 35px;
      background-color: gray;
      border: 1px solid gray;
    }
  }
  Table {
    width: 70%;
    margin: 0 auto;
  }
  .paging {
    width: 100%;
    padding-top: 30px;
    text-align: center;
    button {
      border-radius: 5px;
      margin: 5px;
      font-weight: bolder;
    }
  }
  #search {
    display: flex;
    height: 35px;

    select {
      border-radius: 7px;
      border: 1px solid gray;
    }
    input {
      margin-left: 7px;
      margin-right: 7px;
      border-radius: 7px;
      border: 1px solid gray;
    }
    button {
      width: 120px;
      background-color: gray;
      border-radius: 5px;
      border: 1px solid gray;
      color: white;
    }
  }
`;

const Table = styled.table`
  thead {
    text-align: center;
    font-weight: bolder;
    th {
      height: 70px;
      padding-top: 20px;
      border: 1px solid;
    }
  }
  tbody {
    text-align: center;
    td {
      height: 50px;
      padding-top: 10px;
      border: 1px solid;
      a {
        color: black;
        text-decoration: none;
      }
    }
  }
`;

const UserQnaList = () => {
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

  // 페이징 처리
  const [questions, setQuestions] = useState([]);
  const [page, setPage] = useState(1); // 현재 페이지
  const [totalPage, setTotalPage] = useState(0); // 전체 총 페이지
  const [prev, setPrev] = useState(false); // 앞으로 한칸 버튼
  const [next, setNext] = useState(false); // 뒤로 한칸 버튼
  const [pages, setPages] = useState([]); // 페이지들

  // 페이지 변경될 때마다 호출!
  const questionAPI = async () => {
    const response = await getUserQuestions(page);
    setQuestions(response.data);
    setTotalPage(response.data.totalPages); // response에서 totalPages 불러와서 set으로 담기
  };
  // 첫페이지, 마지막 페이지, 페이지 리스트 초기 셋팅
  let lastPage = 0;
  let firstPage = 0;
  let pageList = [];

  // 페이지가 변할 때마다 questionAPI() 실행
  useEffect(() => {
    questionAPI();
  }, [page]);

  // totalPage가 바뀔 때 마다 실행
  useEffect(() => {
    lastPage = Math.ceil(page / 5) * 5; // 나는 한 화면에 1~5, 6~10 등 5개로 나뉘어서 보이기 때문에 5로 설정
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
  }, [totalPage]);

  const [select, setSelect] = useState("title");
  const [keyword, setKeyword] = useState("");

  const search = async () => {
    const response = await getUserQuestions(page, select, keyword);
    console.log(response.data);
    setQuestions(response.data);
    setTotalPage(response.data?.totalPages);
  };

  return (
    <Div>
      <div id="topbar">
        <div>
          <p>전체 {questions?.totalElements}건</p>
        </div>
        <div id="search">
          <select onChange={(e) => setSelect(e.target.value)}>
            <option value={"title"}>제목</option>
            <option value={"content"}>내용</option>
            <option value={"id"}>작성자</option>
          </select>
          <Form.Control
            type="text"
            placeholder="검색어를 입력하세요"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <Button onClick={search}>
            <IoSearch />
            조회
          </Button>
        </div>

        {Object.keys(user).length === 0 ? (
          <>
            <Button
              onClick={() => {
                navigate("/compagno/login");
              }}
            >
              질문 등록
            </Button>
          </>
        ) : (
          <>
            <Button
              onClick={() => {
                navigate("/compagno/userQna/register");
              }}
            >
              질문 등록
            </Button>
          </>
        )}
      </div>
      <Table>
        <thead>
          <tr>
            <th>질문 번호</th>
            <th>답변 여부</th>
            <th>제목</th>
            <th>작성자</th>
            <th>작성일</th>
          </tr>
        </thead>
        <tbody>
          {questions?.content?.map((question) => {
            return (
              <tr key={question.userQuestionBoardCode}>
                <td>{question.userQuestionBoardCode}</td>
                <td>{question.userQuestionBoardStatus}</td>

                <td>
                  <a
                    href={`/compagno/userQna/detail/${question.userQuestionBoardCode}`}
                  >
                    {question.userQuestionBoardTitle}
                  </a>
                </td>
                <td>{question.userId}</td>
                {/* qnaQDate가 null일 때 DateUpdate로 출력 */}
                {question.userQuestionBoardDate === "" ||
                question.userQuestionBoardDate == null ? (
                  <>
                    <td>
                      {moment(question.userQuestionBoardDateUpdate).format(
                        "YY-MM-DD hh:mm"
                      )}
                    </td>
                  </>
                ) : (
                  <>
                    <td>
                      {moment(question.userQuestionBoardDate).format(
                        "YY-MM-DD hh:mm"
                      )}
                    </td>
                  </>
                )}
              </tr>
            );
          })}
        </tbody>
      </Table>

      <div className="paging">
        <FaAnglesLeft onClick={() => setPage(1)} />
        {/* 가장 첫 페이지로 */}
        <FaAngleLeft
          onClick={() => (page > 1 ? setPage(page - 1) : setPage(1))} // 현재 페이지에서 한칸 앞으로
        />
        {pages.map(
          (
            num,
            index // 배열 담은 pages를 map으로 만들어서 반복문 페이지번호 생성
          ) => (
            <button
              key={index}
              value={num}
              onClick={(e) => setPage(Number(e.target.value))}
            >
              {num}
            </button>
          )
        )}
        <FaAngleRight
          onClick={
            () => (page < totalPage ? setPage(page + 1) : setPage(totalPage)) // 현재 페이지에서 한칸 뒤로
          }
        />
        <FaAnglesRight onClick={() => setPage(totalPage)} />
        {/* 가장 마지막 페이지로 */}
      </div>
    </Div>
  );
};

export default UserQnaList;

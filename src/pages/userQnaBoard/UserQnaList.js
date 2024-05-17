import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { userSave } from "../../store/user";
import { getUserQuestions, getliked, updateviewcount } from "../../api/userQnaQuestion";
import { getUserAnswers } from "../../api/userQnaAnswer";
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
  // ======== 폰트 관련
  @font-face {
    font-family: "TAEBAEKmilkyway";
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2310@1.0/TAEBAEKmilkyway.woff2")
      format("woff2");
    font-weight: normal;
    font-style: normal;
  }

  // ========  버튼 관련
  .content a {
    text-decoration: none;
    border-radius: 5px;
    border: 2px solid;
    color: rgb(32, 61, 59);
    text-decoration: none;
    padding: 10px;
    font-size: 1rem;
    align-items: center;
  }
  .content a:hover {
    background-color: rgb(32, 61, 59);
    color: white;
  }

  position: relative;
  top: 130px;
  #topbar {
    font-family: "TAEBAEKmilkyway";
    font-weight: bold;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    padding: 30px;

    height: 100px;
    width: 90%;
    margin: 0 auto;
    border: 2px dashed gray;
    border-radius: 15px;
    button{
      font-weight:bold;
    }

    select {
      font-family: "TAEBAEKmilkyway";
      font-weight: bold;
      width: 150px;
      height: 30px;
      border: 1px solid gray;
      border-radius: 7px;
      option {
        font-family: "TAEBAEKmilkyway";
        font-weight: bold;
      }
    }

    #filter {
      width: 50%;
      margin: auto auto;
      display: flex;
      justify-content: space-between;
      div {
        display: flex;
      }
      span {
        margin: auto 10px;
      }
    }
  }

  #search {
    display: flex;
    justify-content: space-between;
    width: 600px;
    height: 35px;
    margin: 0 auto;

    select {
      margin-left: 10px;
      margin-top: 2px;
      width: 80px;
    }

    input {
      font-weight: bold;
      width: 300px;
      margin-top: 2px;
      height: 30px;
      border: 1px solid gray;
    }
  }

  button {
    width: 100px;
    border-radius: 5px;
    color: white;
    height: 35px;
    background-color: gray;
    border: 1px solid gray;
    font-family: "TAEBAEKmilkyway";
    font-weight: bold;
  }

  #topbarsecond {
    width: 90%;
    margin: 10px auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-family: "TAEBAEKmilkyway";
    font-weight: bold;
    span {
      font-family: "TAEBAEKmilkyway";
      font-weight: bold;
      margin-left: 30px;
      margin-top: 5px;
      width: 100px;
    }
    button {
      margin-right: 20px;
    }
  }
  #like {
    display: flex;
    flex-direction: row;
    span {
      margin-left: 10px;
    }
  }

  .paging {
    width: 100%;
    padding-top: 30px;
    text-align: center;
    font-family: "TAEBAEKmilkyway";

    button {
      font-weight: bold;
      width: 25px;
      height: 28px;
      border-radius: 5px;
      border: 1px solid gray;
      background-color: white;
      color: black;
      margin: 5px;
      padding: 0px;
    }
  }
  button {
    border: none;
    border-radius: 5px;
    padding: 5px;
    background-color: black;
    color: white;
  }
  button:hover {
    background-color: #94b29b;
  }
`;

const Table = styled.table`
  width: 90%;
  margin: 0 auto;
  font-family: "TAEBAEKmilkyway";
  font-weight: bold;
  thead {
    text-align: center;
    font-weight: bolder;
    th {
      height: 70px;
      padding-top: 20px;
      border-bottom: 2px solid;
    }
  }
  tbody {
    text-align: center;
    td {
      height: 50px;
      padding-top: 10px;
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
    console.log(response.data);
  };

  const [answercount, setAnswerCount] = useState(0);

  const answersAPI = async (code) => {
    const response = await getUserAnswers(code);
    setAnswerCount(response.data.length);
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

  const [select, setSelect] = useState("");
  const [status, setStatus] = useState(0);
  const [category, setCategory] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [sort, setSort] = useState(0);
  const [liked, setLiked] = useState(true);

  const search = async () => {
    const response = await getUserQuestions(
      page,
      select,
      keyword,
      category,
      status,
      sort
    );
    setQuestions(response.data);
    setTotalPage(response.data?.totalPages);
  };

  const filtering = async (e) => {
    const isChecked = e.target.checked;
    setLiked(isChecked);
    if (isChecked) {
      const response = await getliked(page, true);
      setQuestions(response.data);
      setTotalPage(response.data?.totalPages);
    } else {
      const response = await getliked(page, false); // 체크 해제 시에도 데이터를 가져올 필요가 있는지 확인해야 합니다.
      setQuestions(response.data);
      setTotalPage(response.data?.totalPages);
    }
  };

  const viewcount = async(code) => {
    await updateviewcount(code);
  }

  return (
    <Div>
      <div id="topbar">
        <div id="filter">
          <div id="sort">
            <span>정렬</span>
            <select onChange={(e) => setSort(e.target.value)}>
              <option value={1}>작성일 최신순</option>
              <option value={2}>작성일 오래된순</option>
              <option value={3}>답변 많은순</option>
              <option value={5}>좋아요순</option>
              <option value={4}>조회순</option>
            </select>
          </div>

          <div id="category">
            <span>동물</span>
            <select onChange={(e) => setCategory(e.target.value)}>
              <option value={0}>전체</option>
              <option value={1}>개</option>
              <option value={2}>고양이</option>
              <option value={3}>기타</option>
            </select>
          </div>

          <div id="status">
            <span>채택 답변 유무</span>
            <select onChange={(e) => setStatus(e.target.value)}>
              <option value={0}>전체</option>
              <option value={1}>Y</option>
              <option value={2}>N</option>
            </select>
          </div>
        </div>

        <div id="search">
          <div id="option">
            <span>검색 조건</span>
            <select onChange={(e) => setSelect(e.target.value)}>
              <option value={""}>전체</option>
              <option value={"title"}>제목</option>
              <option value={"content"}>내용</option>
              <option value={"id"}>작성자</option>
            </select>
          </div>
          <Form.Control
            type="text"
            placeholder="검색어를 입력하세요"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button onClick={search}>
            <IoSearch />
            조회
          </button>
        </div>
      </div>
      <div id="topbarsecond">
        <span>전체 {questions?.totalElements}건</span>
        {user.userId !== undefined ? (
          <div id="like">
            <div class="form-check form-switch">
              <input
                class="form-check-input"
                type="checkbox"
                id="flexSwitchCheckDefault"
                onChange={(e) => filtering(e)}
              />
              <label class="form-check-label" for="flexSwitchCheckDefault">
                좋아요한 글만 보기
              </label>
            </div>
          </div>
        ) : (
          <></>
        )}
        <div>
          {Object.keys(user).length === 0 ? (
            <>
              <button
                onClick={() => {
                  navigate("/compagno/login");
                }}
              >
                질문 등록
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  navigate("/compagno/userQna/register");
                }}
              >
                질문 등록
              </button>
            </>
          )}
        </div>
      </div>
      <Table>
        <thead>
          <tr>
            <th>질문 번호</th>
            <th>채택 여부</th>
            <th>제목</th>
            <th>작성자</th>
            <th>작성일</th>
            <th>좋아요수</th>
            <th>조회수</th>
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
                    onClick={() => viewcount(question.userQuestionBoardCode)}
                  >
                    {question.userQuestionBoardTitle}
                  </a>
                  <span>[{question.userQuestionBoardCount}]</span>
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
                <td>{question.likecount}</td>
                <td>{question.viewcount}</td>
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

import { manageQuestions } from "../../api/Question";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userSave } from "../../store/user";
import { useDispatch, useSelector } from "react-redux"
import moment from "moment";
import {
    FaAnglesLeft,
    FaAngleLeft,
    FaAngleRight,
    FaAnglesRight,
  } from "react-icons/fa6";
import styled from "styled-components";


const Div = styled.div`
  position: relative;
  top: 200px;
  Table {
    background-color: skyblue;
    width: 70%;
    margin: 0 auto;
  }
  .paging {
    width: 100%;
    padding-top: 30px;
    text-align: center;
    background-color: pink;
    button {
      background-color: white;
      border-radius: 5px;
      margin: 5px;
      font-weight: bolder;
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

const ManageQuestions = () => {
    const dispatch = useDispatch();

    
  // user 세팅
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
   const manageQuestionAPI = async () => {
     const response = await manageQuestions(page);
     console.log(response.data);
     setQuestions(response.data);
     setTotalPage((response.data.length)/10 +1); // response에서 totalPages 불러와서 set으로 담기
   };
   // 첫페이지, 마지막 페이지, 페이지 리스트 초기 셋팅
   let lastPage = 0;
   let firstPage = 0;
   let pageList = [];
 
   // 페이지가 변할 때마다 manageQuestionAPI() 실행
   useEffect(() => {
     manageQuestionAPI();
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

    // ===============================
      return (
        <Div>
          <div id="topbar">
              <p>전체 {questions.length}건</p>
          </div>
          <Table>
            <thead>
              <tr>
                <th>질문 번호</th>
                <th>제목</th>
                <th>작성자</th>
                <th>답변 여부</th>
                <th>작성일</th>
              </tr>
            </thead>
            <tbody>
            {questions?.map((question) => {
                return (
                    <tr key={question.qnaQCode}>
                        <td>{question.qnaQCode}</td>
                        <td><a href={`/compagno/question/detail/${question.qnaQCode}`}>
                      {question.qnaQTitle}
                    </a></td>
                        
                        <td>{question.userId}</td>
                        <td>{question.qnaQStatus}</td>
                        <td>{moment(question.qnaQDate).format("YY-MM-DD hh:mm")}</td>

                </tr>
                )
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

export default ManageQuestions;
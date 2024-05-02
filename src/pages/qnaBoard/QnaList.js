import { getQuestions } from "../../api/Question";
import { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { userSave } from "../../store/user";
import { useDispatch, useSelector } from "react-redux";
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
`;

const Table = styled.table`
  padding-top: 200px;
  margin-left: 400px;
  width: 50%;
  tbody {
    text-align: center;
  }
`;

const QnaList = () => {
  const navigate = useNavigate();
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
  const questionAPI = async () => {
    const response = await getQuestions(page);
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

  // ===============================
  const [search, setSearch] = useState({
    page: 1,
    qnaQTitle: "",
    qnaQContent: "",
  });

  // const [counts, setCounts] = useState(1); // 데이터 총 갯수

  // 입력한 비밀번호
  const [secretPwd, setSecret] = useState("");
  const [code, setCode] = useState("");

  // 모달창 구현
  const [modalShow, setModalShow] = useState(false);

  const CenterModal = (props) => {
    const [pwd, setPwd] = useState("");

    const pwdCheck = () => {
      console.log(secretPwd === pwd);
      console.log(code);
      if (secretPwd === pwd) {
        navigate("/compagno/question/detail/" + code);
      } else {
        alert("비밀번호가 일치하지 않습니다!");
        document.querySelector("#password").focus();
      }
    };

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            비밀글 확인 !
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>비밀글입니다. 비밀번호를 입력하세요.</p>
          <input
            type="password"
            id="password"
            onChange={(e) => {
              setPwd(e.target.value);
            }}
          />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>
            닫기
          </Button>
          <Button variant="primary" onClick={pwdCheck}>
            확인
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  return (
    <Div>
      <CenterModal show={modalShow} onHide={() => setModalShow(false)} />
      <div>
        <p>총 {questions.totalElements}건</p>
      </div>
      <Table>
        <thead>
          <tr>
            <th>질문 번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>답변 여부</th>
            <th>비밀글</th>
          </tr>
        </thead>
        <tbody>
          {questions.content?.map((question) => {
            return (
              <tr key={question.qnaQCode}>
                <td>{question.qnaQCode}</td>
                <td>
                  {question.secret === "" || question.secret == null ? (
                    // 비밀번호가 걸려있지 않을 때
                    <a href={`/compagno/question/detail/${question.qnaQCode}`}>
                      {question.qnaQTitle}
                    </a>
                  ) : (
                    <>
                      {user.userRole === "ROLE_ADMIN" ? (
                        <>
                          <a
                            href={`/compagno/question/detail/${question.qnaQCode}`}
                          >
                            {question.qnaQTitle}
                          </a>
                        </>
                      ) : (
                        <>
                          <a
                            href={`/compagno/question/detail/${question.qnaQCode}`}
                            onClick={(e) => {
                              e.preventDefault();
                              setModalShow(true);
                              setSecret(question.secret);
                              setCode(question.qnaQCode);
                              console.log(question.secret);
                            }}
                          >
                            {question.qnaQTitle}
                          </a>
                        </>
                      )}
                    </>
                  )}
                </td>
                <td>{question.userId}</td>
                <td>{question.qnaQStatus}</td>
                <td>
                  {question.secret === "" || question.secret == null
                    ? "N"
                    : "Y"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      {Object.keys(user).length === 0 ? (
        <>
          <Button
            onClick={() => {
              navigate("/compagno/login");
            }}
          >
            등록
          </Button>
        </>
      ) : (
        <>
          <Button
            onClick={() => {
              navigate("/compagno/question/register");
            }}
          >
            등록
          </Button>
        </>
      )}

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
export default QnaList;

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  viewDetail,
  getComments,
  writeComment,
  updateComment,
  delComment,
} from "../../api/animalBoard";
import { Link } from "react-router-dom";
import { Form, InputGroup, Button } from "react-bootstrap";
import styled from "styled-components";
import { FaReply, FaReplyAll } from "react-icons/fa";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import Dropdown from "react-bootstrap/Dropdown";
// import DropdownToggle from "../../components/animalBoard/Dropdown";
import React from "react";
import ReplyComment from "../../components/animalBoard/ReplyComment";
import Header from "../../components/Header";

const Comment = styled.div`
  display: flex;

  flex-direction: column;
  align-items: center;
  /* width: 1200px; */
  margin: auto;
  .contents-container {
    /* background-color: greenyellow; */
    width: 800px;
  }
  .animal-board-comment {
    margin: auto;
    display: flex;

    .user-action-container {
      display: flex;
      flex-direction: column;
      margin: 10px 0px 30px 10px;
      /* background-color: red; */
      /* width: 1200px; */
      .animal-board-comment-userability {
        margin-bottom: 15px;
        display: flex;
        .response {
          cursor: pointer;
        }
      }
      .update-comment-content {
        border: 1px solid grey;
      }
      .dropdown-toggle {
        cursor: pointer;
      }
    }
  }
`;

const Detail = () => {
  const { animalBoardCode } = useParams();
  // console.log(animalBoardCode);
  // 현재 게시글 정보 불러오기
  const [detailInfo, setDetail] = useState({
    userName: "",
    animalType: "",
    animalBoardTitle: "",
    animalBoardContent: "",
    animalCategory: [],
    animalBoardDate: "",
    animalBoardView: 0,
  });

  const animalBoardAPI = async () => {
    const response = await viewDetail(animalBoardCode);
    // console.log(response);
    setDetail(response.data);
    // console.log(response.data);s
  };

  // 댓글 불러오기
  const [comments, setComments] = useState([]);
  const animalBoardCommentAPI = async () => {
    const response = await getComments(animalBoardCode);
    // console.log(response.data);
    setComments(response.data);
  };

  // 조회수
  // const [count, setCount] = useState({
  //   animalBoardView: 0
  // });
  // const viewAPI = async ()=>{
  //  const response = await viewCount(animalBoardCode);
  //  console.log(response.data)
  //  setCount(response);
  // }
  // ======================================================================
  // 댓글쓰기
  const [comment, setComment] = useState({
    animalBoardCode: animalBoardCode,
    user: {
      userId: "pigeon111",
      userNickname: "비둘기111",
    },
    animalCommentContent: "",
  });
  const addComment = async () => {
    await writeComment(comment);
    // console.log(comment);
    setComment({});
    animalBoardCommentAPI();
  };
  //댓글 수정버튼 - 기존 해당 댓글내용 가져오기
  const [edit, setEdit] = useState({});
  const onUpdate = async (comment) => {
    console.log(comment);
    setEdit(comment);
    // console.log(edit);
  };
  //댓글 수정하기
  const updateCommentC = async () => {
    await updateComment(edit);
    console.log(edit);
    animalBoardCommentAPI();
  };
  // 댓글 수정 취소
  const onCancel = () => {
    setEdit({});
  };
  // 댓글 삭제
  const onDelete = async (animalCommentCode) => {
    await delComment(animalCommentCode);
    animalBoardCommentAPI();
  };

  // 대댓글 달기
  const [boolean, setBoolean] = useState(false); // 추후 유저정보 토대로 boolean 예정
  const [response, setResponse] = useState({}); // 부모 댓글 정보
  const [responseReply, setResponseReply] = useState({
    // 대댓글로 보낼 정보
    animalBoardCode: animalBoardCode,
    animalParentCode: comment.animalCommentCode,
    animalCommentContent: "",
    user: {
      userId: "pigeon111",
      userNickname: "비둘기111",
    },
  });
  const accessReply = async (comment) => {
    setResponse(comment); // 현재 클릭한 아이의 댓글정보
    console.log(comment);

    // if(user === null){
    //   alert("로그인 후 입력가능!")
    // }
    if (boolean) {
      setBoolean(false);
    } else {
      setBoolean(true);
    }
  };
  const addReply = async () => {
    setResponseReply(responseReply);
    console.log(responseReply);
    await writeComment(responseReply);
  };
  // 토글
  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <HiOutlineDotsHorizontal
      className="dropdown-toggle"
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    />
  ));

  useEffect(() => {
    animalBoardAPI();
    animalBoardCommentAPI();
    // viewAPI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animalBoardCode]);

  return (
    <>
      <Header />
      <div className="App">
        <div className="container">
          <div className="row">
            <h1> 아마도 nav 관련이 여기</h1>
            <Link to="/compagno/write-board"> 글쓰기! </Link>
            <Link to={`/compagno/edit-board/${detailInfo.animalBoardCode}`}>
              수정하기
            </Link>

            <div className="post__list">
              <h2>
                {detailInfo.animalCategory.animalType}
                {detailInfo.animalBoardTitle}
              </h2>

              <div
                className="post__description"
                dangerouslySetInnerHTML={{
                  __html: detailInfo.animalBoardContent,
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="animal-board-comment container-sm">
        <InputGroup>
          <Form.Control
            as="textarea"
            aria-label="With textarea"
            value={comment.value}
            onChange={(e) =>
              setComment((prev) => ({
                ...prev,
                animalCommentContent: e.target.value,
              }))
            }
          />
          <InputGroup.Text>무언가 꾸밀수 있는곳</InputGroup.Text>
          <Button variant="secondary" onClick={addComment}>
            댓글추가!
          </Button>
        </InputGroup>
      </div>
      <Comment className="animal-board-comment-contents">
        {comments.map((comment) => (
          <div className="contents-container" key={comment.animalCommentCode}>
            {edit.animalCommentCode === comment.animalCommentCode ? (
              <>
                <div className="animal-board-comment ">
                  <label>userImage</label>
                  <div className="user-action-container">
                    <div className="animal-board-comment-userability">
                      <p>
                        {edit.user.userNickname} {edit.animalCommentDate}
                      </p>

                      <FaReply />
                    </div>
                    <textarea
                      className="update-comment-content"
                      value={edit.animalCommentContent}
                      onChange={(e) =>
                        setEdit((prev) => ({
                          ...prev,
                          animalCommentContent: e.target.value,
                        }))
                      }
                    ></textarea>
                  </div>
                  <div className="btn-container">
                    <Button
                      variant="primary"
                      onClick={() => {
                        updateCommentC(edit);
                      }}
                    >
                      완료
                    </Button>
                    <Button variant="info" onClick={onCancel}>
                      취소
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="animal-board-comment ">
                  <label>userImage</label>
                  <div className="user-action-container">
                    <div className="animal-board-comment-userability">
                      <p>
                        {comment.user.userNickname} {comment.animalCommentDate}
                      </p>
                      <FaReply
                        className="response"
                        onClick={() => accessReply(comment)}
                      />
                      {/* <DropdownToggle comment={comment} /> */}
                      <Dropdown>
                        <Dropdown.Toggle
                          as={CustomToggle}
                          id="dropdown-custom-components"
                        ></Dropdown.Toggle>
                        <Dropdown.Menu className="dropdown-menu">
                          <Dropdown.Item onClick={() => onUpdate(comment)}>
                            수정하기
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => onDelete(comment.animalCommentCode)}
                          >
                            삭제하기
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                    <div>{comment.animalCommentContent}</div>
                  </div>
                </div>
                <div className="response-to-comment">
                  {boolean &&
                  comment.animalCommentCode === response.animalCommentCode ? (
                    <>
                      <InputGroup>
                        <InputGroup.Text>
                          @{comment.user.userNickname}
                        </InputGroup.Text>
                        <Form.Control
                          as="textarea"
                          aria-label="With textarea"
                          value={response.value}
                          onChange={(e) =>
                            setResponseReply((prev) => ({
                              ...prev,
                              animalCommentContent: e.target.value,
                            }))
                          }
                        />
                        <Button variant="secondary" onClick={addReply}>
                          대댓글추가!
                        </Button>
                        <Button
                          variant="light"
                          onClick={() => setBoolean(false)}
                        >
                          취소
                        </Button>
                      </InputGroup>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </>
            )}
            <ReplyComment replies={comment.replies} />
          </div>
        ))}
      </Comment>
    </>
  );
};
export default Detail;

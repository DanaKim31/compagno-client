import {
  viewOneAdopBoard,
  addTopCommentAdop,
  viewCommentAdop,
  deleteCommentAdop,
  updateCommentAdop,
  addBottomCommentAdop,
  viewAllCommentAdop,
} from "../../api/adoptionBoard";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userSave } from "../../store/user";
import styled from "styled-components";
import moment from "moment";
import "moment/locale/ko";
import { BsCaretDownFill, BsCaretUpFill } from "react-icons/bs";
import {
  FaAngleLeft,
  FaAnglesLeft,
  FaAngleRight,
  FaAnglesRight,
} from "react-icons/fa6";
import MyToggleBar from "../note/MyToggleBar";

const Div = styled.div`
  @font-face {
    font-family: "TAEBAEKmilkyway";
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2310@1.0/TAEBAEKmilkyway.woff2")
      format("woff2");
    font-weight: normal;
    font-style: normal;
  }
  font-family: "TAEBAEKmilkyway";
  font-weight: bold;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  top: 180px;
  #btnPage {
    &:hover {
      background-color: rgb(32, 61, 59);
      color: white;
    }
  }
`;

const Comments = () => {
  // 유저정보 가지고온다
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
  const { code } = useParams();
  const [adop, setAdop] = useState([]);
  const viewsAPI = async () => {
    const response = await viewOneAdopBoard(code);
    setAdop(response.data);
  };
  useEffect(() => {
    viewsAPI();
  }, []);

  // 페이징
  const [page, setPage] = useState(1);
  const [totalComments, setTotalComments] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [pages, setPages] = useState([]);

  // 댓글 보기
  const [comments, setComments] = useState([]);
  const commentsAPI = async () => {
    const response = await viewCommentAdop(code, page);
    const responseAll = await viewAllCommentAdop(code);

    setTotalComments(responseAll.data.length);
    setTotalPage(Math.ceil(responseAll.data.length / 5));
    setComments(response.data);
  };

  useEffect(() => {
    commentsAPI();
  }, []);

  useEffect(() => {
    commentsAPI();
  }, [page]);

  let lastPage = 0;
  let firstPage = 0;
  let pageList = [];

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

  // 댓글 작성
  const [topComments, setTopComments] = useState({
    userImg: user.userImg,
    userNickname: user.userNickname,
    userId: user.userId,
    commentContent: "",
    adopBoardCode: code,
  });
  const okCreate = async () => {
    await addTopCommentAdop(topComments);
    setTopComments({
      userImg: user.userImg,
      userNickname: user.userNickname,
      userId: user.userId,
      commentContent: "",
      adopBoardCode: code,
    });
    commentsAPI();
  };

  // 댓글 삭제
  const delComment = async (data) => {
    await deleteCommentAdop(data);
    commentsAPI();
  };

  // 댓글 수정
  const [edit, setEdit] = useState({});
  const updateBtn = async (comment) => {
    setEdit({
      commentContent: comment.commentContent,
      adopBoardCode: code,
      adopCommentCode: comment.adopCommentCode,
      adopParentCode: 0,
      commentDate: moment().format("YYYY-MM-DD hh:mm:ss"),
      user: {
        userId: user.userId,
        userNickname: user.userNickname,
        userImg: user.userImg,
      },
    });
  };
  const updateComment = async () => {
    await updateCommentAdop(edit);
    setEdit({});
    commentsAPI();
  };

  //수정 취소
  const delUpdate = () => {
    setEdit({});
    setEdit({ adopParentCode: 0 });
    commentsAPI();
  };

  // 대댓글 작성
  const [bottomComments, setBottomComments] = useState({
    userImg: user.userImg,
    userNickname: user.userNickname,
    userId: user.userId,
    commentContent: "",
    adopBoardCode: code,
    adopParentCode: "",
  });

  // 대댓글 작성 완료
  const okBottomWrite = async () => {
    await addBottomCommentAdop(bottomComments);
    setViewBottomCode(bottomComments.adopParentCode);
    setViewBottomBtn(true);
    setBottomComments({
      adopParentCode: "",
      commentContent: "",
      adopBoardCode: code,
    });
    commentsAPI();
  };

  // 대댓글 작성 취소
  const delBottomWrite = () => {
    setBottomComments({ adopParentCode: "" });
    commentsAPI();
  };

  // 버튼 클릭 시 대댓글 전체 보기
  const [viewBottomBtn, setViewBottomBtn] = useState(false);
  const [viewBottomCode, setViewBottomCode] = useState(0);
  const viewAllBottom = (e) => {
    setViewBottomCode(e);
    setViewBottomBtn(true);
  };

  const viewAllNotBottom = () => {
    setViewBottomBtn(false);
  };
  return (
    <Div>
      <div
        id="commentBox"
        style={{
          marginTop: "30px",
          display: "block",
          justifyContent: "center",
          width: "60%",
          marginBottom: "20px",
        }}
      >
        <h4 style={{ fontWeight: "bold", marginBottom: "10px" }}>댓글</h4>
        {user.userNickname !=
        null /* userNickname있어야지만 댓글 작성 폼 나타남 --------------------------------*/ ? (
          <div
            id="commentWrite"
            style={{
              border: "1px solid black",
              display: "flex",
              flexDirection: "column",
              borderRadius: "10px",
            }}
          >
            <div
              id="user"
              style={{
                margin: "10px 10px",
                display: "flex",
              }}
            >
              <img
                // src={"http://localhost:8081/upload/" + user.userImg}
                src={"http://192.168.10.28:8081/" + user.userImg}
                id="userImg"
                style={{
                  width: "35px",
                  height: "35px",
                  borderRadius: "50%",
                  border: "0.3px solid black",
                  marginRight: "10px",
                }}
              />
              {/* {user.userNickname} */}
              <MyToggleBar name={user.userNickname} />
            </div>
            <div
              id="boxAndBtn"
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                paddingBottom: "20px",
              }}
            >
              <textarea
                style={{ resize: "none", width: "80%", fontWeight: "bold" }}
                value={topComments.commentContent}
                onChange={(e) =>
                  setTopComments((prev) => ({
                    ...prev,
                    commentContent: e.target.value,
                  }))
                }
              ></textarea>
              <button
                onClick={okCreate}
                style={{
                  margin: "5px 10px",
                  fontWeight: "bold",
                  borderRadius: "15px",
                }}
              >
                등록
              </button>
            </div>
          </div>
        ) : (
          /* userNickname 없으면 댓글 작성 폼 안나타남 ----------------------------------------------------------------- */
          <h5
            style={{ color: "green", fontWeight: "bold", fontSize: "0.9rem" }}
          >
            댓글 및 대댓글 작성은 회원만 가능합니다.
          </h5>
        )}
        {/* 여기는 작성된 댓글들 보이는 곳 ---------------------------------------------------------------------------------- */}
        <div
          id="commetsViewAll"
          style={{
            marginTop: "20px",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "end",
          }}
        >
          {/* 상위 댓글들 반복 돌리기 ----------------------------------------------------------------------------- */}
          {comments?.map((comment) => (
            <div
              key={comment.adopCommentCode}
              id="contentBtn"
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <div
                id="commentsImgAndContent"
                style={{
                  width: "75%",
                  marginTop: "15px",
                  display: "flex",
                  borderBottom: "1px solid green",
                  paddingBottom: "10px",
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div
                  id="topImgAndContents"
                  style={{ display: "flex", width: "-webkit-fill-available" }}
                >
                  <div id="userImg">
                    <img
                      style={{
                        width: "35px",
                        height: "35px",
                        borderRadius: "50%",
                        border: "0.3px solid black",
                        marginRight: "10px",
                        alignContent: "center",
                      }}
                      // src={
                      //   "http://localhost:8081/upload/" + comment.user.userImg
                      // }
                      src={"http://192.168.10.28:8081/" + comment.user.userImg}
                    />
                  </div>
                  <div
                    id="firstSection"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                    }}
                  >
                    <div
                      id="commentsContent"
                      style={{ width: "100%", fontSize: "0.7rem" }}
                    >
                      {/* 상위 수정 코드와 상위 댓글 코드 같을 때만 수정 박스 나오도록 ------------------------------------- */}
                      {/* 수정 박스는 없어도 화살표로 인해 대댓이 보이긴 해야 함 -------------------------------------- */}
                      {edit.adopCommentCode == comment.adopCommentCode ? (
                        <div id="topComemntUpdateBox">
                          <p
                            id="userNickname"
                            style={{ marginBottom: "5px", fontSize: "0.9rem" }}
                          >
                            {" "}
                            <MyToggleBar name={comment.user.userNickname} />
                          </p>
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <textarea
                              style={{
                                resize: "none",
                                width: "500px",
                                fontWeight: "bold",
                              }}
                              value={edit.commentContent}
                              onChange={(e) =>
                                setEdit((prev) => ({
                                  ...prev,
                                  commentContent: e.target.value,
                                }))
                              }
                            ></textarea>
                            <div style={{ marginLeft: "10px" }}>
                              <button
                                onClick={updateComment}
                                style={{
                                  fontWeight: "bold",
                                  borderRadius: "5px",
                                  border: "none",
                                  backgroundColor: "gray",
                                  color: "white",
                                }}
                              >
                                수정 완료
                              </button>
                              <button
                                onClick={delUpdate}
                                style={{
                                  marginLeft: "10px",
                                  fontWeight: "bold",
                                  borderRadius: "5px",
                                  border: "none",
                                  backgroundColor: "black",
                                  color: "white",
                                }}
                              >
                                수정 취소
                              </button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        // 수정 안하는 경우(기본 댓글 내용만 보이도록)
                        // 수정 박스는 없어도 화살표로 인해 대댓이 보이긴 해야 함 --------------------------------------
                        <div
                          id="contentsAndBtn"
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "100%",
                          }}
                        >
                          <div
                            id="nameAndContent"
                            style={{
                              display: "flex",
                              flexDirection: "column",
                            }}
                          >
                            <div
                              id="writerPoint"
                              style={{
                                display: "flex",
                                alignItems: "center",
                                marginBottom: "7px",
                              }}
                            >
                              <p
                                id="userNickname"
                                style={{ marginBottom: "0px" }}
                              >
                                <MyToggleBar name={comment.user.userNickname} />
                              </p>
                              {comment.user.userNickname ==
                              adop.userNickname ? (
                                <span
                                  id="bottomWriter"
                                  style={{
                                    marginLeft: "9px",
                                    border: "1px solid green",
                                    fontWeight: "bold",
                                    borderRadius: "30px",
                                    padding: "3px 5px",
                                    fontSize: "0.5rem",
                                  }}
                                >
                                  작성자
                                </span>
                              ) : (
                                <></>
                              )}
                            </div>
                            <p
                              id="commentContent"
                              style={{ marginBottom: "0px" }}
                            >
                              {comment.commentContent}
                            </p>
                          </div>
                          {/* 기본 글 밑으로 대댓글이 전부 보이도록 해야 함~ */}
                          {/* 조건은 버튼 클릭으로 인한 viewBottomBtn=true, viewBottomCode==comment.adopCommentCode */}

                          {/* 수정&삭제 버튼 -> 현재 user와 글쓴이의 user가 같을 때 */}
                          {user.userId == comment.user.userId ? (
                            <div>
                              <button
                                onClick={() => updateBtn(comment)}
                                style={{
                                  fontWeight: "bold",
                                  borderRadius: "5px",
                                  border: "none",
                                  backgroundColor: "gray",
                                  color: "white",
                                }}
                              >
                                수정
                              </button>
                              <button
                                style={{
                                  marginLeft: "10px",
                                  fontWeight: "bold",
                                  borderRadius: "5px",
                                  border: "none",
                                  backgroundColor: "black",
                                  color: "white",
                                }}
                                onClick={() =>
                                  delComment(comment.adopCommentCode)
                                }
                              >
                                삭제
                              </button>
                              <div
                                style={{
                                  fontSize: "0.7rem",
                                  marginTop: "5px",
                                }}
                              >
                                {moment(comment.commentDate).format(
                                  "YY-MM-DD hh:mm"
                                )}
                              </div>
                            </div>
                          ) : (
                            <>
                              {moment(comment.commentDate).format(
                                "YY-MM-DD hh:mm"
                              )}
                            </>
                          )}
                        </div>
                      )}
                      {/* 위에 괄호에서 이미 수정 버튼 눌렀을 때  */}
                      {/* 즉 여기서 대댓글 반복문이 돌아야 함 */}
                    </div>
                    <div>
                      {viewBottomBtn &&
                      viewBottomCode == comment.adopCommentCode ? (
                        <div>
                          {comment.replies.map((bottom) => (
                            <div
                              key={bottom.adopCommentCode}
                              style={{
                                display: "flex",
                                margin: "10px 0px",
                                borderTop: "0.5px dashed gray",
                                paddingTop: "10px",
                                width: "700px",
                              }}
                            >
                              <div
                                id="bottomUserImg"
                                style={{ marginRight: "10px" }}
                              >
                                <img
                                  style={{
                                    width: "25px",
                                    height: "25px",
                                    borderRadius: "50%",
                                  }}
                                  // src={
                                  //   "http://localhost:8081/upload/" +
                                  //   bottom.user.userImg
                                  // }
                                  src={
                                    "http://192.168.10.28:8081/" +
                                    bottom.user.userImg
                                  }
                                />
                              </div>
                              <div
                                id="bottomUserContent"
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  width: "100%",
                                }}
                              >
                                {/* 건들일부분 시작 */}
                                <div
                                  id="userWriter"
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  {/* 나눠야 할 part1 */}
                                  <span
                                    id="bottomName"
                                    style={{
                                      fontSize: "0.8rem",
                                      paddingTop: "5px",
                                      display: "flex",
                                    }}
                                  >
                                    <MyToggleBar
                                      name={bottom.user.userNickname}
                                    />
                                    {adop.userId == bottom.user.userId ? (
                                      // <div
                                      //   id="bottomWriterBtn"
                                      //   style={{
                                      //     display: "flex",
                                      //     height: "27px",
                                      //     width: "79%",
                                      //     justifyContent: "space-between",
                                      //     paddingTop: "6px",
                                      //   }}
                                      // >
                                      <span
                                        id="bottomWriter"
                                        style={{
                                          marginLeft: "9px",
                                          border: "1px solid green",
                                          fontWeight: "bold",
                                          borderRadius: "30px",
                                          padding: "3px 5px",
                                          fontSize: "0.5rem",
                                          display: "flex",
                                          justifyContent: "center",
                                          alignItems: "center",
                                          height: "60%",
                                        }}
                                      >
                                        작성자
                                      </span>
                                    ) : (
                                      // </div>
                                      <></>
                                    )}
                                  </span>
                                  {/* 게시글 작성자와 댓글 작성자가 같을 때 -> 작성자 표시 */}

                                  {user.userId == bottom.user.userId &&
                                  edit.adopParentCode !=
                                    comment.adopCommentCode ? (
                                    <div
                                      style={{
                                        display: "flex",
                                        flexDirection: "column",
                                      }}
                                    >
                                      <div
                                        id="bottomBtn"
                                        style={{
                                          fontSize: "0.6rem",
                                          display: "flex",
                                          width: "70px",
                                        }}
                                      >
                                        <button
                                          style={{
                                            marginRight: "10px",
                                            fontWeight: "bold",
                                            borderRadius: "5px",
                                            border: "none",
                                            backgroundColor: "gray",
                                            color: "white",
                                          }}
                                          onClick={() =>
                                            setEdit({
                                              adopParentCode:
                                                comment.adopCommentCode,
                                              adopCommentCode:
                                                bottom.adopCommentCode,
                                              commentContent:
                                                bottom.commentContent,
                                              adopBoardCode: code,
                                              commentDate: moment().format(
                                                "YYYY-MM-DD hh:mm:ss"
                                              ),
                                              user: {
                                                userId: user.userId,
                                                userNickname: user.userNickname,
                                                userImg: user.userImg,
                                              },
                                            })
                                          }
                                        >
                                          수정
                                        </button>
                                        <button
                                          style={{
                                            fontWeight: "bold",
                                            borderRadius: "5px",
                                            border: "none",
                                            backgroundColor: "black",
                                            color: "white",
                                          }}
                                          onClick={() =>
                                            delComment(bottom.adopCommentCode)
                                          }
                                        >
                                          삭제
                                        </button>
                                      </div>
                                      <div
                                        style={{
                                          fontSize: "0.6rem",
                                        }}
                                      >
                                        {moment(bottom.commentDate).format(
                                          "YY-MM-DD hh:mm"
                                        )}
                                      </div>
                                    </div>
                                  ) : (
                                    <div style={{ fontSize: "0.6rem" }}>
                                      {moment(bottom.commentDate).format(
                                        "YY-MM-DD hh:mm"
                                      )}
                                    </div>
                                  )}
                                </div>

                                {edit.adopCommentCode ==
                                bottom.adopCommentCode ? (
                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      marginTop: "10px",
                                    }}
                                  >
                                    <textarea
                                      style={{
                                        resize: "none",
                                        width: "500px",
                                        fontWeight: "bold",
                                        fontSize: "0.8rem",
                                      }}
                                      value={edit.commentContent}
                                      onChange={(e) =>
                                        setEdit((prev) => ({
                                          ...prev,
                                          commentContent: e.target.value,
                                        }))
                                      }
                                    ></textarea>
                                    <div
                                      style={{
                                        marginLeft: "10px",
                                        display: "flex",
                                        fontSize: "0.6rem",
                                      }}
                                    >
                                      <button
                                        onClick={updateComment}
                                        style={{
                                          fontWeight: "bold",
                                          borderRadius: "5px",
                                          border: "none",
                                          backgroundColor: "gray",
                                          color: "white",
                                        }}
                                      >
                                        수정 완료
                                      </button>
                                      <button
                                        onClick={delUpdate}
                                        style={{
                                          marginLeft: "10px",
                                          fontWeight: "bold",
                                          borderRadius: "5px",
                                          border: "none",
                                          backgroundColor: "black",
                                          color: "white",
                                        }}
                                      >
                                        수정 취소
                                      </button>
                                    </div>
                                  </div>
                                ) : (
                                  <span
                                    id="bottomContent"
                                    style={{ fontSize: "0.7rem" }}
                                  >
                                    {bottom.commentContent}
                                  </span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                    {/* 대댓글 작성 추가 폼 */}

                    {comment.adopCommentCode !=
                    bottomComments.adopParentCode ? (
                      <></>
                    ) : (
                      <div
                        id="commentWrite"
                        style={{
                          marginTop: "10px",
                          width: "580px",
                          fontSize: "0.8rem",

                          border: "1px solid black",
                          borderRadius: "10px",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <div
                          id="user"
                          style={{
                            margin: "8px 10px",
                            display: "flex",
                          }}
                        >
                          <img
                            style={{
                              width: "25px",
                              height: "25px",
                              borderRadius: "50%",
                              border: "0.3px solid black",
                              marginRight: "10px",
                            }}
                            // src={
                            //   "http://localhost:8081/upload/" + user.userImg
                            // }
                            src={"http://192.168.10.28:8081/" + user.userImg}
                            id="userImg"
                          />
                          <MyToggleBar
                            name={user.userNickname}
                            style={{ zIndex: "1" }}
                          />
                          {/* {user.userNickname} */}
                        </div>
                        <div
                          id="boxAndBtn"
                          style={{
                            display: "flex",
                            width: "100%",
                            justifyContent: "center",
                            alignItems: "center",
                            paddingBottom: "20px",
                          }}
                        >
                          <textarea
                            style={{
                              height: "80%",
                              margin: "0px 10px",
                              fontWeight: "bold",
                              resize: "none",
                              width: "80%",
                            }}
                            value={bottomComments.commentContent}
                            onChange={(e) =>
                              setBottomComments((prev) => ({
                                ...prev,
                                commentContent: e.target.value,
                              }))
                            }
                          ></textarea>
                          <button
                            onClick={okBottomWrite}
                            style={{
                              width: "50px",
                              margin: "5px 7px",
                              borderRadius: "15px",
                              fontWeight: "bold",
                            }}
                          >
                            등록
                          </button>
                          <button
                            onClick={delBottomWrite}
                            style={{
                              width: "50px",
                              margin: "5px 7px",
                              borderRadius: "15px",
                              fontWeight: "bold",
                            }}
                          >
                            취소
                          </button>
                        </div>
                      </div>
                    )}
                    <div id="bottomWriteViewBtn" style={{ display: "flex" }}>
                      {/* 대댓글 쓰기 버튼 : 비회원일 경우 안보이도록 */}

                      {Object.keys(user).length == 0 ? (
                        <></>
                      ) : (
                        <button
                          style={{
                            border: "none",
                            fontSize: "0.7rem",
                            fontWeight: "bold",
                            width: "70px",
                            marginTop: "5px",
                            backgroundColor: "white",
                            color: "green",
                          }}
                          onClick={() =>
                            setBottomComments((prev) => ({
                              ...prev,
                              adopParentCode: comment.adopCommentCode,
                            }))
                          }
                        >
                          대댓글 쓰기
                        </button>
                      )}

                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <BsCaretUpFill
                          style={{
                            fontSize: "0.9rem",
                            cursor: "pointer",
                            marginRight: "0px",
                          }}
                          onClick={viewAllNotBottom}
                        />
                        <BsCaretDownFill
                          style={{
                            fontSize: "0.9rem",
                            cursor: "pointer",
                            marginLeft: "0px",
                          }}
                          onClick={() => viewAllBottom(comment.adopCommentCode)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div
          id="pagingBtn"
          style={{
            width: "65%",
            textAlign: "center",
            margin: "20px 0px",
            position: "absolute",
            paddingBottom: "20px",
          }}
        >
          <FaAnglesLeft
            className="iconPaging"
            onClick={() => setPage(1)}
            style={{ cursor: "pointer" }}
          />
          <FaAngleLeft
            style={{ cursor: "pointer" }}
            className="iconPaging"
            onClick={() => (page > 1 ? setPage(page - 1) : setPage(1))}
          />
          {pages.map((num, index) => (
            <>
              <button
                id="btnPage"
                key={index}
                value={num}
                onClick={(e) => setPage(Number(e.target.value))}
                style={{
                  fontWeight: "bold",
                  width: "25px",
                  height: "28px",
                  borderRadius: "5px",
                  border: "1px solid gray",
                  backgroundColor: "white",
                  color: "black",
                  margin: "5px",
                }}
              >
                {num}
              </button>
            </>
          ))}
          <FaAngleRight
            style={{ cursor: "pointer" }}
            className="iconPaging"
            onClick={() =>
              page < totalPage ? setPage(page + 1) : setPage(totalPage)
            }
          />
          <FaAnglesRight
            style={{ cursor: "pointer" }}
            className="iconPaging"
            onClick={() => setPage(totalPage)}
          />
        </div>
      </div>
    </Div>
  );
};
export default Comments;

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getSitterBoard,
  deleteSitterBoard,
  sitterBoardBookmark,
  getSitterComments,
  registerSitterComment,
  registerSitterReply,
  updateSitterComment,
  deleteSitterComment,
} from "../../api/sitterBoard";
import MyToggleBar from "../../components/note/MyToggleBar";
import { useDispatch, useSelector } from "react-redux";
import { userSave } from "../../store/user";
import { Form, Button } from "react-bootstrap";
import { FaBookmark, FaRegBookmark } from "react-icons/fa6";
import moment from "moment";
import styled from "styled-components";

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
  width: 90%;
  margin: auto;

  h1 {
    margin-bottom: 100px;
  }

  .board-area {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 10px;

    .title-btns {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px;
      border-bottom: 2px solid #455c58ff;

      .category-title {
        display: flex;
        align-items: center;

        .board-category {
          font-size: 1.2rem;
          background: #455c58ff;
          color: white;
          padding: 3px 10px;
          border-radius: 5px;
          margin-right: 15px;
        }
        .board-title {
          font-size: 2rem;
          font-weight: bold;
        }
      }

      .board-btns {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 180px;

        .bookmark {
          font-size: 2rem;
          margin-right: 10px;
        }

        button {
          width: 60px;
          height: 40px;
          background: black;
          color: white;
          border-radius: 5px;
        }
      }
    }

    .writer-date {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 15px;

      .writer {
        font-weight: bold;
      }

      .date-group {
        display: flex;

        .update-date {
          padding-right: 25px;
          color: darkgray;
        }
      }
    }

    .animal-location {
      width: 100%;
      padding: 40px 15px 20px 15px;
      display: flex;
      justify-content: space-between;
      font-size: 1.2rem;
      text-align: center;

      .animal-category {
        width: 50%;
        display: flex;
        flex-direction: row;
      }

      .location {
        width: 50%;
        display: flex;
        flex-direction: row;
      }

      #title {
        padding-right: 20px;
        margin-right: 20px;
        font-weight: bold;
        border-right: 2px solid gray;
      }
    }

    .content-image {
      width: 100%;
      padding: 15px 20px;
      border: 1px solid gray;
      border-radius: 5px;

      .board-content {
        height: 300px;
        font-size: 1.2rem;
      }

      .image {
        border-top: 1px solid lightgray;
        img {
          height: 200px;
          padding: 0 10px;
          margin-top: 20px;
        }
      }
    }
  }

  .back-btn-area {
    width: 100%;
    margin-bottom: 40px;

    .back-btn {
      width: 90px;
      height: 40px;
      background: black;
      color: white;
      border-radius: 5px;
      cursor: pointer;
    }
  }

  .comment-area {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    .comment-input {
      display: flex;
      justify-content: space-around;
      width: 100%;
      margin: auto;
      margin-bottom: 30px;
    }

    .input {
      width: 88%;
      height: 40px;
    }
    button {
      width: 10%;
      height: 40px;
      background: black;
      color: white;
      border-radius: 5px;
      cursor: pointer;
    }

    .comment-list {
      height: 50vh;
      overflow-y: auto;
      width: 95%;
      margin-bottom: 10px;

      .each-comment {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px;
        border-top: 1px solid lightgray;

        .user-date-content {
          width: 100%;
        }
        .user-date {
          display: flex;
          align-items: center;

          #comment-user {
            margin-right: 10px;
            font-weight: bolder;
            font-size: 0.9rem;
          }
          #comment-date {
            font-size: 0.8rem;
            color: gray;
            margin-right: 7px;
          }
          #comment-time {
            font-size: 0.8rem;
            color: gray;
          }
        }

        #comment-content {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0;
          padding-top: 8px;
          padding-left: 5px;
        }

        .comment-btns {
          width: 130px;
          display: flex;
          justify-content: space-between;

          button {
            width: 60px;
            margin-left: 10px;
          }
        }
      }
      .each-comment:hover {
        background: lightgray;
        border-radius: 5px;
      }
    }
  }
`;

const SitterDetail = () => {
  const { code } = useParams();
  const [sitterBoard, setSitterBoard] = useState({});
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [commentEdit, setCommentEdit] = useState(null);
  const [commentEditCode, setCommentEditCode] = useState(0);
  const [commentEditContent, setCommentEditConent] = useState("");
  const [replyCode, setReplyCode] = useState(0);
  const [replyContent, setReplyContent] = useState("");

  // ================= 유저정보 =================
  const user = useSelector((state) => {
    return state.user;
  });

  const sitterBoardAPI = async () => {
    const result = await getSitterBoard(code);
    setSitterBoard(result.data);
  };

  const sitterCommentsAPI = async () => {
    const result = await getSitterComments(code);
    setComments(result.data);
  };

  useEffect(() => {
    if (token !== null) {
      dispatch(userSave(JSON.parse(localStorage.getItem("user"))));
    }
    sitterBoardAPI(code);
    sitterCommentsAPI();
  }, []);

  // ================= 북마크 =================
  const bookmark = async (code) => {
    if (token === null) {
      alert("로그인 화면으로 이동합니다.");
      return false;
    }
    await sitterBoardBookmark({
      sitterBoardCode: code,
      userId: user.userId,
    });
    sitterBoardAPI();
  };

  // ================= 게시글 수정 =================
  const updateBoard = () => {
    navigate("/compagno/sitterBoard/edit/" + code);
  };

  // ================= 게시글 삭제 =================
  const deleteBoard = async () => {
    await deleteSitterBoard(code);
    alert("게시글이 삭제됐습니다.");
    navigate("/compagno/sitterBoard");
  };

  // ================= 목록으로 돌아가기 =================
  const backToList = async () => {
    navigate("/compagno/sitterBoard");
  };

  // ================= 댓글 등록 =================
  const registerComment = async () => {
    if (token === null) {
      alert("로그인이 필요합니다.");
      navigate("/compagno/login");
    } else {
      await registerSitterComment({
        sitterBoardCode: code,
        sitterCommentContent: comment,
        user: {
          userNickname: user.userNickname,
        },
      });
      setComment("");
      sitterCommentsAPI();
    }
  };

  // ================= 댓글 삭제 =================
  const deleteComment = async (code) => {
    await deleteSitterComment(code);
    sitterCommentsAPI();
  };

  // ================= 댓글 수정 =================
  // 목록에서 수정버튼 선택
  const editComment = (comment) => {
    setCommentEdit(comment);
  };
  useEffect(() => {
    console.log(commentEdit);
  }, [commentEdit]);

  // 수정화면에서 취소버튼 선택
  const cancelEdit = () => {
    setCommentEdit(null);
  };

  // 수정화면에서 완료버튼 선택
  const commentUpdate = async () => {
    await updateSitterComment(commentEdit);
    navigate("compagno/sitterBoard/detail/" + code);
  };

  return (
    <Div>
      <h1>Detail</h1>

      <div className="board-area">
        <div className="title-btns">
          <div className="category-title">
            <div className="board-category">
              {sitterBoard.sitterCategory?.sitterCategoryType}
            </div>
            <div className="board-title">{sitterBoard.sitterTitle}</div>
          </div>

          {user.userNickname === sitterBoard.user?.userNickname && (
            <div className="board-btns">
              {sitterBoard.bookmark?.filter(
                (bookmark) => bookmark.user.userId === user.userId
              ).length === 0 ? (
                <FaRegBookmark
                  className="bookmark"
                  onClick={(e) => {
                    e.stopPropagation();
                    bookmark(sitterBoard.sitterBoardCode);
                  }}
                />
              ) : (
                <FaBookmark
                  className="bookmark bookmarkChecked"
                  onClick={(e) => {
                    e.stopPropagation();
                    bookmark(sitterBoard.sitterBoardCode);
                  }}
                />
              )}

              <button
                onClick={() => {
                  deleteBoard();
                }}
              >
                삭제
              </button>
              <button
                onClick={() => {
                  updateBoard();
                }}
              >
                수정
              </button>
            </div>
          )}
        </div>

        <div className="writer-date">
          <div className="writer">
            <MyToggleBar name={sitterBoard.user?.userNickname} />
          </div>
          <div className="date-group">
            <div className="update-date">
              {sitterBoard.sitterUpdateDate && (
                <>
                  <span> 수정일 : </span>
                  <span>
                    {moment(sitterBoard.sitterUpdateDate).format(
                      "YYYY-MM-DD  HH:mm"
                    )}
                  </span>
                </>
              )}
            </div>

            <div className="register-date">
              <span>작성일 : </span>
              <span id="date">
                {moment(sitterBoard.sitterRegiDate).format("YYYY-MM-DD  HH:mm")}
              </span>
            </div>
          </div>
        </div>

        <div className="animal-location">
          <div className="animal-category">
            <div id="title">반려동물 종류</div>
            <div id="content">{sitterBoard.animalCategoryCode?.animalType}</div>
          </div>

          <div className="location">
            <div id="title">장소</div>
            <div id="content">
              {sitterBoard.location?.parent?.locationName}{" "}
              {sitterBoard.location?.locationName}
            </div>
          </div>
        </div>

        <div className="content-image">
          <div className="board-content">{sitterBoard.sitterContent}</div>
          <div className="image">
            {sitterBoard.images?.map((image) => (
              <img
                key={image.sitterImgCode}
                src={"http://localhost:8081" + image.sitterImg}
              ></img>
            ))}
          </div>
        </div>
      </div>

      <div className="back-btn-area">
        <button className="back-btn" onClick={backToList}>
          목록
        </button>
      </div>

      <div className="comment-area">
        <div className="comment-input">
          <Form.Control
            as="input"
            placeholder="댓글작성"
            value={comment}
            className="input"
            onChange={(e) => setComment(e.target.value)}
          />
          <button onClick={registerComment}>등록</button>
        </div>

        <div className="comment-list">
          {comments?.map((comment) => (
            <div key={comment.sitterCommentCode} className="each-comment">
              <div className="user-date-content">
                <div className="user-date">
                  <span id="comment-user">
                    <MyToggleBar name={comment.user?.userNickname} />
                  </span>
                  <span id="comment-date">
                    {`${new Date(
                      comment.sitterCommentRegiDate
                    ).getFullYear()}-${new Date(
                      comment.sitterCommentRegiDate
                    ).getMonth()}-${new Date(
                      comment.sitterCommentRegiDate
                    ).getDate()}`}
                  </span>
                  <span id="comment-time">
                    {`${new Date(
                      comment.sitterCommentRegiDate
                    ).getHours()}:${new Date(
                      comment.sitterCommentRegiDate
                    ).getMinutes()}`}
                  </span>
                </div>

                {/* ㅕㅇ기가 댓글 수정 시도 버튼 - 수정 완료 버튼*/}
                {commentEdit == null ||
                commentEdit?.sitterCommentCode !== comment.sitterCommentCode ? (
                  <div id="comment-content">
                    <p>{comment.sitterCommentContent}</p>
                    <div>
                      {user.userNickname === comment.user?.userNickname && (
                        <div className="comment-btns">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              editComment(comment);
                            }}
                          >
                            수정
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteComment(comment.sitterCommentCode);
                            }}
                          >
                            삭제
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <>
                    <input
                      type="text"
                      value={commentEdit.sitterCommentContent}
                      onChange={(e) =>
                        setCommentEdit((prev) => ({
                          ...prev,
                          sitterCommentContent: e.target.value,
                        }))
                      }
                    />
                    <button onClick={cancelEdit}>취소</button>
                    <button onClick={commentUpdate}>완료</button>
                  </>
                )}
                {/* {comment.sitterCommentCode !== commentEditCode ? (
                  <p id="comment-content">{comment.sitterCommentContent}</p>
                ) : (
                  <textarea>{commentEditContent}</textarea>
                )} */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Div>
  );
};

export default SitterDetail;

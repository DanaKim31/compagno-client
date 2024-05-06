import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getSitterBoard,
  updateSitterBoard,
  deleteSitterBoard,
  getCategories,
  getProvinces,
  getDistricts,
  getSitterComments,
  registerSitterComment,
  registerSitterReply,
  updateSitterComment,
  deleteSitterComment,
} from "../../api/sitterBoard";
import { useDispatch, useSelector } from "react-redux";
import { userSave } from "../../store/user";
import styled from "styled-components";

const Div = styled.div`
  width: 90%;
  margin: auto;

  h1 {
    margin-bottom: 100px;
  }

  .board-area {
    width: 100%;
    display: flex;
    margin-bottom: 40px;
    flex-direction: column;
    align-items: center;
  }

  .comment-area {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    .comment-list {
      width: 90%;
      margin-bottom: 10px;

      .each-comment {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px;
        border-bottom: 1px solid lightgray;

        .user-date {
          display: flex;
          align-items: center;

          #comment-user {
            margin-right: 10px;
            font-weight: bold;
          }
          #comment-date {
            font-size: 15px;
            color: gray;
          }
        }

        #comment-content {
          margin-bottom: 0;
        }

        .comment-btns {
          width: 13%;
          display: flex;
          justify-content: space-between;
        }
      }
      .each-comment:hover {
        background: lightgray;
        border-radius: 5px;
      }
    }
  }

  .comment-input {
    width: 90%;
    margin: auto;
    margin-bottom: 30px;

    input {
      width: 85%;
      height: 40px;
      margin-right: 10px;
    }

    button {
      width: 13%;
      height: 40px;
      background: black;
      color: white;
      border-radius: 5px;
    }
  }
`;

const SitterDetail = () => {
  const { code } = useParams();
  const [sitterBoard, setSitterBoard] = useState({});
  const [user, setUser] = useState({});
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [commentEditCode, setCommentEditCode] = useState(0);
  const [commentEditContent, setCommentEditConent] = useState("");
  const [replyCode, setReplyCode] = useState(0);
  const [replyContent, setReplyContent] = useState("");
  const [commentEdit, setCommentEdit] = useState(null);

  // ================= 유저정보 =================
  const userInfo = useSelector((state) => {
    return state.user;
  });

  const sitterBoardAPI = async () => {
    const result = await getSitterBoard(code);
    console.log(result.data);
    setSitterBoard(result.data);
  };

  const sitterCommentsAPI = async () => {
    const result = await getSitterComments(code);
    console.log(result.data);
    setComments(result.data);
  };

  useEffect(() => {
    if (token !== null) {
      dispatch(userSave(JSON.parse(localStorage.getItem("user"))));
    }
    sitterBoardAPI(code);
    sitterCommentsAPI();
    if (Object.keys(userInfo).length === 0) {
      setUser(JSON.parse(localStorage.getItem("user")));
    } else {
      setUser(userInfo);
    }
  }, []);

  // ================= 댓글 등록 =================
  const registerComment = async () => {
    if (token === null) {
      alert("로그인이 필요합니다.");
    } else {
      await registerSitterComment({
        sitterBoardCode: code,
        sitterCommentContent: comment,
        user: {
          userId: user.userId,
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
  const updateComment = async () => {
    await updateSitterComment({
      sitterCommentCode: commentEditCode,
      sitterCommentContent: commentEditContent,
    });
    // setReplyContent("");
    setCommentEditCode(0);
    sitterCommentsAPI();
  };

  const cancelEdit = () => {
    setCommentEdit(null);
  };

  const commentUpdate = async () => {};

  // ================= 게시글 수정 =================
  const updateBoard = () => {
    navigate("/compagno/sitterBoard/edit/" + code);
  };

  // ================= 게시글 삭제 =================
  const deleteBoard = async () => {
    await deleteSitterBoard(code);
    alert("게시글이 삭제됩니다.");
    navigate("/compagno/sitterBoard");
  };

  return (
    <Div>
      <h1>Detail</h1>
      <div className="board-area" key={sitterBoard.sitterBoardCode}>
        <h3>
          카테고리 구분 : {sitterBoard.sitterCategory?.sitterCategoryType}
        </h3>
        <h3>반려동물 구분 : {sitterBoard.animalCategoryCode?.animalType}</h3>
        <h3>작성자 : {sitterBoard.user?.userId}</h3>
        <h3>제목 : {sitterBoard.sitterTitle}</h3>
        <h3>내용 : {sitterBoard.sitterContent}</h3>
        <h3>
          장소 : {sitterBoard.location?.parent?.locationName}{" "}
          {sitterBoard.location?.locationName}
        </h3>
        {sitterBoard.images?.map((image) => (
          <img
            key={sitterBoard.sitterImgCode}
            src={"http://localhost:8081" + image.sitterImg}
          ></img>
        ))}
      </div>

      <div className="comment-area">
        <div className="comment-list">
          {comments?.map((comment) => (
            <div key={comment.sitterCommentCode} className="each-comment">
              <div className="user-date-content">
                <div className="user-date">
                  <span id="comment-user">{comment.user?.userId}</span>
                  <span id="comment-date">
                    {`${new Date(
                      comment.sitterCommentRegiDate
                    ).getFullYear()}-${new Date(
                      comment.sitterCommentRegiDate
                    ).getMonth()}-${new Date(
                      comment.sitterCommentRegiDate
                    ).getDate()}`}
                  </span>
                </div>
                <p id="comment-content">{comment.sitterCommentContent}</p>
              </div>
              {user.userId === comment.user?.userId && (
                <div className="comment-btns">
                  <button>수정</button>
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
          ))}
        </div>

        <div className="comment-input">
          <input onChange={(e) => setComment(e.target.value)}></input>
          <button onClick={registerComment}>등록</button>
        </div>
      </div>

      {/* <div className="board-btns">
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
      </div> */}
    </Div>
  );
};

export default SitterDetail;

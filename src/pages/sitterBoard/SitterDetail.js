import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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
import { useSelector } from "react-redux";
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
    justify-content: center;
    margin-bottom: 40px;
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
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [commentEdit, setCommentEdit] = useState(null);

  // ================= 계정 관련 =================
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
    sitterBoardAPI(code);
    sitterCommentsAPI();
    if (Object.keys(userInfo).length === 0) {
      setUser(JSON.parse(localStorage.getItem("user")));
    } else {
      setUser(userInfo);
    }
  }, []);

  // ================= 댓글 등록 =================
  const registerComment = async (data) => {
    await registerSitterComment(data);
    sitterCommentsAPI();
  };

  // ================= 댓글 삭제 =================
  const deleteComment = async (code) => {
    await deleteSitterComment(code);
    sitterCommentsAPI();
  };

  // ================= 댓글 수정 =================
  const updateComment = async (data) => {
    await updateSitterComment(data);
    sitterCommentsAPI();
  };

  const cancelEdit = () => {
    setCommentEdit(null);
  };

  const commentUpdate = async () => {};

  return (
    <Div>
      <h1>Detail</h1>
      <div className="board-area">
        <div key={sitterBoard.sitterBoardCode}>
          <h3>
            카테고리 구분 : {sitterBoard.sitterCategory?.sitterCategoryType}
          </h3>
          <h3>반려동물 구분 : {sitterBoard.animalCategoryCode?.animalType}</h3>
          <h3>작성자 : {sitterBoard.user?.userId}</h3>
          <h3>제목 : {sitterBoard.sitterTitle}</h3>
          <h3>
            장소 : {sitterBoard.location?.parent?.locationName}{" "}
            {sitterBoard.location?.locationName}
          </h3>
          <h3>내용 : {sitterBoard.sitterContent}</h3>
          {/* <img src={sitterBoard.images?.sitterImg?.replace()}></img> */}
        </div>
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
              <div className="comment-btns">
                <button>수정</button>
                <button>삭제</button>
              </div>
            </div>
          ))}
        </div>

        <div className="comment-input">
          <input></input>
          <button>등록</button>
        </div>
      </div>
    </Div>
  );
};

export default SitterDetail;

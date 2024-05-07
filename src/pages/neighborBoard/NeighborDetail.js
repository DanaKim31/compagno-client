import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  getNeighborBoard,
  updateNeighborBoard,
  deleteNeighborBoard,
  getNeighborComments,
  registerNeighborComment,
  registerNeighborReply,
  updateNeighborComment,
  deleteNeighborComment,
} from "../../api/neighborBoard";
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

const NeighborDetail = () => {
  const { code } = useParams();
  const [neighborBoard, setNeighborBoard] = useState({});
  const [user, setUser] = useState({});
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [commentEdit, setCommentEdit] = useState(null);

  // ================= 유저정보 =================
  const userInfo = useSelector((state) => {
    return state.user;
  });

  const neighborBoardAPI = async () => {
    const result = await getNeighborBoard(code);
    console.log(result.data);
    setNeighborBoard(result.data);
  };

  const neighborCommentAPI = async () => {
    const result = await getNeighborComments(code);
    console.log(result.data);
    setNeighborBoard(result.data);
  };

  useEffect(() => {
    if (token !== null) {
      dispatch(userSave(JSON.parse(localStorage.getItem("user"))));
    }
    neighborBoardAPI(code);
    neighborCommentAPI();
    if (Object.keys(userInfo).length === 0) {
      setUser(JSON.parse(localStorage.getItem("user")));
    } else {
      setUser(userInfo);
    }
  }, []);

  // ================= 댓글 등록 =================
  const registerComment = async () => {
    await registerNeighborComment({
      neighborBoardCode: code,
      neighborCommentCode: comment,
      user: {
        userId: user.userId,
      },
    });
    setComment("");
    neighborCommentAPI();
  };

  // ================= 댓글 삭제 =================
  const deleteComment = async (code) => {
    await deleteNeighborComment(code);
    neighborCommentAPI();
  };

  // ================= 댓글 수정 =================
  const updateComment = async (data) => {
    await updateNeighborComment(data);
    neighborCommentAPI();
  };

  const cancelEdit = () => {
    setCommentEdit(null);
  };

  const commentUpdate = async () => {};

  return (
    <Div>
      <h1>우리동네 게시판 게시글 상세페이지</h1>
      <div className="board-area" key={neighborBoard.neighborBoardCode}>
        <h3>반려동물 구분 : {neighborBoard.animalCategoryCode?.animalType}</h3>
        <h3>작성자 : {neighborBoard.user?.userId}</h3>
        <h3>제목 : {neighborBoard.neighborBoardTitle}</h3>
        <h3>내용 : {neighborBoard.neighborBoardContent}</h3>
        <h3>
          장소 : {neighborBoard.location?.parent?.locationName}{" "}
          {neighborBoard.location?.locationName}
        </h3>
        {neighborBoard.images?.map((image) => (
          <img
            key={neighborBoard.neighborImageCode}
            src={"http://localhost:8081" + image.neighborImage}
          ></img>
        ))}
      </div>

      <div className="comment-area">
        <div className="comment-list">
          {comments?.map((comment) => (
            <div key={comment.neighborCommentCode} className="each-comment">
              <div className="user-date-content">
                <div className="user-date">
                  <span id="comment-user">{comment.user?.userId}</span>
                  <span id="comment-date">
                    {`${new Date(
                      comment.neighborCommentRegiDate
                    ).getFullYear()}-${new Date(
                      comment.neighborCommentRegiDate
                    ).getMonth()}-${new Date(
                      comment.neighborCommentRegiDate
                    ).getDate()}`}
                  </span>
                </div>
                <p id="comment-content">{comment.neighborCommentContent}</p>
              </div>
              <div className="comment-btns">
                <button>수정</button>
                <button>삭제</button>
              </div>
            </div>
          ))}
        </div>

        <div className="comment-input">
          <input onChange={(e) => setComment(e.target.value)}></input>
          <button onClick={registerComment}>등록</button>
        </div>
      </div>
    </Div>
  );
};

export default NeighborDetail;

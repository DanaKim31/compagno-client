import {
  viewOneLostBoard,
  deleteLostBoard,
  addTopCommentLost,
  viewCommentLost,
  deleteCommentLost,
  updateCommentLost,
} from "../../api/lostBoard";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userSave } from "../../store/user";
import styled from "styled-components";
import { FaShieldDog } from "react-icons/fa6";
import { FiMapPin } from "react-icons/fi";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import "moment/locale/ko";
import { hover } from "@testing-library/user-event/dist/hover";

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

  .contentHeader {
    width: 70%;
    display: flex;
    justify-content: space-between;
    margin: 0px 20px;

    h2 {
      font-weight: bold;
    }
    .btnChange {
      button {
        margin: 0px 10px;
        width: 70px;
        border-radius: 20px;
        border: 2px solid green;
        font-weight: bold;
      }
      button:hover {
        background-color: yellow;
      }
    }
  }
  .contentsBody {
    width: 80%;
    #mainImage {
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 300px;
        height: 300px;
        margin: 0px 20px;
      }
    }
    #regiDate {
      display: flex;
      justify-content: right;
      align-items: center;
      width: 90%;
    }
    .contents {
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-left: 75px;
      width: 85%;

      .postOwner,
      .lostContents,
      .lostAnimal,
      .option {
        display: flex;
        flex-direction: column;
        margin-top: 20px;
        margin-bottom: 35px;

        h3 {
          font-size: 1.8rem;
          margin-bottom: 20px;
          font-weight: bold;
        }
        .pContent {
          border-top: 1px solid green;
          padding-top: 5px;
          display: flex;
          flex-direction: column;
          table {
            margin-top: 10px;
            tr {
              height: 60px;

              display: flex;
              align-items: center;
              th {
                border-right: 1px solid black;
                padding-right: 50px;
                width: 25%;
              }
              td {
                padding-left: 20px;
                width: 100%;
              }
            }
            td {
              justify-content: center;
              label {
                margin: 0px 30px;
                cursor: pointer;
                display: inline-block;
                color: gray;

                input[type="file"] {
                  display: none;
                }
                .images {
                  display: flex;

                  div {
                    margin: 0px 20px;
                    img {
                      width: 200px;
                      height: 200px;
                    }
                  }
                }
              }
              label:hover {
                color: green;
                font-weight: bold;
              }
              input.gender {
                width: 16px;
              }
            }
            #kindInputBox {
              width: 40%;
            }
          }
        }
      }
    }
    .btnList {
      width: 100%;
      display: flex;
      margin-bottom: 50px;
      justify-content: center;
      align-items: center;
      button {
        width: 70px;
        border-radius: 20px;
        border: 2px solid green;
        font-weight: bold;
      }
    }
  }
  #commentBox {
    display: block;
    width: 70%;
    margin-bottom: 20px;
    h4 {
      margin-bottom: 10px;
      font-weight: bold;
    }
    #commentWrite {
      border: 1px solid black;
      display: flex;
      flex-direction: column;
      border-radius: 10px;
      #user {
        margin: 10px 10px;

        #userImg {
          width: 35px;
          height: 35px;
          border-radius: 50%;
          border: 0.3px solid black;
          margin-right: 10px;
        }
      }
      #boxAndBtn {
        display: flex;
        width: 100%;
        justify-content: center;
        align-items: center;
        padding-bottom: 20px;
        textarea {
          resize: none;
          width: 80%;

          font-weight: bold;
        }
        button {
          margin: 5px 10px;
          font-weight: bold;
          border-radius: 15px;
        }
      }
    }
    #commetsViewAll {
      margin-top: 20px;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: end;

      #contentBtn {
        display: flex;
        justify-content: center;
        width: 100%;
        #commentsImgAndContent {
          width: 80%;
          margin-top: 15px;
          display: flex;
          border-bottom: 1px dashed black;
          padding-bottom: 10px;
          align-items: center;

          display: flex;
          justify-content: space-between;
          #t {
            display: flex;
            #userImg {
              img {
                width: 35px;
                height: 35px;
                border-radius: 50%;
                border: 0.3px solid black;
                margin-right: 10px;
                align-content: center;
              }
            }
            #commentsContent {
              font-size: 0.7rem;
              #userNickname {
                margin-bottom: 5px;
                font-size: 0.9rem;
              }
              #commentContent {
                margin-bottom: 0px;
              }
            }
          }
        }
        div#btn {
          display: flex;
          align-items: center;
          button {
            border: none;
            font-size: 0.7rem;
            font-weight: bold;
            margin: 0px 5px;
          }
        }
      }
    }
  }
`;

const ViewLostBoard = () => {
  const navigate = useNavigate();
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
  const [lost, setLost] = useState([]);
  const [images, setImages] = useState([]); // 이미지 가져오기
  const viewsAPI = async () => {
    const response = await viewOneLostBoard(code);
    console.log(response.data);
    setImages(response.data.images);
    setLost(response.data);
  };

  // 게시글 수정
  const btnUpdate = async () => {
    navigate("/compagno/lostBoard/update/" + code);
  };

  // 게시글 삭제
  const btnDel = async () => {
    await deleteLostBoard(code);
    navigate("/compagno/lostBoard/viewAll");
  };

  // 목록버튼
  const btnList = () => {
    navigate("/compagno/lostBoard/viewAll");
  };

  // 댓글 작성
  const [topComments, setTopComments] = useState({
    userImg: user.userImg,
    userNickname: user.userNickname,
    userId: user.userId,
    commentContent: "",
    lostBoardCode: code,
  });

  // 댓글 보기
  const [comments, setComments] = useState([]);
  const commentsAPI = async () => {
    const response = await viewCommentLost(code);
    console.log(response.data);
    setComments(response.data);
  };

  useEffect(() => {
    viewsAPI();
    commentsAPI();
  }, []);

  const okCreate = async () => {
    await addTopCommentLost(topComments);
    commentsAPI();
  };

  // 댓글 삭제
  const delComment = async (data) => {
    await deleteCommentLost(data);
    commentsAPI();
  };

  // 댓글 수정
  const [edit, setEdit] = useState({});
  const updateBtn = async (comment) => {
    setEdit({
      commentContent: comment.commentContent,
      lostBoardCode: code,
      lostCommentCode: comment.lostCommentCode,

      commentDate: moment().format("YYYY-MM-DD hh:mm:ss"),
      user: {
        userId: user.userId,
        userNickname: user.userNickname,
        userImg: user.userImg,
      },
    });
  };

  const updateComment = async () => {
    console.log(edit);
    console.log(typeof edit.commentDate);
    await updateCommentLost(edit);
    setEdit({});
    commentsAPI();
  };
  //수정 취소
  const delUpdate = () => {
    setEdit({});
    commentsAPI();
  };
  // 대댓글 쓰기
  const [bottomComments, setBottomComments] = useState({
    userImg: user.userImg,
    userNickname: user.userNickname,
    userId: user.userId,
    commentContent: "",
    lostBoardCode: code,
    lostParentCode: comments.lostCommentCode,
  });

  const [num, setNum] = useState(0);
  const writeReplies = (lostCommentCode) => {
    setNum(lostCommentCode);
  };

  return (
    <>
      <Div key={lost.lostBoardCode}>
        <div className="contentHeader">
          <h2>동물 분실</h2>
          {user.userId == lost.userId ? (
            <div className="btnChange">
              <button onClick={btnUpdate}>수정</button>
              <button onClick={btnDel}>삭제</button>
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className="contentsBody">
          <div id="mainImage">
            {images?.map((image) => (
              <img
                alt=""
                key={image.lostImageCode}
                src={image.lostImage?.replace("C:", "http://localhost:8081")}
                // src={image.lostImage?.replace(
                //   "\\\\DESKTOP-U0CNG13\\upload\\lostBoard",
                //   "http://192.168.10.28:8081/lostBoard/"
                // )}
              />
            ))}
          </div>
          <div id="regiDate">
            {moment(lost.regiDate).format("YYYY-MM-DD hh:mm")}
          </div>
          <div>
            <div className="contents">
              <div className="postOwner">
                <div className="pContent">
                  <table>
                    <thead>
                      <tr>
                        <td>
                          <h3>
                            <FaUser /> 분실 신고자 정보
                          </h3>
                        </td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th>신고자 닉네임</th>
                        <td>{lost.userNickname}</td>
                      </tr>
                      <tr>
                        <th>신고자 연락처</th>
                        <td>{lost.userPhone}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="lostContents">
                <div className="pContent">
                  <table>
                    <thead>
                      <tr>
                        <td>
                          <h3>
                            <FiMapPin /> 분실일시 및 장소
                          </h3>
                        </td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th>분실 날짜</th>
                        <td>{moment(lost.lostDate).format("YYYY-MM-DD")}</td>
                      </tr>

                      <tr>
                        <th>분실 장소</th>
                        <td>{lost.lostLocation}</td>
                      </tr>
                      <tr>
                        <th>주위 특징 건물</th>
                        <td>{lost.lostLocationDetail}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="lostAnimal">
                <div className="pContent">
                  <table>
                    <thead>
                      <tr>
                        <td>
                          <h3>
                            <FaShieldDog /> 분실동물 정보
                          </h3>
                        </td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th>분실 동물 이름</th>
                        <td>{lost.lostAnimalName}</td>
                        <th>축종</th>
                        <td>{lost.lostAnimalKind}</td>
                      </tr>

                      <tr>
                        <th>색상</th>
                        <td>{lost.lostAnimalColor}</td>
                        <th>성별</th>
                        <td>{lost.lostAnimalGender}</td>
                      </tr>

                      <tr>
                        <th>나이</th>
                        <td>{lost.lostAnimalAge}</td>
                        <th>동물 특징</th>
                        <td>{lost.lostAnimalFeature}</td>
                      </tr>

                      <tr>
                        <th>마이크로칩(RFID) 번호</th>
                        <td>{lost.lostAnimalRFID}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="btnList">
              <button onClick={btnList}>목록</button>
            </div>
          </div>
        </div>
      </Div>
      <Div>
        <div id="commentBox">
          <h4>댓글</h4>
          {user.userNickname != null ? (
            <div id="commentWrite">
              <div id="user">
                <img
                  src={"http://localhost:8081/upload/" + user.userImg}
                  id="userImg"
                />
                {user.userNickname}
              </div>
              <div id="boxAndBtn">
                <textarea
                  value={topComments.commentContent}
                  onChange={(e) =>
                    setTopComments((prev) => ({
                      ...prev,
                      commentContent: e.target.value,
                    }))
                  }
                ></textarea>
                <button onClick={okCreate}>등록</button>
              </div>
            </div>
          ) : (
            <h5
              style={{ color: "green", fontWeight: "bold", fontSize: "0.9rem" }}
            >
              댓글 작성은 회원만 가능합니다.
            </h5>
          )}

          <div id="commetsViewAll">
            {comments?.map((comment) => (
              <div key={comment.lostCommentCode} id="contentBtn">
                <div id="commentsImgAndContent">
                  <div id="t">
                    <div id="userImg">
                      <img
                        src={
                          "http://localhost:8081/upload/" + comment.user.userImg
                        }
                      />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <div id="commentsContent">
                        <p id="userNickname"> {comment.user.userNickname}</p>
                        {edit.lostCommentCode == comment.lostCommentCode ? (
                          <textarea
                            style={{ resize: "none", width: "500px" }}
                            value={edit.commentContent}
                            onChange={(e) =>
                              setEdit((prev) => ({
                                ...prev,
                                commentContent: e.target.value,
                              }))
                            }
                          ></textarea>
                        ) : (
                          <p id="commentContent">{comment.commentContent}</p>
                        )}
                      </div>
                      {num == 0 ? (
                        <></>
                      ) : (
                        <div
                          id="commentWrite"
                          style={{
                            marginTop: "10px",
                            width: "556px",
                            fontSize: "0.8rem",
                            height: "80px",
                          }}
                        >
                          <div
                            id="user"
                            style={{ height: "15px", margin: "8px 10px" }}
                          >
                            <img
                              style={{ height: "20px", width: "20px" }}
                              src={
                                "http://localhost:8081/upload/" + user.userImg
                              }
                              id="userImg"
                            />
                            {user.userNickname}
                          </div>
                          <div id="boxAndBtn">
                            <textarea
                              style={{ height: "80%" }}
                              value={bottomComments.commentContent}
                              onChange={(e) =>
                                setBottomComments((prev) => ({
                                  ...prev,
                                  commentContent: e.target.value,
                                }))
                              }
                            ></textarea>
                            <button onClick={okCreate}>등록</button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  {user.userNickname == comment.user.userNickname ? (
                    <div id="btn">
                      {edit.lostCommentCode == comment.lostCommentCode ? (
                        <div>
                          <button onClick={updateComment}>수정 완료</button>
                          <button onClick={delUpdate}>수정 취소</button>
                        </div>
                      ) : (
                        <div>
                          <button onClick={() => updateBtn(comment)}>
                            수정
                          </button>
                          <button
                            onClick={() => delComment(comment.lostCommentCode)}
                          >
                            삭제
                          </button>
                          <div style={{ fontSize: "0.7rem", marginTop: "5px" }}>
                            {moment(comment.commentDate).format(
                              "YY-MM-DD hh:mm"
                            )}
                          </div>
                          <button
                            style={{ border: "none", backgroundColor: "white" }}
                            onClick={(e) =>
                              writeReplies(comment.lostCommentCode)
                            }
                          >
                            답글 쓰기
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div>
                      <div
                        style={{
                          fontSize: "0.7rem",
                          marginTop: "15px",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                        }}
                      >
                        {moment(comment.commentDate).format("YY-MM-DD hh:mm")}
                        <button
                          style={{
                            border: "none",
                            backgroundColor: "white",
                            fontWeight: "bold",
                          }}
                        >
                          답글 쓰기
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Div>
    </>
  );
};
export default ViewLostBoard;

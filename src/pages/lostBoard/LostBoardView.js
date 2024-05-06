import {
  viewOneLostBoard,
  deleteLostBoard,
  addTopCommentLost,
  viewCommentLost,
  deleteCommentLost,
  updateCommentLost,
  addBottomCommentLost,
  viewAllCommentLost,
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
import { BsCaretDownFill, BsCaretUpFill } from "react-icons/bs";
import {
  FaAngleLeft,
  FaAnglesLeft,
  FaAngleRight,
  FaAnglesRight,
} from "react-icons/fa6";

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
          border-bottom: 1px solid green;
          padding-bottom: 10px;
          align-items: center;

          display: flex;
          justify-content: space-between;

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
  .iconPaging {
    cursor: pointer;
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

  // 페이징
  const [page, setPage] = useState(1); // 현재 페이지
  const [totalComments, setTotalComments] = useState(0); // 총 댓글 수
  const [totalPage, setTotalPage] = useState(0); // 전체 총 페이지 : 총 댓글수/5
  const [pages, setPages] = useState([]); // 페이지들

  // 댓글 보기
  const [comments, setComments] = useState([]);
  const commentsAPI = async () => {
    const response = await viewCommentLost(code, page);
    const responseAll = await viewAllCommentLost(code);
    // console.log(response.data);
    // console.log(response.data.length);
    // console.log(responseAll.data);
    setTotalComments(responseAll.data.length);
    setTotalPage(Math.ceil(responseAll.data.length / 5));
    setComments(response.data);
  };

  useEffect(() => {
    viewsAPI();
    commentsAPI();
  }, []);

  useEffect(() => {
    commentsAPI();
  }, [page]);

  // 댓글 페이징 처리
  // 첫 페이지, 마지막 페이지, 페이지 리스트 초기 셋팅
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
      pageList.push(i); // 처음 i는 firstPage, 범위는 lastPage로 반복문 돌려서 i값을 넣은 list 만들기
    }
    setPages(pageList);
  }, [totalPage]);

  // 댓글 작성
  const [topComments, setTopComments] = useState({
    userImg: user.userImg,
    userNickname: user.userNickname,
    userId: user.userId,
    commentContent: "",
    lostBoardCode: code,
  });
  const okCreate = async () => {
    await addTopCommentLost(topComments);
    setTopComments({
      userImg: user.userImg,
      userNickname: user.userNickname,
      userId: user.userId,
      commentContent: "",
      lostBoardCode: code,
    });
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
      lostParentCode: 0,
      commentDate: moment().format("YYYY-MM-DD hh:mm:ss"),
      user: {
        userId: user.userId,
        userNickname: user.userNickname,
        userImg: user.userImg,
      },
    });
  };

  const updateComment = async () => {
    await updateCommentLost(edit);
    setEdit({});
    commentsAPI();
  };

  // const updateBottomComment = async () => {
  //   setEdit({
  //     lostBoardCode: code,
  //     commentDate: moment().format("YYYY-MM-DD hh:mm:ss"),
  //     user: {
  //       userId: user.userId,
  //       userNickname: user.userNickname,
  //       userImg: user.userImg,
  //     },
  //   });
  //   console.log(edit);
  //   await updateCommentLost(edit);
  //   setEdit({});
  //   commentsAPI();
  // };

  //수정 취소
  const delUpdate = () => {
    setEdit({});
    setEdit({ lostParentCode: 0 });
    commentsAPI();
  };

  // 대댓글 작성
  const [bottomComments, setBottomComments] = useState({
    userImg: user.userImg,
    userNickname: user.userNickname,
    userId: user.userId,
    commentContent: "",
    lostBoardCode: code,
    lostParentCode: "",
  });

  // 대댓글 작성 완료
  const okBottomWrite = async () => {
    await addBottomCommentLost(bottomComments);
    setViewBottomCode(bottomComments.lostParentCode);
    setViewBottomBtn(true);
    setBottomComments({ lostParentCode: "", commentContent: "" });
    commentsAPI();
  };

  // 대댓글 작성 취소
  const delBottomWrite = () => {
    setBottomComments({ lostParentCode: "" });
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
      {/* 여기서부터가 댓글----------------------------------------------------------------------------------------- */}
      <Div>
        <div id="commentBox">
          <h4>댓글</h4>
          {user.userNickname !=
          null /* userNickname있어야지만 댓글 작성 폼 나타남 --------------------------------*/ ? (
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
            /* userNickname 없으면 댓글 작성 폼 안나타남 ----------------------------------------------------------------- */
            <h5
              style={{ color: "green", fontWeight: "bold", fontSize: "0.9rem" }}
            >
              댓글 및 대댓글 작성은 회원만 가능합니다.
            </h5>
          )}
          {/* 여기는 작성된 댓글들 보이는 곳 ---------------------------------------------------------------------------------- */}
          <div id="commetsViewAll">
            {/* 상위 댓글들 반복 돌리기 ----------------------------------------------------------------------------- */}
            {comments?.map((comment) => (
              <div key={comment.lostCommentCode} id="contentBtn">
                <div id="commentsImgAndContent">
                  <div
                    id="topImgAndContents"
                    style={{ display: "flex", width: "-webkit-fill-available" }}
                  >
                    <div id="userImg">
                      <img
                        src={
                          "http://localhost:8081/upload/" + comment.user.userImg
                        }
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
                      <div id="commentsContent" style={{ width: "100%" }}>
                        {/* 상위 수정 코드와 상위 댓글 코드 같을 때만 수정 박스 나오도록 ------------------------------------- */}
                        {/* 수정 박스는 없어도 화살표로 인해 대댓이 보이긴 해야 함 -------------------------------------- */}
                        {edit.lostCommentCode == comment.lostCommentCode ? (
                          <div id="topComemntUpdateBox">
                            <p id="userNickname">
                              {" "}
                              {comment.user.userNickname}
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
                                }}
                              >
                                <p id="userNickname">
                                  {comment.user.userNickname}
                                </p>
                                {comment.user.userNickname ==
                                lost.userNickname ? (
                                  <span
                                    id="bottomWriter"
                                    style={{
                                      marginLeft: "9px",
                                      backgroundColor: "green",
                                      color: "white",
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
                              <p id="commentContent">
                                {comment.commentContent}
                              </p>
                            </div>
                            {/* 기본 글 밑으로 대댓글이 전부 보이도록 해야 함~ */}
                            {/* 조건은 버튼 클릭으로 인한 viewBottomBtn=true, viewBottomCode==comment.lostCommentCode */}

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
                                    delComment(comment.lostCommentCode)
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
                        viewBottomCode == comment.lostCommentCode ? (
                          <div>
                            {comment.replies.map((bottom) => (
                              <div
                                key={bottom.lostCommentCode}
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
                                    src={
                                      "http://localhost:8081/upload/" +
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
                                  <div
                                    id="userWriter"
                                    style={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                    }}
                                  >
                                    <span
                                      id="bottomName"
                                      style={{
                                        fontSize: "0.8rem",
                                        paddingTop: "5px",
                                      }}
                                    >
                                      {bottom.user.userNickname}
                                    </span>
                                    {/* 상위 댓글 작성자와 하위 댓글 작성자가 같을 때 -> 작성자 표시 */}
                                    {lost.userNickname ==
                                    bottom.user.userNickname ? (
                                      <div
                                        id="bottomWriterBtn"
                                        style={{
                                          display: "flex",
                                          alignItems: "center",
                                          width: "100%",
                                          justifyContent: "space-between",
                                        }}
                                      >
                                        <span
                                          id="bottomWriter"
                                          style={{
                                            marginLeft: "9px",
                                            backgroundColor: "green",
                                            color: "white",
                                            borderRadius: "30px",
                                            padding: "3px 5px",
                                            fontSize: "0.5rem",
                                          }}
                                        >
                                          작성자
                                        </span>
                                        {/* 수정 버튼을 클릭 안했을 때 */}
                                        {edit.lostCommentCode !=
                                        bottom.lostCommentCode ? (
                                          <div
                                            style={{
                                              display: "flex",
                                              flexDirection: "column",
                                            }}
                                          >
                                            <div
                                              id="bottomBtn"
                                              style={{ fontSize: "0.6rem" }}
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
                                                    lostParentCode:
                                                      comment.lostCommentCode,
                                                    lostCommentCode:
                                                      bottom.lostCommentCode,
                                                    commentContent:
                                                      bottom.commentContent,
                                                    lostBoardCode: code,
                                                    commentDate:
                                                      moment().format(
                                                        "YYYY-MM-DD hh:mm:ss"
                                                      ),
                                                    user: {
                                                      userId: user.userId,
                                                      userNickname:
                                                        user.userNickname,
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
                                                  delComment(
                                                    bottom.lostCommentCode
                                                  )
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
                                              {moment(
                                                bottom.commentDate
                                              ).format("YY-MM-DD hh:mm")}
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
                                    ) : (
                                      <div style={{ fontSize: "0.6rem" }}>
                                        {moment(bottom.commentDate).format(
                                          "YY-MM-DD hh:mm"
                                        )}
                                      </div>
                                    )}
                                  </div>
                                  {edit.lostCommentCode ==
                                  bottom.lostCommentCode ? (
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
                      {comment.lostCommentCode !=
                      bottomComments.lostParentCode ? (
                        <></>
                      ) : (
                        <div
                          id="commentWrite"
                          style={{
                            marginTop: "10px",
                            width: "580px",
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
                              style={{
                                height: "80%",
                                margin: "0px 10px",
                                fontWeight: "bold",
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
                              style={{ width: "50px" }}
                            >
                              등록
                            </button>
                            <button
                              onClick={delBottomWrite}
                              style={{ width: "50px" }}
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
                                lostParentCode: comment.lostCommentCode,
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
                            onClick={() =>
                              viewAllBottom(comment.lostCommentCode)
                            }
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
            <FaAnglesLeft className="iconPaging" onClick={() => setPage(1)} />
            <FaAngleLeft
              className="iconPaging"
              onClick={() => (page > 1 ? setPage(page - 1) : setPage(1))} // 현재 페이지에서 한칸 앞으로
            />
            {pages.map((num, index) => (
              <>
                <button
                  key={index}
                  value={num}
                  onClick={(e) => setPage(Number(e.target.value))}
                >
                  {num}
                </button>
              </>
            ))}
            <FaAngleRight
              className="iconPaging"
              onClick={
                () =>
                  page < totalPage ? setPage(page + 1) : setPage(totalPage) // 현재 페이지에서 한칸 뒤로
              }
            />
            <FaAnglesRight
              className="iconPaging"
              onClick={() => setPage(totalPage)}
            />
          </div>
        </div>
      </Div>
    </>
  );
};
export default ViewLostBoard;

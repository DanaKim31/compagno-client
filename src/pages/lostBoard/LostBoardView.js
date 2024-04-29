import { viewOneLostBoard, deleteLostBoard } from "../../api/lostBoard";
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
        width: 400px;
        height: 400px;
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
  const viewsAPI = async () => {
    const response = await viewOneLostBoard(code);
    setLost(response.data);
  };
  useEffect(() => {
    viewsAPI();
  }, []);

  // 이미지 가져오기

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
  return (
    <Div key={lost.lostBoardCode}>
      <div className="contentHeader">
        <h2>동물 분실</h2>
        {user.userId == lost.userId ? (
          <div className="btnChange">
            {/* 유저 당사자일 경우에만 수정, 삭제 버튼 보이도록! */}
            <button onClick={btnUpdate}>수정</button>
            <button onClick={btnDel}>삭제</button>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="contentsBody">
        <div id="mainImage">
          <img
            src={lost.lostAnimalImage?.replace(
              "\\\\DESKTOP-U0CNG13\\upload\\lostBoard",
              "http://192.168.10.28:8081/lostBoard/"
            )}
          />
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
  );
};
export default ViewLostBoard;

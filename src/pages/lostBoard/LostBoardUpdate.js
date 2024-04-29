import { viewOneLostBoard } from "../../api/lostBoard";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { userSave } from "../../store/user";
import { useNavigate } from "react-router-dom";
import { FaShieldDog } from "react-icons/fa6";
import { FiMapPin } from "react-icons/fi";
import { FaUser } from "react-icons/fa";
import styled from "styled-components";
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
  }
  .btn {
    display: flex;
    margin: 30px 0;
    font-family: "TAEBAEKmilkyway";
    font-weight: bold;
    .okBtn,
    .delBtn {
      margin: 0 20px;
      width: 80px;
      height: 35px;
      font-size: 0.8rem;
      font-family: "TAEBAEKmilkyway";
      font-weight: bold;
    }
  }
`;

const LostBoardUpdate = () => {
  const navigate = useNavigate();
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

  // 취소 버튼
  const btnDel = () => {
    navigate("/compagno/lostBoard/view/" + code);
  };

  return (
    <Div key={lost.lostBoardCode}>
      <div className="contentHeader">
        <h2>분실 등록 수정</h2>
      </div>
      <div className="contentsBody">
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
                    <th>분실 날짜*</th>
                    <td>
                      <input
                        type="text"
                        // value={lost.lostDate}
                        // placeholder={lost.lostDate}
                        placeholder={moment(lost.lostDate).format("YYYY-MM-DD")}
                      />
                    </td>
                  </tr>

                  <tr>
                    <th>분실 장소*</th>
                    <td>
                      <input type="text" value={lost.lostLocation} />
                    </td>
                  </tr>
                  <tr>
                    <th>주위 특징 건물</th>
                    <td>
                      <input type="text" value={lost.lostLocationDetail} />
                    </td>
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
                    <th>분실 동물 이름*</th>
                    <td>
                      <input type="text" value={lost.lostAnimalName} />
                    </td>
                  </tr>
                  <tr>
                    <th>축종*</th>
                    <td>
                      <input type="text" value={lost.lostAnimalType} />
                    </td>
                  </tr>
                  <tr>
                    <th>색상</th>
                    <td>
                      <input type="text" value={lost.lostAnimalColor} />
                    </td>
                  </tr>
                  <tr>
                    <th>성별*</th>
                    <td>
                      <input type="text" value={lost.lostAnimalGender} />
                    </td>
                  </tr>
                  <tr>
                    <th>나이</th>
                    <td>
                      <input
                        type="number"
                        min={0}
                        value={lost.lostAnimalAge}
                        placeholder="숫자로 입력해주세요"
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>동물 특징</th>
                    <td>
                      <input type="text" value={lost.lostAnimalFeature} />
                    </td>
                  </tr>
                  <tr>
                    <th>마이크로칩(RFID) 번호</th>
                    <td>
                      <input
                        type="text"
                        placeholder="RFID가 있는 경우, 15자리 숫자 입력해주세요"
                        maxLength="15"
                      />
                    </td>
                  </tr>
                  <tr id="imgContent">
                    <th>사진첨부</th>
                    <td id="imgContents">
                      <label id="imgList">사진 업로드 추가</label>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="btn">
        <button className="okBtn">수정 완료</button>
        <button className="delBtn" onClick={btnDel}>
          수정 취소
        </button>
      </div>
    </Div>
  );
};
export default LostBoardUpdate;

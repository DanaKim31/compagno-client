import { viewOneAdopBoard, deleteAdopBoard } from "../../api/adoptionBoard";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userSave } from "../../store/user";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import "moment/locale/ko";

import styled from "styled-components";
import { FaShieldDog, FaHouseMedical } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";

import Comments from "../../components/adoptionBoard/AdoptoinComments";
import MyToggleBar from "../../components/note/MyToggleBar";

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
  /* 글 헤더 (제목+버튼)*/
  .contentHeader {
    width: 65%;
    display: flex;
    justify-content: space-between;
    margin: 0px 20px;
    h2 {
      font-weight: bold;
      font-size: 2.4rem;
    }
    .btnChange {
      button {
        margin: 0px 10px;
        width: 70px;
        border-radius: 20px;
        border: none;
        font-weight: bold;
      }
      :nth-child(1) {
        background-color: gray;
        color: white;
        &:hover {
          color: black;
          background-color: #94b29b;
        }
      }
      :nth-child(2) {
        background-color: black;
        color: white;
        &:hover {
          border: 2px solid black;
          color: black;
          background-color: white;
        }
      }
    }
  }
  /* 본문 내용-사진부터 */
  .contentsBody {
    width: 65%;
    /* 사진 */
    #mainImage {
      margin: 30px 0px;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 300px;
        height: 300px;
        margin: 0px 20px;
      }
    }
    /* 작성일 */
    #regiDate {
      display: flex;
      justify-content: right;
      align-items: center;
      width: 95%;
    }
    /* 기본 내용 */
    .contentAll {
      margin-top: 20px;
      margin-left: 40px;

      .postWriter,
      .adopAnimal,
      .center {
        margin-bottom: 40px;
        border-top: 2px dashed #94b29b;
        padding-top: 20px;

        h3 {
          font-weight: bold;
        }
        .pContent {
          .contents {
            margin-left: 40px;
            margin-top: 20px;
            font-size: 1.4rem;
            margin-top: 35px;
            div {
              margin-bottom: 40px;

              label {
                width: 25%;
                border-right: 1px solid green;
              }
              span {
                margin-left: 40px;
              }
            }
          }
        }
      }
    }
    .btnList {
      display: flex;
      justify-content: center;
      margin-bottom: 40px;
      button {
        width: 100px;
        height: 40px;
        border-radius: 10px;
        border: none;
        background-color: #94b29b;
        font-weight: bold;
        font-size: 1.3rem;
        &:hover {
          background-color: white;
          border: 3px solid #94b29b;
        }
      }
    }
  }
`;

const ViewAdopBoard = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => {
    return state.user;
  });
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token != null) {
      dispatch(userSave(JSON.parse(localStorage.getItem("user"))));
    }
  }, []);

  const { code } = useParams();
  const [adop, setAdop] = useState("");

  const adopAPI = async () => {
    const response = await viewOneAdopBoard(code);
    setAdop(response.data);
  };

  const navigate = useNavigate();
  // 게시글 수정
  const btnUpdate = () => {
    navigate("/compagno/adoptionBoard/update/" + code);
  };

  // 게시글 삭제
  const btnDel = async () => {
    await deleteAdopBoard(code);
    navigate("/compagno/adoptionBoard/viewAll");
  };

  // 목록 버튼
  const btnList = () => {
    navigate("/compagno/adoptionBoard/viewAll");
  };

  // 댓글 페이징

  useEffect(() => {
    adopAPI();
  }, []);

  return (
    <>
      <Div>
        <div className="contentHeader">
          <h2>동물 입양</h2>
          {user.userId == adop.userId ? (
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
            {adop.images?.map((image) => (
              <img
                alt=""
                key={image.adopImageCode}
                // src={image.adopImage?.replace("C:", "http://localhost:8081")}

                src={image.adopImage?.replace(
                  "\\\\DESKTOP-U0CNG13\\upload\\adoptionBoard",
                  "http://192.168.10.28:8081/adoptionBoard/"
                )}
              />
            ))}
          </div>
          <div id="regiDate">
            {moment(adop.adopRegiDate).format("YYYY-MM-DD hh:mm")}
          </div>
          <div className="contentAll">
            <div className="postWriter">
              <div className="pContent">
                <div
                  id="userInfo"
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h3>
                    <FaUser />
                    &nbsp; 입양 신고자 정보
                  </h3>
                  <div
                    id="writerTag"
                    style={{
                      display: "flex",
                      borderBottom: "1px dashed black",
                      cursor: "pointer",
                    }}
                  >
                    <img
                      style={{
                        width: "35px",
                        height: "35px",
                        borderRadius: "50%",
                        border: "0.3px solid black",
                        marginRight: "10px",
                        alignContent: "center",
                      }}
                      src={"http://192.168.10.28:8081/" + adop.userImg}
                      // src={adop.adopAnimalImage?.replace(
                      //   "\\\\DESKTOP-U0CNG13\\upload\\adoptionBoard",
                      //   "http://192.168.10.28:8081/adoptionBoard/"
                      // )}
                    />
                    <span
                      style={{
                        alignContent: "center",
                        color: "black",
                        fontWeight: "bold",
                      }}
                    >
                      <MyToggleBar name={adop.userNickname} />
                    </span>
                  </div>
                </div>
                <div className="contents">
                  <div id="nickName">
                    <label>신고자 닉네임</label>
                    <span>{adop.userNickname}</span>
                  </div>
                  <div id="phone">
                    <label>신고자 연락처</label>
                    <span>{adop.userPhone}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="adopAnimal">
              <div className="pContent">
                <div id="animalInfo">
                  <h3>
                    <FaShieldDog />
                    &nbsp; 입양 동물 정보
                  </h3>
                </div>
                <div className="contents">
                  <div id="kind">
                    <label>축종</label>
                    <span>{adop.adopAnimalKind}</span>
                  </div>
                  <div id="color">
                    <label>색상</label>
                    <span>{adop.adopAnimalColor}</span>
                  </div>
                  <div id="gender">
                    <label>성별</label>
                    <span>{adop.adopAnimalGender}</span>
                  </div>
                  <div id="neuter">
                    <label>중성화 여부</label>
                    <span>{adop.adopAnimalNeuter}</span>
                  </div>
                  <div id="age">
                    <label>나이</label>
                    <span>{adop.adopAnimalAge}</span>
                  </div>
                  <div id="kg">
                    <label>무게(kg)</label>
                    <span>{adop.adopAnimalKg}</span>
                  </div>
                  <div id="feature">
                    <label>동물 특징</label>
                    <span>{adop.adopAnimalFeature}</span>
                  </div>
                  <div id="findPlace">
                    <label>발견된 장소</label>
                    <span>{adop.adopAnimalFindplace}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="center">
              <div className="pContent">
                <div id="centerInfo">
                  <h3>
                    <FaHouseMedical />
                    &nbsp; 입양 센터 정보
                  </h3>
                </div>
                <div className="contents">
                  <div id="centerName">
                    <label>보호센터명</label>
                    <span>{adop.adopCenterName}</span>
                  </div>
                  <div id="centerPhond">
                    <label>보호센터 연락처</label>
                    <span>{adop.adopCenterPhone}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="btnList">
              <button onClick={btnList}>목록</button>
            </div>
          </div>
        </div>
      </Div>
      <Comments />
    </>
  );
};
export default ViewAdopBoard;

import { createlostBoard } from "../../api/lostBoard";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { FaShieldDog } from "react-icons/fa6";
import { FiMapPin } from "react-icons/fi";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { userSave } from "../../store/user";
import moment from "moment";
import "moment/locale/ko";

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
  justify-content: center;
  align-items: center;
  position: relative;
  top: 180px;

  input {
    margin: 5px 10px;
    width: 80%;
    height: 30px;
    font-family: "TAEBAEKmilkyway";
    font-weight: bold;
  }

  h1 {
    font-size: 3rem;
    margin-bottom: 40px;
    font-family: "TAEBAEKmilkyway";
    font-weight: bold;
  }
  .contents {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: left;
    width: 60%;

    .postOwner,
    .lostContents,
    .lostAnimal,
    .option {
      display: flex;
      flex-direction: column;
      margin-top: 20px;
      margin-bottom: 60px;

      h3 {
        font-size: 1.8rem;
        margin-bottom: 20px;
        font-family: "TAEBAEKmilkyway";
        font-weight: bold;
      }
      .pContent {
        border-top: 1px solid green;
        display: flex;
        flex-direction: column;
        #userInfo {
          display: flex;
          justify-content: space-between;
        }
        #mark {
          display: flex;
          justify-content: space-between;
        }
        span {
          color: red;
        }

        table {
          margin-top: 10px;
          tr {
            height: 60px;
            /* background-color: pink; */
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
          tr#imgContent {
            height: 200px;

            td#imgContents {
              height: 100%;
              label#imgList {
                display: flex;
                flex-direction: column;
                margin: 0px;
                justify-content: center;
                align-items: center;
                height: 100%;
                margin-top: 15px;
                p {
                  margin-top: 10px;
                }
              }
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
            select {
              font-weight: bold;
              option {
                font-family: "TAEBAEKmilkyway";
                font-weight: bold;
              }
            }
          }
          #kindInputBox {
            width: 40%;
          }
        }
      }
    }
  }
  .btn {
    display: flex;
    margin: 30px 0;
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

const CreateLostBoard = () => {
  const dispatch = useDispatch();

  // 유저정보 가지고온다
  const user = useSelector((state) => {
    return state.user;
  });
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== null) {
      dispatch(userSave(JSON.parse(localStorage.getItem("user"))));
    }
  }, []);

  const [userNickname, setUserNickname] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [lostDate, setLostDate] = useState("");
  const [lostLocation, setLostLocatioin] = useState("");
  const [lostLocationDetail, setLostLocationDetail] = useState("");
  const [lostAnimalName, setLostAnimalName] = useState("");
  const [lostAnimalKind, setLostAnimalKind] = useState("");
  const [lostAnimalColor, setLostAnimalColor] = useState("");
  const [lostAnimalGender, setLostAnimalGender] = useState("");
  const [lostAnimalAge, setLostAnimalAge] = useState(0);
  const [lostAnimalFeature, setLostAnimalFeater] = useState("");
  const [lostAnimalRFID, setLostAnimalRFID] = useState("");
  const [images, setImages] = useState([]);
  const [lostRegiDate, setLostRegiDate] = useState("");

  // lostRegiDate 오늘 날짜 입력
  const lostRegiDateAPI = () => {
    const nowTime = moment().format("YYYY-MM-DD");
    setLostRegiDate(nowTime);
  };
  useEffect(() => {
    lostRegiDateAPI();
  }, []);

  // 이미지 미리보기
  const [imgSrc, setImgSrc] = useState([]);
  const imageCreate = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 3) {
      alert("최대 사진 갯수를 초과하였습니다. 다시 선택하여주세요.");
    } else {
      setImages(files);
      let file;
      for (let i = 0; i < files.length; i++) {
        file = files[i];
        const reader = new FileReader();
        reader.onload = () => {
          images[i] = reader.result;
          setImgSrc([...images]);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  // 성별
  const genderCheck = (gender) => {
    const checkboxes = document.getElementsByClassName("gender");
    for (let i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].value !== gender) {
        checkboxes[i].checked = false;
      } else if (checkboxes[i].value == gender) {
        checkboxes[i].checked = true;
        setLostAnimalGender(gender);
      }
    }
  };

  const navigate = useNavigate();
  const okCreate = async () => {
    const formData = new FormData();
    formData.append("userId", user.userId);
    formData.append("userImg", user.userImg);
    formData.append("userNickname", user.userNickname);
    formData.append("userPhone", user.userPhone);
    formData.append("lostDate", lostDate);
    formData.append("lostLocation", lostLocation);
    formData.append("lostLocationDetail", lostLocationDetail);
    formData.append("lostAnimalName", lostAnimalName);
    formData.append("lostAnimalKind", lostAnimalKind);
    formData.append("lostAnimalColor", lostAnimalColor);
    formData.append("lostAnimalGender", lostAnimalGender);
    formData.append("lostAnimalAge", lostAnimalAge);
    formData.append("lostAnimalFeature", lostAnimalFeature);
    formData.append("lostAnimalRFID", lostAnimalRFID);
    formData.append("lostRegiDate", lostRegiDate);
    images.forEach((image, index) => {
      formData.append(`images[${index}]`, image);
    });

    // not null 조건
    if (
      lostDate == "" ||
      lostAnimalName == "" ||
      lostLocation == "" ||
      lostAnimalKind == "" ||
      lostAnimalGender == ""
    ) {
      alert("필수 입력란을 확인해주세요.");
      if (lostAnimalRFID.length == 0 || lostAnimalRFID.length == 15) {
      } else {
        alert("마이크로칩 번호 입력란을 확인해주세요.");
      }
    } else {
      if (lostAnimalRFID.length == 0 || lostAnimalRFID.length == 15) {
        await createlostBoard(formData);
        navigate("/compagno/lostBoard/viewAll");
      } else {
        alert("마이크로칩 번호 입력란을 확인해주세요.");
      }
    }
  };

  // 게시글 작성 취소
  const delCreate = () => {
    navigate("/compagno/lostBoard/viewAll");
  };

  return (
    <Div>
      <h1>동물 분실 등록</h1>
      <div className="contents">
        <div className="postOwner">
          <div className="pContent">
            <table>
              <thead>
                <tr>
                  <td id="userInfo">
                    <h3>
                      <FaUser /> 분실 신고자 정보
                    </h3>
                    <span>변경 불가 항목입니다.</span>
                    <input
                      type="text"
                      value={lostRegiDate}
                      onChange={lostRegiDateAPI}
                      hidden
                    />
                  </td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>신고자 닉네임</th>
                  <td>
                    <input
                      type="text"
                      value={user.userNickname}
                      onChange={(e) => setUserNickname(e.target.value)}
                      readOnly
                    />
                  </td>
                </tr>
                <tr>
                  <th>신고자 연락처</th>
                  <td>
                    <input
                      type="text"
                      value={user.userPhone}
                      onChange={(e) => setUserPhone(e.target.value)}
                      readOnly
                    />
                  </td>
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
                  <td id="mark">
                    <h3>
                      <FiMapPin /> 분실일시 및 장소
                    </h3>
                    <span>* : 필수 입력란입니다.</span>
                  </td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>
                    분실 날짜<span>*</span>
                  </th>
                  <td>
                    <input
                      type="Date"
                      value={lostDate}
                      onChange={(e) => setLostDate(e.target.value)}
                      max={lostRegiDate}
                    />
                  </td>
                </tr>

                <tr>
                  <th>
                    분실 장소<span>*</span>
                  </th>
                  <td>
                    <input
                      type="text"
                      value={lostLocation}
                      onChange={(e) => setLostLocatioin(e.target.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <th>주위 특징 건물</th>
                  <td>
                    <input
                      type="text"
                      value={lostLocationDetail}
                      onChange={(e) => setLostLocationDetail(e.target.value)}
                    />
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
                  <th>
                    분실 동물 이름<span>*</span>
                  </th>
                  <td>
                    <input
                      type="text"
                      value={lostAnimalName}
                      onChange={(e) => setLostAnimalName(e.target.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <th>
                    축종<span>*</span>
                  </th>
                  <td>
                    <select onChange={(e) => setLostAnimalKind(e.target.value)}>
                      <option value="" className="animalKind">
                        ----------
                      </option>
                      <option value="개" className="animalKind">
                        개
                      </option>
                      <option value="고양이" className="animalKind">
                        고양이
                      </option>
                      <option value="기타" className="animalKind">
                        기타
                      </option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <th>색상</th>
                  <td>
                    <input
                      type="text"
                      value={lostAnimalColor}
                      onChange={(e) => setLostAnimalColor(e.target.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <th>
                    성별<span>*</span>
                  </th>
                  <td>
                    <label>
                      <input
                        type="checkbox"
                        value="수컷"
                        onChange={(e) => genderCheck(e.target.value)}
                        className="gender"
                      />
                      수컷
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        value="암컷"
                        onChange={(e) => genderCheck(e.target.value)}
                        className="gender"
                      />
                      암컷
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        value="모름"
                        onChange={(e) => genderCheck(e.target.value)}
                        className="gender"
                      />
                      알수없음
                    </label>
                  </td>
                </tr>
                <tr>
                  <th>나이</th>
                  <td>
                    <input
                      type="number"
                      min={0}
                      value={lostAnimalAge}
                      placeholder="숫자로 입력해주세요"
                      onChange={(e) => setLostAnimalAge(e.target.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <th>동물 특징</th>
                  <td>
                    <input
                      type="text"
                      value={lostAnimalFeature}
                      onChange={(e) => setLostAnimalFeater(e.target.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <th>마이크로칩(RFID) 번호</th>
                  <td>
                    <input
                      type="text"
                      placeholder="RFID가 있는 경우, 15자리 숫자 입력해주세요"
                      maxLength="15"
                      onChange={(e) => setLostAnimalRFID(e.target.value)}
                    />
                  </td>
                </tr>
                <tr id="imgContent">
                  <th>사진첨부</th>
                  <td id="imgContents">
                    <label id="imgList">
                      <div id="images">
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={imageCreate}
                        />
                        <div className="images">
                          {imgSrc.map((img, i) => (
                            <div key={i}>
                              <img src={img} />
                            </div>
                          ))}
                        </div>
                      </div>
                      <p>사진 업로드 추가 (최대 3장)</p>
                    </label>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="btn">
        <button className="okBtn" onClick={okCreate}>
          작성 완료
        </button>
        <button className="delBtn" onClick={delCreate}>
          작성 취소
        </button>
      </div>
    </Div>
  );
};
export default CreateLostBoard;

import { viewOneLostBoard, updateLostBoard } from "../../api/lostBoard";
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
  input {
    font-family: "TAEBAEKmilkyway";
    font-weight: bold;
  }
  select {
    font-family: "TAEBAEKmilkyway";
    font-weight: bold;
    option {
      font-weight: bold;
    }
  }
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
              #userInfo {
                display: flex;
                justify-content: space-between;
                span {
                  color: red;
                }
              }
              #mark {
                display: flex;
                justify-content: space-between;
                span {
                  color: red;
                }
              }
              th {
                border-right: 1px solid black;
                padding-right: 50px;
                width: 25%;
                span {
                  color: red;
                }
              }
              td {
                padding-left: 20px;
                width: 100%;
              }
              #RFIDBox {
                width: 40%;
              }
            }
            tr#imgContent {
              height: 200px;
              td#imgContents {
                height: 100%;
                .images {
                  display: flex;
                }
                img {
                  width: 200px;
                  height: 200px;
                  margin: 0px 10px;
                }
                #existingImg {
                  display: flex;
                  cursor: pointer;
                }
                label#imgList {
                  display: flex;
                  flex-direction: column;
                  margin: 0px;
                  justify-content: center;
                  align-items: flex-start;
                  height: fit-content;
                  margin-top: 20px;
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
                  margin: 0px 20px;
                  display: flex;
                  img {
                    display: flex;
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

  // 유저 정보 가져오기
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

  // 기존 정보 불러오기
  const { code } = useParams();
  const [lost, setLost] = useState({});
  const viewsAPI = async () => {
    const response = await viewOneLostBoard(code);
    // setLost(response.data);
    setLostLocation(response.data.lostLocation);
    setLostDate(moment(response.data.lostDate).format("YYYY-MM-DD"));
    setLostLocationDetail(response.data.lostLocationDetail);
    setLostAnimalName(response.data.lostAnimalName);
    setLostAnimalKind(response.data.lostAnimalKind);
    setLostAnimalColor(response.data.lostAnimalColor);
    setLostAnimalGender(response.data.lostAnimalGender);
    setLostAnimalFeater(response.data.lostAnimalFeature);
    setLostAnimalRFID(response.data.lostAnimalRFID);
    setLostAnimalAge(response.data.lostAnimalAge);
    setExistImages(response.data.images);
    setLostBoardCode(code);
  };

  useEffect(() => {
    viewsAPI();
  }, []);

  // update 기능
  const [lostBoardCode, setLostBoardCode] = useState(0);
  const [lostDate, setLostDate] = useState("");
  const [lostLocation, setLostLocation] = useState("");
  const [lostLocationDetail, setLostLocationDetail] = useState("");
  const [lostAnimalName, setLostAnimalName] = useState("");
  const [lostAnimalKind, setLostAnimalKind] = useState("");
  const [lostAnimalColor, setLostAnimalColor] = useState("");
  const [lostAnimalGender, setLostAnimalGender] = useState("");
  const [lostAnimalAge, setLostAnimalAge] = useState(0);
  const [lostAnimalFeature, setLostAnimalFeater] = useState("");
  const [lostAnimalRFID, setLostAnimalRFID] = useState("");
  const [images, setImages] = useState([]); // 새로 넣을 이미지
  const [existImages, setExistImages] = useState([]); // 기존 이미지
  console.log("원래 있던 이미지");
  console.log(existImages);
  const [lostRegiDate, setLostRegiDate] = useState("");

  // lostRegiDate 수정(오늘) 날짜 입력
  const lostRegiDateAPI = () => {
    const nowTime = moment().format("YYYY-MM-DD");
    setLostRegiDate(nowTime);
  };
  useEffect(() => {
    lostRegiDateAPI();
  }, []);

  // 축종 기존 선택
  const defaultKind = () => {
    const list = document.getElementsByClassName("animalKind");
    for (let i = 0; i < list.length; i++) {
      if (list[i].value == lostAnimalKind) {
        list[i].selected = true;
      }
    }
  };
  // 축종 변경
  const selectKind = (e) => {
    setLostAnimalKind(e.target.value);
  };

  // 성별 기존 선택
  const defaultGender = () => {
    const checkboxes = document.getElementsByClassName("gender");
    for (let i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].value == lostAnimalGender) {
        checkboxes[i].checked = true;
      }
    }
  };
  // 나이 기존
  const defaultAge = () => {
    const defaultAge = document.getElementById("age");
    defaultAge.value = lostAnimalAge;
  };
  useEffect(() => {
    defaultGender();
    defaultKind();
    defaultAge();
  }, [lostAnimalGender, lostAnimalKind, lostAnimalAge]);

  // 성별 선택
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

  // 이미지 입력 및 미리보기
  const [imgSrc, setImgSrc] = useState([]);
  const imageCreate = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 3) {
      alert("최대 사진 갯수를 초과하였습니다ㅏ. 다시 선택하여주세요.");
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
  // 기존 사진 클릭 삭제
  const deleteImage = (code) => {
    const imagesss = existImages.filter(
      (image) => image.lostImageCode !== code
    );
    setExistImages(imagesss);
  };

  // 수정 사진 클릭 삭제
  // const delUpdateImage = (id) => {
  //   const imasdfsdf = imgSrc.filter((_, index) => index !== id);
  //   console.log(imasdfsdf);
  //   setImages(images.filter((_, index) => index !== id));
  //   console.log(images);
  // };

  const okUpdate = async () => {
    const formData = new FormData();
    formData.append("lostBoardCode", lostBoardCode);
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
    console.log(images); // 새로 받은 거
    images.forEach((image, index) => {
      formData.append(`images[${index}]`, image);
    });
    existImages.forEach((existImg, index) => {
      formData.append(`image[${index}]`, existImg.lostImage);
    });
    console.log(existImages); // 기존에 있는 거
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
        await updateLostBoard(formData);
        navigate("/compagno/lostBoard/viewAll");
      } else {
        alert("마이크로칩 번호 입력란을 확인해주세요.");
      }
    }
  };

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
                    <td id="userInfo">
                      <h3>
                        <FaUser /> 분실 신고자 정보
                      </h3>
                      <span>변경 불가 항목입니다.</span>
                    </td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>신고자 닉네임</th>
                    <td>
                      <input type="text" value={user.userNickname} readOnly />
                    </td>
                  </tr>
                  <tr>
                    <th>신고자 연락처</th>
                    <td>
                      <input type="text" value={user.userPhone} readOnly />
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
                        max={lostRegiDate}
                        onChange={(e) => setLostDate(e.target.value)}
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
                        onChange={(e) => setLostLocation(e.target.value)}
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
                      <select onChange={selectKind}>
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
                        모름
                      </label>
                    </td>
                  </tr>
                  <tr>
                    <th>나이</th>
                    <td>
                      <input
                        id="age"
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
                        id="RFIDBox"
                        type="text"
                        placeholder="RFID가 있는 경우, 15자리 숫자 입력해주세요"
                        maxLength="15"
                        value={lostAnimalRFID}
                        onChange={(e) => setLostAnimalRFID(e.target.value)}
                      />
                    </td>
                  </tr>
                  <tr id="imgContent">
                    <th>사진첨부</th>
                    <td id="imgContents">
                      {imgSrc.length == 0 ? (
                        <div id="existingImg">
                          {existImages?.map((image) => (
                            <img
                              alt=""
                              key={image.lostImageCode}
                              // src={image.lostImage?.replace(
                              //   "C:",
                              //   "http://localhost:8081"
                              // )}
                              src={image.lostImage?.replace(
                                "\\\\DESKTOP-U0CNG13\\upload\\lostBoard",
                                "http://192.168.10.28:8081/lostBoard/"
                              )}
                              onClick={() => deleteImage(image.lostImageCode)}
                            />
                          ))}
                        </div>
                      ) : (
                        <div className="images">
                          {imgSrc.map((img, id) => (
                            <div key={id}>
                              <img src={img} />
                              {/* onClick={() => delUpdateImage(id)} */}
                            </div>
                          ))}
                        </div>
                      )}
                      <label id="imgList">
                        <div id="images">
                          <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={imageCreate}
                          />
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
      </div>
      <div className="btn">
        <button className="okBtn" onClick={okUpdate}>
          수정 완료
        </button>
        <button className="delBtn" onClick={btnDel}>
          수정 취소
        </button>
      </div>
    </Div>
  );
};
export default LostBoardUpdate;

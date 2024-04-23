import { createlostBoard } from "../../api/lostBoard";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { FaShieldDog } from "react-icons/fa6";
import { FiMapPin } from "react-icons/fi";
import { FaUser } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { userSave } from "../../store/user";

const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 50px;

  input {
    margin: 5px 10px;
    width: 80%;
    height: 30px;
  }

  h1 {
    font-size: 3rem;
    margin-bottom: 40px;
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
      }
      .pContent {
        border-top: 1px solid green;
        display: flex;
        flex-direction: column;
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
            }
            td {
              padding-left: 20px;
              width: 100%;
            }
          }
          td {
            label {
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
  const [lostAnimalAge, setLostAnimalAge] = useState("");
  const [lostAnimalFeature, setLostAnimalFeater] = useState("");
  const [lostAnimalRFID, setLostAnimalRFID] = useState("");
  const [images, setImages] = useState([]);

  const rfidReges = async (e) => {
    const regex = /^[0-9]{10}$/g;
    if (regex.test(e.target.value)) {
      await setLostAnimalRFID(e.target.value);
      console.log("rfid type : ", typeof e.target.value);
      console.log("lostAnimalRFID : " + lostAnimalRFID);
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
    images.forEach((image, index) => {
      formData.append(`files[${index}]`, image);
    });

    console.log("fromData : " + formData.userNickname);
    await createlostBoard(formData);

    navigate("/compagno/lostBoard/viewAll");
  };

  const [imgSrc, setImgSrc] = useState([]);
  const imageCreate = (e) => {
    const files = Array.from(e.target.files);
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
  };

  const delCreate = async () => {
    await navigate("/compagno/lostBoard/viewAll");
  };

  return (
    <Div>
      <h1>동물 분실 등록</h1>
      <div className="contents">
        <div className="postOwner">
          <h3>
            <FaUser />
            분실 신고자 정보
          </h3>
          <div className="pContent">
            <table>
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
            </table>
          </div>
        </div>
        <div className="lostContents">
          <h3>
            <FiMapPin />
            분실일시 및 장소
          </h3>
          <div className="pContent">
            <table>
              <tr>
                <th>분실 날짜</th>
                <td>
                  <input
                    type="Date"
                    value={lostDate}
                    onChange={(e) => setLostDate(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <th>분실 장소</th>
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
            </table>
          </div>
        </div>
        <div className="lostAnimal">
          <h3>
            <FaShieldDog />
            분실동물 정보
          </h3>
          <div className="pContent">
            <table>
              <tr>
                <th>분실 동물 이름</th>
                <td>
                  <input
                    type="text"
                    value={lostAnimalName}
                    onChange={(e) => setLostAnimalName(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <th>축종/품종</th>
                <td>
                  <input
                    type="text"
                    value={lostAnimalKind}
                    onChange={(e) => setLostAnimalKind(e.target.value)}
                  />
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
                <th>성별</th>
                <td>
                  <input
                    type="text"
                    value={lostAnimalGender}
                    onChange={(e) => setLostAnimalGender(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <th>나이</th>
                <td>
                  <input
                    type="text"
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
                    placeholder="15자리숫자입력해주세요"
                    // value={lostAnimalRFID}
                    maxLength="15"
                    onChange={rfidReges}
                    // onChange={(e) => rfidReges(e.target.value)}
                    // onChange={(e) => setLostAnimalRFID(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <th>사진첨부</th>
                <td>
                  <label>
                    사진 업로드 추가
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
                  </label>
                </td>
              </tr>
            </table>
          </div>
        </div>
        <div className="option">
          <h3>
            <IoSettingsOutline />
            설정 및 기타
          </h3>
          <div className="pContent">
            <label>자동입력 방지 문자입력</label>
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

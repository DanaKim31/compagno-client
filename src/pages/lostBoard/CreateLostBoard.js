import { createlostBoard } from "../../api/lostBoard";
import { useState } from "react";
import styled from "styled-components";

import { FaShieldDog } from "react-icons/fa6";
import { FiMapPin } from "react-icons/fi";
import { FaUser } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
// import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 50px;

  input {
    margin: 5px 10px;
    width: 30%;
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
          margin-top: 20px;
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
  // const [user, setUser] = useState({});

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

  // const info = useSelector((state) => {
  //   return state.user;
  // });

  // useEffect(() => {
  //   if (Object.keys(info).length === 0) {
  //     setUser(JSON.parse(localStorage.getItem("user")));
  //   } else {
  //     setUser(info);
  //   }
  // }, []);

  const navigate = useNavigate();
  const okCreate = async () => {
    const formData = new FormData();
    formData.append("userNickname", userNickname);
    formData.append("userPhone", userPhone);
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
    await createlostBoard(formData);
    navigate("/viewAllLostBoard");
  };

  const imageCreate = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  const delCreate = async () => {
    await navigate("/viewAllLostBoard");
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
                  <input
                    type="text"
                    value={userNickname}
                    onChange={(e) => setUserNickname(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <th>신고자 연락처</th>
                <td>
                  <input
                    type="text"
                    value={userPhone}
                    onChange={(e) => setUserPhone(e.target.value)}
                  />
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
                    value={lostAnimalRFID}
                    onChange={(e) => setLostAnimalRFID(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <th>사진첨부</th>
                <td>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={imageCreate}
                  />
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
            <label>분실신고 게시판 노출 여부</label>
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

import { updateAdopBoard, viewOneAdopBoard } from "../../api/adoptionBoard";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { userSave } from "../../store/user";
import { useNavigate } from "react-router-dom";

import { FaShieldDog, FaHouseMedical } from "react-icons/fa6";
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
  }
  /* 본문 내용-사진부터 */
  .contentsBody {
    width: 65%;

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
          #userInfo {
            display: flex;
            justify-content: space-between;
            span {
              color: red;
            }
          }
          #animalInfo {
            display: flex;
            justify-content: space-between;
            span {
              color: red;
            }
          }
          .contents {
            margin-left: 40px;
            margin-top: 20px;
            font-size: 1.4rem;
            margin-top: 35px;

            div {
              margin-bottom: 40px;

              label {
                width: 20%;
                border-right: 1px solid green;
                span {
                  color: red;
                }
              }
              input {
                font-weight: bold;
                margin-left: 40px;
              }
              select {
                font-weight: bold;
                margin-left: 40px;
                option {
                  font-weight: bold;
                }
              }
            }
            #imgContent {
              #existingImg {
                margin-top: 30px;
                img {
                  margin-right: 20px;
                  width: 250px;
                  height: 250px;
                  cursor: pointer;
                }
              }
            }

            #images {
              margin-bottom: 0px;
              height: 30px;
              label {
                border-right: none;
                width: 30%;
                cursor: pointer;
              }
              input {
                display: none;
              }
              p {
                margin-left: 35px;
              }
            }
            .images {
              display: flex;
              margin-top: 20px;
              img {
                margin-right: 20px;
                width: 250px;
                height: 250px;
                cursor: pointer;
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
        font-size: 1rem;
        margin: 0px 10px;
        &:hover {
          background-color: white;
          border: 3px solid #94b29b;
        }
      }
      :nth-child(2) {
        background-color: black;
        color: white;
        &:hover {
          background-color: white;
          border: 3px solid black;
          color: black;
        }
      }
    }
  }
`;

const UpdateAdopBoard = () => {
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

  // 기본 정보 불러오기
  const { code } = useParams();
  const [adop, setAdop] = useState({});
  const adopAPI = async () => {
    const response = await viewOneAdopBoard(code);
    setAdopBoardCode(code);
    setUserId(response.data.userId);
    setUserNickname(response.data.userNickname);
    setUserImg(response.data.userImg);
    setUserPhone(response.data.userPhone);
    setAdopAnimalKind(response.data.adopAnimalKind);
    setAdopAnimalColor(response.data.adopAnimalColor);
    setAdopAnimalFindplace(response.data.adopAnimalFindplace);
    setAdopAnimalGender(response.data.adopAnimalGender);
    setAdopAnimalNeuter(response.data.adopAnimalNeuter);
    setAdopAnimalAge(response.data.adopAnimalAge);
    setAdopAnimalKg(response.data.adopAnimalKg);
    setAdopAnimalFeature(response.data.adopAnimalFeature);
    setAdopCenterName(response.data.adopCenterName);
    setAdopCenterPhone(response.data.adopCenterPhone);
    setExistImages(response.data.images);
  };

  useEffect(() => {
    adopAPI();
  }, []);

  //update 기능
  const [userId, setUserId] = useState("");
  const [userNickname, setUserNickname] = useState("");
  const [userImg, setUserImg] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [adopBoardCode, setAdopBoardCode] = useState(0);
  const [adopAnimalKind, setAdopAnimalKind] = useState("");
  const [adopAnimalColor, setAdopAnimalColor] = useState("");
  const [adopAnimalFindplace, setAdopAnimalFindplace] = useState("");
  const [adopAnimalGender, setAdopAnimalGender] = useState("");
  const [adopAnimalNeuter, setAdopAnimalNeuter] = useState("");
  const [adopAnimalAge, setAdopAnimalAge] = useState("");
  const [adopAnimalKg, setAdopAnimalKg] = useState("");
  const [adopAnimalFeature, setAdopAnimalFeature] = useState("");
  const [adopCenterName, setAdopCenterName] = useState("");
  const [adopCenterPhone, setAdopCenterPhone] = useState("");
  const [adopRegiDate, setAdopRegiDate] = useState("");
  const [images, setImages] = useState([]); // 새로 넣을 이미지
  const [existImages, setExistImages] = useState([]); // 기존 이미지

  // 오늘 수정 날짜
  const adopRegiDateAPI = () => {
    const nowTime = moment().format("YYYY-MM-DD hh:mm:ss");
    setAdopRegiDate(nowTime);
  };
  useEffect(() => {
    adopRegiDateAPI();
  }, []);

  // 축종 기존 선택
  const defaultKind = () => {
    const list = document.getElementsByClassName("animalKind");
    for (let i = 0; i < list.length; i++) {
      if (list[i].value == adopAnimalKind) {
        list[i].selected = true;
      }
    }
  };

  // 축종 변경
  const selectKind = (e) => {
    setAdopAnimalKind(e.target.value);
  };

  // 성별 기존 선택
  const defaultGender = () => {
    const checkboxes = document.getElementsByClassName("gender");
    for (let i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].value == adopAnimalGender) {
        checkboxes[i].checked = true;
      }
    }
  };
  // 중성화 기존 선택
  const defaultNeuter = () => {
    const checkboxes = document.getElementsByClassName("neuter");
    for (let i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].value == adopAnimalNeuter) {
        checkboxes[i].checked = true;
      }
    }
  };
  // 나이 기존
  const defaultAge = () => {
    const defaultAge = document.getElementById("age");
    defaultAge.value = adopAnimalAge;
  };
  useEffect(() => {
    defaultGender();
    defaultKind();
    defaultAge();
    defaultNeuter();
  }, [adopAnimalGender, adopAnimalKind, adopAnimalAge, adopAnimalNeuter]);

  // 성별 선택
  const genderCheck = (gender) => {
    const checkboxes = document.getElementsByClassName("gender");
    for (let i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].value !== gender) {
        checkboxes[i].checked = false;
      } else if (checkboxes[i].value == gender) {
        checkboxes[i].checked = true;
        setAdopAnimalGender(gender);
      }
    }
  };
  // 중성화 선택
  const neuterCheck = (neuter) => {
    const checkboxes = document.getElementsByClassName("neuter");
    for (let i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].value !== neuter) {
        checkboxes[i].checked = false;
      } else if (checkboxes[i].value == neuter) {
        checkboxes[i].checked = true;
        setAdopAnimalNeuter(neuter);
      }
    }
  };

  // 이미지 입력 및 미리보기
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

  // 수정 완료
  const okUpdate = async () => {
    const formData = new FormData();
    formData.append("adopBoardCode", adopBoardCode);
    formData.append("userId", user.userId);
    formData.append("userImg", user.userImg);
    formData.append("userNickname", user.userNickname);
    formData.append("userPhone", user.userPhone);
    formData.append("adopAnimalKind", adopAnimalKind);
    formData.append("adopAnimalColor", adopAnimalColor);
    formData.append("adopAnimalFindplace", adopAnimalFindplace);
    formData.append("adopAnimalGender", adopAnimalGender);
    formData.append("adopAnimalNeuter", adopAnimalNeuter);
    formData.append("adopAnimalAge", adopAnimalAge);
    formData.append("adopAnimalKg", adopAnimalKg);
    formData.append("adopAnimalFeature", adopAnimalFeature);
    formData.append("adopCenterName", adopCenterName);
    formData.append("adopCenterPhone", adopCenterPhone);
    formData.append("adopRegiDate", adopRegiDate);
    // 새로 받은 것
    images.forEach((image, index) => {
      formData.append(`images[${index}]`, image);
    });
    // 기존 것
    existImages.forEach((existImg, index) => {
      formData.append(`image[${index}]`, existImg.adopImage);
    });

    // not null 조건
    if (
      adopAnimalKind == "" ||
      adopAnimalGender == "" ||
      adopAnimalNeuter == "" ||
      adopAnimalFindplace == ""
    ) {
      alert("필수 입력란을 확인해주세요.");
    } else {
      await updateAdopBoard(formData);
      navigate("/compagno/adoptionBoard/view/" + code);
    }
  };

  // 기존 사진 클릭 삭제
  const deleteImage = (code) => {
    const imagesss = existImages.filter(
      (image) => image.adopImageCode !== code
    );
    setExistImages(imagesss);
  };

  // 수정 취소
  const delUpdate = () => {
    navigate("/compagno/adoptionBoard/view/" + code);
  };

  return (
    <Div>
      <div className="contentHeader">
        <h2>동물 입양 정보 수정</h2>
      </div>
      <div className="contentsBody">
        <div className="contentAll">
          <div className="postWriter">
            <div className="pContent">
              <div id="userInfo">
                <h3>
                  <FaUser />
                  &nbsp; 입양 신고자 정보
                </h3>
                <span>변경 불가 항목입니다.</span>
              </div>
              <div className="contents">
                <div id="nickName">
                  <label>신고자 닉네임</label>
                  <input type="text" value={userNickname || ""} readOnly />
                </div>
                <div id="phone">
                  <label>신고자 연락처</label>
                  <input type="text" value={userPhone || ""} readOnly />
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
                <span>* : 필수 입력란입니다.</span>
              </div>
              <div className="contents">
                <div id="kind">
                  <label>
                    축종<span>*</span>
                  </label>
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
                </div>
                <div id="color">
                  <label>색상</label>
                  <input
                    type="text"
                    value={adopAnimalColor}
                    onChange={(e) => setAdopAnimalColor(e.target.value)}
                  />
                </div>
                <div id="gender">
                  <label>
                    성별<span>*</span>
                  </label>
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
                </div>
                <div id="neuter">
                  <label>
                    중성화 여부<span>*</span>
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      value="예"
                      onChange={(e) => neuterCheck(e.target.value)}
                      className="neuter"
                    />
                    예
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      value="아니오"
                      onChange={(e) => neuterCheck(e.target.value)}
                      className="neuter"
                    />
                    아니오
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      value="알수없음"
                      onChange={(e) => neuterCheck(e.target.value)}
                      className="neuter"
                    />
                    알수없음
                  </label>
                </div>
                <div id="age">
                  <label>나이</label>
                  <input
                    id="age"
                    type="number"
                    min={0}
                    value={adopAnimalAge}
                    placeholder="숫자로 입력해주세요"
                    onChange={(e) => setAdopAnimalAge(e.target.value)}
                  />
                </div>
                <div id="kg">
                  <label>무게(kg)</label>
                  <input
                    id="kg"
                    type="number"
                    min={0}
                    value={adopAnimalKg}
                    placeholder="숫자로 입력해주세요"
                    onChange={(e) => setAdopAnimalKg(e.target.value)}
                  />
                </div>
                <div id="feature">
                  <label>동물 특징</label>
                  <input
                    type="text"
                    value={adopAnimalFeature}
                    onChange={(e) => setAdopAnimalFeature(e.target.value)}
                  />
                </div>
                <div id="findPlace">
                  <label>
                    발견된 장소<span>*</span>
                  </label>
                  <input
                    type="text"
                    value={adopAnimalFindplace}
                    onChange={(e) => setAdopAnimalFindplace(e.target.value)}
                  />
                </div>
                <div id="imgContent">
                  <label>사진첨부</label>
                  {imgSrc.length == 0 ? (
                    <div id="existingImg">
                      {existImages?.map((image) => (
                        <img
                          alt=""
                          key={image.adopImageCode}
                          // src={image.adopImage?.replace(
                          //   "C:",
                          //   "http://localhost:8081"
                          // )}

                          src={image.adopImage?.replace(
                            "\\\\DESKTOP-U0CNG13\\upload\\adoptionBoard",
                            "http://192.168.10.28:8081/adoptionBoard/"
                          )}
                          onClick={() => deleteImage(image.adopImageCode)}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="images">
                      {imgSrc.map((img, i) => (
                        <div key={i}>
                          <img src={img} />
                        </div>
                      ))}
                    </div>
                  )}
                  <div id="imgList">
                    <div id="images">
                      <label>
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={imageCreate}
                        />
                        <p>사진 업로드 추가 (최대 3장)</p>
                      </label>
                    </div>
                  </div>
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
                  <input
                    type="text"
                    value={adopCenterName}
                    onChange={(e) => setAdopCenterName(e.target.value)}
                  />
                </div>
                <div id="centerPhond">
                  <label>보호센터 연락처</label>
                  <input
                    type="text"
                    value={adopCenterPhone}
                    onChange={(e) => setAdopCenterPhone(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="btnList">
            <button onClick={okUpdate}>수정 완료</button>
            <button onClick={delUpdate}>수정 취소</button>
          </div>
        </div>
      </div>
    </Div>
  );
};
export default UpdateAdopBoard;

import { createAdopBoard } from "../../api/adoptionBoard";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { userSave } from "../../store/user";
import { useNavigate } from "react-router-dom";

import { FaShieldDog, FaHouseMedical } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";

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

  .allContents {
    width: 70%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    h1 {
      font-size: 3rem;
      font-weight: bold;
      display: flex;
      justify-content: center;
      margin-bottom: 50px;
    }
    .postWriter,
    .adopAnimal,
    .center {
      width: 100%;
      border-top: 1px solid green;
      padding-top: 15px;
      margin-bottom: 30px;
    }
    .postWriter {
      .userInfo {
        display: flex;
        justify-content: space-between;
        margin-bottom: 15px;
        h3 {
          margin-left: 5px;
          font-weight: bold;
        }
        span {
          color: red;
        }
      }
      .contents {
        margin-left: 20px;
        div {
          margin-bottom: 20px;
          label {
            margin-right: 20px;
            font-size: 1.2rem;
            border-right: 1px solid gray;
            width: 20%;
            margin-bottom: 20px;
          }
          input {
            font-weight: bold;
            margin-left: 35px;
          }
        }
      }
    }
    .adopAnimal {
      .animalInfo {
        display: flex;
        justify-content: space-between;
        margin-bottom: 15px;
        h3 {
          margin-left: 5px;
          font-weight: bold;
        }
        span {
          color: red;
        }
      }
      .contents {
        margin-left: 20px;
        div {
          margin-bottom: 20px;
          label {
            margin-right: 20px;
            font-size: 1.2rem;
            width: 20%;
            border-right: 1px solid gray;
            padding-right: 15px;
            margin-bottom: 20px;
            span {
              color: red;
            }
            input {
              margin-right: 15px;
            }
          }
          select {
            margin-left: 35px;
            font-weight: bold;
            height: 30px;
            option {
              font-weight: bold;
            }
          }
          input {
            font-weight: bold;
            margin-left: 35px;
            width: 20%;
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
    .center {
      .centerInfo {
        display: flex;
        justify-content: space-between;
        margin-bottom: 15px;
        h3 {
          margin-left: 5px;
          font-weight: bold;
        }
      }
      .contents {
        margin-left: 20px;
        div {
          margin-bottom: 20px;
          label {
            margin-right: 20px;
            font-size: 1.2rem;
            border-right: 1px solid gray;
            width: 20%;
            margin-bottom: 20px;
          }
          input {
            font-weight: bold;
            margin-left: 35px;
            width: 25%;
          }
        }
      }
    }
  }
`;

const CreateAdopBoard = () => {
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

  const [adopAnimalKind, setAdopAnimalKind] = useState("");
  const [adopAnimalColor, setAdopAnimalColor] = useState("");
  const [adopAnimalFindplace, setAdopAnimalFindplace] = useState("");
  const [adopAnimalGender, setAdopAnimalGender] = useState("");
  const [adopAnimalNeuter, setAdopAnimalNeuter] = useState("");
  const [adopAnimalAge, setAdopAnimalAge] = useState(0);
  const [adopAnimalKg, setAdopAnimalKg] = useState(0);
  const [adopAnimalFeature, setAdopAnimalFeature] = useState("");
  const [adopCenterName, setAdopCenterName] = useState("");
  const [adopCenterPhone, setAdopCenterPhone] = useState("");
  const [images, setImages] = useState([]);

  // 이미지 미리보기
  const [imgSrc, setImgSrc] = useState([]);
  const imageCreate = (e) => {
    const files = Array.from(e.target.files);

    if (files.length > 3) {
      alert("최대 사진 갯수를 초과하였습니다. 다시 선택하여주세요.");
    } else {
      setImages(files);
      // setAdopAnimalImage(files[0]);
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
        setAdopAnimalGender(gender);
      }
    }
  };

  // 중성화여부
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

  const navigate = useNavigate();
  const okCreate = async () => {
    const formData = new FormData();
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
    images.forEach((image, index) => {
      formData.append(`images[${index}]`, image);
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
      await createAdopBoard(formData);
      navigate("/compagno/adoptionBoard/viewAll");
    }
  };

  const delImg = (i) => {
    const existImages = images.filter((element) => element !== images[i]);
    setImages(existImages);
    const existImgSrc = imgSrc.filter((image) => image !== imgSrc[i]);
    setImgSrc(existImgSrc);
  };

  // 게시글 작성 취소
  const delCreate = () => {
    navigate("/compagno/adoptionBoard/viewAll");
  };
  return (
    <Div>
      <div className="allContents">
        <h1>동물 입양 등록</h1>
        {/* 분실 신고자 정보  */}
        <div className="postWriter">
          <div className="userInfo">
            <h3>
              <FaUser />
              &nbsp; 입양 신고자 정보
            </h3>
            <span>변경 불가 항목입니다.</span>
          </div>
          <div className="contents">
            <div id="nickName">
              <label>신고자 닉네임</label>
              <input type="text" value={user.userNickname || ""} readOnly />
            </div>
            <div id="phoneNum">
              <label>신고자 연락처</label>
              <input type="text" value={user.userPhone || ""} readOnly />
            </div>
          </div>
        </div>
        {/* 입양 동물 정보 */}
        <div className="adopAnimal">
          <div className="animalInfo">
            <h3>
              <FaShieldDog />
              &nbsp;입양 동물 정보
            </h3>
            <span>* : 필수 입력란입니다.</span>
          </div>
          <div className="contents">
            <div id="kind">
              <label>
                축종<span>*</span>
              </label>
              <select onChange={(e) => setAdopAnimalKind(e.target.value)}>
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
            </div>
            <div id="color">
              <label>색상</label>
              <input
                type="text"
                value={adopAnimalColor || ""}
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
                알수없음
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
                type="number"
                min={0}
                value={adopAnimalAge || ""}
                placeholder="숫자로 입력해주세요"
                onChange={(e) => setAdopAnimalAge(e.target.value)}
              />
            </div>
            <div id="kg">
              <label>무게(kg)</label>
              <input
                type="number"
                min={0}
                value={adopAnimalKg || ""}
                placeholder="숫자로 입력해주세요"
                onChange={(e) => setAdopAnimalKg(e.target.value)}
              />
            </div>
            <div id="feature">
              <label>동물 특징</label>
              <input
                type="text"
                value={adopAnimalFeature || ""}
                onChange={(e) => setAdopAnimalFeature(e.target.value)}
              />
            </div>
            <div id="findPlace">
              <label>
                발견된 장소<span>*</span>
              </label>
              <input
                type="text"
                value={adopAnimalFindplace || ""}
                onChange={(e) => setAdopAnimalFindplace(e.target.value)}
              />
            </div>
            <div id="imgContent">
              <label>사진첨부</label>
              <div id="imgContents">
                <div id="imgList">
                  <div className="images">
                    {imgSrc.map((img, i) => (
                      <div key={i}>
                        <img src={img} onClick={() => delImg(i)} />
                      </div>
                    ))}
                  </div>
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
        {/* 입양 센터 정보 */}
        <div className="center">
          <div className="centerInfo">
            <h3>
              <FaHouseMedical />
              &nbsp;입양 센터 정보
            </h3>
          </div>
          <div className="contents">
            <div className="centerName">
              <label>보호센터명</label>
              <input
                type="text"
                value={adopCenterName || ""}
                onChange={(e) => setAdopCenterName(e.target.value)}
              />
            </div>
            <div id="centerPhone">
              <label>보호센터 연락처</label>
              <input
                placeholder="하이픈(-) 포함해서 입력 요망"
                type="text"
                value={adopCenterPhone || ""}
                onChange={(e) => setAdopCenterPhone(e.target.value)}
              />
            </div>
          </div>
        </div>
        {/* 버튼 */}
        <div className="btn">
          <button className="okBtn" onClick={okCreate}>
            작성 완료
          </button>
          <button className="delBtn" onClick={delCreate}>
            작성 취소
          </button>
        </div>
      </div>
    </Div>
  );
};
export default CreateAdopBoard;

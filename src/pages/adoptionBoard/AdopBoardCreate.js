import { createAdopBoard } from "../../api/adoptionBoard";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { userSave } from "../../store/user";
import { useNavigate } from "react-router-dom";

import moment from "moment";
import "moment/locale/ko";

import { FaShieldDog } from "react-icons/fa6";
import { FiMapPin } from "react-icons/fi";
import { FaPray, FaUser } from "react-icons/fa";

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
`;

const CreateAdopBoard = () => {
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

  const [userNickname, setUserNickname] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [adopAnimalImage, setAdopAnimalImage] = useState("");
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
  const [imgSrc, sestImgSsrc] = useState([]);
  const imageCreate = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 3) {
      alert("최대 사진 갯수를 초과하였습니다. 다시 선택하여주세요.");
    } else {
      setImages(files);
      setAdopAnimalImage(files[0]);
      let file;
      for (let i = 0; i < files.length; i++) {
        file = files[i];
        const reader = new FileReader();
        reader.onload = () => {
          images[i] = reader.result;
          sestImgSsrc([...images]);
          setAdopAnimalImage("images[0]");
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

  const navigate = useNavigate();
  const okCreate = async () => {
    const formData = new FormData();
    formData.append("userId", user.userId);
    formData.append("userImg", user.userImg);
    formData.append("userNickname", user.userNickname);
    formData.append("adopAnimalImage", adopAnimalImage);
    formData.append("adopAnimalKind", adopAnimalKind);
    formData.append("adopAnimalColor", adopAnimalColor);
    formData.append("adopAnimalFindplace", adopAnimalFindplace);
    formData.append("adopAnimalGender", adopAnimalGender);
    formData.apppend("adopAnimalNeuter", adopAnimalNeuter);
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

  // 게시글 작성 취소
  const delCreate = () => {
    navigate("/compagno/adoptionBoard/viewAll");
  };
  return (
    <Div>
      <h1>동물 입양 등록</h1>
      <div className="contents">
        <div className="postOwner">
          <div className="pContent">
            <table>
              <thead>
                <tr>
                  <td id="userInfo">
                    <h3>
                      <FaUser />
                      분실 신고자 정보
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
        <div className="adopAnimal">
          <div className="pContent">
            <table>
              <thead>
                <tr>
                  <td>
                    <h3>
                      <FaShieldDog /> 입양 동물 정보
                    </h3>
                  </td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>
                    축종<span>*</span>
                  </th>
                  <td>
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
                  </td>
                </tr>
                <tr>
                  <th>색상</th>
                  <td>
                    <input
                      type="text"
                      value={adopAnimalColor}
                      onChange={(e) => setAdopAnimalColor(e.target.value)}
                    />
                  </td>
                </tr>
                <tr>
                  성별<span>*</span>
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
                      value={adopAnimalAge}
                      placeholder="숫자로 입력해주세요"
                      onChange={(e) => setAdopAnimalAge(e.target.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <th>동물 특징</th>
                  <td>
                    <input
                      type="text"
                      value={adopAnimalFeature}
                      onChange={(e) => setAdopAnimalFeature(e.target.value)}
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
export default CreateAdopBoard;

import { viewOneAdopBoard, deleteAdopBoard } from "../../api/adoptionBoard";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { UseDispatch, useDispatch, useSelector } from "react-redux";
import { userSave } from "../../store/user";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import "moment/locale/ko";

import styled from "styled-components";
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
  align-items: center;
  justify-content: center;
  position: relative;
  top: 180px;
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
  const [images, setImages] = useState([]);
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
              src={image.adopImage?.replace("C:", "http://localhost:8081")}
            />
          ))}
        </div>
        <div id="regiDate">
          {moment(adop.regiDate).format("YYYY-MM-DD hh:mm")}
        </div>
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
                    </td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>신고자 닉네임</th>
                    <td>{adop.userNickname}</td>
                  </tr>
                  <tr>
                    <th>신고자 연락처</th>
                    <td>{adop.userPhone}</td>
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
                    <th>축종</th>
                    <td>{adop.adopAnimalKind}</td>
                  </tr>
                  <tr>
                    <th>색상</th>
                    <td>{adop.adopAnimalColor}</td>
                  </tr>
                  <tr>
                    <th>성별</th>
                    <td>{adop.adopAnimalGender}</td>
                  </tr>
                  <tr>
                    <th>중성화 여부</th>
                    <td>{adop.adopAnimalNeuter}</td>
                  </tr>
                  <tr>
                    <th>나이</th>
                    <td>{adop.adopAnimalAge}</td>
                  </tr>
                  <tr>
                    <th>무게(kg)</th>
                    <td>{adop.adopAnimalKg}</td>
                  </tr>
                  <tr>
                    <th>동물 특징</th>
                    <td>{adop.adopAnimalFeature}</td>
                  </tr>
                  <tr>
                    <th>발견된 장소</th>
                    <td>{adop.adopAnimalFindplace}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="center">
            <div className="pContent">
              <table>
                <thead>
                  <tr>
                    <td id="userInfo">
                      <h3>
                        <FaHouseMedical />
                        입양 센터 정보
                      </h3>
                    </td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>보호센터명</th>
                    <td>{adop.adopCenterName}</td>
                  </tr>
                  <tr>
                    <th>보호센터 연락처</th>
                    <td>{adop.adopCenterPhone}</td>
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
    </Div>
  );
};
export default ViewAdopBoard;

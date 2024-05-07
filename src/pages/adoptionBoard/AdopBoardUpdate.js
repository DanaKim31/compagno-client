// import { viewOneAdopBoard, updateAdopBoard } from "../../api/adoptionBoard";
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
`;

const updateAdopBoard = () => {
  // 유저 정보 가져오기
  //   const dispatch = useDispatch();
  //   const user = useSelector((state) => {
  //     return state.user;
  //   });
  //   useEffect(() => {
  //     const token = localStorage.getItem("token");
  //     if (token !== null) {
  //       dispatch(userSave(JSON.parse(localStorage.getItem("user"))));
  //     }
  //   }, []);

  // 기본 정보 불러오기
  //   const { code } = useParams();
  //   const [adop, setAdop] = useState({});
  //   const adopAPI = async () => {
  //     const resposne = await viewOneAdopBoard(code);
  //   };

  return (
    <Div>
      <h2>안녕</h2>
    </Div>
  );
};
export default updateAdopBoard;

// 디테일 페이지 => 수정 삭제
import { viewClass, deleClass, updateClass } from "../../api/onedayClass";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userSave } from "../../store/user";
import { useParams } from "react-router-dom";
import moment from "moment";
import styled from "styled-components";

const StyledDiv = styled.div`
  background-color: rgb(244, 244, 244);
  width: 100%;
  margin: auto;
  /* text-align: center; */
  position: relative;
  top: 113px;
  font-weight: bold;

  img {
  }

  @font-face {
    font-family: "TAEBAEKmilkyway";
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2310@1.0/TAEBAEKmilkyway.woff2")
      format("woff2");
    font-weight: normal;
    font-style: normal;
  }

  * {
    font-family: "TAEBAEKmilkyway";
    font-size: 1rem;
  }
`;

const ClassDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { code } = useParams();
  const [odcClass, setOdcClass] = useState([]); // 하나의 정보만 가져와야하니깐 !

  // const [odcTitle, setOdcTitle] = useState("");
  // const [odcContent, setContent] = useState("");
  // const [odcAccompaying, setOdcAccompaying] = useState("");
  // const [odcMainImage, setOdcMainImage] = useState([]);
  // const [odcStartDate, setOdcStartDate] = useState("");
  // const [odcLastDate, setOdcLastDate] = useState("");
  const [edit, setEdit] = useState(null);
  const user = useSelector((state) => {
    return state.user;
  });

  // 클래스 한개 정보 가져오기 !
  const oneClassAPI = async () => {
    const response = await viewClass(code); // get
    setOdcClass(response.data);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== null) {
      dispatch(userSave(JSON.parse(localStorage.getItem("user"))));
    }
    oneClassAPI();
  }, []);

  // 삭제 관련 로직
  const onDelete = async (code) => {
    await deleClass(code);
    navigate("/compagno/onedayClassBoard");
  };

  // 수정 관련 로직
  const onUpdate = async () => {
    navigate("/compagno/onedayClassBoard/update/" + code);
  };

  const onBack = () => {
    navigate("/compagno/onedayClassBoard");
  };

  return (
    <StyledDiv>
      <div className="oneClass">
        <img
          src={"http://192.168.10.28:8081/" + user.userImg}
          style={{
            width: "15%",
            position: "relative",
            top: "50px",
            left: "50px",
          }}
        />
        <div id="photo" style={{ width: "100%", height: "300px" }}>
          {odcClass.images?.map((image) => (
            <img
              style={{ width: "25%", height: "60%" }}
              src={image.odcMainImage?.replace(
                "\\\\DESKTOP-U0CNG13\\upload\\ClassBoard",
                "http://192.168.10.28:8081/ClassBoard"
              )}
            />
          ))}
        </div>
        <div>
          <p> 유저 닉네임 : {user.userNickname}</p>
          <p> 유저 이메일 : {user.userEmail}</p>
          {/* <div>사용자 : {user.userImg}</div> */}
          <div className="info">
            <p className="title">제목 : {odcClass.odcTitle}</p>
            <p className="Content">내용 : {odcClass.odcContent}</p>
            <p className="Accompaying">
              동반 가능 여부 : {odcClass.odcAccompaying}
            </p>
            <p className="regidate">
              등록 날짜 : {moment(odcClass.odcRegiDate).format("YY-MM-DD")}
            </p>

            <p className="startdate">
              클래스 시작 날짜 :
              {moment(odcClass.odcStartDate).format("YY-MM-DD")}
            </p>
            <p className="lastdate">
              클래스 마지막 날짜 :
              {moment(odcClass.odcLastDate).format("YY-MM-DD")}
            </p>
          </div>
        </div>
      </div>
      <button onClick={onUpdate}>수정</button>
      <button onClick={onDelete}>삭제</button>
      <button onClick={onBack}>취소</button>
    </StyledDiv>
  );
};

export default ClassDetail;

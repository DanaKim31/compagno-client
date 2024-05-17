// 디테일 페이지 => 수정 삭제
import { viewClass } from "../../api/onedayClass";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userSave } from "../../store/user";
import { useParams } from "react-router-dom";
import moment from "moment";
import styled from "styled-components";
import MyToggleBar from "../../components/note/MyToggleBar";

const StyledDiv = styled.div`
  background-color: rgb(244, 244, 244);
  width: 100%;
  margin: auto;
  position: relative;
  font-weight: bold;
  top: 88px;
  height: 127.7vh;

  img {
    object-fit: fill;
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

  .photoBack {
    width: 100%;
    height: 415px;
    position: absolute;
    background-color: black;
    z-index: 1;
    opacity: 0.4;
  }
  #photo {
    width: 100vh;
  }

  .oneClass {
    position: relative;
    top: 130px;
  }
  .user {
    align-items: center;
    display: flex;
    justify-content: space-between;
    text-align: center;
    position: relative;
    top: -7px;
    right: 10px;
    width: 141.5vh;
  }

  .userinfo {
    position: relative;
    text-align: justify;
  }

  button {
    border-radius: 5px;
    border: 2px solid;
    color: rgb(32, 61, 59);
    text-decoration: none;
    padding: 10px;
    font-size: 1rem;
    font-weight: bold;
  }

  button:hover {
    background-color: rgb(32, 61, 59);
    color: white;
  }
`;

const ClassDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { code } = useParams();
  const [odcClass, setOdcClass] = useState([]); // 하나의 정보만 가져와야하니깐 !

  const user = useSelector((state) => {
    return state.user;
  });

  // 클래스 한개 정보 가져오기 !
  const oneClassAPI = async () => {
    const response = await viewClass(code); // get
    setOdcClass(response.data);
    console.log(response.data);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== null) {
      dispatch(userSave(JSON.parse(localStorage.getItem("user"))));
    }
    oneClassAPI();
  }, []);

  // 수정 페이지로 이동 !
  const onUpdate = async () => {
    navigate("/compagno/onedayClassBoard/update/" + code);
  };

  const onBack = () => {
    navigate("/compagno/onedayClassBoard");
  };

  return (
    <StyledDiv>
      <div className="photoBack"></div>
      <div className="oneClass">
        <div style={{ width: "100%", height: "300px" }}>
          {odcClass.images?.map((image) => (
            <img
              id="photo"
              style={{
                width: "100%",
                height: "139%",
                position: "relative",
                bottom: "131px",
                objectFit: "fill",
              }}
              src={image.odcMainImage?.replace(
                "\\\\DESKTOP-U0CNG13\\upload\\ClassBoard",
                "http://192.168.10.28:8081/ClassBoard"
              )}
            />
          ))}
        </div>
        <div className="context" style={{ position: "relative", top: "50px" }}>
          <div
            className="user"
            style={{
              border: "1px solid",
              borderRadius: "25px",
              width: "90%",
              display: "flex",
              left: "92px",
              justifyContent: "space-around",
            }}
          >
            <img
              src={"http://192.168.10.28:8081/" + user.userImg}
              style={{
                width: "25vh",
                position: "relative",
              }}
            />
            <div className="userinfo">
              유저 닉네임 :
              <div className="toggle">
                <MyToggleBar
                  name={odcClass.user?.userNickname}
                  style={{ width: "78px" }}
                />
              </div>
              {/* {odcClass.user.userNickname} */}
              <p> 이메일 : {user.userEmail}</p>
            </div>
            <p className="regidate">
              등록 날짜 : {moment(odcClass.odcRegiDate).format("YY-MM-DD")}
            </p>
            <div>
              <p className="startdate">
                클래스 시작 날짜 :
                {moment(odcClass.odcStartDate).format("YY-MM-DD")}
              </p>
              <p className="lastdate">
                클래스 마지막 날짜 :
                {moment(odcClass.odcLastDate).format("YY-MM-DD")}
              </p>
            </div>
            <p className="Accompaying">
              동반 가능 여부 : {odcClass.odcAccompaying}
            </p>
          </div>
          <div
            className="info"
            style={{
              display: "block",
              textAlign: "center",
              top: "32px",
              position: "relative",
            }}
          >
            {/* <div>사용자 : {user.userImg}</div> */}
            <div>
              <p className="title" style={{}}>
                제목 <br /> <br />
                {odcClass.odcTitle}
              </p>

              <p
                className="Content"
                style={{ width: "100%", position: "relative" }}
              >
                상세 내용
                <br /> <br />
                {odcClass.odcContent}
              </p>
            </div>
            {/* {user} */}
            {user.userId == odcClass.user?.userId ? (
              //&& user.userId !== undefined
              <button onClick={onUpdate}>수정</button>
            ) : (
              <></>
            )}

            <button onClick={onBack}>취소</button>
          </div>
        </div>
      </div>
    </StyledDiv>
  );
};

export default ClassDetail;

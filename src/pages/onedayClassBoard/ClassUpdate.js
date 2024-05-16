// 디테일 페이지 => 수정 삭제
import {
  viewClass,
  deleClass,
  updateClass,
  addOnedayClass,
} from "../../api/onedayClass";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userSave } from "../../store/user";
import { useParams } from "react-router-dom";
import moment from "moment";
import styled from "styled-components";
import MyToggleBar from "../../components/note/MyToggleBar";
import { Prev } from "react-bootstrap/esm/PageItem";

const StyledDiv = styled.div`
  background-color: rgb(244, 244, 244);
  width: 100%;
  margin: auto;
  position: relative;
  font-weight: bold;
  top: 88px;
  height: 170vh;

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
    font-weight: bold;
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

const ClassUpdate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { code } = useParams();
  const [odcClass, setOdcClass] = useState({}); // 하나의 정보만 가져와야하니깐 !
  const [file, setFile] = useState(null);
  // const [images, setImages] = useState([]);

  const user = useSelector((state) => {
    return state.user;
  });

  // 1. 처음 클래스 한개에대한 정보 가져오고 !
  const oneClassAPI = async () => {
    const response = await viewClass(code); // get
    setOdcClass(response.data);
  };

  // 1 - 1 : 클래스 useEffect
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== null) {
      dispatch(userSave(JSON.parse(localStorage.getItem("user"))));
    }
    oneClassAPI();
  }, []);

  // 1 . 기존에 있던 정보들 먼저 삭제 하고 !!
  const onDelete = async () => {
    await deleClass(code);
    navigate("/compagno/onedayClassBoard");
  };

  const imageChange = (e) => {
    const files = Array.from(e.target.files);
    setFile(files[0]);
  };

  // 수정하는 부분 수정후 => 저장시켜서 보내기
  const onSubmit = async () => {
    const formData = new FormData();
    formData.append("odcCode", odcClass.odcCode);
    formData.append("odcTitle", odcClass.odcTitle);
    formData.append("odcContent", odcClass.odcContent);
    formData.append("odcStartDate", odcClass.odcStartDate);
    formData.append("odcLastDate", odcClass.odcLastDate);
    formData.append("odcAccompaying", odcClass.odcAccompaying);
    formData.append("imageCode", odcClass.images[0].odcImageCode);
    formData.append("imageURL", odcClass.images[0].odcMainImage);
    if (file !== null) {
      formData.append("file", file);
    }

    if (odcClass.odcTitle == "" || odcClass.odcTitle == undefined) {
      alert("등록할 클래스명을 적어주세요");
    } else if (odcClass.odcContent == "" || odcClass.odcContent == undefined) {
      alert("자세한 클래스 내용을 적어주세요");
    } else {
      await updateClass(formData);

      navigate("/compagno/onedayClassBoard/detail/" + code);
    }
  };

  // 수정페이지에서 디테일 페이지로 이동
  const onBack = () => {
    navigate("/compagno/onedayClassBoard/detail/" + code);
  };

  return (
    <StyledDiv>
      <div className="photoBack"></div>
      <div className="oneClass">
        <div style={{ width: "100%", height: "300px" }}>
          {odcClass.images?.map((image) => (
            <img
              key={image.odcCode}
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

          <input
            type="file"
            onChange={imageChange}
            style={{
              position: "relative",
              zIndex: "1",
              bottom: "116px",
              width: "298px",
              left: "1592px",
            }}
          />
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
            <p
              className="regidate"
              style={{ position: "relative", top: "8px" }}
            >
              등록 날짜 : {moment(odcClass.odcRegiDate).format("YY-MM-DD")}
            </p>
            <div>
              클래스 시작 날짜 :
              <input
                type="date"
                className="startdate"
                value={odcClass.odcStartDate}
                onChange={(e) =>
                  setOdcClass((prev) => ({
                    ...prev,
                    odcStartDate: e.target.value,
                  }))
                }
              />
              클래스 마지막 날짜 :
              <input
                type="date"
                className="lastdate"
                value={odcClass.OdcLastDate}
                onChange={(e) =>
                  setOdcClass((prev) => ({
                    ...prev,
                    odcLastDate: e.target.value,
                  }))
                }
              />
            </div>
            <div className="Accompaying">
              동반 가능여부 :
              <label>
                Y
                <input
                  type="radio"
                  value="Y"
                  className="Acom"
                  name="Acc"
                  onChange={(e) =>
                    setOdcClass((prev) => ({
                      ...prev,
                      odcAccompaying: e.target.value,
                    }))
                  }
                />
              </label>
              <label>
                N
                <input
                  type="radio"
                  value="N"
                  name="Acc"
                  className="Acom"
                  onChange={(e) =>
                    setOdcClass((prev) => ({
                      ...prev,
                      odcAccompaying: e.target.value,
                    }))
                  }
                />
              </label>
            </div>
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
            <div>
              제목 : <br /> <br />
              <input
                type="text"
                className="title"
                value={odcClass.odcTitle}
                style={{
                  width: "50%",
                  height: "80px",
                  textAlign: "center",
                  fontSize: "1.5rem",
                }}
                onChange={(e) =>
                  setOdcClass((prev) => ({ ...prev, odcTitle: e.target.value }))
                }
              />
              <br /> <br />
              <p
                className="Content"
                style={{ width: "100%", position: "relative" }}
              >
                상세 내용 :
                <br /> <br />
                <input
                  type="text"
                  style={{
                    width: "50%",
                    height: "50vh",
                    textAlign: "center",
                    fontSize: "1.5rem",
                  }}
                  value={odcClass.odcContent}
                  onChange={(e) =>
                    setOdcClass((prev) => ({
                      ...prev,
                      odcContent: e.target.value,
                    }))
                  }
                ></input>
              </p>
            </div>
            <button onClick={onSubmit}>완료</button>
            <button onClick={onDelete}>삭제</button>
            <button onClick={onBack}>취소</button>
          </div>
        </div>
      </div>
    </StyledDiv>
  );
};

export default ClassUpdate;

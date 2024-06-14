import styled from "styled-components";
import MyPageSidebar from "../../components/user/MyPageSidebar";
import MyPageTab from "../../components/user/MyPageTab";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useDidMountEffect from "../../components/user/useDidMountEffect";
import { getAdoptionList, getAdoptionCount } from "../../api/user";
import moment from "moment";
import AdopLostPaging from "../../components/user/AdopLostPagination";
import { useLocation } from "react-router-dom";

const Div = styled.div`
  @font-face {
    font-family: "TAEBAEKmilkyway";
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2310@1.0/TAEBAEKmilkyway.woff2")
      format("woff2");
    font-weight: normal;
    font-style: normal;
  }
  /* .adoption {
    color: black;
    background-color: white;
  } */

  display: flex;
  height: 100vh;
  padding-top: 112px;
  font-family: "TAEBAEKmilkyway";
  font-weight: bold;

  .myAdopMain {
    width: calc(100vw - 300px);
    display: flex;
    flex-direction: column;
    padding-top: 20px;

    .contentZone {
      width: 100%;
      height: calc(100vh - 66px);
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      padding-top: 15px;

      #headText {
        width: 1200px;
        padding-bottom: 5px;
        font-weight: bold;
      }

      .cardZone {
        width: fit-content;
        display: grid;
        grid-template-rows: repeat(3, 200px);
        grid-template-columns: repeat(2, 600px);
        gap: 15px 10px;

        .adopCard {
          display: flex;
          flex-direction: row;
          border: 2px dashed black;
          border-radius: 15px;
          padding: 10px 10px;

          .adopCardImg {
            display: flex;
            justify-content: center;
            align-items: center;

            img {
              width: 250px;
              height: 170px;
              object-fit: cover;
              border-radius: 15px;
            }
          }

          .adopCardText {
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }
      }
    }
  }
`;

const MyPageAdoption = () => {
  const [user, setUser] = useState({});
  // 유저정보 가지고 오기
  const info = useSelector((state) => {
    return state.user;
  });

  useEffect(() => {
    if (Object.keys(info).length === 0) {
      setUser(JSON.parse(localStorage.getItem("user")));
    } else {
      setUser(info);
    }
  }, []);

  useDidMountEffect(() => {
    adopListAPI();
  }, [user]);

  // 입양 리스트 + 갯수 초기값 세팅
  const [adopList, setAdopList] = useState([]);
  const [page, setPage] = useState(1);
  const [adopCount, setAdopCount] = useState(0);

  // 입양 리스트 + 갯수 가져오기
  const adopListAPI = async () => {
    const response = await getAdoptionList(user.userId, page);
    const adopData = response.data;
    setAdopList(adopData);

    const countResponse = await getAdoptionCount(user.userId);
    const countAdopData = countResponse.data;
    setAdopCount(countAdopData);
  };

  // 페이지 변경
  const handlePageChange = async (page) => {
    setPage(page);
    const response = await getAdoptionList(user.userId, page);
    const adopData = response.data;
    setAdopList(adopData);
  };

  // 페이지 경로에서 정보 따오기
  const location = useLocation();
  const nowLoca = location.pathname.substring(17);

  return (
    <Div>
      <MyPageSidebar />
      <div className="myAdopMain">
        <MyPageTab onClickMenu={nowLoca} />
        <div className="contentZone">
          <h1 id="headText">입양 공고 작성 글 목록</h1>
          <div className="cardZone">
            {adopList?.map((adop) => (
              <div className="adopCard" key={adop.adopBoardCode}>
                <div className="adopCardImg">
                  <a
                    href={`/compagno/adoptionBoard/view/` + adop.adopBoardCode}
                  >
                    <img
                      // src={adop.adopAnimalImage?.replace(
                      //   "\\\\DESKTOP-U0CNG13\\upload\\adoptionBoard",
                      //   "http://192.168.10.28:8081/adoptionBoard/"
                      // )}
                      src={adop.adopAnimalImage?.replace(
                        "\\\\DESKTOP-U0CNG13\\upload\\adoptionBoard",
                        "http://192.168.10.28:8081/adoptionBoard/"
                      )}
                    />
                  </a>
                </div>
                <div className="adopCardText">
                  <ul>
                    <li>
                      <h2>&lt;{adop.adopAnimalKind}&gt;</h2>
                    </li>
                    <li>
                      <span>- 성별 : </span>
                      {adop.adopAnimalGender}
                    </li>
                    <li>
                      {" "}
                      <span>- 중성화 여부 : </span>
                      {adop.adopAnimalNeuter}
                    </li>
                    <li>
                      {" "}
                      <span>- 발견 장소 : </span>
                      {adop.adopAnimalFindplace}
                    </li>
                    <li>
                      {" "}
                      <span>- 등록 날짜 : </span>
                      {moment(adop.adopRegiDate).format("YYYY-MM-DD")}
                    </li>
                  </ul>
                </div>
              </div>
            ))}
          </div>
          <AdopLostPaging
            page={page}
            count={adopCount}
            setPage={handlePageChange}
          />
        </div>
      </div>
    </Div>
  );
};

export default MyPageAdoption;

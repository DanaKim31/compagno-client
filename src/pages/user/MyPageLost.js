import styled from "styled-components";
import MyPageSidebar from "../../components/user/MyPageSidebar";
import MyPageTab from "../../components/user/MyPageTab";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useDidMountEffect from "../../components/user/useDidMountEffect";
import moment from "moment";
import { getLostList, getLostCount } from "../../api/user";
import AdopLostPaging from "../../components/user/AdopLostPagination";

const Div = styled.div`
  @font-face {
    font-family: "TAEBAEKmilkyway";
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2310@1.0/TAEBAEKmilkyway.woff2")
      format("woff2");
    font-weight: normal;
    font-style: normal;
  }

  display: flex;
  height: 100vh;
  padding-top: 112px;
  font-family: "TAEBAEKmilkyway";
  font-weight: bold;

  .myLostMain {
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

      .cardZone {
        padding-top: 20px;
        width: fit-content;
        display: grid;
        grid-template-rows: repeat(3, 200px);
        grid-template-columns: repeat(2, 600px);
        gap: 30px 20px;

        .lostCard {
          display: flex;
          flex-direction: row;
          border: 1px dashed black;
          border-radius: 15px;
          padding: 10px 10px;

          .lostCardImg {
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

          .lostCardText {
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }
      }
    }
  }
`;

const MyPageLost = () => {
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
    lostListAPI();
  }, [user]);

  // 실종 리스트 + 갯수 초기값 세팅
  const [lostList, setLostList] = useState([]);
  const [page, setPage] = useState(1);
  const [countLost, setCountLost] = useState(0);

  // 실종 리스트 + 갯수 가져오기
  const lostListAPI = async () => {
    const response = await getLostList(user.userId, page);
    const lostData = response.data;

    const countResponse = await getLostCount(user.userId);
    const countLostData = countResponse.data;

    setLostList(lostData);
    setCountLost(countLostData);
  };

  // 페이지 변경
  const handlePageChange = async (page) => {
    setPage(page);
    const response = await getLostList(user.userId, page);
    const lostData = response.data;
    setLostList(lostData);
  };

  return (
    <Div>
      <MyPageSidebar />
      <div className="myLostMain">
        <MyPageTab />
        <div className="contentZone">
          <div className="cardZone">
            {lostList?.map((lost) => (
              <div className="lostCard" key={lost.lostBoardCode}>
                <div className="lostCardImg">
                  <img
                    src={lost.lostAnimalImage?.replace(
                      "\\\\DESKTOP-U0CNG13\\upload\\lostBoard",
                      "http://192.168.10.28:8081/lostBoard/"
                    )}
                  />
                </div>
                <div className="lostCardtext">
                  <ul>
                    <li>
                      <h2>&lt;{lost.lostAnimalName}&gt;</h2>
                    </li>
                    <li>
                      <h5>{lost.lostAnimalKind}</h5>
                    </li>
                    <li>
                      <span> - 성별 : {lost.lostAnimalGender}</span>
                    </li>
                    <li>
                      <span>- 실종 장소 : {lost.lostLocation}</span>
                    </li>
                    <li>
                      <span>
                        - 실종 날짜 :{" "}
                        {moment(lost.lostDate).format("YYYY-MM-DD")}
                      </span>
                    </li>
                    <li>
                      <span>
                        - 작성일 :{" "}
                        {moment(lost.lostRegiDate).format("YYYY-MM-DD")}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            ))}
          </div>
          <AdopLostPaging
            page={page}
            count={countLost}
            setPage={handlePageChange}
          />
        </div>
      </div>
    </Div>
  );
};

export default MyPageLost;

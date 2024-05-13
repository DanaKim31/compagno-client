import styled from "styled-components";
import MyPageSidebar from "../../components/user/MyPageSidebar";
import MyPageTab from "../../components/user/MyPageTab";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useDidMountEffect from "../../components/user/useDidMountEffect";
import { getAdoptionList, getAdoptionCount } from "../../api/user";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import moment from "moment";

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

  .myAdopMain {
    width: calc(100vw - 300px);
    display: flex;
    flex-direction: column;
    padding-top: 20px;

    .contentZone {
      height: calc(100vh - 66px);

      display: grid;
      grid-template-columns: 1fr 2fr;

      background-color: skyblue;
      width: 100%;

      .myAdopList {
        width: 90%;

        img {
          width: 100%;
          height: 200px;
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

    console.log();
  };

  // 페이지 변경
  const handlePageChange = async (page) => {
    setPage(page);
    const response = await getAdoptionList(user.userId, page);
    const adopData = response.data;
    setAdopList(adopData);
  };

  return (
    <Div>
      <MyPageSidebar />
      <div className="myAdopMain">
        <MyPageTab />
        <div className="contentZone">
          <Card style={{ width: "18rem" }}>
            {adopList?.map((adopInfo) => (
              <div className="myAdopList">
                <Card.Img
                  variant="top"
                  src={adopInfo.adopAnimalImage?.replace(
                    "\\\\DESKTOP-U0CNG13\\upload\\adoptionBoard",
                    "http://192.168.10.28:8081/adoptionBoard/"
                  )}
                />
                <Card.Body>
                  <Card.Title>{adopInfo.adopAnimalKind}</Card.Title>
                  <Card.Text>
                    <p>{adopInfo.adopAnimalGender}</p>
                    <p>{adopInfo.adopAnimalNeuter}</p>
                    <p>{adopInfo.adopAnimalFindplace}</p>
                    <p>{moment(adopInfo.adopRegiDate).format("YY-MM-DD")}</p>
                  </Card.Text>
                </Card.Body>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </Div>
  );
};

export default MyPageAdoption;

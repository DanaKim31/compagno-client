import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import { getContent } from "../../api/content";
import { useParams } from "react-router-dom";
import Map from "./Map";

const Div = styled.div`
  position: relative;
  top: 200px;
  #name {
    display: flex;
    justify-content: center;
    text-align: center;
    p {
      margin-left: 30px;
      font-size: 20px;
      margin-top: 10px;
    }
  }

  #contents {
    width: 80%;
    margin: 0 auto;
    padding-top: 50px;
    padding-bottom: 50px;
    display: flex;
    justify-content: space-between;

    p {
      margin-left: 50px;
    }
  }

  #map {
    height: 500px;
    width: 80%;
    margin: 0 auto;
  }
`;

const ContentDetail = () => {
  const { num } = useParams();
  const [content, setContent] = useState({});
  const [latitude, setLatitude] = useState(0);
  const [longtitude, setLongtitude] = useState(0);

  const contentAPI = async () => {
    const response = await getContent(num);
    setContent(response.data);
    setLatitude(response.data.latitude);
    setLongtitude(response.data.longtitude);
  };

  useEffect(() => {
    contentAPI();
  }, []);

  const container = document.querySelector("map");

  return (
    <Div>
      <div key={content.num}>
        <div id="name">
          <h1>{content.name}</h1>
          <p>{content.subCate}</p>
        </div>
        <div id="contents">
          <div>
            <p>주소 : {content.roadAddr}</p>
            <p>전화번호 : {content.phone}</p>
            <p>
              홈페이지 : <a href={content.url}>{content.url}</a>
            </p>
          </div>
          <div>
            <p>휴무일 : {content.holiday}</p>
            <p>운영시간 : {content.operatingHours}</p>
            <p>주차 가능 여부 : {content.parking}</p>
          </div>
          <div>
            <p>조회수 : {content.viewcount}</p>
          </div>
        </div>
      </div>
      <Map latitude={latitude} longtitude={longtitude} />
    </Div>
  );
};

export default ContentDetail;

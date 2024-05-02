import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import { getContent } from "../../api/content";
import { useParams } from "react-router-dom";
import Map from "./Map";

const Div = styled.div`
  position: relative;
  top: 200px;
  #map {
    height: 500px;
    width: 100%;
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

  return (
    <Div>
      <div key={content.num}>
        <p>{content.subCate}</p>
        <p>{content.roadAddr}</p>
        <p>{content.phone}</p>
        <p>{content.parking}</p>
      </div>
      <Map latitude={latitude} longtitude={longtitude} />
    </Div>
  );
};

export default ContentDetail;

import styled from "styled-components";
import { useState, useEffect } from "react";
import { getContent } from "../../api/content";
import { useParams } from "react-router-dom";

const Div = styled.div`
  position: relative;
  top: 200px;
`;

const ContentDetail = () => {
  const { num } = useParams();
  const [content, setContent] = useState({});

  const contentAPI = async () => {
    const response = await getContent(num);
    setContent(response.data);
  };

  useEffect(() => {
    contentAPI();
  }, []);
  return (
    <Div>
      <div key={content.num}>
        <p>{content.name}</p>
        <p>{content.subCate}</p>
        <p>{content.roadAddr}</p>
        <p>{content.phone}</p>
        <p>{content.parking}</p>
      </div>
    </Div>
  );
};

export default ContentDetail;

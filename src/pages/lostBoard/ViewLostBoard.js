import { viewOneLostBoard } from "../../api/lostBoard";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ViewLostBoard = () => {
  const { code } = useParams();
  const [views, setViews] = useState([]);
  const viewsAPI = async () => {
    const response = await viewOneLostBoard(code);
    setViews(response.data);
  };
  useEffect(() => {
    viewsAPI();
  }, []);

  return <h1>상세 페이지 </h1>;
};
export default ViewLostBoard;

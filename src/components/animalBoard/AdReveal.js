import { useState, useEffect } from "react";
import { showProducts } from "../../api/ad";
import { getCurrentPoint } from "../../api/ad";
import { useSelector, useDispatch } from "react-redux";
import { userSave } from "../../store/user";
const AdReveal = () => {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  // 유저 정보
  // const [user, setUser] = useState({});
  const user = useSelector((state) => {
    return state.user;
  });

  const [ads, setAds] = useState([]);
  const getProductsAPI = async () => {
    const response = await showProducts();
    console.log(response.data);
    setAds(response.data);
  }; // 여기에 다 담겨있음 부모댓글도 이것도

  // 현재 카테고리 포인트 가져오기
  const [points, setPoints] = useState([]);
  const currentPointAPI = async () => {
    if (Object.keys(user).length !== 0) {
      const response = await getCurrentPoint(user.userId);
      setPoints(response.data); // 현재 포인트값 잘 담기는거 확인
      console.log(response.data);
    } else {
      setPoints(null);
    }
  };
  //   console.log(point);
  useEffect(() => {
    if (token !== null) {
      dispatch(userSave(JSON.parse(localStorage.getItem("user"))));
    }
    getProductsAPI();
    currentPointAPI();
  }, []);
  return (
    <>
      {ads?.map((ad) => (
        <div key={ad.productBoardCode}>
          <span>{ad.animalCategory.animalType}</span>
        </div>
      ))}

      {points?.map((point) => (
        <div key={point.logicCode}>
          <span>{point.animalCategory.animalCategoryCode}</span>
        </div>
      ))}
    </>
  );
};
export default AdReveal;

import { useEffect, useState } from "react";
import { getCurrentPoint } from "../../api/ad";

// 받는 값. animalCategoryCode userId
export const AdLogic = (userId, categoryCode) => {
  /*
    포인트 증감이 일어나는 경우
    사용자가
        - 특정글에 들어감
        - 특정글에 좋아요 클릭/해제
    */
  // 유저별 카테고리 클릭 필요
  /*
    |__ cateCode   total_hit     
    |__    1            a
    |__    2            b
    |__    3            c
    |__    4            d

    유저 아이디별로 되어야 하므로 즉 회원가입과 동시에 컬럼추가가 일어나야함.
    -- logic_table                    각각의 카테의 totalhit
    |_ logic_code   user_Id     cate1_total  cate2_total   cate3_total   cate4_total  cate1_total_like   cate2_total_like   cate3_total_like   cate4_total_like 
    |_      1      pigeon22          4              5           7             3
    여기는 단순히 유저가 어떤 카테고리 글을 클릭했는지

     클릭수를 저장하지 말고 클릭때마다 바로바로 계산이 이루어 진후, db에 계산된 값으로 Update


     -- logic_table
     |__ logic_code   user_Id  total_value
     |__ 
     |__ 
     |__ 
   */
  // 특정글 클릭
  const hitPoint = 0.1; // 클릭된 카테고리 제외 전부 0.02씩 차감
  const hitLostPoint = -0.05; //현재 클릭수 가장 큰 카테고리에서 다른 카테고리 눌릴때마다 차감
  // 특정글 좋아요클릭
  const hitLikePoint = 0.5;
  const hitLikeLostPoint = -0.25;

  // 현재 카테고리 포인트 가져오기
  const [points, setPoints] = useState([]);
  const currentPointAPI = async () => {
    if (Object.keys(userId).length !== 0) {
      const response = await getCurrentPoint(userId);
      setPoints(response.data); // 현재 포인트값 잘 담기는거 확인
      console.log("함수쪽 포인트 들어옴");
    } else {
      setPoints(null);
      console.log("함수쪽 포인트 유저없음");
    }
  };
  useEffect(() => {
    currentPointAPI();
  }, []);
  return null;
};

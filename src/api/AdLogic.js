import axios from "axios";

// 인증 필요없는 RESTFUL API 가져올때 기본 루트
const instance = axios.create({
  baseURL: "http://localhost:8080/compagno/public/",
});

// 특정글 클릭
const hitPoint = 0.1; // 클릭된 카테고리 제외 전부 0.02씩 차감
const hitLostPoint = -0.05; //현재 클릭수 가장 큰 카테고리에서 다른 카테고리 눌릴때마다 차감
// 특정글 좋아요클릭
const hitLikePoint = 0.5;
const hitLikeLostPoint = -0.25;
const reciprocalFunction = (x) => {
  return 100 / (1 + Math.exp(-0.1 * (x - 50)));
};

// 특정 글에 들어갔을때 받는 값 증가 : animalCategoryCode userId
export const fluctuationByDetailP = async (target) => {
  // 배열에 감싸져있기에 첫번째 배열에서 꺼내오기
  if (target.length !== 0) {
    let x_value = target[0].inputValue + hitPoint;
    // x_value => new inputValue
    // console.log(x_value);
    const response = reciprocalFunction(x_value);
    // console.log(target, response);
    let data = { target: target[0], response: response, inputValue: x_value };
    console.log(data);
    await instance.put(`logic-point/positive`, data);
  }
};

// 특정 글에 들어갔을때 받는 값 감소 : animalCategoryCode userId
export const fluctuationByDetailM = async (exception) => {
  if (exception.length !== 0) {
    console.log(exception);
    let x_value = exception.inputValue + hitLostPoint;
    const response = reciprocalFunction(x_value);
    // console.log(response);
    let data = {
      exception: exception,
      response: response,
      inputValue: x_value,
    };
    console.log(data);
    await instance.put("logic-point/negative", data);
  }
};

// 특정 글에 좋아요 증감 시 받는 값 : userId animalCategoryCode likeThisCate(boolean addFav/ delFav 시)
export const fluctuationByLikeClick = (
  userId,
  categoryCode,
  likeThisCate
) => {};
/*
Object.keys(userId).length !== 0
*/

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

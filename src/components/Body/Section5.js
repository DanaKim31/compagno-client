import "../../assets/style.css";
import { GoArrowUpRight } from "react-icons/go";
///
import { useState, useEffect } from "react";
import { showProducts } from "../../api/ad";
import { getCurrentPoint } from "../../api/ad";
import { useSelector, useDispatch } from "react-redux";
import { userSave } from "../../store/user";
import AdCard from "../animalBoard/AdCard";
import useDidMountEffect from "../../assets/useDidMountEffect";
///
const Section5 = () => {
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
    // console.log(response.data);
    setAds(response.data);
  }; // 기존 productBoard 정보

  // 현재 카테고리 포인트 가져오기
  const [points, setPoints] = useState([]);
  const currentPointAPI = async () => {
    if (Object.keys(user).length !== 0) {
      const response = await getCurrentPoint(user.userId);
      setPoints(response.data);
    }
  };

  const [newAds, setNewAds] = useState([]); // 로그인 광고
  const [randomAds, setRandomAds] = useState([]); // 비로그인 광고
  // 로그인 안했을때
  const nonFilter = () => {
    if (Object.keys(user).length === 0) {
      // console.log(ads);
      const shuffleArray = (array) => {
        return array.sort(() => Math.random() - 0.5);
      };
      const noneFilteredArr = shuffleArray(
        ads.filter((ad) => ad.productBoardGrade >= 3.5)
      ).slice(0, 15);
      setRandomAds(noneFilteredArr);
    }
  };

  // 로그인 했을때
  const adListFilter = () => {
    // console.log("로그인함");
    //카테고리 포인트가 가장 높은 카테고리
    // 1. 가장 높은 점수
    const maxTotalScore = Math.max(...points.map((point) => point.totalScore));
    // =======================
    if (maxTotalScore === 0) {
      // 포인트 최댓값이 0일때
      // 사실상 비로그인상태와 같음
      const shuffleArray = (array) => {
        return array.sort(() => Math.random() - 0.5);
      };
      const noneFilteredArr = shuffleArray(ads);
      setNewAds(noneFilteredArr);
      //======================
    } else {
      setNewAds([]);
      // console.log(maxTotalScore);
      // 2. 의 요소 가져오기
      const highestScoreCate = points.find(
        (point) => point.totalScore === maxTotalScore
      );
      // console.log(maxTotalScore); // 초기값이 0이라서 필터넣으면 없어짐

      // 두 번째로 큰 요소(가장 큰 요소 제거)리스트
      const exceptHighest = points.filter(
        (point) => point.totalScore !== maxTotalScore
      );
      // 그 중에서 다시 가장 큰 값 뽑기
      const secondMaxTotalScore = Math.max(
        ...exceptHighest.map((exception) => exception.totalScore)
      );
      if (secondMaxTotalScore === 0) {
        // 가장 관심있는 첫순위는 뽑아짐, 근데 두번째가.
        // 제일 큰 요소만 반환
        const highestOnlyArr = ads
          .filter(
            (ad) =>
              ad.animalCategory.animalCategoryCode ===
              highestScoreCate.animalCategory.animalCategoryCode
          )
          .slice(0, 12);
        setNewAds(highestOnlyArr);
      } else {
        setNewAds([]);
        // console.log(secondMaxTotalScore);
        // console.log(points);
        const secondHighestScoreCate = points.find(
          (point) => point.totalScore === secondMaxTotalScore
        );
        // console.log(secondHighestScoreCate);

        // 세 번째로 큰 요소(두번째로 큰 요소가 있는 리스트에서 걔만 삭제) 리스트
        const exceptSecondHighest = exceptHighest.filter(
          (point) => point.totalScore !== secondMaxTotalScore
        );
        // 그중 큰값 뽑기
        const thridMaxTotalScore = Math.max(
          ...exceptSecondHighest.map((exception) => exception.totalScore)
        );
        const thridHighestScoreCate = points.find(
          (point) => point.totalScore === thridMaxTotalScore
        );
        // 각 요소별로 광고리스트
        // 포인트 가장 높음
        const adsCate01 = ads
          .filter(
            (ad) =>
              ad.animalCategory.animalCategoryCode ===
              highestScoreCate.animalCategory.animalCategoryCode
          )
          .filter((ad) => ad.productBoardGrade >= 3.5)
          .slice(0, 7);
        // 포인트 두번째로 높음
        // console.log(secondHighestScoreCate);
        const adsCate02 = ads
          .filter(
            (ad) =>
              ad.animalCategory.animalCategoryCode ===
              secondHighestScoreCate.animalCategory.animalCategoryCode
          )
          .filter((ad) => ad.productBoardGrade >= 3.5)
          .slice(0, 5);
        // // 포인트 세 번째로 높음
        const adsCate03 = ads
          .filter(
            (ad) =>
              ad.animalCategory.animalCategoryCode ===
              thridHighestScoreCate.animalCategory.animalCategoryCode
          )
          .filter((ad) => ad.productBoardGrade >= 3.5)
          .slice(0, 3);
        // console.log(adsCate01);
        // console.log(adsCate02);
        // console.log(adsCate03);
        // 새롭게 뽑힌 배열
        const filteredArr = [...adsCate01, ...adsCate02, ...adsCate03];

        const shuffleArray = (array) => {
          return array.sort(() => Math.random() - 0.5);
        };
        const randomArr = shuffleArray(filteredArr);
        setNewAds(randomArr);
      }
    }
  };

  //   console.log(point);
  useEffect(() => {
    getProductsAPI();
    if (token !== null) {
      dispatch(userSave(JSON.parse(localStorage.getItem("user"))));
    }
  }, []);
  useDidMountEffect(() => {
    currentPointAPI();
    nonFilter();
  }, [ads]);
  useDidMountEffect(() => {
    if (Object.keys(points).length !== 0) {
      adListFilter();
    }
  }, [points]);

  return (
    <>
      <section id="section5">
        <div className="marquee">
          <h1 className="adt">
            <GoArrowUpRight className="advArrow" />
            Advertisement
          </h1>
          <a href="/compagno/product-board" className="adtdetail">
            더 많은 사용후기 보기
          </a>
          <div>
            {Object.keys(user).length !== 0 ? (
              <>
                {newAds.map((ad, index) => (
                  <AdCard adDetail={ad} key={index} />
                ))}
              </>
            ) : (
              <>
                {randomAds.map((ad, index) => (
                  <AdCard adDetail={ad} key={index} />
                ))}
              </>
            )}
          </div>
        </div>
        <div className="marquee">
          <h1 className="odc">
            <GoArrowUpRight className="odcArrow" />
            OneDayclass
          </h1>
          <a href="/compagno/onedayClassBoard" className="odcdetail">
            더 많은 클래스 보기
          </a>
          <div>
            <span>
              <img src="/img/나의 동물과 똑 닮은 키링~.jpg" alt="logo image" />
            </span>
            <span>
              <img src="/img/수채화 클래스.jpg" alt="logo image" />
            </span>
            <span>
              <img src="/img/수제 간식.jpg" alt="logo image" />
            </span>
            <span>
              <img src="/img/동물 피규어.png" alt="logo image" />
            </span>
            <span>
              <img
                src="/img/나의 동물을 위한 간식만들기.jpg"
                alt="logo image"
              />
            </span>
            <span>
              <img src="/img/친구들과 함께 야외산책.png" alt="logo image" />
            </span>
            <span>
              <img src="/img/고양이 펫 리쉬.webp" alt="logo image" />
            </span>
            <span>
              <img src="/img/도기인사이드.jpg" alt="logo image" />
            </span>
            <span>
              <img src="/img/약선펫푸드 보호자 수업.jpg" alt="logo image" />
            </span>
            <span>
              <img src="/img/반려동물들과의 레크레이션.jpg" alt="logo image" />
            </span>
            <span>
              <img src="/img/반려동물친구들과 여행.jpg" alt="logo image" />
            </span>
          </div>
        </div>
      </section>
    </>
  );
};

export default Section5;

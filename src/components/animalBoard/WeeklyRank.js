import { useEffect, useState } from "react";
import styled from "styled-components";
import Image from "react-bootstrap/Image";
import { PiMedalFill } from "react-icons/pi";
import { latestFavCount, viewFavList, viewRanker } from "../../api/animalBoard";
import useDidMountEffect from "../../assets/useDidMountEffect";
const RankProfile = styled.div`
  width: 80%;
  padding-top: 200px;
  display: flex;
  justify-content: center;
  .ranker-image-container:nth-child(1) {
    order: 1;
    .medal-container {
      position: absolute;
      margin-left: 90px;
      margin-top: -110px;
      .medal {
        color: gold;
        font-size: 7rem;
      }
    }
  }
  .ranker-image-container:nth-child(2) {
    order: 0;
    margin-top: 50px;
    margin-right: 80px;
    .medal-container {
      position: absolute;
      margin-left: 90px;
      margin-top: -110px;
      .medal {
        color: silver;
        font-size: 7rem;
      }
    }
  }
  .ranker-image-container:nth-child(3) {
    order: 2;
    margin-top: 50px;
    margin-left: 80px;
    .medal-container {
      position: absolute;
      margin-left: 90px;
      margin-top: -110px;
      .medal {
        color: brown;
        font-size: 7rem;
      }
    }
  }
  .rank-profile {
    width: 200px;
    height: 200px;
    object-fit: cover;
    position: relative;
  }
`;
const WeeklyRank = () => {
  // 랭킹결과표
  const [rankers, setRanker] = useState([]);
  const favRankAPI = async () => {
    const response = await viewRanker();
    setRanker(response.data);
  };
  // favList 불러오기
  const [favList, setFavList] = useState([]);
  const favListAPI = async () => {
    const response = await viewFavList();
    setFavList(response.data);
  };
  console.log(favList);

  // 중복 제거
  const [filteredRankers, setFilteredRanker] = useState([]);
  const uniqueTop3Members = () => {
    const response = rankers
      .filter(
        (ranker, index, self) =>
          self.findIndex((r) => r.user.userId === ranker.user.userId) === index
      )
      .slice(0, 3);
    setFilteredRanker(response);
  };

  // (전체 favCount - latestCount) + latestCount
  const [RankersWithlatestCount, setLatestCount] = useState([]);
  const favLatestCount = async () => {
    const promises = filteredRankers.map(async (ranker) => {
      const response = await latestFavCount(ranker.animalBoardCode);
      return {
        ranker: ranker,
        latest: response.data,
      };
    });
    // console.log(promises);
    const results = await Promise.all(promises);
    setLatestCount(results);
  };

  console.log(RankersWithlatestCount);
  useEffect(() => {
    favRankAPI();
  }, []);
  useDidMountEffect(() => {
    favListAPI();
  }, [rankers]);
  useDidMountEffect(() => {
    uniqueTop3Members(); //1순위
  }, [rankers]);
  useDidMountEffect(() => {
    favLatestCount(); //2순위
  }, [favList]);

  return (
    <RankProfile>
      {RankersWithlatestCount.map((item, index) => (
        <div key={index} className="ranker-image-container">
          <Image
            className="rank-profile"
            src={`http://192.168.10.28:8081/${item.ranker.user?.userImg}`}
            roundedCircle
          />
          <div className="medal-container">
            <PiMedalFill className="medal" />
          </div>

          <p>
            {item.ranker.user?.userNickname +
              "님의  " +
              item.ranker.animalBoardTitle +
              "!"}
          </p>
          <p>
            조회 수 : {item.ranker.animalBoardView} | 좋아요 :{" "}
            {item.ranker.animalBoardFavoriteCount - item?.latest}
            {item?.latest !== "" ? `+${item?.latest}` : ""}
          </p>
        </div>
      ))}
    </RankProfile>
  );
};
export default WeeklyRank;

import { useEffect, useState } from "react";
import styled from "styled-components";
import Image from "react-bootstrap/Image";
import { PiMedalFill } from "react-icons/pi";
import { viewFavList, viewRanker } from "../../api/animalBoard";
import useDidMountEffect from "../../assets/useDidMountEffect";
import moment from "moment";
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
  img {
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

  // 9시간 빼기

  // 1시간별 날짜 정렬 => 좋아요정렬 => 중복제거
  // 그룹화할 시간 간격 설정 (1시간)
  const favFilter = () => {
    console.log("!");
    const hourInterval = 1;
    // 날짜별로 정렬
    const sortedByDate = favList.sort(
      (current, next) => current.animalFavoriteDate - next.animalFavoriteDate
    );
    console.log(sortedByDate);
    // moment(board.animalBoardDate).format("MM.DD HH:mm")

    // 한 시간 간격으로 그룹화
    const groupedByHour = sortedByDate.reduce((acc, fav) => {
      const hourKey = new Date(
        Math.floor(
          new Date(fav.animalFavoriteDate).getTime() /
            (hourInterval * 60 * 60 * 1000)
        ) *
          (hourInterval * 60 * 60 * 1000)
      );
      //`${hourKey.getFullYear()}-${(hourKey.getMonth() + 1).toString().padStart(2, '0')}-${hourKey.getDate().toString().padStart(2, '0')}T${hourKey.getHours().toString().padStart(2, '0')}`;
      const hourStr = hourKey.toISOString().substring(0, 13);
      if (!acc[hourStr]) {
        acc[hourStr] = { hour: hourStr, totalLikes: 0, favs: [] };
      }
      acc[hourStr].favs.push(fav);
      // acc[hourStr].totalLikes = acc[hourStr].favs.length;
      return acc;
    }, {});

    console.log(groupedByHour);
  };

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
  //

  console.log(filteredRankers);
  useEffect(() => {
    favRankAPI();
    favListAPI();
  }, []);
  useDidMountEffect(() => {
    uniqueTop3Members();
  }, [rankers]);
  useDidMountEffect(() => {
    favFilter();
  }, [favList]);

  return (
    <RankProfile>
      {filteredRankers.map((ranker) => (
        <div key={ranker.animalBoardCode} className="ranker-image-container">
          <Image
            src={`http://192.168.10.28:8081/${ranker.user.userImg}`}
            roundedCircle
          />
          <div className="medal-container">
            <PiMedalFill className="medal" />
          </div>

          <p>
            {ranker.user.userNickname +
              "님의  " +
              ranker.animalBoardTitle +
              "!"}
          </p>
          <p>
            조회 수 : {ranker.animalBoardView} | 좋아요 :{" "}
            {ranker.animalBoardFavoriteCount}
          </p>
        </div>
      ))}
    </RankProfile>
  );
};
export default WeeklyRank;

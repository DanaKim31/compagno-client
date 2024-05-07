import { useEffect, useState } from "react";
import styled from "styled-components";
import Image from "react-bootstrap/Image";
import { PiMedalFill } from "react-icons/pi";
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
    position: relative;
  }
`;
const WeeklyRank = ({ rankers }) => {
  // const [newRankers, setNewRankers] = useState([rankers]);
  // const checkDupl = async()=>{
  //     setNewRankers()
  // }    중복검사 찾기
  // setMovies(movies.filter((movie) => movie.no !== no));
  //   console.log(newRankers);
  return (
    <RankProfile>
      {rankers?.slice(0, 3).map((ranker) => (
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

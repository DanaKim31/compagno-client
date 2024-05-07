import { useEffect, useState } from "react";
import styled from "styled-components";
import Image from "react-bootstrap/Image";
const RankProfile = styled.div`
  width: 80%;
  padding-top: 200px;
  display: flex;
  justify-content: center;
  .ranker-image-container:nth-child(1) {
    order: 1;
  }
  .ranker-image-container:nth-child(2) {
    order: 0;
  }
  .ranker-image-container:nth-child(3) {
    order: 2;
  }
  img {
    width: 200px;
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
      {rankers.slice(0, 3).map((ranker) => (
        <div key={ranker.animalBoardCode} className="ranker-image-container">
          <Image
            src={`http://192.168.10.28:8081/${ranker.user.userImg}`}
            roundedCircle
          />
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

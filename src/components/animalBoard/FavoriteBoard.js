import { useEffect, useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import {
  FavCount,
  addFavorite,
  checkFavorite,
  delFavorite,
} from "../../api/animalBoard";
import styled from "styled-components";

const Div = styled.div`
  .addFav {
    cursor: pointer;
  }
  .delFav {
    cursor: pointer;
  }
`;

const FavoriteBoard = ({ userId, boardCode, count, animalBoardAPI }) => {
  // console.log(userId); // 현재 로그인 한 유저정보 가져와짐
  // console.log(boardCode);
  // 지금 로그인한 유저의 해당글의 좋아요 여부 확인
  const [boolean, setBoolean] = useState(null);
  // const [newCount, setNewCount] = useState(count);
  const currentFavStateAPI = async () => {
    const response = await checkFavorite({
      animalBoardCode: boardCode,
      userId: userId,
    });
    setBoolean(response.data);
    console.log(response.data);
  };
  // 좋아요
  const addFav = async () => {
    if (userId === undefined || userId === null) {
      alert("로그인이 필요합니다.");
    } else {
      await addFavorite({ animalBoardCode: boardCode, userId: userId });
      addCount();
      currentFavStateAPI();
    }

    // setNewCount((prev) => prev + 1);
  };
  // 좋아요 시 count +1
  const addCount = async () => {
    // setCountBoolean(true); // 좋아요 수 +1
    await FavCount({
      animalBoardCode: boardCode,
      checkBoolean: true,
    });
    animalBoardAPI();
  };
  // 좋아요 취소
  const delFav = async () => {
    if (userId === undefined || userId === null) {
      alert("로그인이 필요합니다.");
    } else {
      await delFavorite({
        animalBoardCode: boardCode,
        userId: userId,
      });
      subtCount();
      currentFavStateAPI();
    }
    // setNewCount((prev) => prev - 1);
  };
  // 취소시 count -1
  const subtCount = async () => {
    // setCountBoolean(false); // 좋아요 수 -1
    await FavCount({
      animalBoardCode: boardCode,
      checkBoolean: false,
    });
    animalBoardAPI();
  };
  useEffect(() => {
    // console.log(newCount);
    // console.log(count);
    currentFavStateAPI();
  }, [boolean]);
  return (
    <Div>
      {boolean ? (
        <>
          true
          <FaHeart className="delFav" onClick={delFav} />
        </>
      ) : (
        <>
          false
          <FaRegHeart className="addFav" onClick={addFav} />
        </>
      )}
      {/* {count} */}
    </Div>
  );
};
export default FavoriteBoard;
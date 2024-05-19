import { useEffect, useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import {
  FavCount,
  addFavorite,
  checkFavorite,
  delFavorite,
} from "../../api/animalBoard";
import { AdLogic } from "../../api/AdLogic";
import styled from "styled-components";

const Div = styled.div`
  .like-container {
    border: 1px solid lightgray;
    border-radius: 10px;
    width: 110px;
    padding: 3px;
    text-align: center;
    cursor: pointer;
    &:hover {
      background-color: whitesmoke;
    }
  }

  .addFav {
    color: pink;
  }
  .delFav {
    color: red;
  }
`;

const FavoriteBoard = ({
  userId,
  boardCode,
  count,
  animalBoardAPI,
  noOnClick,
}) => {
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
    // console.log(response.data);
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
  const [likeThisCate, setLikeThisCate] = useState(null);
  // 좋아요 시 count +1
  const addCount = async () => {
    // setCountBoolean(true); // 좋아요 수 +1
    await FavCount({
      animalBoardCode: boardCode,
      checkBoolean: true,
    });
    setLikeThisCate(true);
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
      setLikeThisCate(false);
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
  //========================================
  // 카테고리 포인트 증감
  // useEffect(() => {
  //   AdLogic(userId, boardCode, likeThisCate);
  //   // 보내는값 : userId, animalBoardCode, 좋아요여부boolean
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [likeThisCate]);
  //========================================
  useEffect(() => {
    // console.log(newCount);
    // console.log(count);
    currentFavStateAPI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boolean]);
  return (
    <Div onClick={noOnClick}>
      {boolean ? (
        <div className="like-container" onClick={delFav}>
          좋아요!&nbsp;&nbsp;
          <FaHeart className="delFav" />
          {count}
        </div>
      ) : (
        <div className="like-container" onClick={addFav} noOnClick>
          좋아요!&nbsp;&nbsp;
          <FaRegHeart className="addFav" />
          {count}
        </div>
      )}
    </Div>
  );
};
export default FavoriteBoard;

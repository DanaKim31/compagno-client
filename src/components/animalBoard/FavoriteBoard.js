import { useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { userSave } from "../../store/user";

const FavoriteBoard = ({ user }) => {
  console.log(user);
  const info = JSON.stringify(user);
  console.log(info);

  //   useEffect(() => {
  //     const token = localStorage.getItem("token");
  //     if (token !== null) {
  //       dispatch(userSave(JSON.parse(localStorage.getItem("user"))));
  //     }
  //   }, []);
  return (
    <>
      <div>{user.userId}ddd</div>
      {user.userId !== null || user.userId !== "" || user.userId !== null ? (
        <>
          <FaRegHeart />
        </>
      ) : (
        <>
          <FaHeart />
        </>
      )}
    </>
  );
};
export default FavoriteBoard;

import { useSelector, useDispatch } from "react-redux";
import { userSave, userLogout } from "../store/user";
import { useState, useEffect } from "react";

const Home = () => {
  const dispatch = useDispatch();

  // 유저정보 가지고온다
  const user = useSelector((state) => {
    return state.user;
  });

  // 로그아웃
  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(userLogout());
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== null) {
      dispatch(userSave(JSON.parse(localStorage.getItem("user"))));
    }
  }, []);

  return (
    <>
      <h1>메 인 페 이 지</h1>
      {Object.keys(user).length !== 0 ? (
        <>
          <p>안녕난로그인했을때만보여</p>
          <a href="" onClick={logout}>
            로그아웃
          </a>
        </>
      ) : (
        <>
          <p>안녕난로그인안했을때만보여</p>
          <a href="/signUp">회 원 가 입</a> <br />
          <a href="/login">로 그 인</a>
        </>
      )}
    </>
  );
};

export default Home;

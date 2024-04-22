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
          <a href="compagno/mypage/myinfo">마이페이지</a> <br />
          <a href="" onClick={logout}>
            로그아웃
          </a>
        </>
      ) : (
        <>
          <p>안녕난로그인안했을때만보여</p>
          <a href="compagno/signUp">회 원 가 입</a> <br />
          <a href="compagno/login">로 그 인</a>
        </>
      )}
    </>
  );
};

export default Home;

// const Home = () => {
//   const dispatch = useDispatch();

//   // 유저정보 가지고온다
//   const info = useSelector((state) => {
//     return state.user;
//   });

//   const getToken = localStorage.getItem("token");

//   const [user, setuser] = useState(info);
//   const [token, setToken] = useState(getToken);

//   //const user = JSON.parse(localStorage.getItem("user"));

//   // 로그아웃
//   const logout = (e) => {
//     e.preventDefault();
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     dispatch(userLogout());
//   };

//   useEffect(() => {
//     console.log(getToken);
//     if (Object.keys(user).length === 0 && token === null) {
//       localStorage.getItem("user");
//       console.log(localStorage.getItem("user"));
//       console.log("!!!");

//       console.log(token);
//     }
//     // const user = localStorage.getItem("user");
//     //console.log(getToken());
//     //const token = localStorage.getItem("token");
//     //if (token !== null) {
//     //dispatch(userSave(JSON.parse(localStorage.getItem("user"))));
//     //}
//   }, []);

//   return (
//     <>
//       <h1>메 인 페 이 지</h1>
//       {Object.keys(user).length !== 0 ? (
//         <>
//           <p>안녕난로그인했을때만보여</p>
//           <a href="/compagno/mypage/myinfo">마이페이지로 이동</a> <br />
//           <a href="" onClick={logout}>
//             로그아웃
//           </a>
//         </>
//       ) : (
//         <>
//           <p>안녕난로그인안했을때만보여</p>
//           <a href="compagno/signUp">회 원 가 입</a> <br />
//           <a href="compagno/login">로 그 인</a>
//         </>
//       )}
//     </>
//   );
// };

// export default Home;

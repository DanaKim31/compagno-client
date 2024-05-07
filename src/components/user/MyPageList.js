import styled from "styled-components";
import { getAnimalboardFavList, getAnimalboardFavCount } from "../../api/user";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userSave } from "../../store/user";
import Paging from "./MyPagePagination";

const Div = styled.div`
  .myPageList {
    thead th {
      background-color: rgb(85, 96, 143);
      width: 200px;
      height: 50px;
      text-align: left;
      line-height: 50px;
      color: white;
    }

    tbody {
      background: linear-gradient(45deg, #49a09d, #5f2c82);
      color: white;
      height: 50px;
      text-align: left;
      line-height: 50px;
    }
  }
`;

const MyPageList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 유저정보 가지고온다
  const info = useSelector((state) => {
    return state.user;
  });

  // 유저정보 로컬스토리지에 저장
  useEffect(() => {
    if (localStorage.length === 0) {
      alert("로그인 시 접근 가능합니다.");
      navigate("/compagno/login");
    } else {
      const token = localStorage.getItem("token");
      if (token !== null) {
        dispatch(userSave(JSON.parse(localStorage.getItem("user"))));
      }
    }
  }, []);

  // 유저정보 담겨질때 실행
  useEffect(() => {
    userAPI();
  }, [info]);

  // 좋아요 목록과 페이징 기초값 세팅
  // 페이징에 사용할 좋아요 갯수 가져오기
  const [animalboardFav, setAnimalBoardFav] = useState([]);
  const [page, setPage] = useState(1);

  // 페이지 변경
  const handlePageChange = async (page) => {
    await setPage(page);
    const response = await getAnimalboardFavList(info.userId, page);
    const favData = response.data;
    setAnimalBoardFav(favData);
  };

  const [animalBoardFavCount, setAnimalBoardFavCount] = useState(0);

  const userAPI = async () => {
    const response = await getAnimalboardFavList(info.userId, page);
    const favData = response.data;

    const countResponse = await getAnimalboardFavCount(info.userId);
    const countFavData = countResponse.data;

    setAnimalBoardFav(favData);

    setAnimalBoardFavCount(countFavData);
  };

  return (
    <Div>
      <table className="myPageList">
        <thead>
          <tr>
            <th>동물 카테고리</th>
            <th>글 제목</th>
            <th>글 작성자</th>
            <th>글 작성 날짜</th>
            <th>얜 뭐넣을까</th>
          </tr>
        </thead>
        <tbody>
          {animalboardFav?.map((favContent) => (
            <tr key={favContent.animalFavoriteCode}>
              <td>{favContent.animalBoard.animalCategory.animalType}</td>
              <td>{favContent.animalBoard.animalBoardTitle}</td>
              <td>{favContent.animalBoard.user.userNickname}</td>
              <td>{favContent.animalFavoriteDate}</td>
              <td>안녕1</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Paging
        page={page}
        count={animalBoardFavCount}
        setPage={handlePageChange}
      />
    </Div>
  );
};

export default MyPageList;

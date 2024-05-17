import styled from "styled-components";
import {
  getAnimalboardFavList,
  getAnimalboardFavCount,
  deleteAnimalFav,
  updateFavCount,
} from "../../api/user";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import useDidMountEffect from "../../components/user/useDidMountEffect";
import Paging from "../../components/user/MyPagePagination";
import moment from "moment";
import "moment/locale/ko";
import { useNavigate } from "react-router-dom";

const Div = styled.div`
  @font-face {
    font-family: "TAEBAEKmilkyway";
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2310@1.0/TAEBAEKmilkyway.woff2")
      format("woff2");
    font-weight: normal;
    font-style: normal;
  }
  font-family: "TAEBAEKmilkyway";
  font-weight: bold;

  #content-header {
    padding-bottom: 15px;
    font-weight: bold;
  }

  .myPageList {
    table-layout: fixed;
    border-collapse: separate;
    width: 300px;
    border-bottom: 2px solid black;
    thead th {
      width: 200px;
      height: 50px;
      text-align: left;
      line-height: 50px;
      color: black;
      border-top: 2px solid black;
      border-bottom: 2px solid black;
    }
    .th1 {
      width: 300px;
    }

    tbody {
      td {
        color: black;
        height: 50px;
        text-align: left;
        line-height: 50px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      a {
        color: black;
        text-decoration-line: none;
      }

      a:hover {
        color: orange;
      }

      button {
        border: none;
        background-color: transparent;
        font-weight: bold;
      }
      button:hover {
        color: red;
      }
    }
  }
`;

const MyPageList = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({});

  // 유저정보 가지고 오기
  const info = useSelector((state) => {
    return state.user;
  });

  useEffect(() => {
    if (Object.keys(info).length === 0) {
      setUser(JSON.parse(localStorage.getItem("user")));
    } else {
      setUser(info);
    }
  }, []);

  // 유저정보 담겨질때 실행
  useDidMountEffect(() => {
    favListAPI();
  }, [user]);

  // 좋아요 목록과 페이징 기초값 세팅
  // 페이징에 사용할 좋아요 갯수 가져오기
  const [animalboardFav, setAnimalBoardFav] = useState([]);
  const [page, setPage] = useState(1);
  const [animalBoardFavCount, setAnimalBoardFavCount] = useState(0);

  // 페이지 변경
  const handlePageChange = async (page) => {
    setPage(page);
    const response = await getAnimalboardFavList(user.userId, page);
    const favData = response.data;
    setAnimalBoardFav(favData);
  };

  // 좋아요 목록 불러오기
  const favListAPI = async () => {
    const response = await getAnimalboardFavList(user.userId, page);
    const favData = response.data;

    const countResponse = await getAnimalboardFavCount(user.userId);
    const countFavData = countResponse.data;

    setAnimalBoardFav(favData);
    setAnimalBoardFavCount(countFavData);
  };

  // 좋아요 삭제하기
  const deleteFav = async (id, boardCode, favCode) => {
    await deleteAnimalFav(id, favCode);
    await updateFavCount(boardCode);

    const response = await getAnimalboardFavList(user.userId, page);
    const favData = response.data;
    setAnimalBoardFav(favData);

    const countResponse = await getAnimalboardFavCount(user.userId);
    const countFavData = countResponse.data;
    setAnimalBoardFavCount(countFavData);
  };

  return (
    <Div>
      <h1 id="content-header">자유게시판 좋아요 목록</h1>
      <table className="myPageList">
        <thead>
          <tr>
            <th>동물 카테고리</th>
            <th className="th1">글 제목</th>
            <th>글 작성자</th>
            <th>글 작성 날짜</th>
            <th>좋아요 삭제</th>
          </tr>
        </thead>
        <tbody>
          {animalboardFav?.map((favContent) => (
            <tr key={favContent.animalFavoriteCode}>
              <td>{favContent.animalBoard.animalCategory.animalType}</td>
              <td>
                <a
                  href={
                    `/compagno/animal-board/` +
                    favContent.animalBoard.animalBoardCode
                  }
                >
                  {favContent.animalBoard.animalBoardTitle}
                </a>
              </td>
              <td>{favContent.animalBoard.user.userNickname}</td>
              <td>
                {moment(favContent.animalFavoriteDate).format("YYYY-MM-DD")}
              </td>
              <td>
                <button
                  onClick={() =>
                    deleteFav(
                      user.userId,
                      favContent.animalBoard.animalBoardCode,
                      favContent.animalFavoriteCode
                    )
                  }
                >
                  삭제
                </button>
              </td>
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

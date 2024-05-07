import { getProductBookmarkList } from "../../api/user";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userSave } from "../../store/user";
import Paging from "../../components/user/MyPagePagination";

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

const MyPageFavProduct = () => {
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

  useEffect(() => {
    userAPI();
  }, [info]);

  // 좋아요 목록과 페이징 기초값 세팅
  const [productBoardFav, setProductBoardFav] = useState([]);
  const [page, setPage] = useState(1);

  // 좋아요 목록 불러오기
  const userAPI = async () => {
    const response = await getProductBookmarkList(info.userId, page);
    const favData = response.data;

    setProductBoardFav(favData);
    console.log(favData);
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
          {productBoardFav?.map((favContent) => (
            <tr key={favContent.productBookmarkCode}>
              {/* <td>{favContent.animalBoard.animalCategory.animalType}</td>
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
              <td>{favContent.animalFavoriteDate}</td>
              <td>안녕1</td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </Div>
  );
};

export default MyPageFavProduct;

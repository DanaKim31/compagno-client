import {
  getProductBookmarkList,
  getProductBookmarkCount,
} from "../../api/user";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useDidMountEffect from "../../components/user/useDidMountEffect";
import Paging from "../../components/user/MyPagePagination";
import MyPageSidebar from "../../components/user/MyPageSidebar";
import MyPageTab from "../../components/user/MyPageTab";
import moment from "moment";
import "moment/locale/ko";

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
  display: flex;
  height: 100vh;
  padding-top: 112px;

  .myProductMain {
    width: calc(100vw - 300px);
    display: flex;
    flex-direction: column;
    padding-top: 20px;

    .contentZone {
      height: calc(100vh - 66px);
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;

      #headText {
        width: 1100px;
        padding-bottom: 15px;
        font-weight: bold;
      }

      .myProductList {
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
        }
      }
    }
  }
`;

const MyPageFavProduct = () => {
  const [user, setUser] = useState({});

  // 유저정보 가지고온다
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

  useDidMountEffect(() => {
    favListAPI();
  }, [user]);

  // 좋아요 목록과 페이징 기초값 세팅
  const [productBoardFav, setProductBoardFav] = useState([]);
  const [page, setPage] = useState(1);
  const [productBookmarkCount, setProductBookmarkCount] = useState(0);

  // 북마크 목록 + 갯수 불러오기
  const favListAPI = async () => {
    const response = await getProductBookmarkList(user.userId, page);
    const favData = response.data;

    const countResponse = await getProductBookmarkCount(user.userId);
    const countFavData = countResponse.data;

    setProductBoardFav(favData);
    setProductBookmarkCount(countFavData);
  };

  // 페이지 변경
  const handlePageChange = async (page) => {
    setPage(page);
    const response = await getProductBookmarkList(user.userId, page);
    const favData = response.data;
    setProductBoardFav(favData);
  };
  return (
    <Div>
      <MyPageSidebar />
      <div className="myProductMain">
        <MyPageTab />

        <div className="contentZone">
          <h1 id="headText">북마크한 제품 목록</h1>
          <table className="myProductList">
            <thead>
              <tr>
                <th>동물 카테고리</th>
                <th className="th1">글 제목</th>
                <th>상품명</th>
                <th>가격</th>
                <th>작성일</th>
              </tr>
            </thead>
            <tbody>
              {productBoardFav?.map((product) => (
                <tr key={product.productBookmarkCode}>
                  <td>{product.productBoard.animalCategory.animalType}</td>
                  <td>
                    <a
                      href={
                        `/compagno/product-board/` +
                        product.productBoard.productBoardCode
                      }
                    >
                      {product.productBoard.productBoardTitle}
                    </a>
                  </td>
                  <td>{product.productBoard.productName}</td>
                  <td>{product.productBoard.productPrice}</td>
                  <td>
                    {moment(product.productBoard.productBoardRegiDate).format(
                      "YYYY-MM-DD"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Paging
            page={page}
            count={productBookmarkCount}
            setPage={handlePageChange}
          />
        </div>
      </div>
    </Div>
  );
};

export default MyPageFavProduct;

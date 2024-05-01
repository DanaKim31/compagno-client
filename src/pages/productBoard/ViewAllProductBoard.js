import {
  productBoardBookmark,
  searchProductBoard,
} from "../../api/productBoard";
import { useState, useEffect } from "react";
import moment from "moment";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userSave } from "../../store/user";
import {
  FaAngleLeft,
  FaAnglesLeft,
  FaAngleRight,
  FaAnglesRight,
} from "react-icons/fa6";

const StyledProductBoard = styled.main`
  padding-top: 130px;
  display: grid;
  h1 {
    font-size: 3rem;
    text-align: center;
    font-weight: bold;
  }

  .boardSpan {
    margin-right: 15px;
  }

  .boardView {
    background-color: pink;
    position: relative;
  }

  .boardList {
    display: grid;
    padding: 0px 120px;
    grid-template-columns: repeat(4, 390px);
    grid-template-rows: 300px;
    gap: 30px;
    cursor: pointer;
  }

  .bookmark {
    float: right;
    font-size: 3rem;
    cursor: pointer;
    position: absolute;
    right: 5px;
  }
  .paging {
    display: flex;
    justify-content: center;
  }

  .filterDiv {
    padding: 0px 120px;
    margin-bottom: 20px;
  }
  .starLeftSpan {
    position: absolute;
    width: 20px;
    height: 40px;
    overflow: hidden;
    left: 0px;
  }
  .starRightSpan {
    position: absolute;
    width: 20px;
    height: 40px;
    overflow: hidden;
    right: 0px;
    padding: 0px;
  }
  .starDiv {
    width: 40px;
    height: 40px;
    position: relative;
    display: flex;
    cursor: pointer;
  }
  .star {
    font-size: 2.5rem;
    color: orangered;
  }
  .starHalf {
    font-size: 2.5rem;
    color: orangered;
    padding-top: 3px;
    padding: 1.8px 1.8px;
  }
  .gradeDiv {
    display: flex;
    flex-direction: row;
  }
`;

const ViewAllProductBoard = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => {
    return state.user;
  });

  const navigate = useNavigate();
  const [productBoards, setProductBoards] = useState([]);
  const [page, setPage] = useState(1); // 현재 페이지
  const [totalPage, setTotalPage] = useState(0); // 전체 총 페이지
  const [prev, setPrev] = useState(false); // 앞으로 한칸 버튼
  const [next, setNext] = useState(false); // 뒤로 한칸 버튼
  const [pages, setPages] = useState([]); // 페이지들
  const [grade, setGrade] = useState(0);

  const [productName, setProductName] = useState("");
  const [productCate, setProductCate] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [animal, setAnimal] = useState(0);
  const [minGrade, setMinGrade] = useState(0);
  const [title, setTitle] = useState("");
  const [select, setSelect] = useState("title");
  const [keyword, setKeyword] = useState("");
  const [sort, setSort] = useState("");

  const getProductBoards = async () => {
    const result = await searchProductBoard(
      // productName,
      // productCate,
      // minPrice,
      // maxPrice,
      // animal,
      // minGrade,
      // title,
      // select,
      // keyword,
      // sort,
      page
    );
    setProductBoards(result.data);
    setTotalPage(result.data.totalPages);
  };

  let lastPage = 0;
  let firstPage = 0;
  let pageList = [];

  useEffect(() => {
    getProductBoards();
  }, [page]);

  // totalPage가 바뀔 때 마다 실행
  const paging = () => {
    lastPage = Math.ceil(page / 10) * 10;
    firstPage = lastPage - 9;

    if (totalPage < lastPage) {
      lastPage = totalPage; // 전체 페이지가 마지막 페이지보다 작은 경우엔 전체 페이지 수가 마지막 페이지 수랑 같음
    }
    setPrev(firstPage > 1);
    setNext(lastPage < totalPage);
    for (let i = firstPage; i <= lastPage; i++) {
      pageList.push(i); // 처음 i는 firstPage, 범위는 lastPage로 반복문 돌려서 i값을 넣은 list 만들기
    }
    setPages(pageList); // 해당 list 배열을 setPages에 담기
  };

  useEffect(() => {
    paging();
  }, [page]);

  useEffect(() => {
    paging();
  }, [totalPage]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== null) {
      dispatch(userSave(JSON.parse(localStorage.getItem("user"))));
    }
    getProductBoards();
  }, []);

  const star = (no) => {
    const result = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= no) {
        result.push(<FaStar color="orangered" key={i} />);
      } else if (i > no) {
        if (i - no === 0.5) {
          result.push(<FaStarHalfAlt color="orangered" key={i} />);
        } else {
          result.push(<FaRegStar color="orangered" key={i} />);
        }
      }
    }
    return result;
  };

  const bookmark = async (code) => {
    await productBoardBookmark({
      productBoardCode: code,
      userId: user.userId,
    });
    getProductBoards();
  };

  const productBoardDetail = (code) => {
    navigate("/compagno/product-board/" + code);
  };

  return (
    <StyledProductBoard>
      <h1>제품 정보 공유 게시판</h1>
      <Link to="/compagno/product-board/create"> 글쓰기 </Link>
      <div className="filterDiv">
        <input
          type="text"
          placeholder="제품 품목"
          onChange={(e) => setProductCate(e.target.value)}
        />
        <input
          type="text"
          placeholder="제품 명"
          onChange={(e) => setProductName(e.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder="최소 금액"
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <input
          type="text"
          placeholder="최대 금액"
          onChange={(e) => setMaxPrice(e.target.value)}
        />
        <select
          defaultValue={animal}
          onChange={(e) => setAnimal(e.target.value)}
        >
          <option value="default" disabled="disabled" hidden>
            동물 선택
          </option>
          <option value="1">강아지</option>
          <option value="2">고양이</option>
          <option value="3">비둘기</option>
          <option value="4">기타</option>
          <option value="0">전체</option>
        </select>
        <div className="gradeDiv">
          최소 평점 :
          {grade >= 1 ? (
            <div className="starDiv">
              <span
                className="starLeftSpan"
                onClick={() => setGrade(0.5)}
              ></span>
              <span
                className="starRightSpan"
                onClick={() => setGrade(1)}
              ></span>
              <FaStar className="star" />
            </div>
          ) : grade === 0.5 ? (
            <div className="starDiv">
              <span
                className="starLeftSpan"
                onClick={() => setGrade(0.5)}
              ></span>
              <span
                className="starRightSpan"
                onClick={() => setGrade(1)}
              ></span>
              <FaStarHalfAlt className="starHalf" />
            </div>
          ) : (
            <div className="starDiv">
              <span
                className="starLeftSpan"
                onClick={() => setGrade(0.5)}
              ></span>
              <span
                className="starRightSpan"
                onClick={() => setGrade(1)}
              ></span>
              <FaRegStar className="star" />
            </div>
          )}
          {grade >= 2 ? (
            <div className="starDiv">
              <span
                className="starLeftSpan"
                onClick={() => setGrade(1.5)}
              ></span>
              <span
                className="starRightSpan"
                onClick={() => setGrade(2)}
              ></span>
              <FaStar className="star" />
            </div>
          ) : grade === 1.5 ? (
            <div className="starDiv">
              <span
                className="starLeftSpan"
                onClick={() => setGrade(1.5)}
              ></span>
              <span
                className="starRightSpan"
                onClick={() => setGrade(2)}
              ></span>
              <FaStarHalfAlt className="starHalf" />
            </div>
          ) : (
            <div className="starDiv">
              <span
                className="starLeftSpan"
                onClick={() => setGrade(1.5)}
              ></span>
              <span
                className="starRightSpan"
                onClick={() => setGrade(2)}
              ></span>
              <FaRegStar className="star" />
            </div>
          )}
          {grade >= 3 ? (
            <div className="starDiv">
              <span
                className="starLeftSpan"
                onClick={() => setGrade(2.5)}
              ></span>
              <span
                className="starRightSpan"
                onClick={() => setGrade(3)}
              ></span>
              <FaStar className="star" />
            </div>
          ) : grade === 2.5 ? (
            <div className="starDiv">
              <span
                className="starLeftSpan"
                onClick={() => setGrade(2.5)}
              ></span>
              <span
                className="starRightSpan"
                onClick={() => setGrade(3)}
              ></span>
              <FaStarHalfAlt className="starHalf" />
            </div>
          ) : (
            <div className="starDiv">
              <span
                className="starLeftSpan"
                onClick={() => setGrade(2.5)}
              ></span>
              <span
                className="starRightSpan"
                onClick={() => setGrade(3)}
              ></span>
              <FaRegStar className="star" />
            </div>
          )}
          {grade >= 4 ? (
            <div className="starDiv">
              <span
                className="starLeftSpan"
                onClick={() => setGrade(3.5)}
              ></span>
              <span
                className="starRightSpan"
                onClick={() => setGrade(4)}
              ></span>
              <FaStar className="star" />
            </div>
          ) : grade === 3.5 ? (
            <div className="starDiv">
              <span
                className="starLeftSpan"
                onClick={() => setGrade(3.5)}
              ></span>
              <span
                className="starRightSpan"
                onClick={() => setGrade(4)}
              ></span>
              <FaStarHalfAlt className="starHalf" />
            </div>
          ) : (
            <div className="starDiv">
              <span
                className="starLeftSpan"
                onClick={() => setGrade(3.5)}
              ></span>
              <span
                className="starRightSpan"
                onClick={() => setGrade(4)}
              ></span>
              <FaRegStar className="star" />
            </div>
          )}
          {grade === 5 ? (
            <div className="starDiv">
              <span
                className="starLeftSpan"
                onClick={() => setGrade(4.5)}
              ></span>
              <span
                className="starRightSpan"
                onClick={() => setGrade(5)}
              ></span>
              <FaStar className="star" />
            </div>
          ) : grade === 4.5 ? (
            <div className="starDiv">
              <span
                className="starLeftSpan"
                onClick={() => setGrade(4.5)}
              ></span>
              <span
                className="starRightSpan"
                onClick={() => setGrade(5)}
              ></span>
              <FaStarHalfAlt className="starHalf" />
            </div>
          ) : (
            <div className="starDiv">
              <span
                className="starLeftSpan"
                onClick={() => setGrade(4.5)}
              ></span>
              <span
                className="starRightSpan"
                onClick={() => setGrade(5)}
              ></span>
              <FaRegStar className="star" />
            </div>
          )}
        </div>
        <select onChange={(e) => setSelect(e.target.value)}>
          <option value="title">제목</option>
          <option value="content">내용</option>
          <option value="nickname">작성자</option>
          <option value="all">제목 + 내용</option>
        </select>
        <input
          type="text"
          placeholder="검색문장"
          onChange={(e) => setKeyword(e.target.value)}
        />
        <select onChange={(e) => setSort(e.target.value)}>
          <option value="">날짜 순</option>
          <option value="view">조회 순</option>
          <option value="recommend">추천 순</option>
        </select>
      </div>
      <div className="boardList">
        {productBoards.content?.map((productBoard) => (
          <div
            className="boardView"
            onClick={() => productBoardDetail(productBoard.productBoardCode)}
            key={productBoard.productBoardCode}
          >
            {productBoard.bookmark?.filter(
              (bookmark) => bookmark.user.userId === user.userId
            ).length === 0 ? (
              <FaRegStar
                className="bookmark"
                onClick={(e) => {
                  e.stopPropagation();
                  bookmark(productBoard.productBoardCode);
                }}
              />
            ) : (
              <FaStar
                className="bookmark"
                style={{ color: "yellow" }}
                onClick={(e) => {
                  e.stopPropagation();
                  bookmark(productBoard.productBoardCode);
                }}
              />
            )}
            <img
              className="mainImage"
              src={"http://192.168.10.28:8081/" + productBoard.productMainImage}
              style={{ height: "200px", width: "100%", objectFit: "cover" }}
            />
            <br />
            <span className="boardSpan">
              작성자 : {productBoard.user?.userNickname}
            </span>
            <span className="boardSpan">
              제목 : {productBoard.productBoardTitle}
            </span>
            <br />
            <span className="boardSpan">
              추천수 : {productBoard.recommend.length}
            </span>
            <span className="boardSpan">
              {" "}
              댓글수 :{" "}
              {
                productBoard.comments.filter(
                  (commentCount) => commentCount.productCommentDelete !== "Y"
                ).length
              }
            </span>
            <span className="boardSpan">
              조회수 : {productBoard.productBoardViewCount}
            </span>
            <span className="boardSpan">
              <br />
              <span className="boardSpan">
                상품명 : {productBoard.productName}
              </span>
              평점 : {star(productBoard.productBoardGrade)}
              {productBoard.productBoardGrade}
            </span>
            <br />
            <span className="boardSpan">
              날짜 :
              {moment(productBoard.productBoardRegiDate).format(
                "MM월 DD일 HH시 mm분"
              )}
            </span>
          </div>
        ))}
      </div>
      <nav className="paging">
        <FaAnglesLeft onClick={() => setPage(1)} />
        {/* 가장 첫 페이지로 */}
        <FaAngleLeft
          onClick={() => (page > 1 ? setPage(page - 1) : setPage(1))} // 현재 페이지에서 한칸 앞으로
        />
        {pages.map(
          (
            num,
            index // 배열 담은 pages를 map으로 만들어서 반복문 페이지번호 생성
          ) => (
            <button
              key={index}
              value={num}
              onClick={(e) => setPage(Number(e.target.value))}
            >
              {num}
            </button>
          )
        )}

        <FaAngleRight
          onClick={
            () => (page < totalPage ? setPage(page + 1) : setPage(totalPage)) // 현재 페이지에서 한칸 뒤로
          }
        />
        <FaAnglesRight onClick={() => setPage(totalPage)} />
        {/* 가장 마지막 페이지로 */}
      </nav>
    </StyledProductBoard>
  );
};
export default ViewAllProductBoard;

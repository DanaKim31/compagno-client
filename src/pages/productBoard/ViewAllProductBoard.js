import {
  productBoardBookmark,
  searchProductBoard,
  getAnimalCategories,
} from "../../api/productBoard";
import { useState, useEffect } from "react";
import moment from "moment";
import {
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
  FaRegEye,
  FaRegThumbsUp,
} from "react-icons/fa";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userSave } from "../../store/user";
import {
  FaAngleLeft,
  FaAnglesLeft,
  FaAngleRight,
  FaAnglesRight,
  FaRegImage,
} from "react-icons/fa6";
import { MdOutlineWatchLater } from "react-icons/md";
import { BiMessageDetail } from "react-icons/bi";
import { Form, Button } from "react-bootstrap";

const StyledProductBoard = styled.main`
  min-width: 1900px;
  width: 100%;

  padding-top: 120px;
  padding-bottom: 30px;
  display: grid;
  font-family: "TAEBAEKmilkyway";
  font-weight: bold;

  input,
  select,
  button,
  option {
    font-weight: bold;
  }

  @font-face {
    font-family: "TAEBAEKmilkyway";
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2310@1.0/TAEBAEKmilkyway.woff2")
      format("woff2");

    font-weight: normal;
    font-style: normal;
  }

  textarea {
    resize: none;
  }

  h1 {
    font-size: 2.5;
    padding-left: 120px;
    font-weight: bold;
    cursor: pointer;
  }
  h1:hover {
    color: #94b29b;
  }

  .boardSpan {
    margin-right: 15px;
  }

  .boardView {
    border: 2px solid black;
    position: relative;
    cursor: pointer;
    border-radius: 10px;
    font: inherit;
  }

  .boardList {
    display: grid;
    grid-template-columns: repeat(4, 24%);
    grid-template-rows: 380px;
    gap: 1%;
    row-gap: 20px;
    margin: 0px 120px;
    span {
      font-size: 0.9rem;
    }
  }

  .bookmark {
    float: right;
    font-size: 3rem;
    cursor: pointer;
    position: absolute;
    right: 5px;
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
  }

  .bookmark:hover {
    color: #ffeb5a;
  }

  .filterDiv {
    border: 3px dashed #455c58ff;
    margin: 0px 120px;
    margin-bottom: 20px;
    padding: 10px 20px;
    border-radius: 15px;
    text-align: center;
    input {
      width: 200px;
      display: inline;
    }
    .keywordInput {
      width: 500px;
    }
  }
  .starLeftSpan {
    position: absolute;
    width: 16px;
    height: 32px;
    overflow: hidden;
    left: 0px;
  }
  .starRightSpan {
    position: absolute;
    width: 16px;
    height: 32px;
    overflow: hidden;
    right: 0px;
    padding: 0px;
  }
  .starDiv {
    width: 32px;
    height: 32px;
    position: relative;
    display: flex;
    cursor: pointer;
  }
  .star {
    font-size: 2rem;
    color: orangered;
  }
  .starHalf {
    font-size: 2rem;
    color: orangered;
    padding-top: 3px;
    padding: 1px 1px;
  }
  .gradeDiv {
    display: inline-flex;
    flex-direction: row;
    gap: 0px;
    width: 250px;
  }

  .nullMainImage {
    height: 258px;
    width: 100%;
    border-bottom: 1px solid black;
    text-align: center;
    line-height: 258px;
    svg {
      font-size: 6rem;
    }
  }

  .viewCommentsDiv {
    border-top: 2px solid silver;
  }

  h2 {
    font-size: 2rem;
    margin-bottom: 20px;
  }

  .writeComment {
    width: 92%;
  }
  .writeCommentDiv {
    display: flex;
    justify-content: space-between;
    button {
      height: 86px;
      width: 8%;
    }
  }
  .commentRegiDate {
    font-size: 0.8rem;
    color: gray;
  }

  .sortWriteNav {
    margin: 0px 120px;
    margin-bottom: 20px;
    button {
      float: right;
      margin-right: 20px;
    }
    select {
      width: 100px;
      float: left;
      margin-top: 5px;
      margin-left: 30px;
    }
  }
  .filterSelect {
    width: 120px;
    display: inline;
  }
  .animalSelect {
    width: 200px;
    display: inline;
  }

  .userImage {
    width: 30px;
    height: 30px;
    border-radius: 100%;
    object-fit: fill;
    margin: 2px;
    display: inline;
  }

  .boardInfoDiv {
    margin: 0px 10px;
  }

  .productPriceName {
    .boardSpan {
      font-size: 0.75rem;
    }
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  .pageNoBtn {
    width: 30px;
    height: 30px;
    border: 2px solid black;
    margin: 0px 1px;
    border-radius: 5px;
  }

  .pageNoBtn:hover {
    background-color: #78e150;
  }

  .paging {
    margin: 20px 0px;
    display: flex;
    justify-content: center;
    svg {
      margin-top: 5px;
      cursor: pointer;
      height: 20px;
      width: 20px;
    }
    svg:hover {
      color: #78e150;
    }
  }

  .bookmarkTrue:hover {
    color: black !important;
  }
`;

const ViewAllProductBoard = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => {
    return state.user;
  });

  const navigate = useNavigate();
  const [animalCategories, setAnimalCategories] = useState([]);
  const [productBoards, setProductBoards] = useState([]);
  const [page, setPage] = useState(1); // 현재 페이지
  const [totalPage, setTotalPage] = useState(0); // 전체 총 페이지
  const [prev, setPrev] = useState(false); // 앞으로 한칸 버튼
  const [next, setNext] = useState(false); // 뒤로 한칸 버튼
  const [pages, setPages] = useState([]); // 페이지들
  const token = localStorage.getItem("token");

  const [filter, setFilter] = useState({
    productName: "",
    productCate: "",
    minPrice: 0,
    maxPrice: 0,
    animal: 0,
    minGrade: 0,
    title: "",
    select: "",
    keyword: "",
    sort: "",
  });

  // const [productName, setProductName] = useState("");
  // const [productCate, setProductCate] = useState("");
  // const [minPrice, setMinPrice] = useState(0);
  // const [maxPrice, setMaxPrice] = useState(0);
  // const [animal, setAnimal] = useState(0);
  // const [minGrade, setMinGrade] = useState(0);
  // const [title, setTitle] = useState("");
  // const [select, setSelect] = useState("title");
  // const [keyword, setKeyword] = useState("");
  // const [sort, setSort] = useState("");

  const getProductBoards = async () => {
    const result = await searchProductBoard(filter, page);
    setProductBoards(result.data);
    setTotalPage(result.data.totalPages);
  };

  let lastPage = 0;
  let firstPage = 0;
  let pageList = [];

  const viewAnimalCategory = async () => {
    const response = await getAnimalCategories();
    setAnimalCategories(response.data);
  };

  useEffect(() => {
    getProductBoards();
    paging();
    viewAnimalCategory();
  }, [page]);

  // totalPage가 바뀔 때 마다 실행
  const paging = () => {
    lastPage = Math.ceil(page / 5) * 5;
    firstPage = lastPage - 4;

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
  }, [totalPage]);

  useEffect(() => {
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
    if (token === null) {
      alert("로그인이 필요합니다.");
      return false;
    }
    await productBoardBookmark({
      productBoardCode: code,
      userId: user.userId,
    });
    getProductBoards();
  };

  const productBoardDetail = (code) => {
    navigate("/compagno/product-board/" + code);
  };

  useEffect(() => {
    setPage(1);
    getProductBoards();
  }, [filter.sort]);

  const boardWrite = () => {
    if (token === null) {
      alert("로그인이 필요합니다.");
      return false;
    }
    navigate("/compagno/product-board/create");
  };

  return (
    <StyledProductBoard>
      <h1 onClick={() => setPage(1)}>제품정보 공유 게시판</h1>
      <div className="filterDiv">
        <Form.Control
          size="sm"
          type="text"
          placeholder="제품 품목"
          onChange={(e) =>
            setFilter((prev) => ({
              ...prev,
              productCate: e.target.value.trim(),
            }))
          }
        />
        <Form.Control
          size="sm"
          type="text"
          placeholder="제품 명"
          style={{ margin: "0px 15px" }}
          onChange={(e) =>
            setFilter((prev) => ({
              ...prev,
              productName: e.target.value.trim(),
            }))
          }
        />
        <Form.Select
          size="sm"
          defaultValue=""
          onChange={(e) =>
            setFilter((prev) => ({ ...prev, animal: e.target.value.trim() }))
          }
          className="animalSelect"
          style={{ marginRight: "15px" }}
        >
          <option value="" disabled="disabled" hidden>
            사용 동물 선택
          </option>
          {animalCategories.map((animalCategory) => (
            <option
              value={animalCategory.animalCategoryCode}
              key={animalCategory.animalCategoryCode}
            >
              {animalCategory.animalType}
            </option>
          ))}
          <option value="0">전체</option>
        </Form.Select>
        <Form.Control
          size="sm"
          type="Number"
          placeholder="최소 금액"
          onChange={(e) => {
            if (e.target.value.length > 9) {
              e.target.value = e.target.value.slice(0, 9);
            }
            setFilter((prev) => ({ ...prev, minPrice: e.target.value.trim() }));
          }}
        />
        -
        <Form.Control
          size="sm"
          type="Number"
          placeholder="최대 금액"
          onChange={(e) => {
            if (e.target.value.length > 9) {
              e.target.value = e.target.value.slice(0, 9);
            }
            setFilter((prev) => ({ ...prev, maxPrice: e.target.value.trim() }));
          }}
          style={{ marginRight: "20px" }}
        />
        <div className="gradeDiv">
          <p style={{ lineHeight: "30px" }}>최소 평점 : &nbsp;</p>
          {filter.grade >= 1 ? (
            <div className="starDiv">
              <span
                className="starLeftSpan"
                onClick={() => setFilter((prev) => ({ ...prev, grade: 0.5 }))}
              ></span>
              <span
                className="starRightSpan"
                onClick={() => setFilter((prev) => ({ ...prev, grade: 1 }))}
              ></span>
              <FaStar className="star" />
            </div>
          ) : filter.grade === 0.5 ? (
            <div className="starDiv">
              <span
                className="starLeftSpan"
                onClick={() => setFilter((prev) => ({ ...prev, grade: 0.5 }))}
              ></span>
              <span
                className="starRightSpan"
                onClick={() => setFilter((prev) => ({ ...prev, grade: 1 }))}
              ></span>
              <FaStarHalfAlt className="starHalf" />
            </div>
          ) : (
            <div className="starDiv">
              <span
                className="starLeftSpan"
                onClick={() => setFilter((prev) => ({ ...prev, grade: 0.5 }))}
              ></span>
              <span
                className="starRightSpan"
                onClick={() => setFilter((prev) => ({ ...prev, grade: 1 }))}
              ></span>
              <FaRegStar className="star" />
            </div>
          )}
          {filter.grade >= 2 ? (
            <div className="starDiv">
              <span
                className="starLeftSpan"
                onClick={() => setFilter((prev) => ({ ...prev, grade: 1.5 }))}
              ></span>
              <span
                className="starRightSpan"
                onClick={() => setFilter((prev) => ({ ...prev, grade: 2 }))}
              ></span>
              <FaStar className="star" />
            </div>
          ) : filter.grade === 1.5 ? (
            <div className="starDiv">
              <span
                className="starLeftSpan"
                onClick={() => setFilter((prev) => ({ ...prev, grade: 1.5 }))}
              ></span>
              <span
                className="starRightSpan"
                onClick={() => setFilter((prev) => ({ ...prev, grade: 2 }))}
              ></span>
              <FaStarHalfAlt className="starHalf" />
            </div>
          ) : (
            <div className="starDiv">
              <span
                className="starLeftSpan"
                onClick={() => setFilter((prev) => ({ ...prev, grade: 1.5 }))}
              ></span>
              <span
                className="starRightSpan"
                onClick={() => setFilter((prev) => ({ ...prev, grade: 2 }))}
              ></span>
              <FaRegStar className="star" />
            </div>
          )}
          {filter.grade >= 3 ? (
            <div className="starDiv">
              <span
                className="starLeftSpan"
                onClick={() => setFilter((prev) => ({ ...prev, grade: 2.5 }))}
              ></span>
              <span
                className="starRightSpan"
                onClick={() => setFilter((prev) => ({ ...prev, grade: 3 }))}
              ></span>
              <FaStar className="star" />
            </div>
          ) : filter.grade === 2.5 ? (
            <div className="starDiv">
              <span
                className="starLeftSpan"
                onClick={() => setFilter((prev) => ({ ...prev, grade: 2.5 }))}
              ></span>
              <span
                className="starRightSpan"
                onClick={() => setFilter((prev) => ({ ...prev, grade: 3 }))}
              ></span>
              <FaStarHalfAlt className="starHalf" />
            </div>
          ) : (
            <div className="starDiv">
              <span
                className="starLeftSpan"
                onClick={() => setFilter((prev) => ({ ...prev, grade: 2.5 }))}
              ></span>
              <span
                className="starRightSpan"
                onClick={() => setFilter((prev) => ({ ...prev, grade: 3 }))}
              ></span>
              <FaRegStar className="star" />
            </div>
          )}
          {filter.grade >= 4 ? (
            <div className="starDiv">
              <span
                className="starLeftSpan"
                onClick={() => setFilter((prev) => ({ ...prev, grade: 3.5 }))}
              ></span>
              <span
                className="starRightSpan"
                onClick={() => setFilter((prev) => ({ ...prev, grade: 4 }))}
              ></span>
              <FaStar className="star" />
            </div>
          ) : filter.grade === 3.5 ? (
            <div className="starDiv">
              <span
                className="starLeftSpan"
                onClick={() => setFilter((prev) => ({ ...prev, grade: 3.5 }))}
              ></span>
              <span
                className="starRightSpan"
                onClick={() => setFilter((prev) => ({ ...prev, grade: 4 }))}
              ></span>
              <FaStarHalfAlt className="starHalf" />
            </div>
          ) : (
            <div className="starDiv">
              <span
                className="starLeftSpan"
                onClick={() => setFilter((prev) => ({ ...prev, grade: 3.5 }))}
              ></span>
              <span
                className="starRightSpan"
                onClick={() => setFilter((prev) => ({ ...prev, grade: 4 }))}
              ></span>
              <FaRegStar className="star" />
            </div>
          )}
          {filter.grade === 5 ? (
            <div className="starDiv">
              <span
                className="starLeftSpan"
                onClick={() => setFilter((prev) => ({ ...prev, grade: 4.5 }))}
              ></span>
              <span
                className="starRightSpan"
                onClick={() => setFilter((prev) => ({ ...prev, grade: 5 }))}
              ></span>
              <FaStar className="star" />
            </div>
          ) : filter.grade === 4.5 ? (
            <div className="starDiv">
              <span
                className="starLeftSpan"
                onClick={() => setFilter((prev) => ({ ...prev, grade: 4.5 }))}
              ></span>
              <span
                className="starRightSpan"
                onClick={() => setFilter((prev) => ({ ...prev, grade: 5 }))}
              ></span>
              <FaStarHalfAlt className="starHalf" />
            </div>
          ) : (
            <div className="starDiv">
              <span
                className="starLeftSpan"
                onClick={() => setFilter((prev) => ({ ...prev, grade: 4.5 }))}
              ></span>
              <span
                className="starRightSpan"
                onClick={() => setFilter((prev) => ({ ...prev, grade: 5 }))}
              ></span>
              <FaRegStar className="star" />
            </div>
          )}
        </div>
        <br />
        <Form.Select
          className="filterSelect"
          size="sm"
          onChange={(e) =>
            setFilter((prev) => ({ ...prev, select: e.target.value }))
          }
        >
          <option value="title">제목</option>
          <option value="content">내용</option>
          <option value="nickname">작성자</option>
          <option value="all">제목+내용</option>
        </Form.Select>
        <Form.Control
          className="keywordInput"
          size="sm"
          type="text"
          placeholder="검색어 입력"
          style={{ marginRight: "5px" }}
          onChange={(e) => {
            setFilter((prev) => ({ ...prev, keyword: e.target.value.trim() }));
          }}
        />
        <Button
          variant="dark"
          onClick={() => {
            setPage(1);
            getProductBoards();
          }}
        >
          검색
        </Button>
      </div>
      <nav className="sortWriteNav">
        <Form.Select
          size="sm"
          onChange={(e) =>
            setFilter((prev) => ({ ...prev, sort: e.target.value }))
          }
        >
          <option value="">날짜 순</option>
          <option value="view">조회 순</option>
          <option value="recommend">추천 순</option>
        </Form.Select>
        <Button variant="secondary" onClick={() => boardWrite()}>
          글쓰기{" "}
        </Button>
      </nav>
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
                className="bookmark bookmarkTrue"
                style={{ color: "#FFEB5A" }}
                onClick={(e) => {
                  e.stopPropagation();
                  bookmark(productBoard.productBoardCode);
                }}
              />
            )}
            {productBoard.productMainImage != null ? (
              <img
                className="mainImage"
                src={
                  "http://192.168.10.28:8081/" + productBoard.productMainImage
                }
                style={{
                  height: "258px",
                  width: "100%",
                  objectFit: "fill",
                  borderBottom: "1px solid black",
                  borderRadius: "7px",
                  borderBottomRightRadius: "0px",
                  borderBottomLeftRadius: "0px",
                }}
              />
            ) : (
              <div className="nullMainImage">
                <FaRegImage />
              </div>
            )}
            <div className="boardInfoDiv">
              <span className="boardSpan">
                {star(productBoard.productBoardGrade)}
              </span>

              <span
                className="boardSpan"
                style={{
                  float: "right",
                  height: "25px",
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  className="userImage"
                  src={"http://192.168.10.28:8081/" + productBoard.user.userImg}
                />
                {productBoard.user?.userNickname}
              </span>

              <br />
              <span>
                <span className="boardSpan" style={{ display: "inline-block" }}>
                  {productBoard.productBoardTitle}
                </span>
              </span>
              <br />
              <span className="productPriceName">
                <span className="boardSpan">
                  제품명 : {productBoard.productName}
                </span>
                <span className="boardSpan" style={{ marginRight: "0px" }}>
                  가격 : {productBoard.productPrice.toLocaleString("ko-KR")}원
                </span>
              </span>
              <br />
              <span className="productPriceName">
                <span className="boardSpan">
                  제품 품목 : {productBoard.productCategory}
                </span>
                <span className="boardSpan">
                  사용 동물 : {productBoard.animalCategory.animalType}
                </span>
              </span>

              <br />
              <span className="boardSpan">
                <FaRegThumbsUp /> {productBoard.recommend.length}
              </span>
              <span className="boardSpan">
                <BiMessageDetail />{" "}
                {
                  productBoard.comments.filter(
                    (commentCount) => commentCount.productCommentDelete !== "Y"
                  ).length
                }
              </span>
              <span className="boardSpan">
                <FaRegEye /> {productBoard.productBoardViewCount}
              </span>
              <span className="boardSpan" style={{ float: "right" }}>
                <MdOutlineWatchLater />
                &nbsp;
                {moment(productBoard.productBoardRegiDate).isSame(
                  moment(),
                  "day"
                )
                  ? moment(productBoard.productBoardRegiDate).from(moment())
                  : moment(productBoard.productBoardRegiDate).format(
                      "YYYY.MM.DD"
                    )}
              </span>
            </div>
          </div>
        ))}
      </div>
      <nav className="paging">
        {prev && (
          <FaAnglesLeft onClick={() => setPage(Math.ceil(page / 5) * 5 - 9)} />
          /* 가장 첫 페이지로 */
        )}
        {page !== 1 && (
          <FaAngleLeft
            onClick={() => (page > 1 ? setPage(page - 1) : setPage(1))} // 현재 페이지에서 한칸 앞으로
          />
        )}
        {pages.map(
          (
            num,
            index // 배열 담은 pages를 map으로 만들어서 반복문 페이지번호 생성
          ) => (
            <button
              className="pageNoBtn"
              key={index}
              value={num}
              onClick={(e) => setPage(Number(e.target.value))}
              style={num === page ? { backgroundColor: "#94B29B" } : {}}
            >
              {num}
            </button>
          )
        )}
        {page !== totalPage && totalPage !== 0 && (
          <FaAngleRight
            onClick={
              () => (page < totalPage ? setPage(page + 1) : setPage(totalPage)) // 현재 페이지에서 한칸 뒤로
            }
          />
        )}
        {next && (
          <FaAnglesRight onClick={() => setPage(Math.ceil(page / 5) * 5 + 1)} />
          /* 가장 마지막 페이지로 */
        )}
      </nav>
    </StyledProductBoard>
  );
};
export default ViewAllProductBoard;

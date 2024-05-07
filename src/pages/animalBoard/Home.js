import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import TableList from "../../components/animalBoard/TableList";
import CardList from "../../components/animalBoard/CardList";
import { useSelector, useDispatch } from "react-redux";
import { userSave } from "../../store/user";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import WeeklyRank from "../../components/animalBoard/WeeklyRank";
///////////////////
import { viewBoardList, viewCategory, viewRanker } from "../../api/animalBoard";
import { IoIosArrowUp } from "react-icons/io";
import { GoTriangleDown } from "react-icons/go";
import { BsCardList } from "react-icons/bs";
import { FaImage } from "react-icons/fa";
const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  .search-container {
    display: flex;
    /* flex-direction: row; */
    /* background-color: red; */
    text-align: center;
    color: rgb(244, 245, 219);
    font-size: 1.2rem;
    .category-container {
      .position-standard {
        position: relative;
      }
      .list-container {
        margin-top: 8px;
        position: absolute;
        opacity: 0.95;
      }
      .outer-option {
        width: 100px;
        background-color: rgb(70, 92, 88);
        padding: 4px;
        cursor: pointer;
        &:hover {
          background-color: lightgrey;
          color: orange;
        }
        .icon-color {
          color: green;
        }
      }
      .inner-option {
        background-color: grey;
        padding: 7px;
        cursor: pointer;
        &:hover {
          background-color: lightgray;
          color: orange;
        }
      }
      .up {
        font-size: 1.5rem;
        color: white;
      }
    }
    .search-filter {
      width: 100px;
      border: none;
      border-radius: 5px;
      color: rgb(244, 245, 219);
      background-color: rgb(55, 41, 32);
      cursor: pointer;
      &:hover {
        background-color: lightgray;
      }
    }
  }
  .navigate-writeBoard {
    width: 100px;
    margin-left: 200px;

    border: none;
    border-radius: 5px;
    color: rgb(244, 245, 219);
    background-color: rgb(55, 41, 32);
    font-size: 1.2rem;
    padding: 4px;
    cursor: pointer;
    &:hover {
      background-color: lightgray;
    }
  }
  .list-option-container {
    width: 100px;
    text-align: center;
    display: flex;
    flex-direction: column;
    color: rgb(244, 245, 219);
    background-color: rgb(70, 92, 88);
    font-size: 1.2rem;
    order: -1;
    position: relative;
    .outer-option {
      /* position: absolute; */
      background-color: rgb(70, 92, 88);
      padding: 4px;
      cursor: pointer;
      &:hover {
        background-color: lightgrey;
        color: orange;
      }
    }
    .list-container {
      position: absolute;
      margin-top: 45px;
      z-index: 5;
      opacity: 0.95;
      .outer-option {
        /* position: absolute; */
        background-color: rgb(70, 92, 88);
        padding: 4px;
        cursor: pointer;
        &:hover {
          background-color: lightgrey;
          color: orange;
        }
        .icon-color {
          color: green;
        }
      }
    }
  }
  .main-container {
    /* background-color: red; */
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;
const Div = styled.div`
  display: flex;
  flex-direction: column;

  /* justify-content: center; */
  width: 80%;
  align-items: center;

  .mb-4 {
    width: 300px;
  }
  .row-container {
    width: 80%;
  }
  .table-container {
    width: 600px;
  }
`;
const SearchBarContainer = styled.div`
  padding: 15px 0px 15px 0px;
  border-bottom: 1px solid lightgray;
  border-top: 1px solid lightgray;
  width: 600px;
  display: flex;
  justify-content: flex-start;
  /* background-color: red; */
  /* justify-content: space-evenly; */
  /* align-items: end; */
`;

// 여기서 viewAll 의 역할을 해줌
const AnimalHome = () => {
  const navigate = useNavigate();
  // 유저 ===========================
  const dispatch = useDispatch();
  const user = useSelector((state) => {
    return state.user;
  });
  // ==============================
  // 카테고리 불러오기
  const [categories, setCategories] = useState([]);
  const categoryAPI = async () => {
    const response = await viewCategory();
    setCategories(response.data);
    // console.log(response.data);
  };
  const [cateBoolean, setCateBoolean] = useState(false); // 카테고리 토글
  // ==============================
  const [loading, setLoading] = useState(false);
  const [boards, setBoards] = useState([]); // 여러개 = 배열
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  // const [check, setCheck] = useState(false);
  console.log(page);
  console.log(category);
  console.log(sort);
  const animalBoardsAPI = async (check) => {
    if (check) {
      // 더보기 버튼 눌렀을때
      setLoading(true);
      const response = await viewBoardList(page, category, sort);
      console.log(response.data.content);
      const newData = response.data.content;

      setBoards((prev) => [...prev, ...newData]);
      setPage((prev) => prev + 1);
    } else {
      // 검색창 눌렀을때
      setPage("");
      setBoards([]);
      const response = await viewBoardList(page, category, sort);
      setBoards(response.data.content);
    }
  };
  // 랭킹결과표
  const [rankers, setRanker] = useState([]);
  const favRankAPI = async () => {
    const response = await viewRanker();
    setRanker(response.data);
  };
  // 정렬 옵션바 띄우기
  const [option, setOption] = useState(false);
  const setOptionBar = () => {
    if (option) {
      setOption(false);
    } else {
      setOption(true);
    }
  };
  // 리스트 보기 옵션 토글
  const [listViewBoolean, setListViewBoolean] = useState(false);
  const listViewOption = () => {
    if (listViewBoolean) {
      setListViewBoolean(false);
    } else {
      setListViewBoolean(true);
    }
  };
  // 리스트 옵션 토글
  const [listBoolean, setListBoolean] = useState(true);
  // 글쓰기 버튼
  const accessWrite = () => {
    if (user === null || user === undefined) {
      alert("로그인 후 이용가능합니다.");
    } else {
      navigate("/animal-board/writeBoard");
    }
  };

  useEffect(() => {
    if (!loading) {
      animalBoardsAPI(true);
    }
  }, [page, loading]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== null) {
      dispatch(userSave(JSON.parse(localStorage.getItem("user"))));
    }
    categoryAPI();
    favRankAPI();
  }, []);
  return (
    <HomeContainer>
      <div className="main-container">
        <WeeklyRank rankers={rankers} />

        <SearchBarContainer className="SearchBarContainer">
          <div className="search-container">
            <div className="category-container">
              <div
                className="outer-option position-standard"
                onClick={setOptionBar}
              >
                정렬
                <GoTriangleDown />
              </div>
              {option ? (
                <div className="list-container">
                  <div
                    className="outer-option"
                    onClick={() => setSort("&sortBy=1")}
                  >
                    조회수
                  </div>
                  <div
                    className="outer-option"
                    onClick={() => setSort("&sortBy=2")}
                  >
                    좋아요
                  </div>
                  <div
                    className="outer-option"
                    onClick={() => setSort("&sortBy=0")}
                  >
                    최신순
                  </div>
                  <div
                    className="outer-option"
                    onClick={() => setSort("&sortBy=3")}
                  >
                    옛날순
                  </div>
                  <div
                    className="outer-option"
                    onMouseEnter={() => setCateBoolean(true)}
                    onMouseLeave={() => setCateBoolean(false)}
                  >
                    동물별
                    <GoTriangleDown />
                  </div>
                  <div
                    onMouseEnter={() => setCateBoolean(true)}
                    onMouseLeave={() => setCateBoolean(false)}
                  >
                    {cateBoolean ? (
                      <>
                        {categories.map((category) => (
                          <div
                            key={category.animalCategoryCode}
                            onClick={() =>
                              setCategory(
                                "&animalCategory=" + category.animalCategoryCode
                              )
                            }
                            className="inner-option"
                          >
                            {category.animalType}
                          </div>
                        ))}
                        <div
                          className="outer-option"
                          onClick={() => setCateBoolean(false)}
                        >
                          <IoIosArrowUp className="up" />
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>
            <button
              className="search-filter"
              onClick={() => {
                setOption(false);
                animalBoardsAPI(false);
              }}
            >
              검색!
            </button>
          </div>
          <div className="list-option-container">
            <div className="outer-option" onClick={listViewOption}>
              보기
              <GoTriangleDown />
            </div>
            {listViewBoolean ? (
              <div className="list-container">
                <div
                  className="outer-option icon-color"
                  onClick={() => {
                    setListBoolean(true);
                    setListViewBoolean(false);
                  }}
                >
                  <BsCardList /> 테이블
                </div>
                <div
                  className="outer-option icon-color"
                  onClick={() => {
                    setListBoolean(false);
                    setListViewBoolean(false);
                  }}
                >
                  <FaImage /> 카드
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
          <button onClick={accessWrite} className="navigate-writeBoard">
            글쓰기!
          </button>
        </SearchBarContainer>
        <Div className="paging-container">
          {listBoolean ? (
            <>
              <div className="table-container">
                {boards?.map((board) => (
                  <div key={board.animalBoardCode}>
                    <TableList board={board} />
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <Row md={4} className="row-container">
                {boards?.map((board) => (
                  <Col
                    className="col-6 col-md-4 col-lg-3 mb-4"
                    key={board.animalBoardCode}
                  >
                    <CardList board={board} user={user} />
                  </Col>
                ))}
              </Row>
            </>
          )}

          <button onClick={() => setLoading(false)} variant="dark">
            더 보기
          </button>
        </Div>
      </div>
    </HomeContainer>
  );
};

export default AnimalHome;

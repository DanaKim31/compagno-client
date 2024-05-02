import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Dropdown } from "react-bootstrap";
import TableList from "../../components/animalBoard/TableList";
import CardList from "../../components/animalBoard/CardList";
import { useSelector, useDispatch } from "react-redux";
import { userSave } from "../../store/user";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import SearchOption from "../../components/animalBoard/SearchOption";
///////////////////
import { viewBoardList, viewCategory } from "../../api/animalBoard";
import { IoIosArrowUp } from "react-icons/io";
import { GoTriangleDown } from "react-icons/go";
const Select = styled.div`
  width: 150px;
  text-align: center;
  color: rgb(244, 245, 219);
  font-size: 1.2rem;
  padding-top: 200px;

  .outer-option {
    background-color: rgb(70, 92, 88);
    padding: 4px;
    cursor: pointer;
    &:hover {
      background-color: lightgrey;
      color: orange;
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
`;
const Div = styled.div`
  padding-top: 112px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .mb-4 {
    width: 300px;
  }
  .row-container {
    width: 80%;
  }
`;

// 여기서 viewAll 의 역할을 해줌
const AnimalHome = () => {
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
      const response = await viewBoardList(page, category, sort);
      setBoards(response.data.content);
    }
  };

  useEffect(() => {
    if (!loading) {
      animalBoardsAPI();
    }
  }, [page, loading]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== null) {
      dispatch(userSave(JSON.parse(localStorage.getItem("user"))));
    }
    categoryAPI(true);
  }, []);
  return (
    <>
      <Select className="category-container">
        <div className="outer-option" onClick={() => setSort("&sortBy=1")}>
          조회수
        </div>
        <div className="outer-option" onClick={() => setSort("&sortBy=2")}>
          좋아요
        </div>
        <div className="outer-option" onClick={() => setSort("&sortBy=0")}>
          최신순
        </div>
        <div className="outer-option" onClick={() => setSort("&sortBy=3")}>
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
                <>
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
                </>
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
      </Select>
      <button onClick={() => animalBoardsAPI(false)}>검색!</button>
      <Div>
        <Dropdown>
          <Dropdown.Toggle variant="link" id="dropdown-basic">
            보기
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">테이블로 보기</Dropdown.Item>
            <Dropdown.Item href="#/action-2">카드로 보기</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Link to="/compagno/write-board"> 글쓰기! </Link>
        <TableList tableboards={boards} />
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
        <button onClick={() => setLoading(false)} variant="dark">
          더 보기
        </button>
      </Div>
    </>
  );
};

export default AnimalHome;

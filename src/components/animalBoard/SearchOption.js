import { useState, useEffect } from "react";
import { viewBoardList, viewCategory } from "../../api/animalBoard";
import styled from "styled-components";
import { IoIosArrowUp } from "react-icons/io";
import { GoTriangleDown } from "react-icons/go";

const Select = styled.div`
  width: 150px;
  text-align: center;
  color: rgb(244, 245, 219);
  font-size: 1.2rem;

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
const SearchOption = ({ getBoard }) => {
  const [categories, setCategories] = useState([]);
  const categoryAPI = async () => {
    const response = await viewCategory();
    setCategories(response.data);
    console.log(response.data);
  };

  const [cateBoolean, setCateBoolean] = useState(false);
  const [sort, setSort] = useState("");
  console.log(sort);
  const [category, setCategory] = useState("");
  console.log(category);
  const [page, setPage] = useState(1);
  const [newData, setNewData] = useState({});
  console.log(page);
  const onSearch = async () => {
    console.log({ page, category, sort });
    const response = await viewBoardList(page, category, sort);
    setNewData(response.data.content);
    console.log(response.data.content);
  };
  useEffect(() => {
    categoryAPI();
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
        <div className="outer-option" onClick={() => setSort(null)}>
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
      <button onClick={onSearch}>검색!</button>
    </>
  );
};
export default SearchOption;

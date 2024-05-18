import React from "react";
import Pagination from "react-js-pagination";
import styled from "styled-components";

const Div = styled.div`
  cursor: pointer;

  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 15px;
  }

  ul {
    list-style: none;
  }

  ul.pagination li {
    display: inline-block;
    width: 25px;
    height: 30px;
    border: 1px solid #e2e2e2;
    border-radius: 5px;
    margin: 0px 3px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  ul.pagination li a {
    text-decoration: none;
    color: black;
    font-size: 1rem;
  }

  ul.pagination li:hover {
    background-color: #94b29b;
  }

  ul.pagination li:nth-child(1),
  ul.pagination li:nth-child(2),
  ul.pagination li:nth-last-child(1),
  ul.pagination li:nth-last-child(2) {
    border: none;
    background-color: transparent;
    width: 15px;
    height: 30px;
  }

  li.currentPage {
    background-color: #94b29b;

    a.undefined {
      color: black;
    }
  }
`;

const AdopLostPaging = ({ page, count, setPage }) => {
  return (
    <Div>
      <Pagination
        activePage={page} // 현재 페이지
        itemsCountPerPage={6}
        totalItemsCount={count} // 총 갯수
        pageRangeDisplayed={5}
        prevPageText={"‹"}
        nextPageText={"›"}
        onChange={setPage}
        activeClass="currentPage"
      />
    </Div>
  );
};

export default AdopLostPaging;

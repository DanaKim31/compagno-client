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
    width: 30px;
    height: 30px;
    border: 1px solid #e2e2e2;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
  }

  ul.pagination li {
    border-radius: 50px;
    margin: 0px 5px;
  }

  ul.pagination li a {
    text-decoration: none;
    color: black;
    font-size: 1rem;
  }

  ul.pagination li.active a {
    color: white;
  }

  ul.pagination li.active {
    background-color: #337ab7;
  }

  ul.pagination li a:hover,
  ul.pagination li a.active {
    color: black;
  }

  .page-selection {
    width: 48px;
    height: 30px;
    color: #337ab7;
  }

  li.currentPage {
    background-color: #94b29b;

    a.undefined {
      color: black;
    }
  }
`;

const Paging = ({ page, count, setPage }) => {
  return (
    <Div>
      <Pagination
        activePage={page} // 현재 페이지
        itemsCountPerPage={10}
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

export default Paging;

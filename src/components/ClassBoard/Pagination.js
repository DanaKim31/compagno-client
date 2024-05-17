// import { useState } from "react";
// import React from "react";
// import Pagination from "react-js-pagination";
// import styled from "styled-components";

// const Div = styled.div`
//   cursor: pointer;
//   .pagination {
//     display: flex;
//     justify-content: center;
//     margin-top: 15px;
//   }

//   ul {
//     list-style: none;
//     padding: 0;
//   }

//   ul.pagination li {
//     display: inline-block;
//     width: 30px;
//     height: 30px;
//     border: 1px solid #e2e2e2;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     font-size: 1rem;
//   }

//   ul.pagination li:first-child {
//     border-radius: 5px 0 0 5px;
//   }

//   ul.pagination li:last-child {
//     border-radius: 0 5px 5px 0;
//   }

//   ul.pagination li a {
//     text-decoration: none;
//     color: #337ab7;
//     font-size: 1rem;
//   }

//   ul.pagination li.active a {
//     color: white;
//   }

//   ul.pagination li.active {
//     background-color: #337ab7;
//   }

//   ul.pagination li a:hover,
//   ul.pagination li a.active {
//     color: blue;
//   }

//   .page-selection {
//     width: 48px;
//     height: 30px;
//     color: #337ab7;
//   }
// `;

// const Paging = ({ page, count, setPage }) => {
//   // const [page, setPage] = useState(1);
//   // //  초기값 = 1 , 함수명

//   // const handlePageChange = (page) => {
//   //   setPage(page);
//   //   console.log(page);
//   // };

//   return (
//     <Div>
//       <Pagination
//         activePage={page}
//         itemsCountPerPage={4}
//         totalItemsCount={count}
//         pageRangeDisplayed={4}
//         prevPageText={"‹"}
//         nextPageText={"›"}
//         onChange={setPage}
//       />
//     </Div>
//   );
// };

// export default Paging;

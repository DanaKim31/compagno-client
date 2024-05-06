import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getContents } from "../../api/content";
import {
  FaAnglesLeft,
  FaAngleLeft,
  FaAngleRight,
  FaAnglesRight,
} from "react-icons/fa6";
import styled from "styled-components";
import MapList from "./MapList";

const Div = styled.div`
  position: relative;
  top: 200px;

  #content {
    display: flex;
    justify-content: space-evenly;
    width: 80%;

    background-color: pink;
  }
  #map {
    width: 500px;
    height: 500px;
    border: 1px solid;
  }
`;

const ContentList = () => {
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [contents, setContents] = useState([]);

  const location = useLocation();

  const [mainCate, setMainCate] = useState(0);
  const [subCate, setSubCate] = useState(0);
  const [mainReg, setMainReg] = useState(0);
  const [keyword, setKeyword] = useState("");

  // useLocation, useSearchParams
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  let query = useQuery();

  useEffect(() => {
    setMainCate(query.get("mainCate"));
    setSubCate(query.get("subCate"));
    setMainReg(query.get("mainReg"));

    console.log(query.get("keyword"));
    if (query.get("keyword") === null) {
      setKeyword("");
    } else {
      setKeyword(query.get("keyword"));
    }
  }, []);

  useEffect(() => {
    if (mainCate !== 0) {
      ContentAPI();
    }
  }, [mainCate, subCate, mainReg, keyword, page]);

  // 페이징 처리
  const [totalPage, setTotalPage] = useState(0); // 전체 총 페이지
  const [prev, setPrev] = useState(false); // 앞으로 한칸 버튼
  const [next, setNext] = useState(false); // 뒤로 한칸 버튼
  const [pages, setPages] = useState([]); // 페이지들

  const ContentAPI = async () => {
    const response = await getContents(
      page,
      mainCate,
      subCate,
      mainReg,
      keyword
    );
    setContent(response.data.content);
    setContents(response.data);
    setTotalPage(response.data.totalPages);
  };

  // 첫페이지, 마지막 페이지, 페이지 리스트 초기 셋팅
  let lastPage = 0;
  let firstPage = 0;
  let pageList = [];

  // totalPage가 바뀔 때 마다 실행
  useEffect(() => {
    lastPage = Math.ceil(page / 10) * 10; // 나는 한 화면에 1~5, 6~10 등 5개로 나뉘어서 보이기 때문에 5로 설정
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
  }, [totalPage, page]);

  return (
    <Div>
      <>
        <h1>리스트 출력</h1>
        <p>총 {contents.totalElements}건</p>
        <div id="content">
          <table>
            <thead>
              <tr>
                <th>이름</th>
              </tr>
            </thead>
            <tbody>
              {content?.map((item) => {
                return (
                  <tr key={item.num}>
                    <td>
                      <a href={`/compagno/content/detail/${item.num}`}>
                        {item.name}
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div id="map">
            <MapList content={content} />
          </div>
        </div>
      </>
      <div className="paging">
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
      </div>
    </Div>
  );
};
export default ContentList;

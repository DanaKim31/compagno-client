import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userSave } from "../../store/user";
import { countComment, viewDetail } from "../../api/animalBoard";
import styled from "styled-components";
import React from "react";
import DetailPageProfile from "../../components/animalBoard/DetailPageProfile";
import { viewCount } from "../../api/animalBoard";
import AllReplies from "../../components/animalBoard/AllReplies";
import ParentComments from "../../components/animalBoard/ParentComments";
import { fluctuationByDetailM, fluctuationByDetailP } from "../../api/AdLogic";
import { getCurrentPoint } from "../../api/ad";
import useDidMountEffect from "../../assets/useDidMountEffect";
const Div = styled.div`
  @font-face {
    font-family: "TAEBAEKmilkyway";
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2310@1.0/TAEBAEKmilkyway.woff2")
      format("woff2");
    font-weight: normal;
    font-style: normal;
  }
  font-family: "TAEBAEKmilkyway";
  padding-top: 112px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: auto;
  .detail-container {
    /* background-color: red; */
    width: 70%;
  }
`;
const Comment = styled.div`
  /* background-color: red; */
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  width: 70%;
  .animal-board-write-comment {
    width: 100%;
  }
  img {
    width: 70px;
  }
  .dropdown {
    display: block;
    width: auto;
    height: auto;
    right: 0;
    top: 0;
  }

  .contents-container {
    /* background-color: greenyellow; */
    width: 800px;
  }
  .animal-board-comment {
    margin: auto;
    display: flex;

    .user-action-container {
      display: flex;
      flex-direction: column;
      margin: 10px 0px 30px 10px;
      /* background-color: red; */
      /* width: 1200px; */
      .animal-board-comment-userability {
        margin-bottom: 15px;
        display: flex;
        .writer {
          font-weight: 1.2rem;
          color: brown;
        }
        .response {
          cursor: pointer;
        }
      }
      .update-comment-content {
        border: 1px solid grey;
      }
      .dropdown-toggle {
        cursor: pointer;
      }
    }
  }
  .repl-toggle-button {
    border: none;
    border-radius: 15px;
    width: 300px;
    .repl-toggle {
      cursor: pointer;
      font-size: 1.5rem;
    }
  }
`;

const AnimalDetail = () => {
  const { animalBoardCode } = useParams();
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  // 유저 정보
  // const [user, setUser] = useState({});
  const user = useSelector((state) => {
    return state.user;
  });
  // 댓글수 불러오기
  // const [commentCounts, setCommentCounts] = useState(0);
  // const countAPI = async () => {
  //   const response = await countComment(animalBoardCode);
  //   setCommentCounts(response.data);
  // };
  // console.log(user);
  // 현재 게시글 정보 불러오기
  const [detailInfo, setDetail] = useState({
    user: {},
    animalType: "",
    animalBoardTitle: "",
    animalBoardContent: "",
    animalCategory: {},
    animalBoardDate: "",
    animalBoardView: 0,
  });
  const setViewCount = async () => {
    await viewCount(animalBoardCode);
  };
  const animalBoardAPI = async () => {
    const response = await viewDetail(animalBoardCode);
    setDetail(response.data);
  };

  // 현재 카테고리 포인트 가져오기
  const [points, setPoints] = useState([]);
  const currentPointAPI = async () => {
    const response = await getCurrentPoint(user.userId);
    setPoints(response.data); // 현재 포인트값 잘 담기는거 확인
    console.log(response.data);
  };
  // 현재글의 카테고리가 아닌 카테고리들을 가져옴
  // const [exception, setException] = useState([]);

  const pointFilter = async () => {
    // console.log(detailInfo);
    // 증가시킬 것
    const target = points.filter(
      (point) =>
        point.animalCategory.animalCategoryCode ===
        detailInfo.animalCategory.animalCategoryCode
    );
    console.log(target);
    await fluctuationByDetailP(target);
    // console.log(target);

    // 감소시킬것
    console.log(detailInfo.animalCategory.animalCategoryCode);
    const exceptionList = points.filter(
      (point) =>
        point.animalCategory.animalCategoryCode !==
        detailInfo.animalCategory.animalCategoryCode
    );
    console.log(exceptionList);
    // 가장 높은 totalScore 값을 가진 요소를 찾기
    const maxTotalScore = Math.max(
      ...exceptionList.map((point) => point.totalScore)
    );
    console.log(maxTotalScore); // 값이 여러개?
    if (maxTotalScore >= 0.05) {
      // 가장 높은 totalScore 값을 가진 요소를 가져오기
      const maxScoreInException = exceptionList.find(
        (point) => point.totalScore === maxTotalScore
      );
      console.log(maxScoreInException);
      // setException(maxScoreInException);
      await fluctuationByDetailM(maxScoreInException);
    }
  };

  useEffect(() => {
    if (token !== null) {
      dispatch(userSave(JSON.parse(localStorage.getItem("user"))));
    }
  }, []);
  // 특정글 들어갈때 포인트 증가
  useEffect(() => {
    if (Object.keys(user).length !== 0) {
      currentPointAPI();
      // 포인트 증감
    }
  }, [animalBoardCode]);

  //========================================

  useEffect(() => {
    animalBoardAPI();
    // animalBoardCommentAPI();
    setViewCount();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // useEffect(() => {
  //   animalBoardCommentAPI();
  // }, [comment.replies]);

  useDidMountEffect(() => {
    if (Object.keys(detailInfo.animalCategory).length !== 0) {
      pointFilter();
    }
  }, [points, detailInfo]);

  return (
    <Div>
      <div className="detail-container">
        <DetailPageProfile author={detailInfo} currentUser={user} />

        <div className="post__list">
          <div
            className="post__description"
            dangerouslySetInnerHTML={{
              __html: detailInfo.animalBoardContent,
            }}
          />
        </div>
      </div>

      <ParentComments
        user={user}
        token={token}
        animalBoardCode={animalBoardCode}
        detailInfo={detailInfo}
        animalBoardAPI={() => animalBoardAPI()}
        commentsBoolean={true}
      />

      <AllReplies
        user={user}
        token={token}
        animalBoardCode={animalBoardCode}
        detailInfo={detailInfo}
        animalBoardAPI={() => animalBoardAPI()}
        commentsBoolean={false}
        // commentSum={}
      />
    </Div>
  );
};
export default AnimalDetail;

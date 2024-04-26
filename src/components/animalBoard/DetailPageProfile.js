import styled from "styled-components";
import { FaPencilAlt } from "react-icons/fa";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useEffect } from "react";

const Div = styled.div`
  .title-container {
    .title {
      font-size: 2rem;
    }
  }
  .profile-container {
    display: flex;
    flex-direction: row;

    label {
      /* background-color: yellow; */
      img {
        width: 70px;
      }
    }
    .author-userablity {
      /* background-color: red; */
      width: 100%;
      min-width: 600px;
      display: flex;

      .user-info {
        /* background-color: yellow; */
        padding-left: 20px;
        flex: 1;
        p {
          margin-right: 30px;
        }
      }
      .writer {
        font-size: 1.2rem;
        color: brown;
      }
      .option {
        /* background-color: green; */
        display: flex;
        justify-content: flex-end;
      }
    }
  }
`;
const DetailPageProfile = ({ author }) => {
  console.log(author);
  return (
    <Div className="author-profile-container">
      <div className="title-container">
        <div className="category">[{author.animalCategory.animalType}]</div>
        <div className="title">{author.animalBoardTitle}</div>
      </div>
      <div className="profile-container">
        <label>
          <img src={"http://192.168.10.28:8081/" + author.user.userImg} />
        </label>
        <div className="author-userablity">
          <div className="user-info">
            <p>
              {author.user.userNickname} <FaPencilAlt className="writer" />
            </p>
            <p>
              {"등록일 : " + author.animalBoardDate} |{" "}
              {"조회 : " + author.animalBoardView}
            </p>
          </div>
          <div className="option">
            <FaRegHeart />
            <FaHeart />
            기타여러가지 기능들
          </div>
        </div>
      </div>
    </Div>
  );
};
export default DetailPageProfile;

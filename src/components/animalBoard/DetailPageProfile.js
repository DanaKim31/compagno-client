import styled from "styled-components";
import { FaPencilAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { delBoard } from "../../api/animalBoard";
import { Image } from "react-bootstrap";
import MyToggleBar from "../note/MyToggleBar";

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
        width: 60px;
        height: 60px;
        object-fit: cover;
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
const DetailPageProfile = ({ author, currentUser }) => {
  const navigate = useNavigate();
  const deleteBoard = async (boardCode) => {
    try {
      await delBoard(boardCode);
      alert("성공적으로 글이 삭제되었습니다.");
      navigate("/compagno/animal-board");
    } catch {
      alert(
        "무언가 문제가 생겨서 삭제를 진행할 수가 없습니다. 잠시후 다시 시도해주세요"
      );
      navigate(`/compagno/animal-board/${author.animalBoardCode}`);
    }
  };
  const accessUpdate = async (boardCode) => {
    navigate(`/compagno/edit-board/${boardCode}`);
  };
  const accessWrite = async (boardCode) => {
    navigate(`/compagno/write-board${boardCode}`);
  };
  return (
    <Div className="author-profile-container">
      <div className="title-container">
        <div className="category">[{author.animalCategory.animalType}]</div>
        <div className="title">{author.animalBoardTitle}</div>
      </div>
      <div className="profile-container">
        <label>
          <Image
            src={"http://192.168.10.28:8081/" + author.user.userImg}
            roundedCircle
          />
        </label>
        <div className="author-userablity">
          <div className="user-info">
            <p>
              <MyToggleBar name={author.user.userNickname} />{" "}
              <FaPencilAlt className="writer" />
            </p>
            <p>
              {"등록일 : " + author.animalBoardDate} |{" "}
              {"조회 : " + author.animalBoardView}
            </p>
          </div>
          <div className="option">
            <button onClick={() => accessWrite(author.animalBoardCode)}>
              글쓰기!
            </button>
            {currentUser.userId === author.user.userId ? (
              <>
                <button onClick={() => accessUpdate(author.animalBoardCode)}>
                  글 수정하기
                </button>
                <button onClick={() => deleteBoard(author.animalBoardCode)}>
                  글 삭제하기
                </button>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </Div>
  );
};
export default DetailPageProfile;

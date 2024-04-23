import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import EditorToolbar, {
  modules,
  // formats,
} from "../../components/animalBoard/EditorToolbar";
import { useNavigate, useParams } from "react-router-dom";
import { viewDetail, updateBoard } from "../../api/animalBoard";

const Edit = () => {
  // 글정보 가져오기
  const navigate = useNavigate();
  const { animalBoardCode } = useParams();
  //   console.log(animalBoardCode);

  const [detailInfo, setDetail] = useState({
    userId: "",
    animalCategory: [],
    animalBoardTitle: "",
    animalBoardContent: "",
    animalBoardDate: "",
    animalMainImage: "",
    animalBoardView: 0,
    animalBoardCode: animalBoardCode,
  });
  // 수정시 카테고리 미변경이면 0이 그대로 들어가짐
  const animalBoardAPI = async () => {
    const response = await viewDetail(animalBoardCode);
    // console.log(response.data);
    setDetail(response.data);
  };

  // 수정
  const edit = async () => {
    try {
      const response = await updateBoard(detailInfo);
      setDetail(response.data);
      console.log(response.data);
      navigate("/compagno/animal-board");
    } catch {
      navigate("/compagno/error");
    }
  };

  useEffect(() => {
    animalBoardAPI();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <select
        defaultValue={detailInfo.animalCategory.animalCategoryCode}
        value={detailInfo.animalCategory.animalCategoryCode}
        onChange={(e) =>
          setDetail((prev) => ({
            ...prev,
            animalCategoryCode: e.target.value,
          }))
        }
      >
        <option value="default">-- 어떤 동물인가요 --</option>
        <option value="1">개</option>
        <option value="2">고양이</option>
        <option value="3">비둘기</option>
        <option value="4">기타</option>
      </select>
      <input
        type="text"
        placeholder="제목을 입력해주세요"
        value={detailInfo.animalBoardTitle}
        onChange={(e) =>
          setDetail((prev) => ({
            ...prev,
            animalBoardTitle: e.target.value,
          }))
        }
      />
      <EditorToolbar toolbarId={"t1"} />
      <ReactQuill
        value={detailInfo.animalBoardContent}
        onChange={(e) =>
          setDetail((prev) => ({
            ...prev,
            animalBoardContent: e,
          }))
        }
        modules={modules("t1")}
        placeholder="글을 쓰시오"
      />
      <button onClick={edit}>submit</button>
    </>
  );
};

export default Edit;

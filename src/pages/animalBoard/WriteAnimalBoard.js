import React, { useState, useMemo, useEffect } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageResize from "quill-image-resize";
import ImageUploader from "quill-image-uploader";
import { addBoard } from "../../api/animalBoard"; // 기존 addWrite에서 원래 있던걸로 변경
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
// 유저
import { useSelector, useDispatch } from "react-redux";
import { userSave } from "../../store/user";
const Div = styled.div`
  padding-top: 112px;
`;

Quill.register("modules/imageResize", ImageResize);
Quill.register("modules/imageUploader", ImageUploader);

const WriteAnimalBoard = () => {
  const { animalBoardCode } = useParams();
  const navigate = useNavigate();
  // 유저 ===========================
  const dispatch = useDispatch();
  const user = useSelector((state) => {
    return state.user;
  });
  // ==============================
  // const [images, setImages] = useState([]);
  const [boardInfo, setBoardInfo] = useState({
    animalBoardTitle: "",
    animalBoardContent: "",
    animalCategoryCode: "0",
    user: {
      userId: user.userId,
    },
  }); // quill 제외 부분

  const addWrite = async () => {
    console.log(boardInfo.animalCategoryCode);
    if (
      boardInfo.animalCategoryCode === "0" ||
      boardInfo.animalCategoryCode === undefined
    ) {
      alert("글머리를 선택해주세요");
    } else if (
      boardInfo.animalBoardTitle === "" ||
      boardInfo.animalBoardTitle === undefined
    ) {
      alert("제목을 입력해주세요");
    } else if (
      boardInfo.animalBoardContent === "" ||
      boardInfo.animalBoardContent === undefined
    ) {
      alert("내용을 작성해주세요");
    } else {
      await addBoard(boardInfo);
      // console.log(boardInfo.animalBoardContent);
      navigate("/compagno/animal-board");
    }
  };

  const toolbarOptions = [
    ["link", "image", "video"],
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    ["blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
    ["images"],
  ];

  const modules = useMemo(
    () => ({
      toolbar: {
        container: toolbarOptions,
      },
      clipboard: {
        matchVisual: false,
      },

      imageUploader: {
        upload: (file) => {
          return new Promise((resolve, reject) => {
            const formData = new FormData();
            // console.log(animalBoardCode);
            // formData.append("animalBoardCode", animalBoardCode); 이부분은 단순히 서버에 사진이 도착하냐에 대한 확인용
            formData.append("file", file);
            // console.log(formData);

            fetch("http://localhost:8080/compagno/public/animal-board/image", {
              method: "POST",
              body: formData,
            })
              .then((response) => {
                if (!response.ok) {
                  throw new Error("Network response was not ok");
                }
                return response.json();
              })
              .then((result) => {
                const image =
                  "http://192.168.10.28:8081" + result.animalBoardImage;
                resolve(image);
                // setImages((prev) => [...prev, file]);
              })
              .catch((error) => {
                console.error(
                  "There was a problem with the fetch operation:",
                  error
                );
                reject(error);
              });
          });
        },
      },
      imageResize: {
        displaySize: true,
        parchment: Quill.import("parchment"),
        modules: ["Resize", "DisplaySize", "Toolbar"],
      },
    }),
    []
  );

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "align",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "background",
    "color",
    "link",
    "image",
    "video",
    "width",
    "imageBlot",
  ];
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== null) {
      dispatch(userSave(JSON.parse(localStorage.getItem("user"))));
    }
  }, []);
  return (
    <Div>
      <select
        defaultValue="0"
        value={boardInfo.animalCategoryCode}
        onChange={(e) =>
          setBoardInfo((prev) => ({
            ...prev,
            animalCategoryCode: e.target.value,
          }))
        }
      >
        <option value="0">-- 어떤 동물인가요 --</option>
        <option value="1">개</option>
        <option value="2">고양이</option>
        <option value="3">비둘기</option>
        <option value="4">기타</option>
      </select>
      <input
        type="text"
        placeholder="제목을 입력해주세요"
        value={boardInfo.animalBoardTitle}
        onChange={(e) =>
          setBoardInfo((prev) => ({
            ...prev,
            animalBoardTitle: e.target.value,
          }))
        }
      />
      <ReactQuill
        theme="snow"
        value={boardInfo.animalBoardContent}
        onChange={(e) =>
          setBoardInfo((prev) => ({ ...prev, animalBoardContent: e }))
        }
        modules={modules}
        formats={formats}
        placeholder="Give me a title"
      />
      <button type="button" onClick={addWrite}>
        SUBMIT
      </button>
    </Div>
  );
};
export default WriteAnimalBoard;

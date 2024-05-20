import React, { useState, useMemo, useEffect } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageResize from "quill-image-resize";
import ImageUploader from "quill-image-uploader";
import { viewDetail, updateBoard, getPrevImages } from "../../api/animalBoard"; // 기존 addWrite에서 원래 있던걸로 변경
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
// 유저
import { useSelector, useDispatch } from "react-redux";
import { userSave } from "../../store/user";

Quill.register("modules/imageResize", ImageResize);
Quill.register("modules/imageUploader", ImageUploader);

const Div = styled.div`
  padding-top: 112px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .title-container {
    margin-bottom: 20px;
    select {
      height: 50px;
      border-radius: 10px;
      border: 1px solid lightgrey;
    }

    input {
      width: 1210px;
      margin-left: 10px;
      height: 50px;
      border-radius: 10px;
      border: 1px solid lightgrey;
    }
  }

  .body-container {
    width: 1400px;
    .submit {
      margin-top: 10px;
      width: 100px;
      border: none;
      border-radius: 5px;
      color: rgb(244, 245, 219);
      background-color: rgb(70, 92, 88);
      cursor: pointer;
      &:hover {
        background-color: lightgray;
      }
    }
    .cancel {
      margin-top: 10px;
      margin-left: 10px;
      width: 100px;
      border: none;
      border-radius: 5px;
      color: rgb(244, 245, 219);
      background-color: lightgrey;
      cursor: pointer;
      &:hover {
        background-color: whitesmoke;
      }
    }
  }
`;
const EditAnimalBoard = () => {
  const navigate = useNavigate();
  const { animalBoardCode } = useParams();
  // 유저 ===========================
  const dispatch = useDispatch();
  const user = useSelector((state) => {
    return state.user;
  });
  // ==============================
  // 기존 글 정보 ==================
  const [detailInfo, setDetail] = useState({
    userId: user.userId,
    animalCategory: {},
    animalBoardTitle: "",
    animalBoardContent: "",
    animalBoardDate: "",
    animalMainImage: "",
    animalBoardView: "",
    animalBoardCode: animalBoardCode,
  });
  const animalBoardAPI = async () => {
    const response = await viewDetail(animalBoardCode);
    // console.log(response.data);
    setDetail(response.data);
  };
  // 기존 글 이미지 정보
  const [prevImages, setPrevImages] = useState([]);
  const prevImageAPI = async () => {
    const response = await getPrevImages(animalBoardCode);
    // console.log(response.data);
    setPrevImages(response.data);
  };

  // const uploadPrevImages = async()=>{
  //   const
  // }

  /*
  const uploadImages = async () => {
  const updatedImages = [];
  for (const image of detailInfo.images) {
    try {
      const uploadedImage = await imageUploader.upload(image); // 이미지 업로드 함수 호출
      updatedImages.push(uploadedImage);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  }
  return updatedImages;
};
  */

  const addEdit = async () => {
    // console.log(detailInfo.animalCategoryCode);
    if (
      detailInfo.animalCategoryCode === "0" ||
      detailInfo.animalCategoryCode === undefined
    ) {
      alert("글머리를 선택해주세요");
    } else if (
      detailInfo.animalBoardTitle === "" ||
      detailInfo.animalBoardTitle === undefined
    ) {
      alert("제목을 입력해주세요");
    } else if (
      detailInfo.animalBoardContent === "" ||
      detailInfo.animalBoardContent === undefined
    ) {
      alert("내용을 작성해주세요");
    } else {
      // console.log(detailInfo);
      await updateBoard(detailInfo);
      // console.log(boardInfo.animalBoardContent);
      navigate("/compagno/animal-board");
    }
  };
  const cancelWrite = () => {
    navigate("/compagno/animal-board");
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
    animalBoardAPI();
    prevImageAPI();
  }, []);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== null) {
      dispatch(userSave(JSON.parse(localStorage.getItem("user"))));
    }
  }, []);
  return (
    <Div>
      <div className="title-container">
        <select
          // defaultValue={detailInfo.animalCategory.animalCategoryCode}
          value={detailInfo.animalCategory.animalCategoryCode}
          onChange={(e) =>
            setDetail((prev) => ({
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
          value={detailInfo.animalBoardTitle}
          onChange={(e) =>
            setDetail((prev) => ({
              ...prev,
              animalBoardTitle: e.target.value,
            }))
          }
        />
      </div>
      <div className="body-container">
        <ReactQuill
          theme="snow"
          value={detailInfo.animalBoardContent}
          onChange={(e) =>
            setDetail((prev) => ({ ...prev, animalBoardContent: e }))
          }
          modules={modules}
          formats={formats}
          placeholder="Give me a title"
        />
        <div>
          <button type="button" onClick={addEdit} className="submit">
            수정
          </button>
          <button type="button" onClick={cancelWrite} className="cancel">
            취소
          </button>
        </div>
      </div>
    </Div>
  );
};
export default EditAnimalBoard;

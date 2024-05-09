// 디테일 페이지 => 수정 삭제
import { data } from "jquery";
import { viewClass, deleClass, updateClass } from "../../api/onedayClass";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ClassDetail = () => {
  const [classBoard, setClassBoard] = useState({}); // 한개 보기
  const navigate = useNavigate();

  // 클래스 한개 정보 가져오기 !
  const classBoardAPI = async (code) => {
    const response = await viewClass(code);
    setClassBoard(response.data);
  };

  // const user

  useEffect(() => {
    classBoardAPI();
  }, []);

  const updateSubmit = async () => {
    // 디테일 페이지 수정후 fordata 방식으로 전송
    const formData = new FormData();
    formData.append();
    formData.append();
    formData.append();
    formData.append();
    formData.append();
    formData.append();
  };

  // 삭제 관련 로직
  const onDelete = async (code) => {
    await deleClass(code);
    navigate("/compagno/onedayClassBoard");
  };

  // 수정 관련 로직
  const onUpdate = async (data) => {
    await updateClass(data);
  };

  const onBack = () => {
    navigate("/compagno/onedayClassBoard");
  };

  return (
    <div>
      <div>안녕하세요!!</div>
      <div className="ClassDetail" key={classBoard.odcCode}></div>

      <div>
        <button onClick={onUpdate}>취소</button>
        <button type="submit" onClick={onDelete}>
          삭제
        </button>
        <button onClick={onBack}>취소</button>
      </div>
    </div>
  );
};

export default ClassDetail;

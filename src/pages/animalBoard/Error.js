import { Link } from "react-router-dom";
const Error = () => {
  return (
    <>
      <h1>안타깝지만 오류가 났답니다~~~~~?</h1>
      <Link to={`/compagno/animal-board`}>자유게시판으로 돌아가기</Link>
    </>
  );
};
export default Error;

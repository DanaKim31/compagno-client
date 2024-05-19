import { FaPencilAlt } from "react-icons/fa";
import styled from "styled-components";
const Div = styled.div`
  border: 1px solid lightgray;
  border-radius: 15px;
  background-color: whitesmoke;
  width: 55px;
  font-size: 0.7rem;
  font-weight: bold;
  text-align: center;
  color: brown;
  margin-left: 5px;
  height: 22px;
`;
const Writer = () => {
  return (
    <Div>
      <FaPencilAlt className="witer" />
      작성자
    </Div>
  );
};
export default Writer;

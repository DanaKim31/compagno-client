import MyPageSidebar from "../../components/user/MyPageSidebar";
import styled from "styled-components";

const Div = styled.div`
  display: flex;
  height: 100vh;
  padding-top: 112px;

  .note-zone {
    width: calc(100vw - 300px);
    box-sizing: border-box;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding-top: 20px;
    background-color: aliceblue;
  }
`;

const MyPageMyNote = () => {
  return (
    <Div>
      <MyPageSidebar />
      <div className="note-zone">
        <p>쪽지함</p>
      </div>
    </Div>
  );
};

export default MyPageMyNote;

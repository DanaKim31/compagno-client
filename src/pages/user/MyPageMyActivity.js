import styled from "styled-components";
import MyPageSidebar from "../../components/user/MyPageSidebar";

const Div = styled.div`
  display: flex;
  /* box-sizing: border-box; */
  height: 100vh;
  padding-top: 112px;

  .activity-content {
    background-color: skyblue;
    width: calc(100vw - 300px);
    /* display: flex;
    justify-content: center;
    align-items: center; */
  }
`;

const MyPageMyActivity = () => {
  return (
    <Div>
      <MyPageSidebar />
      <div className="activity-content">
        <p>마이페이지 - 내 활동내역 페이지</p>
      </div>
    </Div>
  );
};
export default MyPageMyActivity;

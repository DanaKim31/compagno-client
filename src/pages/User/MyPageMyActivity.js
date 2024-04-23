import styled from "styled-components";
import MyPageSidebar from "../../components/MyPageSidebar";

const Div = styled.div`
  display: flex;

  .mypage-content {
    background-color: skyblue;
    width: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const MyPageMyActivity = () => {
  return (
    <Div>
      <MyPageSidebar />
      <div className="mypage-content">
        <p>마이페이지 - 내 활동내역 페이지</p>
      </div>
    </Div>
  );
};
export default MyPageMyActivity;

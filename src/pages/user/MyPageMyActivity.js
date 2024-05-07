import styled from "styled-components";
import MyPageSidebar from "../../components/user/MyPageSidebar";
import MyPageList from "./MyPageList";
import { Tab, Tabs } from "react-bootstrap";

const Div = styled.div`
  display: flex;
  /* box-sizing: border-box; */
  height: 100vh;
  padding-top: 112px;

  .activity-zone {
    width: calc(100vw - 300px);
    box-sizing: border-box;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding-top: 20px;

    .mb-3 {
      width: 90%;
      display: flex;
    }
  }
`;

const MyPageMyActivity = () => {
  return (
    <Div>
      <MyPageSidebar />
      <div className="activity-zone">
        <Tabs
          defaultActiveKey="animalBoardFav"
          id="noanim-tab-example"
          className="mb-3"
        >
          <Tab eventKey="animalBoardFav" title="최애 동물">
            <MyPageList />
          </Tab>
          <Tab eventKey="product" title="관심 제품">
            Tab content for product
          </Tab>
          <Tab eventKey="1day class" title="1day class">
            Tab content for 1day class
          </Tab>
          <Tab eventKey="adoption" title="adoption">
            Tab content for adoption
          </Tab>
          <Tab eventKey="register" title="register">
            Tab content for register
          </Tab>
          <Tab eventKey="QnA" title="QnA">
            Tab content for QnA
          </Tab>
        </Tabs>
      </div>
    </Div>
  );
};
export default MyPageMyActivity;

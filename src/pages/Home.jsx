import styled from "styled-components";
import Feed from "../components/Feed";
import RightBar from "../components/RightBar";
import SideBar from "../components/SideBar";

const Home = () => {
  return (
    <HomeContainer>
      <SideBar />
      <Feed />
      <RightBar />
    </HomeContainer>
  );
};

export default Home;

const HomeContainer = styled.div`
  display: flex;
  width: 100%;
`;

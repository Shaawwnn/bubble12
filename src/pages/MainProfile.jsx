import React from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import SideBar from "../components/SideBar";
import Home from "./Home";
import Profile from "./Profile";

const MainProfile = () => {
  return (
    <MainProfileContainer>
      <Navbar />
      <ProfileContainer>
        <div className="sidebar">
          <SideBar />
        </div>
        <Profile />
      </ProfileContainer>
    </MainProfileContainer>
  );
};

export default MainProfile;

const MainProfileContainer = styled.div``;

const ProfileContainer = styled.div`
  display: flex;

  .sidebar {
    @media (max-width: 512px) {
      display: none;
    }
  }
`;

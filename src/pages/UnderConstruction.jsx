import React from "react";
import styled from "styled-components";
import Error from "../components/Error";
import Navbar from "../components/Navbar";
import SideBar from "../components/SideBar";

const UnderConstruction = () => {
  return (
    <>
      <Navbar />
      <UnderContainer>
        <SideBar />
        <Error />
      </UnderContainer>
    </>
  );
};

export default UnderConstruction;

const UnderContainer = styled.div`
  display: flex;
`;

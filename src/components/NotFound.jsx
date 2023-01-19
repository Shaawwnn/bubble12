import React from "react";
import styled from "styled-components";

const NotFound = () => {
  return (
    <NotFoundContainer>
      <img src="/404.png" alt="" />
      <h3>Page Not Found</h3>
    </NotFoundContainer>
  );
};

export default NotFound;

const NotFoundContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  flex-direction: column;
  gap: 20px;
  img {
    max-width: 500px;
    width: 80%;
  }

  h3 {
    font-weight: 400;
    color: white;
  }
`;

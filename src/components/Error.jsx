import React from "react";
import styled from "styled-components";

const Error = () => {
  return (
    <ErrorContainer>
      <div>
        <img src="/error.jpg" alt="" />
      </div>
      <h4>This page is UNDER CONSTRUCTION...</h4>
    </ErrorContainer>
  );
};

export default Error;

const ErrorContainer = styled.div`
  flex: 8;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #18191a;
  flex-direction: column;
  gap: 20px;
  img {
    max-width: 300px;
    border-radius: 40px;
  }
  h4 {
    color: white;
    font-weight: 400;
  }
`;

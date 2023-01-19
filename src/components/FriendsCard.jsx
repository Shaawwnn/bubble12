import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const FriendsCard = ({ username, displayPhoto }) => {
  return (
    <CardContainer>
      <Link to={`/profile/${username}`}>
        <img src={displayPhoto || "/default.png"} alt="" />
        <h6>{username}</h6>
      </Link>
    </CardContainer>
  );
};

export default FriendsCard;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  a {
    text-decoration: none;
  }
  img {
    width: 100%;
    height: auto;
    border-radius: 5px;
    object-fit: contain;
    max-width: 100px;
    max-height: 100px;
    min-width: 80px;
    min-height: 80px;
  }
  h6 {
    font-weight: 500;
    font-size: 12px;
    padding: 5px;
    max-width: 100px;
    color: white;
    text-align: center;
  }
`;

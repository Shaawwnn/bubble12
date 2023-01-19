import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";

const OnlineFriends = ({ onlineUsers, currentUserId }) => {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);

  useEffect(() => {
    const getFriends = async () => {
      const res = await axios.get("/users/following/" + currentUserId);
      setFriends(res.data);
    };

    getFriends();
  }, [currentUserId]);

  useEffect(() => {
    setOnlineFriends(friends.filter(f => onlineUsers.includes(f._id)));
  }, [onlineUsers, friends]);

  return (
    <div>
      {onlineFriends.map((x, i) => {
        return (
          <OnlineContainer key={i}>
            <div className="online">
              <img src={x.displayPhoto || "/default.png"} alt="" />
            </div>
            <p>{x.username}</p>
          </OnlineContainer>
        );
      })}
    </div>
  );
};

export default OnlineFriends;

const OnlineContainer = styled.div`
  user-select: none;
  cursor: pointer;
  display: flex;
  padding: 10px 20px;
  margin-right: 10px;
  gap: 20px;
  border-radius: 10px;
  .online {
    position: relative;

    &::after {
      content: "";
      width: 8px;
      height: 8px;
      background-color: #00ff00;
      position: absolute;
      border: 2px solid white;
      border-radius: 50%;
      bottom: 5px;
      right: -5px;
    }
  }

  img {
    width: 25px;
    height: 25px;
    object-fit: contain;
    border-radius: 100%;
  }

  p {
    color: #e4e6eb;
    font-size: 14px;
  }

  &:hover {
    background-color: #3a3b3c;
  }
`;

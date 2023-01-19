import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";

const Chat = ({ conversation, currentUser, setReceiver }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const friendId = conversation.members.find(x => x !== currentUser._id);

    const getUser = async () => {
      try {
        const res = await axios.get(`/users?userId=${friendId}`);
        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getUser();
  }, [currentUser, conversation]);

  return (
    <ChatContainer>
      <div>
        <img src={user.displayPhoto || `/default.png`} alt="" />
        <div className="chatInner">
          <h4>{user?.username}</h4>
        </div>
      </div>
    </ChatContainer>
  );
};

export default Chat;

const ChatContainer = styled.div`
  padding: 10px 5px;
  border-radius: 10px;
  cursor: pointer;
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: contain;
  }

  div {
    display: flex;
    gap: 10px;
    align-items: center;

    .chatInner {
      flex-direction: column;
      align-items: flex-start;
      gap: 0;
      color: white;
      h4 {
        font-weight: 400;
      }
      p {
        font-weight: 100;
        font-size: 13px;
      }
    }
  }

  &:hover {
    background-color: #3a3b3c;
  }
`;

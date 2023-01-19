import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { AuthContext } from "../context/AuthContext";
import { format } from "timeago.js";

const Message = ({ message, image }) => {
  const { user } = useContext(AuthContext);

  return (
    <MessageContainer className={user._id === message.sender && "own"}>
      <div className="messageHeader">
        {user._id !== message.sender && (
          <img src={image || `/default.png`} alt="" />
        )}

        <p>{message.text}</p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </MessageContainer>
  );
};

export default Message;

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  .messageHeader {
    display: flex;
    img {
      width: 35px;
      height: 35px;
      object-fit: cover;
      border-radius: 100%;
      margin: 0 10px 0 0;
    }

    p {
      padding: 10px;
      max-width: 500px;
      border-radius: 20px;
      background-color: #3e4042;
      color: white;
      line-height: 20px;
      font-size: 15px;
      font-weight: 300;
    }
  }

  .messageBottom {
    font-size: 10px;
    color: gray;
    padding: 2px 50px 3px;
    margin-bottom: 5px;
  }

  &.own {
    align-items: flex-end;
    .messageHeader {
      flex-direction: row-reverse;
      img {
        margin: 0 0 0 10px;
      }
      p {
        background-color: #0165e1;
      }
    }
  }
`;

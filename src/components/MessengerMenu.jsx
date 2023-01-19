import React, { useContext } from "react";
import styled from "styled-components";
import Chat from "./Chat";
import Search from "./Search";
import { AuthContext } from "../context/AuthContext";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import ChatSearch from "./ChatSearch";

const MessengerMenu = ({ setCurrentChat }) => {
  const [convo, setConvo] = useState([]);

  const { user } = useContext(AuthContext);
  useEffect(() => {
    const getConvo = async () => {
      try {
        const res = await axios.get(`/conversations/${user._id}`);
        setConvo(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getConvo();
  }, [user._id]);

  return (
    <MessengerMenuContainer>
      <MessengerMenuInner>
        <div className="chatNav">
          <h2>Chats</h2>
          <ChatSearch
            className="chatSearch"
            currentUser={user._id}
            setCurrentChat={setCurrentChat}
            setConvo={setConvo}
          />
        </div>
        <div className="chatList">
          {convo.map((x, i) => {
            return (
              <div
                onClick={() => {
                  setCurrentChat(x);
                }}
                key={i}
              >
                <Chat conversation={x} currentUser={user} />
              </div>
            );
          })}
        </div>
      </MessengerMenuInner>
    </MessengerMenuContainer>
  );
};

export default MessengerMenu;

const MessengerMenuContainer = styled.div``;

const MessengerMenuInner = styled.div`
  height: 100%;

  .chatNav {
    height: 110px;
    padding: 10px 20px;
    border-bottom: 1px solid #3a3b3c;
  }
  h2 {
    color: white;
    margin: 5px 0 15px 0;
  }
  .chatSearch {
    padding: 0;
  }

  .chatList {
    height: calc(100vh - 160px);
    overflow-y: scroll;
    padding-left: 10px;
    ::-webkit-scrollbar {
      width: 4px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
      background: transparent;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
      background: #555;
      border-radius: 5px;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
      background: #333;
    }
  }
`;

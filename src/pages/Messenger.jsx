import React, { useState } from "react";
import styled from "styled-components";
import MessengerMain from "../components/MessengerMain";
import MessengerMenu from "../components/MessengerMenu";
import Navbar from "../components/Navbar";

const Messenger = () => {
  const [currentChat, setCurrentChat] = useState(null);

  return (
    <div>
      <Navbar />
      <MessengerContainer>
        <div className="menuContainer" id={!currentChat && "show"}>
          <MessengerMenu
            currentChat={currentChat}
            setCurrentChat={setCurrentChat}
          />
        </div>
        <div className="mainContainer" id={currentChat && "show"}>
          <MessengerMain
            currentChat={currentChat}
            setCurrentChat={setCurrentChat}
          />
        </div>
      </MessengerContainer>
    </div>
  );
};

export default Messenger;

const MessengerContainer = styled.div`
  height: calc(100vh - 50px);
  display: flex;
  background-color: #242526;

  .menuContainer {
    flex: 0.3;
    border-right: 0.1px solid #3a3b3c;
    height: 100%;
  }

  .mainContainer {
    flex: 0.7;
    height: 100%;
  }

  @media screen and (max-width: 550px) {
    display: block;

    .menuContainer {
      display: none;
      &#show {
        display: block;
      }
    }

    .mainContainer {
      display: none;
      &#show {
        display: block;
      }
    }
  }
`;

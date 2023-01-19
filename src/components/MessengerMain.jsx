import React, { useState } from "react";
import styled from "styled-components";
import Message from "./Message";
import SendIcon from "@mui/icons-material/Send";
import { IconButton } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useEffect } from "react";
import axios from "axios";
import { useRef } from "react";
import { io } from "socket.io-client";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const MessengerMain = ({ currentChat, setCurrentChat }) => {
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");
  const scrollRef = useRef();
  const [receiver, setReceiver] = useState("");
  const socket = useRef();
  const [arrivingMsg, setArrivingMsg] = useState({});

  useEffect(() => {
    socket.current = io("https://bubble-socketserver.onrender.com");
    socket.current.on("getMessage", data => {
      setArrivingMsg({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivingMsg && currentChat?.members.includes(arrivingMsg.sender);
    setMessages(prev => [...prev, arrivingMsg]);
  }, [arrivingMsg, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", users => {
      //console.log(users);
    });
  }, [user]);

  useEffect(() => {
    const getMsg = async () => {
      try {
        const res = await axios.get(`/messages/${currentChat?._id}`);
        setMessages(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getMsg();
  }, [currentChat]);

  const handleSend = async e => {
    e.preventDefault();
    const msg = {
      sender: user._id,
      text: newMsg,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(m => m !== user._id);

    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId: receiverId,
      text: newMsg,
    });

    try {
      const res = await axios.post("/messages", msg);
      setMessages([...messages, res.data]);
      setNewMsg("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const friendId = currentChat?.members.find(x => x !== user._id);
    const getUser = async () => {
      try {
        const res = await axios.get(`/users?userId=${friendId}`);
        setReceiver(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getUser();
  }, [currentChat]);

  return (
    <MessengerMainContainer>
      {currentChat ? (
        <>
          <div className="messageTop">
            <div
              className="backBtn"
              onClick={() => {
                setCurrentChat(null);
              }}
            >
              <ArrowBackIcon />
            </div>
            <img src={receiver.displayPhoto || "/default.png"} alt="" />
            <h3>{receiver.username}</h3>
          </div>

          <div className="messageMain">
            {messages.map((x, i) => {
              return (
                <div ref={scrollRef} key={i}>
                  <Message message={x} image={receiver.displayPhoto} />
                </div>
              );
            })}
          </div>

          <div className="messageInput">
            <textarea
              name=""
              placeholder="Aa"
              onChange={e => {
                setNewMsg(e.target.value);
              }}
              value={newMsg}
            ></textarea>
            {newMsg && (
              <IconButton onClick={handleSend}>
                <SendIcon />
              </IconButton>
            )}
          </div>
        </>
      ) : (
        <div className="emptyChat">
          <h2>Start a conversation</h2>
        </div>
      )}
    </MessengerMainContainer>
  );
};

export default MessengerMain;

const MessengerMainContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;

  .messageTop {
    padding: 10px 20px;
    width: 100%;
    display: flex;
    align-items: center;
    gap: 20px;
    color: white;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px,
      rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;
    cursor: pointer;
    user-select: none;
    z-index: 500;
    img {
      width: 40px;
      border-radius: 50%;
    }
    h3 {
      font-weight: 400;
    }
    .backBtn {
      display: none;
    }

    @media screen and (max-width: 550px) {
      .backBtn {
        display: inline-block;
      }
    }
  }
  .messageMain {
    padding: 10px 10px;
    height: 100%;
    overflow-y: scroll;
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

  .messageInput {
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    textarea {
      resize: none;
      max-height: 80px !important;
      width: 100% !important;
      padding: 10px;
      border-radius: 10px;
      outline: none;
      background-color: #3a3b3c;
      border: none;
      color: white;

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
    button {
      background-color: transparent;
      height: 50px;
      outline: none;
      border: none;
      color: rgb(64, 159, 255);
    }
  }

  .emptyChat {
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    color: white;
    h2 {
      font-weight: 300;
      font-size: 30px;
      text-align: center;
      color: #464545;
    }
  }
`;

import React, { useContext } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import styled from "styled-components";
import OnlineFriends from "./OnlineFriends";
import { useRef } from "react";
import { io } from "socket.io-client";
import { useState } from "react";
import { useEffect } from "react";
import { AuthContext } from "../context/AuthContext";

const RightBar = () => {
  const socket = useRef();
  const { user } = useContext(AuthContext);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    socket.current = io("https://bubble-socketserver.onrender.com");
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,

    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
  };

  useEffect(() => {
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", users => {
      setOnlineUsers(
        user.following.filter(f => users.some(u => u.userId == f))
      );
    });
  }, [user]);

  return (
    <>
      <RightBarContainer>
        <h4>Events</h4>
        <div className="birthdays">
          <img src="gift.png" />
          <span>No upcoming birthdays</span>
        </div>
        <h4>Sponsored</h4>
        <div className="carouselContainer">
          <Carousel {...settings}>
            <Wrap>
              <img src="1.png" alt="" />
            </Wrap>
            <Wrap>
              <a
                href="https://tranquil-starlight-e4167d.netlify.app/"
                target="blank"
              >
                <img src="2.png" alt="" />
              </a>
            </Wrap>
            <Wrap>
              <img src="3.png" alt="" />
            </Wrap>
          </Carousel>
        </div>
        <Online>
          <h4>Online Friends</h4>
          <OnlineFriends onlineUsers={onlineUsers} currentUserId={user._id} />
        </Online>
      </RightBarContainer>
    </>
  );
};

export default RightBar;

const RightBarContainer = styled.div`
  user-select: none;
  flex: 3;
  background-color: #18191a;
  height: calc(100vh - 50px);
  overflow-y: scroll;
  ::-webkit-scrollbar {
    background-color: transparent;
  }

  .birthdays {
    display: flex;
    padding: 0 20px 20px 20px;
    align-items: center;
    gap: 10px;
    font-size: 15px;
    font-weight: 200;
    color: #e4e6eb;
    img {
      width: 20px;
    }
  }

  h4 {
    margin: 20px 0 10px 10px;
    color: #e4e6eb;
  }

  .carouselContainer {
    padding: 10px;

    min-height: 0;
    min-width: 0;
    display: flex;
    justify-content: center;
  }

  @media screen and (max-width: 780px) {
    display: none;
  }
`;

const Carousel = styled(Slider)`
  width: 100% !important;
  max-width: 280px;

  ul {
    button::before {
      color: #3a3b3c;
    }

    .slick-active {
      button::before {
        color: #b0b3b8;
      }
    }
  }
`;

const Wrap = styled.div`
  border-radius: 20px;
  overflow: hidden;
  outline: none;
  img {
    width: 100%;
    object-fit: contain;
  }
`;

const Online = styled.div``;

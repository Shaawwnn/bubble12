import React, { useContext } from "react";
import styled from "styled-components";
import RssFeedIcon from "@mui/icons-material/RssFeed";
import GroupsIcon from "@mui/icons-material/Groups";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import WorkIcon from "@mui/icons-material/Work";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import EventIcon from "@mui/icons-material/Event";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import { NavLink } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import { AuthContext } from "../context/AuthContext";
import StorefrontIcon from "@mui/icons-material/Storefront";
import ForumIcon from "@mui/icons-material/Forum";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const SideBar = () => {
  const { user } = useContext(AuthContext);
  const [currUser, setCurrUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(`/users?username=${user.username}`);
      setCurrUser(response.data);
    };
    fetchUser();
  }, []);

  return (
    <>
      <SideBarContainer>
        <ul>
          <NavLink
            to="/"
            style={({ isActive }) => ({
              backgroundColor: isActive && "#3a3b3c",
            })}
          >
            <li className="sidebarListItem">
              <div className="sidebarIcon">
                <HomeIcon />
              </div>
              <span>Feed</span>
            </li>
          </NavLink>
          <NavLink to={`/profile/${user.username}`}>
            <li className="sidebarListItem">
              <div className="sidebarIcon">
                <img src={currUser?.displayPhoto || "/default.png"} alt="" />
              </div>
              <span>Profile</span>
            </li>
          </NavLink>
          <NavLink to="/messenger">
            <li className="sidebarListItem">
              <div className="sidebarIcon">
                <ForumIcon />
              </div>
              <span>Messenger</span>
            </li>
          </NavLink>
          <NavLink to="/groups">
            <li className="sidebarListItem">
              <div className="sidebarIcon">
                <GroupsIcon />
              </div>
              <span>Groups</span>
            </li>
          </NavLink>
          <NavLink to="/saved">
            <li className="sidebarListItem">
              <div className="sidebarIcon">
                <BookmarkIcon />
              </div>
              <span>Saved</span>
            </li>
          </NavLink>
          <NavLink to="/jobs">
            <li className="sidebarListItem">
              <div className="sidebarIcon">
                <WorkIcon />
              </div>
              <span>Jobs</span>
            </li>
          </NavLink>
          <NavLink to="/faqs">
            <li className="sidebarListItem">
              <div className="sidebarIcon">
                <HelpOutlineIcon />
              </div>
              <span>FAQ</span>
            </li>
          </NavLink>
          <NavLink to="/events">
            <li className="sidebarListItem">
              <div className="sidebarIcon">
                <EventIcon />
              </div>
              <span>Events</span>
            </li>
          </NavLink>
          <NavLink to="/community">
            <li className="sidebarListItem">
              <div className="sidebarIcon">
                <LocalLibraryIcon />
              </div>
              <span>Community</span>
            </li>
          </NavLink>
          <NavLink to="/marketplace">
            <li className="sidebarListItem">
              <div className="sidebarIcon">
                <StorefrontIcon />
              </div>
              <span>Marketplace</span>
            </li>
          </NavLink>
        </ul>

        <hr />
        <footer>
          <a>Privacy ·</a>
          <a> Terms ·</a>
          <a> Advertising ·</a>
          <a> Cookies </a>
          <p>Bubble &copy; Social Media Website · All Rights Reserved</p>
        </footer>
      </SideBarContainer>
    </>
  );
};

export default SideBar;

const SideBarContainer = styled.div`
  height: calc(100vh - 50px);
  user-select: none;
  flex: 3;
  padding: 10px;
  background-color: #18191a;
  color: #e4e6eb;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  a {
    text-decoration: none;
  }
  .sidebarListItem {
    list-style-type: none;
    color: #e4e6eb;

    display: flex;
    padding: 10px 5px;
    align-items: center;
    cursor: pointer;
    &:hover {
      background-color: #3a3b3c;
      border-radius: 10px;
    }
    .sidebarIcon {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    img {
      width: 25px;
      height: 25px;
      object-fit: contain;
      border-radius: 50%;
    }

    span {
      margin-left: 22px;
    }
  }

  hr {
    margin: 30px 0;
  }

  footer {
    font-weight: 200;
    font-size: 12px;
  }

  /* -----------------------scrollbar------------------ */
  &::-webkit-scrollbar {
    width: 8px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    background: transparent;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: #b0b3b8;
    opacity: 0.7;
    border-radius: 5px;
  }

  @media screen and (max-width: 1120px) {
    max-width: 38px;
    padding: 2px;
    overflow: hidden;
    border-right: 2px solid #3a3b3c;
    hr {
      display: none;
    }
    footer {
      display: none;
    }
  }

  @media (max-width: 512px) {
    display: none;
  }
`;

import styled from "styled-components";
import PersonIcon from "@mui/icons-material/Person";
import MessageIcon from "@mui/icons-material/Message";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Link, NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useRef } from "react";
import Search from "./Search";
import { useEffect } from "react";
import axios from "axios";

const Navbar = () => {
  const { user, dispatch } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [currUser, setCurrUser] = useState({});

  const menuRef = useRef();
  const imgRef = useRef();
  const arrowRef = useRef();

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(`/users?username=${user.username}`);
      setCurrUser(response.data);
    };
    fetchUser();
  }, []);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };
  window.addEventListener("click", e => {
    if (
      e.target !== menuRef.current &&
      e.target !== imgRef.current &&
      e.target !== arrowRef.current
    )
      setOpen(false);
  });

  return (
    <Nav>
      <NavLogo>
        <Link to="/">
          <img src="/logo.png" alt="" />
          <span className="logoName">bubble</span>
        </Link>
      </NavLogo>

      <Search />

      <NavMenu>
        <Link to="/messenger">
          <div className="navIconText">
            <MessageIcon />
            <div>2</div>
          </div>
        </Link>

        <div className="navImg">
          <div>
            <img
              src={currUser?.displayPhoto || "/default.png"}
              ref={imgRef}
              onClick={() => setOpen(!open)}
            />
            <KeyboardArrowDownIcon
              className="chevron"
              ref={arrowRef}
              onClick={() => setOpen(!open)}
            />
          </div>
          {open && (
            <div className="dropdown" ref={menuRef}>
              <ul>
                <li onClick={() => setOpen(false)}>
                  <NavLink to={`/profile/${user.username}`}>Account</NavLink>
                </li>
                <hr />
                <li onClick={handleLogout}>Logout</li>
              </ul>
            </div>
          )}
        </div>
      </NavMenu>
    </Nav>
  );
};

export default Navbar;

const Nav = styled.nav`
  height: 50px;
  width: 100%;
  background-color: #242526;
  display: flex;
  z-index: 1000;
  align-items: center;
  padding: 10px 30px;
  border-bottom: 2px solid #3a3b3c;
  a {
    text-decoration: none;
  }

  .bigSearch {
    @media screen and (max-width: 750px) {
      display: none;
    }
  }

  @media screen and (max-width: 750px) {
    padding: 10px 10px;
  }
`;

const NavLogo = styled.div`
  cursor: pointer;
  overflow: hidden;
  z-index: 50;
  img {
    width: 40px;
  }
  flex: 0.3;
  color: white;
  font-weight: 500;
  font-size: 24px;
  letter-spacing: 5px;

  a {
    gap: 10px;
    display: flex;
    align-items: center;
    text-decoration: none;
    color: #e4e6eb;
  }

  .logoName {
    @media screen and (max-width: 850px) {
      display: none;
    }
  }

  @media screen and (max-width: 850px) {
    flex: 1;
    max-width: 60px;
  }
`;

const NavMenu = styled.div`
  display: flex;
  flex: 0.3;
  align-items: center;
  justify-content: flex-end;

  padding-top: 5px;
  .MuiSvgIcon-root {
    color: #e4e6eb;
  }

  .navIconText {
    margin-right: 20px;
    position: relative;
    display: flex;
    align-items: center;
    color: white;
    cursor: pointer;
    div {
      position: absolute;
      top: -5px;
      right: -5px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #fa383e;
      height: 15px;
      width: 15px;
      font-size: 10px;
      border-radius: 50%;
    }
  }

  .navImg {
    margin-left: 40px;
    cursor: pointer;
    width: 35px;
    height: 35px;
    margin-top: -5px;
    position: relative;
    img {
      border-radius: 50%;
      width: 35px;
      height: 35px;
      object-fit: contain;
    }
    .chevron {
      position: absolute;
      font-size: 16px;
      background-color: #3a3b3c;
      bottom: 0;
      right: -5px;
      border-radius: 100%;
    }
    .dropdown {
      box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
      color: #e4e6eb;
      border-radius: 10px;
      li {
        list-style-type: none;
        line-height: 22px;
        a {
          color: white;
        }
      }
      background-color: #242526;
      width: 200px;
      position: absolute;
      right: 0;
      padding: 20px;
      top: 41px;
      z-index: 5000;
    }
    hr {
      margin: 30px 0 10px;
      border: none;
      border-top: 1px solid #3a3b3c;
    }

    @media screen and (max-width: 700px) {
      margin: 0;
    }
  }
`;

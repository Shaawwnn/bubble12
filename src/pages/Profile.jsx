import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import ProfileInfoLeft from "../components/ProfileInfoLeft";
import ProfileInfoRight from "../components/ProfileInfoRight";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import NotFound from "../components/NotFound";

const Profile = () => {
  const [user, setUser] = useState({});
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [following, setFollowing] = useState([]);
  const [follow, setFollow] = useState();

  useEffect(() => {
    getCurrentUser();
  }, [user]);

  const getCurrentUser = async () => {
    try {
      const res = await axios.get(`users/?userId=${currentUser._id}`);
      setFollowing(res.data.following);
      setFollow(following.includes(user._id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleFollow = async () => {
    try {
      if (follow) {
        await axios.put(`/users/${user._id}/unfollow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOWED", payload: user._id });
      } else {
        await axios.put(`/users/${user._id}/follow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOWED", payload: user._id });
      }
    } catch (error) {
      console.log(error);
    }

    setFollow(!follow);
  };

  const username = useParams().username;

  useEffect(() => {
    setFollow(currentUser.following.includes(user?._id));
  }, [currentUser, user._id]);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(`/users?username=${username}`);
      setUser(response.data);
    };
    fetchUser();
  }, [username]);

  return (
    <ProfileContainer>
      {user?.username ? (
        <>
          <ProfileHeader>
            <div className="profileCover">
              <img
                src={user.coverPhoto ? user.coverPhoto : `/cover.jpg`}
                className="coverPhoto"
              />
              <img
                src={user.displayPhoto ? user.displayPhoto : "/default.png"}
                alt=""
                className="displayPhoto"
              />
            </div>
            <h1>{user.username}</h1>
            {user._id !== currentUser._id && (
              <button className="follow" onClick={handleFollow}>
                {follow ? (
                  <>
                    <CheckIcon />
                    <span>Followed</span>
                  </>
                ) : (
                  <>
                    <AddIcon />
                    <span>Follow</span>
                  </>
                )}
              </button>
            )}
          </ProfileHeader>
          <ProfileBottom>
            <div className="profileBottomContainer">
              <ProfileInfoLeft {...user} />
              <ProfileInfoRight username={username} />
            </div>
          </ProfileBottom>
        </>
      ) : (
        <>
          <NotFound />
        </>
      )}
    </ProfileContainer>
  );
};

export default Profile;

const ProfileContainer = styled.div`
  flex: 8;
  width: 100%;
  height: calc(100vh - 50px);
  background-color: #18191a;
  padding: 0px 20px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    background-color: transparent;
  }

  @media (max-width: 829px) {
    padding: 0px 10px;
    ::-webkit-scrollbar {
      width: 0px;
    }
  }

  @media (max-width: 580px) {
    padding: 0;
  }
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  .profileCover {
    width: 100%;
    max-width: 900px;
    position: relative;
    margin-bottom: 50px;

    .coverPhoto {
      width: 100%;
      height: 300px;
      object-fit: cover;
      border-radius: 0 0 10px 10px;
      @media screen and (max-width: 700px) {
        height: 200px;
      }
    }

    .displayPhoto {
      position: absolute;
      width: 200px;
      height: 200px;
      bottom: -40px;
      right: 50%;
      left: 50%;
      transform: translateX(-50%);
      border-radius: 50%;
      border: 5px solid #18191a;
      object-fit: cover;
      @media screen and (max-width: 700px) {
        height: 130px;
        width: 130px;
        border: 3px solid #18191a;
      }
    }
  }
  button {
    padding: 2px 10px;
    display: flex;
    align-items: center;
    color: white;
    font-weight: 400;
    font-size: 18px;
    justify-content: space-between;
    background-color: #0077ff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    outline: none;
    span {
      padding-left: 5px;
    }
  }
  h1 {
    text-align: center;
    color: #e4e6eb;
    margin-bottom: 10px;
    @media screen and (max-width: 700px) {
      font-size: 20px;
    }
  }
`;

const ProfileBottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: auto;

  .profileBottomContainer {
    margin-top: 40px;
    display: flex;

    gap: 20px;
    @media (max-width: 916px) {
      flex-direction: column;
      padding: 0 5px;
    }
  }

  @media (max-width: 829px) {
    ::-webkit-scrollbar {
      width: 0px;
      height: 0px;
    }
  }
`;

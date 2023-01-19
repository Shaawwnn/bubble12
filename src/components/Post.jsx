import React, { useContext, useState } from "react";
import styled from "styled-components";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import PublicIcon from "@mui/icons-material/Public";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import IconButton from "@mui/material/IconButton";
import { useEffect } from "react";
import axios, { Axios } from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Post = props => {
  const { user: currentUser } = useContext(AuthContext);

  const [likes, setLikes] = useState(props.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});

  const handleLike = () => {
    try {
      axios.put(`/posts/${props._id}/like`, { userId: currentUser._id });
    } catch (error) {}
    setIsLiked(!isLiked);
    !isLiked ? setLikes(prev => prev + 1) : setLikes(prev => prev - 1);
  };

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?userId=${props.userId}`);
      setUser(res.data);
    };

    fetchUser();
  }, [props.userId]);

  //handle if post is liked already

  useEffect(() => {
    setIsLiked(props.likes.includes(currentUser._id));
  }, [currentUser._id, props.likes]);

  return (
    <>
      <PostContainer>
        <PostUpper>
          <div className="profile">
            <Link to={props.profileState ? "" : `profile/${user.username}`}>
              {user.displayPhoto ? (
                <img src={`${user.displayPhoto}`} />
              ) : (
                <img src="/default.png" />
              )}
            </Link>
            <div className="profileDetails">
              <p>{user.username}</p>
              <span>
                {format(props.createdAt)} · <PublicIcon />{" "}
              </span>
            </div>
          </div>
          <div className="profileMore">
            <IconButton>
              <MoreHorizIcon />
            </IconButton>
          </div>
        </PostUpper>
        <PostContent>
          <p>{props.description}</p>
          <div className="postImage">
            {props.image && <img src={props.image} />}
          </div>
        </PostContent>
        <PostBottom>
          <div className="postDetails">
            <div className="postLikeCount">
              {likes > 0 && (
                <>
                  <img src="/like.png" />
                  <span>{likes}</span>
                </>
              )}
            </div>
            <p className="postCommentCount">Comments</p>
          </div>
          <hr />
          <PostButtons>
            <div className="postBtn" onClick={handleLike}>
              {!isLiked ? (
                <ThumbUpOffAltIcon />
              ) : (
                <ThumbUpIcon className="liked" />
              )}
              <span>Like</span>
            </div>
            <div className="postBtn">
              <ChatBubbleOutlineIcon />
              <span>Comment</span>
            </div>
          </PostButtons>
        </PostBottom>
      </PostContainer>
    </>
  );
};

export default Post;

const PostContainer = styled.div`
  width: 100%;
  background-color: #242526;
  border-radius: 10px;
  min-width: 200px;
  max-width: 500px;
  margin-bottom: 10px;
`;

const PostUpper = styled.div`
  display: flex;
  padding: 10px;
  justify-content: space-between;
  align-items: center;
  color: #e4e6eb;

  .profile {
    display: flex;
    gap: 10px;
    align-items: center;

    img {
      width: 40px;
      height: 40px;
      object-fit: contain;
      border-radius: 50%;
      cursor: pointer;
    }

    .profileDetails {
      display: flex;
      flex-direction: column;

      p {
        font-size: 16px;
        cursor: pointer;

        &:hover {
          text-decoration: underline;
        }
      }

      span {
        color: #b0b3b8;
        font-size: 12px;
        font-weight: 200;
        .MuiSvgIcon-root {
          font-size: 12px;
        }
        cursor: pointer;
      }
    }
  }
  .profileMore {
    .MuiButtonBase-root {
      &:hover {
        background-color: #3a3b3c;
      }
    }
    .MuiSvgIcon-root {
      color: #e4e6eb !important;
    }
  }
`;

const PostContent = styled.div`
  width: 100%;

  p {
    padding: 0px 10px 10px 20px;
    color: #e4e6eb;
    font-size: 14px;
    font-weight: 300;
  }
  .postImage {
    cursor: pointer;
    img {
      width: 100%;
    }
  }
`;

const PostBottom = styled.div`
  padding: 0 20px;
  color: #b0b3b8;
  .postDetails {
    padding: 5px 0 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .postLikeCount {
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 7px;
      img {
        width: 16px;
      }
      span {
        font-size: 15px;
      }
    }

    .postCommentCount {
      cursor: pointer;
      font-size: 15px;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  hr {
    border: none;
    border-top: 1px solid #3a3b3c;
  }
`;

const PostButtons = styled.div`
  user-select: none;
  display: flex;
  padding: 10px;
  justify-content: center;

  width: 99%;
  .postBtn {
    border-radius: 5px;
    padding: 4px 20px;
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    cursor: pointer;

    &:hover {
      background-color: #3a3b3c;
    }
  }

  .liked {
    color: #0165e1;
  }
`;

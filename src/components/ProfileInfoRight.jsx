import React, { useContext, useEffect, useState } from "react";
import Share from "./Share";
import Post from "./Post";
import styled from "styled-components";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { FormControlUnstyledContext } from "@mui/base";

const ProfileInfoRight = props => {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get(`/posts/profile/${props.username}`);
      setPosts(response.data);
    };

    fetchPosts();
  }, [props.username]);

  return (
    <ProfileInfoRightContainer>
      {user.username == props.username && <Share />}
      {posts
        .map(post => {
          return <Post key={post._id} {...post} profileState={true} />;
        })
        .reverse()}
    </ProfileInfoRightContainer>
  );
};

export default ProfileInfoRight;

const ProfileInfoRightContainer = styled.div`
  flex: 0.6;

  @media screen and (max-width: 500px) {
    flex: 1;
  }
`;

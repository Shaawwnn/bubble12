import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Post from "./Post";
import Share from "./Share";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useParams } from "react-router-dom";

const Feed = () => {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get(`/posts/timeline/${user._id}`);
      setPosts(
        response.data.sort((x, y) => {
          return new Date(y.createdAt) - new Date(x.createdAt);
        })
      );
    };

    fetchPosts();
  }, []);

  return (
    <>
      <FeedContainer>
        <Share />
        {posts.map((post, i) => {
          return <Post key={i} {...post} />;
        })}
      </FeedContainer>
    </>
  );
};

export default Feed;

const FeedContainer = styled.div`
  flex: 6;
  padding: 15px 50px;
  background-color: #18191a;

  display: flex;
  flex-direction: column;
  align-items: center;
  height: calc(100vh - 50px);
  overflow-y: scroll;

  ::-webkit-scrollbar {
    background-color: transparent;
  }

  @media (max-width: 829px) {
    padding: 5px 5px;
    ::-webkit-scrollbar {
      width: 0px;
    }
  }
`;

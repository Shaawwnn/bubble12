import axios from "axios";
import React, { useEffect, useLayoutEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../context/AuthContext";
import FriendsCard from "./FriendsCard";
import Modal from "./Modal";

const ProfileInfoLeft = props => {
  const [followings, setFollowings] = useState([]);
  const username = useParams();
  const { user } = useContext(AuthContext);
  const [showEdit, setShowEdit] = useState(false);

  useEffect(() => {
    const getFollowings = async () => {
      try {
        const result = await axios.get(`/users/following/${props._id}`);
        setFollowings(result.data);
      } catch (error) {
        console.log(error);
      }
    };

    getFollowings();
  }, [props]);

  return (
    <ProfileInfoLeftContainer>
      <h2>Information</h2>
      <div className="profileInfo">
        <p>
          <strong>City : </strong>
          {props.city}
        </p>
        <p>
          <strong>From : </strong>
          {props.from}
        </p>
        <p>
          {props.relationship && (
            <strong>
              Status :{" "}
              {props.relationship == 1
                ? "Single"
                : props.relationship == 2
                ? "In a relationship"
                : props.relationship == 3 && "Married"}{" "}
            </strong>
          )}
        </p>
      </div>
      {username.username === user.username && (
        <button className="edit" onClick={() => setShowEdit(!showEdit)}>
          Edit Information
        </button>
      )}
      <h2>Following</h2>

      <FriendsContainer>
        {followings
          .map(x => {
            return <FriendsCard key={x._id} {...x} />;
          })
          .filter((x, i) => i < 9)}
      </FriendsContainer>
      <div style={{ display: showEdit ? "block" : "none" }}>
        <Modal setShowEdit={setShowEdit} />
      </div>
    </ProfileInfoLeftContainer>
  );
};

export default ProfileInfoLeft;

const ProfileInfoLeftContainer = styled.div`
  flex: 0.4;
  background-color: #242526;
  width: 400px;
  max-width: 400px;
  max-height: auto;
  color: #e4e6eb;
  border-radius: 10px;
  align-self: flex-start;
  position: sticky;
  padding: 10px;
  top: -25px;
  min-width: 300px;
  margin-bottom: 10px;
  h2 {
    font-weight: 600;
    margin: 0px 0 10px 5px;
    color: #e4e6eb;
  }

  .profileInfo {
    strong {
      font-weight: 500;
    }
    font-weight: 200;
    font-size: 14px;
    margin: 0 20px 20px 10px;
  }
  @media (max-width: 916px) {
    width: 300px;
    min-width: 100%;
    position: static;
  }

  .edit {
    width: 100%;
    border-radius: 10px;
    padding: 10px;
    font-weight: 600;
    color: white;
    background-color: #3a3b3c;
    border: none;
    outline: none;
    margin: 10px 0;
    cursor: pointer;

    &:hover {
      background-color: #48494b;
    }
  }
`;

const FriendsContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: auto auto auto;
  justify-items: center;
  margin-bottom: 10px;

  grid-row-gap: 10px;
`;

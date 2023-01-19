import React, { useContext } from "react";
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import storage from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useState } from "react";
import { AuthContext } from "../context/AuthContext";
import uuid from "react-uuid";
import axios from "axios";

const Modal = ({ setShowEdit }) => {
  const { user, dispatch } = useContext(AuthContext);
  const [city, setCity] = useState("");
  const [from, setFrom] = useState("");
  const [profilePic, setProfilePic] = useState(null);

  const handleSubmit = e => {
    e.preventDefault();

    if (profilePic) {
      const imageRef = ref(storage, uuid());
      uploadBytes(imageRef, profilePic)
        .then(() => {
          getDownloadURL(imageRef)
            .then(res => {
              const newPost = {
                city: city,
                from: from,
                displayPhoto: res,
                userId: user._id,
              };
              try {
                axios.put(`/users/${user._id}`, newPost).then(() => {
                  window.location.reload();
                  dispatch({ type: "EDIT", payload: res });
                });
              } catch (error) {
                console.log(error, "Error updating");
              }
            })
            .catch(err => {
              console.log(err.message, "Error getting imagee url");
            });
        })
        .then(() => {})
        .catch(err => {
          console.log(err.message);
        });
    } else {
      const newPost = {
        city: city,
        from: from,
        userId: user._id,
      };
      try {
        axios
          .put(`/users/${user._id}`, newPost)
          .then(() => window.location.reload());
      } catch (error) {
        console.log(error, "Error posting");
      }
    }
  };

  return (
    <ModalContainer>
      <div className="modalHeader">
        <h2>Edit Profile</h2>
        <CloseIcon
          onClick={() => {
            setShowEdit(prev => !prev);
            setCity("");
            setFrom("");
            setProfilePic(null);
          }}
        />
      </div>
      <div className="modalForm">
        <p>City:</p>
        <input
          type="text"
          onChange={e => setCity(e.target.value)}
          value={city}
        />
        <p>From:</p>
        <input
          type="text"
          onChange={e => setFrom(e.target.value)}
          value={from}
        />
        <p>Display Photo:</p>
        <input
          type="file"
          onChange={e => {
            setProfilePic(e.target.files[0]);
          }}
          accept=".png, .jpg,.jpeg"
        />
      </div>
      <div className="btnContainer">
        <button className="primaryBtn" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </ModalContainer>
  );
};

export default Modal;

const ModalContainer = styled.div`
  position: fixed;
  height: 60vh;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 5000;
  background-color: #333333;
  width: 90%;
  max-width: 400px;
  padding: 20px;
  box-shadow: rgba(17, 17, 26, 0.05) 0px 4px 16px,
    rgba(17, 17, 26, 0.05) 0px 8px 32px;
  border-radius: 20px;

  .modalHeader {
    display: flex;
    justify-content: space-between;

    svg {
      cursor: pointer;
    }
  }

  .modalForm {
    padding: 12px;
    p {
      padding: 10px 0;
    }

    input {
      width: 99%;
      padding: 5px 10px;
      border-radius: 10px;
      border: none;
    }
  }

  .btnContainer {
    display: flex;
    justify-content: flex-end;
  }
  button {
    margin: auto;
    width: 90%;
  }
`;

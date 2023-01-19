import React, { useContext, useRef, useState } from "react";
import styled from "styled-components";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import { AuthContext } from "../context/AuthContext";
import storage from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import axios from "axios";
import uuid from "react-uuid";
import CancelIcon from "@mui/icons-material/Cancel";

const Share = () => {
  const { user } = useContext(AuthContext);
  const postRef = useRef();

  const caption = useRef();
  const [image, setImage] = useState(null);

  const handleSubmit = e => {
    e.preventDefault();
    if (image) {
      const imageRef = ref(storage, uuid());
      uploadBytes(imageRef, image)
        .then(() => {
          getDownloadURL(imageRef)
            .then(res => {
              const newPost = {
                description: caption.current.value,
                image: res,
                userId: user._id,
              };
              try {
                axios
                  .post("/posts/", newPost)
                  .then(() => window.location.reload());
              } catch (error) {
                console.log(error, "Error posting");
              }
            })
            .catch(err => {
              console.log(err.message, "Error getting imagee url");
            });
        })
        .catch(err => {
          console.log(err.message);
        });
    } else {
      const newPost = {
        description: caption.current.value,
        userId: user._id,
      };
      try {
        axios.post("/posts", newPost).then(() => window.location.reload());
      } catch (error) {
        console.log(error, "Error posting");
      }
    }
  };

  return (
    <>
      <ShareContainer onSubmit={handleSubmit}>
        <ShareUpper>
          <img src={user.displayPhoto || "/default.png"} />
          <textarea
            type="text"
            placeholder={`What's on your mind, ${user.username}?`}
            ref={caption}
          />
        </ShareUpper>
        <hr />
        {image && (
          <div className="shareImg">
            <img src={URL.createObjectURL(image)}></img>
            <CancelIcon
              className="shareCancel"
              onClick={() => setImage(null)}
            ></CancelIcon>
          </div>
        )}
        <ShareBottom>
          <div className="shareBottomIcons">
            <PhotoLibraryIcon htmlColor="forestgreen" />
            <label htmlFor="file">
              <span style={{ cursor: "pointer" }}>Photo/Video</span>
            </label>
            <input
              type="file"
              id="file"
              onChange={e => {
                setImage(e.target.files[0]);
              }}
              style={{ display: "none" }}
              accept=".png, .jpg,.jpeg"
              ref={postRef}
            />
          </div>
          <div className="shareBottomIcons">
            <button className="primaryBtn shareBtn">Post</button>
          </div>
        </ShareBottom>
      </ShareContainer>
    </>
  );
};

export default Share;

const ShareContainer = styled.form`
  width: 100%;
  background-color: #242526;
  border-radius: 10px;
  max-width: 500px;
  margin-bottom: 10px;
  hr {
    margin: 0 20px;
    border: none;
    border-top: 1px solid #3a3b3c;
    height: 1px;
  }

  .shareImg {
    width: 100%;
    display: flex;
    position: relative;
    margin-top: 10px;

    img {
      width: 100%;
      object-fit: cover;
    }

    .shareCancel {
      color: white;
      position: absolute;
      right: 10px;
      top: 10px;
      cursor: pointer;
    }
  }
`;

const ShareUpper = styled.div`
  padding: 20px;
  display: flex;
  img {
    width: 45px;
    height: 45px;
    object-fit: cover;
    border-radius: 50%;
    margin-right: 15px;
  }

  textarea {
    resize: none;
    width: 100%;
    border-radius: 20px;
    cursor: pointer;
    outline: none;
    border: none;
    background-color: #3a3b3c;
    padding: 10px;
    font-size: 16px;
    color: white;
    &::-webkit-scrollbar {
      width: 2px;
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
  }
`;

const ShareBottom = styled.div`
  display: flex;
  color: white;
  padding: 20px;
  justify-content: space-around;
  font-size: 14px;
  font-weight: 300;
  color: #b0b3b8;
  .shareBottomIcons {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  span {
    padding-left: 10px;
  }

  .shareBtn:disabled {
    background-color: lightgray;
    color: gray;
    cursor: not-allowed;
  }
`;

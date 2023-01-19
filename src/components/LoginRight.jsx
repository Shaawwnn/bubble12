import { useRef } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { CircularProgress } from "@mui/material";

const LoginRight = () => {
  const { isFetching, error, dispatch, user } = useContext(AuthContext);

  const loginCall = async (userCredentials, dispatch) => {
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("auth/login", userCredentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (error) {
      dispatch({ type: "LOGIN_FAIL", payload: error });
      alert(error.response.data);
    }
  };

  const email = useRef();
  const password = useRef();

  const handleSubmit = e => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };

  return (
    <LoginRightContainer>
      <LoginForm>
        <form className="formBox" onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" required ref={email} />
          <input
            type="password"
            placeholder="Password"
            required
            ref={password}
            minLength="6"
          />

          <button>
            {isFetching ? (
              <CircularProgress className="progress" size="20px" />
            ) : (
              "Log In"
            )}
          </button>
          <span>Forgot Password?</span>
          <hr />
          <Link className="register" to={"/register"}>
            <span>Create a new account</span>
          </Link>
        </form>
      </LoginForm>
    </LoginRightContainer>
  );
};

export default LoginRight;

const LoginRightContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`;

const LoginForm = styled.div`
  .formBox {
    height: 400px;
    width: 95vw;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    padding: 20px;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

    justify-content: space-evenly;

    input {
      padding: 18px;
      outline: none;
      border: 1px solid lightgray;
      font-size: 18px;
      border-radius: 10px;
    }

    button {
      background-color: #500050;
      color: white;
      border-radius: 10px;
      font-size: 20px;
      padding: 13px;
      font-weight: 500;
      border: none;
      cursor: pointer;

      &:hover {
        background-color: #2c032c;
      }
    }
    .register {
      text-decoration: none;
      background-color: #0077ff;
      align-self: center;
      width: 60%;
      font-size: 16px;
      padding: 14px;
      border-radius: 10px;
      user-select: none;
      display: flex;
      justify-content: center;
      span {
        color: white;
      }
      &:hover {
        background-color: #0253b1;
      }
    }
    span {
      text-align: center;
      cursor: pointer;
      color: #500050;
    }

    hr {
      margin: 10px 0;
    }

    .progress {
      color: white;
    }
  }
`;

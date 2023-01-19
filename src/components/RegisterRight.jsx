import { useRef, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

const RegisterRight = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const confirmUser = useRef();
  const email = useRef();
  const password = useRef();
  const confirmPass = useRef();

  const handleSubmit = async e => {
    e.preventDefault();

    if (password.current.value != confirmPass.current.value) {
      alert("Password do NOT match!");
      return;
    }

    const user = {
      username: username,
      email: email.current.value,
      password: password.current.value,
    };
    /// duplicate email and user
    try {
      const res = await axios.post("auth/register", user);
      if (res.data.code === 11000) {
        return alert("Username or Email already exists!");
      } else {
        navigate("/login");
        alert("Registration Succesful!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <LoginRightContainer>
      <LoginForm>
        <form className="formBox" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            onChange={e => setUsername(e.target.value)}
            required
            ref={confirmUser}
          />
          <input type="email" placeholder="Email" ref={email} required />
          <input
            type="password"
            placeholder="Password"
            ref={password}
            required
            minLength={6}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            ref={confirmPass}
            required
          />
          <button>Sign Up</button>
          <hr />
          <Link className="register" to={"/login"}>
            <span>Log In</span>
          </Link>
        </form>
      </LoginForm>
    </LoginRightContainer>
  );
};

export default RegisterRight;

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
      padding: 8px;
      outline: none;
      border: 1px solid lightgray;
      font-size: 16px;
      border-radius: 10px;
    }

    button {
      background-color: #500050;
      color: white;
      border-radius: 10px;
      font-size: 16px;
      padding: 8px;
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
        text-align: center;
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
  }
`;

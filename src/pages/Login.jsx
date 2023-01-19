import styled from "styled-components";
import LoginRight from "../components/LoginRight";

const Login = () => {
  return (
    <LoginContainer>
      <LoginBox>
        <LoginLeft>
          <h1>bubble</h1>
          <p>Connect with friends and the world around you on Bubble.</p>
        </LoginLeft>
        <LoginRight />
      </LoginBox>
    </LoginContainer>
  );
};

export default Login;

const LoginContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginBox = styled.div`
  width: 90%;
  height: 70%;
  display: flex;
  padding-left: 70px;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 950px) {
    width: 100%;
    flex-direction: column;
    padding-left: 0px;
  }
`;

const LoginLeft = styled.div`
  flex: 1;

  h1 {
    font-weight: 700;
    font-size: 50px;
    color: #500050;
  }

  p {
    font-size: 23px;
    letter-spacing: -1px;
    line-height: 35px;
    color: #242526;
    margin-bottom: 20px;
    max-width: 500px;
    padding: 10px;
  }

  @media screen and (max-width: 950px) {
    max-width: 400px;
    text-align: center;

    h1 {
      font-size: 40px;
      padding: 0;
    }
  }
`;

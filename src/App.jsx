import Main from "./pages/Main";
import { useContext, useState } from "react";
import Login from "./pages/Login";
import { Route, Routes, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import { AuthContext } from "./context/AuthContext";
import MainProfile from "./pages/MainProfile";

import UnderConstruction from "./pages/UnderConstruction";
import Messenger from "./pages/Messenger";

function App() {
  const { isFetching, user } = useContext(AuthContext);

  return (
    <Routes>
      <Route index path="/" element={!user ? <Login /> : <Main />}></Route>
      <Route
        path="/login"
        element={user ? <Navigate to={"/"} /> : <Login />}
      ></Route>
      <Route
        path="/register"
        element={user ? <Navigate to={"/"} /> : <Register />}
      />
      <Route
        path="/messenger"
        element={!user ? <Navigate to={"/login"} /> : <Messenger />}
      ></Route>
      <Route
        path="/profile/:username"
        element={user ? <MainProfile /> : <Navigate to={"/login"} />}
      ></Route>
      <Route path="*" element={<UnderConstruction />}></Route>
    </Routes>
  );
}

export default App;

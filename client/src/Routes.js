import React from "react";
import socket from "./services/socket";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

const Routes = () => {
  socket.emit("hello", "This is hello message");

  socket.emit(
    "user.register",
    {
      email: "example@google.com",
      password: "pass1234",
    },
    (response) => {
      console.log(response);
    }
  );

  return <SignIn />;
  return <SignUp />;
};

export default Routes;

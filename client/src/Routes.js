import React, { useEffect, useState } from "react";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Dashboard from "./pages/Dashboard";
import Landing from "./pages/Landing";
import socket from "./services/socket";

const Routes = () => {
  const [profile, setProfile] = useState(null);
  const [spinner, setSpinner] = useState(false);
  const [view, setView] = useState("landing");
  useEffect(() => {
    if (profile === null) {
      setSpinner(true);

      console.log("useEffect", profile);
      setTimeout(() => {
        setSpinner(false);
      }, 5000);
      if (profile === null && localStorage.getItem("jwt")) {
        socket.emit(
          "user.profile",
          {
            jwt: localStorage.getItem("jwt"),
          },
          (response) => {
            console.log("USER.PROFILE RESPONSE", response);
            if (response !== null) {
              setProfile(response.user);
              localStorage.setItem("jwt", response.token);
            }
            setSpinner(false);
          }
        );
      }
    }
  }, [profile]);

  if (profile === null) {
    if (view === "landing") {
      return <Landing setView={(val) => setView(val)} spinner={spinner} />;
    }
    if (view === "signin") {
      return (
        <SignIn
          home={() => {
            setView("landing");
          }}
          setProfile={(profile) => {
            setProfile(profile);
          }}
        />
      );
    }
    if (view === "register") {
      return (
        <SignUp
          home={() => {
            setView("landing");
          }}
          setProfile={(profile) => {
            setProfile(profile);
          }}
        />
      );
    }
  } else {
    return (
      <Dashboard
        logout={() => {
          setSpinner(false);
          socket.emit("user.logout", profile.id);
          setProfile(null);
          localStorage.setItem("jwt", null);
          setView("landing");
        }}
      />
    );
  }
};

export default Routes;

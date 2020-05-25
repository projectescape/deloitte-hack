import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Fab from "@material-ui/core/Fab";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import ArrowBack from "@material-ui/icons/ArrowBack";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import React, { useState } from "react";
import socket from "../services/socket";

export default function SignIn({ home, setProfile }) {
  const classes = useStyles();
  const [email, setEmail] = useState({
    error: false,
    errorMessage: "",
    value: "",
  });
  const [password, setPassword] = useState("");
  return (
    <>
      <div className={classes.backButton}>
        <Fab color="primary" aria-label="add" onClick={home}>
          <ArrowBack />
        </Fab>
      </div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form
            className={classes.form}
            onSubmit={(e) => {
              e.preventDefault();
              socket.emit(
                "user.login",
                {
                  password,
                  email: email.value,
                },
                (response) => {
                  if (response.success) {
                    localStorage.setItem("jwt", response.token);
                    setProfile(response.user);
                  } else {
                    setEmail((e) => {
                      return {
                        ...e,
                        error: true,
                        errorMessage: response.error,
                      };
                    });
                  }
                }
              );
            }}
          >
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email.value}
              helperText={email.errorMessage}
              error={email.error}
              onChange={(e) => {
                setEmail({
                  error: false,
                  errorMessage: "",
                  value: e.target.value,
                });
              }}
              type="email"
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password.value}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
          </form>
        </div>
      </Container>
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  backButton: {
    position: "absolute",
    marginLeft: theme.spacing(2),
  },
}));

import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "@material-ui/core/Container";

export default function Landing({ spinner, setView }) {
  const classes = useStyles();

  return (
    <>
      <Container component="main" maxWidth="xs" className={classes.container}>
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Welcome to Contactless Monitoring
          </Typography>
          <div className={classes.content}>
            {spinner && <CircularProgress />}
            {spinner || (
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  setView("signin");
                }}
              >
                Sign In
              </Button>
            )}
          </div>
          {spinner || (
            <div className={classes.content}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  setView("register");
                }}
              >
                Register
              </Button>
            </div>
          )}
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

  content: {
    // width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(2),
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  backButton: {
    position: "absolute",
    marginLeft: theme.spacing(2),
  },
}));

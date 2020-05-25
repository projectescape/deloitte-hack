import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Fab from "@material-ui/core/Fab";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import ArrowBack from "@material-ui/icons/ArrowBack";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import React, { useState } from "react";
import socket from "../services/socket";

export default function SignUp({ home, setProfile }) {
  const classes = useStyles();
  const [email, setEmail] = useState({
    error: false,
    errorMessage: "",
    value: "",
  });
  const [password, setPassword] = useState("");
  const [age, setAge] = useState(null);
  const [weight, setWeight] = useState(null);
  const [height, setHeight] = useState(null);
  const [sex, setSex] = useState("male");
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");

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
            Sign up
          </Typography>
          <form
            className={classes.form}
            onSubmit={(e) => {
              e.preventDefault();
              socket.emit(
                "user.register",
                {
                  password,
                  age,
                  weight,
                  height,
                  sex,
                  fName,
                  lName,
                  email: email.value,
                },
                (response) => {
                  console.log(response);
                  if (response.success) {
                    localStorage.setItem("jwt", response.token);
                    setProfile(response.user);
                  } else {
                    setEmail({
                      ...email,
                      error: true,
                      errorMessage: response.error,
                    });
                  }
                }
              );
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value={fName}
                  onChange={(e) => {
                    setFName(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                  value={lName}
                  onChange={(e) => {
                    setLName(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
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
                      helperText: "",
                      value: e.target.value,
                    });
                  }}
                  type="email"
                />
              </Grid>
              <Grid item xs={12}>
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
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  name="age"
                  variant="outlined"
                  required
                  fullWidth
                  id="age"
                  label="Age"
                  autoFocus
                  autoComplete="age"
                  type="number"
                  vale={age}
                  onChange={(e) => {
                    setAge(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl variant="outlined" fullWidth required>
                  <InputLabel id="demo-simple-select-outlined-label" required>
                    Sex
                  </InputLabel>
                  <Select
                    labelId="sex"
                    id="sex"
                    value={sex}
                    onChange={(e) => {
                      setSex(e.target.value);
                    }}
                    label="Sex"
                    required
                  >
                    <MenuItem value={"male"}>Male</MenuItem>
                    <MenuItem value={"female"}>Female</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="weight"
                  name="weight"
                  variant="outlined"
                  required
                  fullWidth
                  id="weight"
                  label="Weight(in Kg)"
                  autoFocus
                  type="number"
                  vale={weight}
                  onChange={(e) => {
                    setWeight(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="height"
                  label="Height(in cm)"
                  name="height"
                  autoComplete="height"
                  type="number"
                  vale={height}
                  onChange={(e) => {
                    setHeight(e.target.value);
                  }}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  backButton: {
    position: "absolute",
    marginLeft: theme.spacing(2),
  },
}));

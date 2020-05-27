import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import Snackbar from "@material-ui/core/Snackbar";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import GetAppIcon from "@material-ui/icons/GetApp";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MuiAlert from "@material-ui/lab/Alert";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import Chart from "../components/Chart";
import CurrentBox from "../components/CurrentBox";
import History from "../components/History";
import ListItems from "../components/ListItems";
import socket from "../services/socket";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function createData(arr, amount, amount1 = undefined) {
  if (arr.length < 15) return [...arr, { amount, amount1 }];
  arr.splice(0, 1);
  return [...arr, { amount, amount1 }];
}

export default function Dashboard({ logout }) {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const [view, setView] = useState("overview");
  const [heartData, setHeartData] = useState([{ amount: 0 }]);
  const [bloodData, setBloodData] = useState([{ amount: 0, amount1: 0 }]);
  const [breathData, setBreathData] = useState([{ amount: 0 }]);
  const [snackToggle, setSnackToggle] = useState(true);

  useEffect(() => {
    socket.on("heart.ping", (data) => {
      setHeartData((heartData) => createData(heartData, data));
    });

    socket.on("breath.ping", (data) => {
      setBreathData((breathData) => createData(breathData, data));
    });

    socket.on("blood.ping", (data) => {
      setBloodData((bloodData) => createData(bloodData, ...data));
    });
    return () => {
      socket.off("heart.ping");
      socket.off("breath.ping");
      socket.off("blood.ping");
    };
  }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            Dashboard
          </Typography>
          <IconButton
            color="inherit"
            onClick={() => {
              setSnackToggle((current) => !current);
            }}
          >
            <NotificationsIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <ListItems
          setView={(view) => {
            setView(view);
          }}
          view={view}
          logout={logout}
        />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* HEART RATE */}
            {(view === "overview" || view === "heart") && (
              <>
                <Grid item xs={8} lg={9}>
                  <Paper className={fixedHeightPaper}>
                    <Chart
                      title="Heart Rate"
                      yLabel="Beats/min"
                      data={heartData}
                    />
                  </Paper>
                </Grid>
                <Grid item xs={4} lg={3}>
                  <Paper className={fixedHeightPaper}>
                    <CurrentBox
                      title="Current Rate"
                      value={`${
                        heartData[heartData.length - 1].amount
                      } Beats/min`}
                      status={
                        heartData[heartData.length - 1].amount <= 85
                          ? "g"
                          : heartData[heartData.length - 1].amount <= 115
                          ? "y"
                          : "r"
                      }
                    />
                  </Paper>
                </Grid>
              </>
            )}
            {/* BREATHING RATE */}
            {(view === "overview" || view === "breath") && (
              <>
                <Grid item xs={8} lg={9}>
                  <Paper className={fixedHeightPaper}>
                    <Chart
                      title="Breathing Rate"
                      yLabel="Breaths/min"
                      data={breathData}
                    />
                  </Paper>
                </Grid>
                <Grid item xs={4} lg={3}>
                  <Paper className={fixedHeightPaper}>
                    <CurrentBox
                      title="Current Rate"
                      value={`${
                        breathData[breathData.length - 1].amount
                      }  Breaths/min`}
                      status={
                        breathData[breathData.length - 1].amount <= 25
                          ? "g"
                          : breathData[breathData.length - 1].amount <= 35
                          ? "y"
                          : "r"
                      }
                    />
                  </Paper>
                </Grid>
              </>
            )}
            {/* BLOOD PRESSURE */}
            {(view === "overview" || view === "blood") && (
              <>
                <Grid item xs={8} lg={9}>
                  <Paper className={fixedHeightPaper}>
                    <Chart
                      title="Blood Pressure"
                      yLabel="mmHg"
                      blood={true}
                      data={bloodData}
                    />
                  </Paper>
                </Grid>
                <Grid item xs={4} lg={3}>
                  <Paper className={fixedHeightPaper}>
                    <CurrentBox
                      title="Current Rate"
                      value={`${bloodData[bloodData.length - 1].amount} mmHg`}
                      value1={`${bloodData[bloodData.length - 1].amount1} mmHg`}
                      blood={true}
                      status={
                        bloodData[bloodData.length - 1].amount <= 120
                          ? "g"
                          : bloodData[bloodData.length - 1].amount <= 130
                          ? "y"
                          : "r"
                      }
                      status1={
                        bloodData[bloodData.length - 1].amount1 <= 80
                          ? "g"
                          : bloodData[bloodData.length - 1].amount1 <= 90
                          ? "y"
                          : "r"
                      }
                    />
                  </Paper>
                </Grid>
              </>
            )}
            {/* HISTORY */}
            {view !== "overview" && (
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <History
                    blood={view === "blood"}
                    title={view === "blood" ? "Systolic" : "BPM"}
                    view={view}
                  />
                </Paper>
              </Grid>
            )}
          </Grid>
        </Container>
      </main>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={snackToggle}
        onClose={() => {
          setSnackToggle(false);
        }}
        key="top-right"
      >
        <Alert
          onClose={() => {
            setSnackToggle(false);
          }}
          severity="info"
        >
          <div>
            Please download the complementary executable to make run this
            project
          </div>
          <Button
            variant="contained"
            color="default"
            className={classes.button}
            startIcon={<GetAppIcon />}
          >
            Download
          </Button>
        </Alert>
      </Snackbar>
    </div>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
  button: {
    margin: theme.spacing(1),
  },
}));

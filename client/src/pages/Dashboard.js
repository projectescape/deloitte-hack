import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ListItems from "../components/ListItems";
import Chart from "../components/Chart";
import CurrentBox from "../components/CurrentBox";
import History from "../components/History";
import socket from "../services/socket";

function createData(arr, amount, amount1 = undefined) {
  if (arr.length < 15) return [...arr, { amount, amount1 }];
  arr.splice(0, 1);
  return [...arr, { amount, amount1 }];
}

export default function Dashboard() {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const [view, setView] = useState("overview");
  const [heartData, setHeartData] = useState([
    { amount: 50, amount1: 60 },
    { amount: 70, amount1: 80 },
    { amount: 40, amount1: 30 },
  ]);
  const [bloodData, setBloodData] = useState([
    { amount: 50, amount1: 60 },
    { amount: 70, amount1: 80 },
    { amount: 40, amount1: 30 },
  ]);
  const [breathData, setBreathData] = useState([
    { amount: 50, amount1: 60 },
    { amount: 70, amount1: 80 },
    { amount: 40, amount1: 30 },
  ]);

  useEffect(() => {
    socket.on("heart.ping", (data) => {
      setHeartData((heartData) => createData(heartData, ...data));
    });

    socket.on("breath.data", (data) => {
      setBreathData((breathData) => createData(breathData, ...data));
    });

    socket.on("blood.data", (data) => {
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
        />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
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
                      value={`80 Beats/min`}
                      status={"y"}
                    />
                  </Paper>
                </Grid>
              </>
            )}
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
                      value={`80 Breaths/min`}
                      status={"r"}
                    />
                  </Paper>
                </Grid>
              </>
            )}
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
                      value={`80 BPM`}
                      value1={`75 BPM`}
                      blood={true}
                      status={"g"}
                      status1={"r"}
                    />
                  </Paper>
                </Grid>
              </>
            )}

            {view !== "overview" && (
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <History
                    blood={view === "blood"}
                    title={view === "blood" ? "Systolic(mmHg)" : "BPM"}
                  />
                </Paper>
              </Grid>
            )}
          </Grid>
        </Container>
      </main>
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
}));

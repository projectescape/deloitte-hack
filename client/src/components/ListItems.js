import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import FavoriteIcon from "@material-ui/icons/Favorite";
import InvertColorsIcon from "@material-ui/icons/InvertColors";
import RecordVoiceOverIcon from "@material-ui/icons/RecordVoiceOver";
import React from "react";

export default function ListItems({ setView, view, logout }) {
  return (
    <>
      <List>
        <div>
          <ListItem
            button
            selected={view === "overview" ? true : false}
            onClick={() => setView("overview")}
          >
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Overview" />
          </ListItem>
          <ListItem
            button
            selected={view === "heart" ? true : false}
            onClick={() => setView("heart")}
          >
            <ListItemIcon>
              <FavoriteIcon />
            </ListItemIcon>
            <ListItemText primary="Heart Rate" />
          </ListItem>
          <ListItem
            button
            selected={view === "blood" ? true : false}
            onClick={() => setView("blood")}
          >
            <ListItemIcon>
              <InvertColorsIcon />
            </ListItemIcon>
            <ListItemText primary="Blood Pressure" />
          </ListItem>
          <ListItem
            button
            selected={view === "breath" ? true : false}
            onClick={() => setView("breath")}
          >
            <ListItemIcon>
              <RecordVoiceOverIcon />
            </ListItemIcon>
            <ListItemText primary="Respiratory Rate" />
          </ListItem>
        </div>
      </List>
      <List>
        <Divider />
        <div>
          <ListItem button onClick={logout}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </div>
      </List>
    </>
  );
}

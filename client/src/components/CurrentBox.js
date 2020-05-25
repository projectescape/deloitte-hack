import { makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";
import Title from "./Title";

export default function CurrentBox({
  value,
  value1,
  title,
  status = "y",
  status1,
  blood = false,
}) {
  const theme = useTheme();

  const classes = useStyles();
  return (
    <React.Fragment>
      <Title color={theme.palette.info.main}>{title}</Title>
      <Typography component="p" variant="h4">
        {value}
      </Typography>
      <Typography
        style={{
          color:
            status === "y"
              ? theme.palette.warning.main
              : status === "r"
              ? theme.palette.error.main
              : theme.palette.text.secondary,
        }}
        className={classes.depositContext}
      >
        {blood && (
          <span
            style={{
              color: theme.palette.info.main,
              display: "block",
            }}
          >
            Systolic
          </span>
        )}
        {status === "y"
          ? "Slightly High"
          : status === "r"
          ? "Check Immediately"
          : "Normal"}
      </Typography>

      {blood && (
        <>
          <Typography component="p" variant="h4">
            {value1}
          </Typography>
          <Typography
            style={{
              color:
                status1 === "y"
                  ? theme.palette.warning.main
                  : status1 === "r"
                  ? theme.palette.error.main
                  : theme.palette.text.secondary,
            }}
            className={classes.depositContext}
          >
            {blood && (
              <span
                style={{
                  color: theme.palette.success.main,
                  display: "block",
                }}
              >
                Diastolic
              </span>
            )}
            {status1 === "y"
              ? "Slightly High"
              : status1 === "r"
              ? "Check Immediately"
              : "Normal"}
          </Typography>
        </>
      )}
    </React.Fragment>
  );
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

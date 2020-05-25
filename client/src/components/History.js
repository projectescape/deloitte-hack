import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import React, { useEffect, useState } from "react";
import socket from "../services/socket";
import Title from "./Title";

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function History({ title, blood, view }) {
  // const classes = useStyles();
  const [data, setData] = useState([]);
  // const [params, setParams] = useState({
  //   offset: 0,
  //   pending: false,
  // });

  useEffect(() => {
    socket.emit(
      `${view}.fetch`,
      {
        jwt: localStorage.getItem("jwt"),
      },
      (response) => {
        setData(response.data);
        // setParams(response.params);
      }
    );
    return () => {
      setData([]);
      // setParams({
      //   offset: 0,
      //   pending: false,
      // });
    };
  }, [view]);

  return (
    <React.Fragment>
      <Title>History</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Time</TableCell>
            <TableCell>{`${title} Avg`}</TableCell>
            <TableCell>{`${title} Max`}</TableCell>
            <TableCell>{`${title} Min`}</TableCell>
            {blood && (
              <>
                <TableCell>Diastolic Avg</TableCell>
                <TableCell>Diastolic Max</TableCell>
                <TableCell>Diastolic Min</TableCell>
              </>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell> {row.createdAt} </TableCell>
              <TableCell> {row.avg} </TableCell>
              <TableCell> {row.max} </TableCell>
              <TableCell> {row.min} </TableCell>
              {blood && (
                <>
                  <TableCell> {row.avg1} </TableCell>
                  <TableCell> {row.max1} </TableCell>
                  <TableCell> {row.min1} </TableCell>
                </>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* {params.pending && (
        <div className={classes.seeMore}>
          <Link color="primary" href="#" onClick={preventDefault}>
            See more history
          </Link>
        </div>
      )} */}
    </React.Fragment>
  );
}

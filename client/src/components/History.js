import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import moment from "moment";
import React, { useEffect, useState } from "react";
import socket from "../services/socket";
import Title from "./Title";

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function History({ title, blood, view }) {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [params, setParams] = useState({
    offset: 0,
    total: 0,
  });

  useEffect(() => {}, [params]);

  useEffect(() => {
    socket.emit(
      `${view}.fetch`,
      {
        jwt: localStorage.getItem("jwt"),
        offset: 0,
      },
      (response) => {
        setData(response.data);
        setParams({
          offset: 10,
          total: response.total,
        });
      }
    );
    socket.on(`${view}.fetch.ping`, (ping) => {
      setData((data) => [ping, ...data]);
      setParams((params) => ({
        offset: params.offset + 1,
        total: params.total + 1,
      }));
    });

    return () => {
      socket.off(`${view}.fetch.ping`);
      setData([]);

      setParams({
        offset: 0,
        total: 0,
      });
    };
  }, [view]);

  return (
    <React.Fragment>
      <Title>History</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Time</TableCell>
            <TableCell>Date</TableCell>
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
              <TableCell>{moment(row.createdAt).format("h:mm a")}</TableCell>
              <TableCell>{moment(row.createdAt).format("D/M/YY")}</TableCell>
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
      {params.offset < params.total && (
        <div className={classes.seeMore}>
          <Link
            color="primary"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              socket.emit(
                `${view}.fetch`,
                {
                  jwt: localStorage.getItem("jwt"),
                  offset: params.offset,
                },
                (response) => {
                  setData([...data, ...response.data]);
                  setParams({
                    offset: params.offset + 10,
                    total: response.total,
                  });
                }
              );
            }}
          >
            See more history
          </Link>
        </div>
      )}
    </React.Fragment>
  );
}

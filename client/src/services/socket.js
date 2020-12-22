import io from "socket.io-client";

const socket =
  process.env.NODE_ENV === "development" ? io("localhost:5000") : io();

export default socket;

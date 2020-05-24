import io from "socket.io-client";

const socket =
  process.env.NODE_ENV === "development" ? io("http://127.0.0.1:5000") : io();

export default socket;

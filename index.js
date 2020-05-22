var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);
require("dotenv").config();

// Test Route
app.get("/test", (req, res) => {
  res.send("Hello");
});

// Socket management
require("./routes/socket")(io);

// Send react app if in prod
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// Get port from env
const PORT = process.env.PORT || 5000;

// Start the server
http.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT}`);
});

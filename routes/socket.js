const { User } = require("../services/db");
const { hash, compare } = require("bcrypt");

module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("a user connected");

    // User Login
    socket.on("user.login", (data) => {
      //   Check if details are right, password correct
      User.findOne({
        where: {
          email: data.email,
        },
        raw: true,
      }).then((user) => {
        if (user === null) {
          // No such user
          console.log("User not found");
        } else {
          // User found
          console.log("User found with this email");
          compare(data.password, user.password, (e, result) => {
            console.log("hash === password is ", result);
          });
        }
      });
    });

    // User Register
    socket.on("user.register", (data) => {
      // Check if user doesn't already exists in the database
      User.findOne({
        where: {
          email: data.email,
        },
        raw: true,
      }).then((res) => {
        if (res === null) {
          // Can create
          console.log("Creating User");
          hash(data.password, parseInt(process.env.SALT_ROUNDS), (e, hash) => {
            console.log(data.password, " hashed is ", hash);
            User.create({
              email: data.email,
              password: hash,
            }).then(({ dataValues }) => {
              console.log(dataValues);
            });
          });
        } else {
          // Email already exists
          console.log("Email already registered");
        }
      });
    });

    socket.on("disconnect", () => {
      console.log("User is disconnected");
    });
  });
};

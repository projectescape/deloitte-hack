const { User } = require("../services/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("a user connected");

    // User Login
    socket.on("user.login", (data, respond) => {
      //   Check if details are right, password correct
      User.findOne({
        where: {
          email: data.email,
        },
        raw: true,
      }).then((user) => {
        if (user === null) {
          // No such user found
        } else {
          // User found
          bcrypt.compare(data.password, user.password, (e, result) => {
            if (result) {
              delete user.password;
              socket.join(user.id);
              // Return jwt,user
              jwt.sign(
                user,
                process.env.JWT_SECRET,
                { algorithm: "HS256" },
                (err, token) => {
                  respond({
                    sucess: true,
                    token,
                    user,
                  });
                }
              );
            } else {
              // Manage wrong password
              respond({
                sucess: false,
                error: "Wrong username/pasword",
              });
            }
          });
        }
      });
    });

    // User Register
    socket.on("user.register", (data, respond) => {
      // Check if user doesn't already exists in the database
      User.findOne({
        where: {
          email: data.email,
        },
        raw: true,
      }).then((res) => {
        if (res === null) {
          // Can create
          bcrypt.hash(
            data.password,
            parseInt(process.env.SALT_ROUNDS),
            (e, hash) => {
              User.create({
                email: data.email,
                password: hash,
              }).then(({ dataValues }) => {
                delete dataValues.password;
                socket.join(dataValues.id);
                jwt.sign(
                  dataValues,
                  process.env.JWT_SECRET,
                  { algorithm: "HS256" },
                  (err, token) => {
                    respond({
                      sucess: true,
                      token,
                      user: dataValues,
                    });
                  }
                );
              });
            }
          );
        } else {
          // Email already exists
          respond({
            success: false,
            error: "Email already exists",
          });
        }
      });
    });

    socket.on("disconnect", () => {
      console.log("User is disconnected");
    });
  });
};

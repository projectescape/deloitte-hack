const Sequelize = require("sequelize");

const logEnable =
  process.env.NODE_ENV === "development" ? {} : { logging: false };

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  define: {
    timestamps: true,
  },
  ...logEnable,
});

const User = sequelize.define(
  "user",
  {
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    indexes: [{ unique: true, fields: ["email"] }],
  }
);

// sequelize.sync({ force: true });

module.exports = { User };

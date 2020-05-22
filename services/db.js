const Sequelize = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  define: {
    timestamps: true,
  },
  logging: false,
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

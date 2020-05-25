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
    sex: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    fName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    age: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    weight: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    height: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  {
    indexes: [{ unique: true, fields: ["email"] }],
  }
);

const Blood = sequelize.define("blood", {
  avg: { type: Sequelize.FLOAT, allowNull: false },
  min: { type: Sequelize.FLOAT, allowNull: false },
  max: { type: Sequelize.FLOAT, allowNull: false },
  avg1: { type: Sequelize.FLOAT, allowNull: false },
  min1: { type: Sequelize.FLOAT, allowNull: false },
  max1: { type: Sequelize.FLOAT, allowNull: false },
});
const Heart = sequelize.define("heart", {
  avg: { type: Sequelize.FLOAT, allowNull: false },
  min: { type: Sequelize.FLOAT, allowNull: false },
  max: { type: Sequelize.FLOAT, allowNull: false },
});
const Breath = sequelize.define("breath", {
  avg: { type: Sequelize.FLOAT, allowNull: false },
  min: { type: Sequelize.FLOAT, allowNull: false },
  max: { type: Sequelize.FLOAT, allowNull: false },
});

User.hasMany(Blood, {
  foreignKey: "userID",
});
User.hasMany(Heart, {
  foreignKey: "userID",
});
User.hasMany(Breath, {
  foreignKey: "userID",
});
Blood.belongsTo(User, {
  foreignKey: "userID",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Heart.belongsTo(User, {
  foreignKey: "userID",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Breath.belongsTo(User, {
  foreignKey: "userID",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

// sequelize.sync({ force: true });
sequelize.sync();

module.exports = { User, Blood, Breath, Heart };

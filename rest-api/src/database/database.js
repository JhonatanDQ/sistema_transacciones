import Sequelize from "sequelize";

export const sequelize = new Sequelize(
  "transaccionesdb", // db name,
  "postgres", // username
  "1234", // password
  {
    host: "localhost",
    dialect: "postgres",

  }
);
import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  logging: false,
});
sequelize.authenticate().then(() => {
  console.log("Connection to PostgreSQL has been established succesfully.");
});

export default sequelize;

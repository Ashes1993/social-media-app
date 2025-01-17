import express from "express";
import dotenv from "dotenv";
import sequelize from "./sequelize.js";
import profile from "./routes/profile.js";
import auth from "./routes/auth.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Database and Sync Models
sequelize
  .sync({ force: true })
  .then(() => {
    console.log("Database & Tables created!");
  })
  .catch((err) => {
    console.error("Unable to create tables:", err);
  });

// Init Middleware
app.use(express.json({ extended: false }));

//Define Routes
app.use("/api/auth", auth);
app.use("/api/profile", profile);

app.get("/", (req, res) => {
  res.send("Social Media Platform Backend");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

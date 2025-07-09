import express, { Express } from "express";
import cors from "cors";
const cookieParser = require("cookie-parser");
import connection from "./config/mongodb";
import dotenv from "dotenv";
dotenv.config();

import userRoute from "./routes/userRoute";
import areaRoute from "./routes/areaRoutes";

const app: Express = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:8081", 
  credentials: true               
}));

app.use("/api/user", userRoute);
app.use("/api/area", areaRoute);

const PORT = process.env.PORT || 8080;

connection()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`app running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to DB:", err);
  });

// add cors
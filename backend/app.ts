import express, { Express } from "express";
import cors from "cors";
const cookieParser = require("cookie-parser");
import connection from "./config/mongodb";
import dotenv from "dotenv";
dotenv.config();

import userRoutes from "./routes/userRoutes";
import areaRoutes from "./routes/areaRoutes";
import residentRoutes from "./routes/residentRoutes";

const app: Express = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:8081", 
  credentials: true               
}));

app.use("/api/users", userRoutes);
app.use("/api/areas", areaRoutes);
app.use("/api/residents", residentRoutes);

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

export default app
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";

//app config
const app = express();
const PORT = process.env.PORT || 5000;

//middleware
app.use(express.json()); // Parse JSON bodies from incoming requests
app.use(cors());   // acess backend from frontend

import dotenv from "dotenv";
dotenv.config();
//db connection
connectDB();

//api endpoints
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads")); // to access images from frontend
//routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

//listen the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
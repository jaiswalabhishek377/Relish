import "dotenv/config";
import express from "express";
import cors from "cors";

import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

//app config
const app = express();
const PORT = process.env.PORT || 5000;

//middleware
app.use(express.json()); // Parse JSON bodies from incoming requests
app.use(cors());   // acess backend from frontend

//db connection
connectDB();

//api endpoints
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads")); // to access images from frontend
app.use("/api/user", userRouter); // to access user routes from frontend
app.use("/api/cart", cartRouter); // to access cart routes from frontend
app.use("/api/order", orderRouter); // to access order routes from frontend


//routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

//listen the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
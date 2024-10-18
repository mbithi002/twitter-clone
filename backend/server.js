// packages
import { v2 as cloudinary } from "cloudinary";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";

// routes
import authRoutes from "./routes/auth-routes.js";
import postRoutes from "./routes/post-routes.js";
import userRoutes from "./routes/user-routes.js";

// utility func
import connectMongoDB from "./db/connectMognoDb.js";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

app.get("/", (req, res) => {
  res.json({
    data: "Welcome!",
  });
});

app.listen(Number(process.env.PORT || 5000), () => {
  console.log(
    `Server is running at port : ${Number(process.env.PORT) || 5000}`
  );
  connectMongoDB();
});

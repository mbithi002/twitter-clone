// packages
import { v2 as cloudinary } from "cloudinary";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";

// routes
import authRoutes from "./routes/auth-route.js";
import notificationRoutes from "./routes/notification-route.js";
import postRoutes from "./routes/post-route.js";
import userRoutes from "./routes/user-route.js";

// utility func
import connectMongoDB from "./db/connectMognoDb.js";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const app = express();

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/notifications", notificationRoutes);

// app.get("/", (req, res) => {
//   res.json({
//     data: "Welcome!",
//   });
// });

app.listen(Number(process.env.PORT || 5000), () => {
  console.log(
    `Server is running at port : ${Number(process.env.PORT) || 5000}`
  );
  connectMongoDB();
});

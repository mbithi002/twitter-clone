import dotenv from "dotenv";
import express from "express";
import connectMongoDB from "./db/connectMognoDb.js";
import authRoutes from "./routes/auth-routes.js";

dotenv.config();
const app = express();

app.use("/api/auth", authRoutes);

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

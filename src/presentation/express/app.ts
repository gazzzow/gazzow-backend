import express from "express";
import cors from "cors";
import cookieParser from 'cookie-parser';
import userRoutes from "../routes/user/user-routes.js";
import adminRoutes from "../routes/admin/admin-routes.js";

const app = express();

app.use(cookieParser())
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());



app.use("/api/", userRoutes);
app.use("/api/admin", adminRoutes);

export default app;

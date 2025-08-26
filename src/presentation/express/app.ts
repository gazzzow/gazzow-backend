import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Router } from "express";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const userRouter = Router();
const adminRouter = Router();

userRouter.get("/", (req, res) => {
  console.log("api hit on server");
  res.send("Hello world");
});

adminRouter.get("/", (req, res) => {
  console.log("Admin api got hit");
  res.send("Hello world from admin");
});

// Routes

app.use("/api", userRouter);
app.use("/api/admin", adminRouter);

export default app;

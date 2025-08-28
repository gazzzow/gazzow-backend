import { Router } from "express";

const router = Router();

router.get("/login", (req, res) => {
  console.log("admin login api hit");
  res.send("Admin login api");
});

export default router;

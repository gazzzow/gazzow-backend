import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import userRoutes from '../routes/user/user-routes.js'
import adminRoutes from '../routes/admin/admin-routes.js'


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/', userRoutes)
app.use('/api/admin', adminRoutes)


export default app;

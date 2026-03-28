import 'dotenv/config';
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import resumeRoutes from "./routes/resumeRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();
app.use(express.json());
app.use(cors());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);

app.listen(process.env.PORT, () => {
    console.log("Server running on port process.env.PORT");
});
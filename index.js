import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./Database/config.js";
import authRoutes from "./Routes/auth.routes.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth",authRoutes);

app.listen(process.env.PORT, () => 
    console.log(`Server running on port ${process.env.PORT}`)  
);
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import HouseRouter from "./routes/house.route.js";
import OwnerRouter from "./routes/owner.route.js";
import TenantRouter from "./routes/tenant.route.js";
import AuthRouter from "./routes/auth.route.js";

const app = express();

const corsOption = {
  origin: true, // This allows all origins
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
};

app.use(cors(corsOption));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/auth", AuthRouter);
app.use("/api/v1/house", HouseRouter);
app.use("/api/v1/owner", OwnerRouter);
app.use("/api/v1/tenant", TenantRouter);

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Ashrey Is Working..");
});

app.listen(PORT, () => {
  console.log("Server is Listen On PORT: ", PORT);
});

import dotenv from "dotenv"
dotenv.config();

import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"

const app = express();

const corsOption = {
  origin: true, // This allows all origins
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
};

app.use(cors(corsOption))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Ashrey Is Working..");
});

app.listen(PORT, () => {
  console.log("Server is Listen On PORT: ", PORT);
});
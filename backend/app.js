import express from "express";
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.routes.js";
import dataRoutes from "./routes/data.routes.js";
import contentRoutes from "./routes/content.routes.js"

dotenv.config();
const app = express();

const PORT = process.env.PORT || 5000;

// Helemt: API Security
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

// CORS: Handle CORS Error
app.use(cors());
app.use(morgan("dev"));

// MongoDB Connection
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

if (process.env.NODE_ENV !== "PRODUCTION") {
  const db = mongoose.connection;
  db.on("open", () => {
    console.log("Mongodb database is conneted");
  });

  db.on("error", (error) => {
    console.log(error);
  });

  //Logger
  app.use(morgan("tiny"));
}

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res, next) => {
  res.json({ message: "Server Started Successfully..." });
});

app.use("/user", userRoutes);
app.use("/data", dataRoutes);
app.use("/content", contentRoutes);

app.use(async (req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use(async (err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

app.listen(PORT, console.log(`Server running on port ${PORT}...`));

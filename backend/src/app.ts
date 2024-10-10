import express from "express";
import cors from "cors";
import helmet from "helmet";
import { getRateLimiter } from "./utils/rateLimiter";
import config from "./config";
import { router } from "./api/routes";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.urlencoded({ extended: true, limit: "30mb" }));
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(
  cors({
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.set("trust proxy", 1);
app.use(getRateLimiter({ limitRequests: 100, timeGap: 15 }));

app.use(router);

app.use("*", (_, res) => {
  res.status(404);
  res.send({ error: "Please get out of here!" });
});

const PORT = config.port;

try {
  app.listen(PORT, async () => {
    console.log(`Server running on localhost:${PORT}`);

  });
} catch (error) {
  console.log(`Error occurred to run the server: ${error.message as string}`);
}

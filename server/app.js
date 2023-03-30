require('dotenv').config();
import express from "express";
const app = express();
import bodyParser from "body-parser";
import { Logger } from "./utils/Logger";
import routes from "./routes/routes";
import cors from "cors";

const PORT = process.env.PORT || 9000;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/v1", routes);

app.get("/", (req, res) => {
  res.send("<h1>Accommodation Server</h1>");
});

app.listen(PORT, () => {
 Logger("APP LISTENER", `Server started on port ${PORT}`)
});


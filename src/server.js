import "dotenv/config";
import express, { json } from "express";
import { log, error } from "node:console";
import { getHandler } from "./logic.js";

const path = process.env.PORT ?? 8000;
let app = express();
app.use(express.json());

app.get("/", getHandler, (req, res) => {
  if (req.userRequest) {
    res.send(req.userRequest);
  } else {
    res.send("something went wrong");
  }
});

app.use((err, req, res, next) => {
  console.error("Caught by Express:", err);
  res.status(500).send("Something broke");
});

app.listen(path, () => {
  log(`server is up and running on http://localhost:${path}`);
});

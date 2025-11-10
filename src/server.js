import "dotenv/config";
import express, { json } from "express";
import { log, error } from "node:console";
import {
  getHandler,
  postHandler,
  updateHandler,
  deleteHandler,
} from "./logic.js";

const path = process.env.PORT ?? 8000;
let app = express();
app.use(express.json());

app.post("/", postHandler, (req, res) => {
  res.send(
    `the data:${JSON.stringify(req.modifiedData)} have been posted`
  );
});

app.get("/:id", getHandler, (req, res) => {
  res.send(req.userRequest);
});

app.patch("/:id", updateHandler, (req, res) => {
  res.send(
    `the data id:${
      req.params.id
    } have been updated with ${JSON.stringify(req.updatedBook)}`
  );
});

app.delete("/:id", deleteHandler, (req, res) => {
  res.send(`the data id:${req.params.id} have been deleted`);
});

app.use((err, req, res, next) => {
  console.error("Caught by Express:", err);
  res.status(500).send(`${err}`);
});

app.listen(path, () => {
  log(`server is up and running on http://localhost:${path}`);
});

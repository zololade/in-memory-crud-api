import "dotenv/config";
import express, { json } from "express";
import { log, error } from "node:console";
import { getHandler, postHandler, updateHandler } from "./logic.js";

const path = process.env.PORT ?? 8000;
let app = express();
app.use(express.json());

app.post("/", postHandler, (req, res) => {
  if (req.body) {
    res.send(
      `the data:${JSON.stringify(req.modifiedData)} have been posted`
    );
  } else {
    res.send(`something is wrong`);
  }
});

app.get("/:id", getHandler, (req, res) => {
  if (req.userRequest) {
    res.send(req.userRequest);
  } else {
    res.send("something went wrong");
  }
});

app.patch("/:id", updateHandler, (req, res) => {
  if (req.body) {
    res.send(
      `the data id:${
        req.params.id
      } have been updated with ${JSON.stringify(req.dataUnderReview)}`
    );
  } else {
    res.send(`something is wrong`);
  }
});

app.use((err, req, res, next) => {
  console.error("Caught by Express:", err);
  res.status(500).send(`${err}`);
});

app.listen(path, () => {
  log(`server is up and running on http://localhost:${path}`);
});

import "dotenv/config";
import express, { json } from "express";
import cors from "cors";
import { log, error } from "node:console";
import {
  getHandler,
  postHandler,
  updateHandler,
  deleteHandler,
} from "./middleware/logic.js";
import schema from "./middleware/validation.js";
import { BooksId, PostObj } from "./schma/schema.js";

const port = process.env.PORT ?? 8000;
let app = express();
app.use(express.json());
app.use(cors());
app.post(
  "/books",
  schema(PostObj, "body"),
  postHandler,
  (req, res) => {
    res.send(
      `the data:${JSON.stringify(req.modifiedData)} have been posted`
    );
  }
);

app.get(
  "/books/:id",
  schema(BooksId, "params"),
  getHandler,
  (req, res) => {
    res.send(req.userRequest);
  }
);

app.patch(
  "/books/:id",
  schema(BooksId, "params"),
  updateHandler,
  (req, res) => {
    res.send(
      `the data id:${
        req.params.id
      } have been updated with ${JSON.stringify(req.updatedBook)}`
    );
  }
);

app.delete(
  "/books/:id",
  schema(BooksId, "params"),
  deleteHandler,
  (req, res) => {
    res.status(204).end();
  }
);

app.use((err, req, res, next) => {
  const status = err.message?.includes("not found") ? 404 : 400;
  error("Caught by Express:", err.message);
  res.status(status).json({ error: err.message });
});

app.listen(port, () => {
  log(`Server running → http://localhost:${port}`);
});

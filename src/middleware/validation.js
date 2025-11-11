import { log } from "node:console";
import { ZodError } from "zod";
export default function schema(schema, target = "body") {
  return function (req, res, next) {
    try {
      const result = schema.parse(req[target]);
      req[target] = result;
    } catch (error) {
      if (error instanceof ZodError) {
        return res
          .status(400)
          .json({ error: "Invalid data", details: error.issues });
      }
      return res.status(500).json({ error: "Internal Server Error" });
    }

    next();
  };
}

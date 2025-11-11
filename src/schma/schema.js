import { z } from "zod";

const BooksId = z.object({
  id: z
    .string() // raw "1,3"
    .transform((val) => val.split(",").map(Number)) // transform to [1, 3]
    .pipe(z.array(z.number().int().positive())), // validate each number
});

const PostObj = z.object({
  title: z.coerce.string(),
  author: z.coerce.string(),
  year: z.coerce.number().int().positive(),
  genre: z.coerce.string(),
});
export { BooksId, PostObj };

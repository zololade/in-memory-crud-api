import { log, error } from "node:console";
import books from "../../DATABASE/books.js";

/*
###RESTful api logic/middleware and their corresponding api###
*/
//create
//use post
export function postHandler(req, res, next) {
  // validate data
  let incomingData = req.body;
  if (!incomingData.title || incomingData.title === "") {
    throw new Error("empty book title");
  }
  //new Id
  incomingData.id = books.length ? books[books.length - 1].id + 1 : 1;
  //   expected data body
  req.modifiedData = {
    id: incomingData.id,
    title: incomingData.title,
    author: incomingData.author?.trim() || "unknown",
    year: incomingData.year || "unknown",
    genre: incomingData.genre?.trim() || "unknown",
  };

  // add and return data
  books.push(req.modifiedData);
  next();
}

//read
//use get
export function getHandler(req, res, next) {
  let userRequestId = req.params.id;

  if (!userRequestId) throw new Error("Query Id was not specified");

  if (userRequestId.length === 1) {
    req.userRequest = books[userRequestId[0] - 1];

    next();
  } else {
    req.userRequest = [];

    for (let value of userRequestId) {
      if (isNaN(value))
        throw new Error("An Id that is not a number was encountered");
      if (!books[value - 1]) {
        req.userRequest.push(`data not found for Id:${value}`);
      } else {
        req.userRequest.push(books[value - 1]);
      }
    }
    next();
  }
}

//update
//use update
export function updateHandler(req, res, next) {
  const incomingId = parseInt(req.params.id);
  const index = books.findIndex((item) => item.id === incomingId);

  if (index === -1) throw new Error("Book not found");
  const incomingBody = req.body;
  books[index] = { ...books[index], ...incomingBody };

  req.updatedBook = books[index];
  next();
}

//delete
//use delete
export function deleteHandler(req, res, next) {
  let userRequestId = req.params.id;
  log(userRequestId);
  let filteredBooks = books.filter(
    (item) => !userRequestId.includes(item.id)
  );
  books.length = 0; // empty the array
  books.push(...filteredBooks); // add new elements

  // update id
  books.forEach((item, index) => {
    item.id = index + 1;
  });
  log(books);

  next();
}

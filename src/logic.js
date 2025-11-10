import { log, error } from "node:console";
import books from "../DATABASE/books.js";

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
  let userRequestId = req.query.id;
  log(userRequestId);
  if (!userRequestId) throw new Error("Query Id was not specified");
  if (!Array.isArray(userRequestId)) {
    req.userRequest = books[userRequestId - 1];
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

//delete
//use delete

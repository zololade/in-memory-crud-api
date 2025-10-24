import { log, error } from "node:console";
import books from "../DATABASE/books.js";

/*
###RESTful api logic/middleware and their corresponding api###
*/
//create
//use post

//read
//use get
export function getHandler(req, res, next) {
  let userRequestId = req.query.id;
  console.log(userRequestId);
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

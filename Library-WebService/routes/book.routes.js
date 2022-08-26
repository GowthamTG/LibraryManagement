const express = require("express");

const bookRouter = express.Router();
const bookController = require("../controllers/books.controller");

bookRouter.post("/based-on-condition", (req, res, next) => {
  bookController
    .findAllWithConditions(req, res)
    .then((response) => res.send(response))
    .catch((error) => next(error));
});

bookRouter.post("/add-book", (req, res, next) => {
  bookController
    .addBook(req.body)
    .then((response) => res.send({ response: response, message: "SUCCESS" }))
    .catch((error) => next(error));
});

module.exports = bookRouter;

const express = require("express");

const bookRouter = express.Router();
const bookController = require("../controllers/books.controller");

bookRouter.post("/based-on-condition", (req, res, next) => {
  bookController
    .findAllWithConditions(req, res)
    .then((response) => res.send(response))
    .catch((error) => next(error));
});

module.exports = bookRouter;

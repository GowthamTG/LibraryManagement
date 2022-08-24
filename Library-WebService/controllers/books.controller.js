const collection = require("../models/DB/connection");
const { COLLECTION_NAME } = require("../keys/constant");

var crypto = require("crypto");

const booksModel = {};

const getPagination = (page, size) => {
  const limit = size ? +size : 10;
  const offset = page ? page * limit : 0;
  return { limit, offset };
};

booksModel.findAllWithConditions = (req, res) => {
  const { page, size, title, author, subject, dateFrom, dateTo } = req.query;
  var titleVal = title ? { $regex: new RegExp(title), $options: "i" } : {};
  var authorVal = author ? { $regex: new RegExp(author), $options: "i" } : {};
  var subjectVal = subject
    ? { $regex: new RegExp(subject), $options: "i" }
    : {};
  var startDate = new Date("0000-01-01T00:00:00.000Z");
  var endDate = new Date();
  if (dateFrom) {
    startDate = new Date(dateFrom);
  }
  if (dateTo) {
    endDate = new Date(dateTo);
  }
  var dateVal = {
    publishedDate: {
      $gte: startDate,
      $lt: endDate,
    },
  };

  const { limit, offset } = getPagination(page, size);
  return collection
    .getCollection(COLLECTION_NAME.BOOKS)
    .paginate({}, { offset, limit })
    .then((data) => {
      res.send({
        totalItems: data.totalDocs,
        books: data.docs,
        totalPages: data.totalPages,
        currentPage: data.page - 1,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};

exports.findAllBooksPublished = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  return collection
    .getCollection(COLLECTION_NAME.BOOKS)
    .paginate({ published: true }, { offset, limit })
    .then((data) => {
      res.send({
        totalItems: data.totalDocs,
        books: data.docs,
        totalPages: data.totalPages,
        currentPage: data.page - 1,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};

module.exports = booksModel;

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
  console.log(req.body);
  var condition = {};
  const { page, size, title, author, subject, dateFrom, dateTo, sortYear } =
    req.body;
  console.log(author);
  // "/The/"
  var titleVal = title ? { $regex: new RegExp(title), $options: "i" } : {};
  var authorVal = author ? { $regex: new RegExp(author), $options: "i" } : {};
  var subjectVal = subject
    ? { $regex: new RegExp(subject), $options: "i" }
    : {};
  var startDate = 0001;
  var endDate = 2050;
  if (dateFrom && dateFrom != "" && dateFrom != null) {
    startDate = new Date(dateFrom).getFullYear();
  }
  if (dateTo && dateTo != "" && dateTo != null) {
    endDate = new Date(dateTo).getFullYear();
  }
  var dateVal = {
    $gte: startDate,
    $lt: endDate,
  };

  if (title != "" && title != null) {
    condition.title = { $regex: new RegExp(title), $options: "i" };
  }
  if (author != "" && author != null) {
    condition.author = { $regex: new RegExp(author), $options: "i" };
  }
  condition.year = dateVal;

  console.log(condition);

  const { limit, offset } = getPagination(page, size);
  console.log(limit, offset);

  const booksModel = collection.getCollection(COLLECTION_NAME.BOOKS);

  return collection.BooksModel.paginate(condition, { offset, limit })
    .then((data) => {
      return {
        totalItems: data.totalDocs,
        books: data.docs,
        totalPages: data.totalPages,
        currentPage: data.page - 1,
      };
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};

booksModel.addBook = (bookDetails) => {
  bookDetails.link = "";
  console.log(bookDetails);
  return collection
    .getCollection(COLLECTION_NAME.BOOKS)
    .then((model) => {
      model.create(bookDetails);
    })
    .then((response) => response);
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

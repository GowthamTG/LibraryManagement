const mongoose = require("mongoose");
const crypto = require("crypto");
const { Schema } = mongoose;

const { COLLECTION_NAME, MongoDBURL } = require("../../keys/constant");
const internal = require("stream");

mongoose.Promise = global.Promise;

const connection = {};

mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);

const BooksSchema = mongoose.Schema(
  {
    author: String,
    country: String,
    imageLink: String,
    language: String,
    link: String,
    pages: String,
    title: String,
    year: String,
    published: Boolean,
    publishedDate: Date,

    ifsc: String,
    description: String,

    price: Number,

    categories: { type: Schema.Types.Array, default: [] },
  },
  { timestamps: true }
);

BooksSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

BooksSchema.plugin(mongoosePaginate);

connection.getCollection = (collectionName) => {
  const DB_HOST = MongoDBURL.URL;
  console.log(DB_HOST);
  return mongoose
    .connect(`${DB_HOST}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((db) => {
      switch (collectionName) {
        case COLLECTION_NAME.BOOKS:
          return db.model(collectionName, BooksSchema);
      }
    })
    .catch((err) => {
      let error = new Error("Could not connect to database");
      console.log(err);
      error.status = 500;
      throw error;
    });
};

module.exports = connection;

const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const { Schema } = mongoose;

const { COLLECTION_NAME, MongoDBURL } = require("../../keys/constant");
const internal = require("stream");

mongoose.Promise = global.Promise;

const connection = {};

const BooksSchema = mongoose.Schema(
  {
    author: String,
    country: String,
    imageLink: String,
    language: String,
    link: String,
    pages: Number,
    title: String,
    year: Number,
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
    .connect(`${DB_HOST}/Library`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((db) => {
      switch (collectionName) {
        case COLLECTION_NAME.BOOKS:
          console.log("GETTING BOOKS");
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

connection.BooksModel = mongoose.model("Books", BooksSchema);

module.exports = connection;

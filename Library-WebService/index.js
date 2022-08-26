const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const errorLogger = require("./utils/errorLogger");
const bookRoutes = require("./routes/book.routes");

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/test", (req, res, next) => {
  res.send({ message: "Working" });
});

app.use(bookRoutes);
app.use(errorLogger);

const PORT = process.env.PORT || 5000;
app.listen(process.env.PORT || 5000, function () {
  console.log(
    "Express server listening on port %d in %s mode",
    this.address().port,
    app.settings.env
  );
});

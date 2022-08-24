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

app.use(bookRoutes);

app.use(errorLogger);

const PORT = process.env.PORT || 5000;
app.listen(PORT);

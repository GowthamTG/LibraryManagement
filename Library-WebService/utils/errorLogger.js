let errorLogger = (err, req, res, next) => {
  console.log(err);
  if (err) res.status(err.status || 500).send({ errorMessage: err.message });
  next();
};

module.exports = errorLogger;

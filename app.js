const express = require("express");
const apiRouter = require('./routers/api.router');
const { handle404Err, handle400Err, handle200Err } = require("./errors/errors");

const app = express();
app.use(express.json());

app.get("/", (req, res, next) => {
  res.status(200).send({ welcome: "Welcome to my API! Enter https://db-nc-games.herokuapp.com/api/ for URL endpoints" })
})
app.use('/api', apiRouter);

app.all("/*", (req, res,) => {
  res.status(404).send({ msg: "Not Found!" });
});
app.use(handle404Err);
app.use(handle400Err);
app.use(handle200Err);
// app.use((err, req, res, next) => {
//   console.log(err, "<<<<ERRRRRRROR");
// });

module.exports = app;


const express = require("express");
const apiRouter = require('./routers/api.router');
const { handle404Err, handle400Err, handle200Err } = require("./errors/errors");
const cors = require('cors');


const app = express();
app.use(cors());
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



module.exports = app;


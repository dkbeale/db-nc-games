const express = require('express');
const { getCategories, getReviewById, patchReviewVoteById, getReviews } = require('./controllers/controllers')
const app = express();
const { handle404Err, handle400Err } = require ("./errors/errors")

app.use(express.json());

app.get('/api/categories', getCategories);
app.get('/api/reviews/:review_id', getReviewById)
app.patch('/api/reviews/:review_id', patchReviewVoteById)

app.get('/api/reviews', getReviews)

app.all('/*', (req, res) => {
    res.status(404).send({ msg: "Not Found!" })
})

app.use(handle404Err);
app.use(handle400Err);
app.use((err, req, res, next) => {
    console.log(err, "<<<<ERRRRRRROR");
})

module.exports = app
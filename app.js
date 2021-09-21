const express = require('express');
const { getCategories, getReviewById } = require('./controllers/category-controllers')
const { handle404Err } = require('./errors/errors')
const app = express();

app.get('/api/categories', getCategories);
app.get('/api/reviews/:review_id', getReviewById)

app.all('*', (req, res) => {
    res.status(404).send({ msg: "Not Found!" })
})

module.exports = app
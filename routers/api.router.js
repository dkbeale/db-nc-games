const categoriesRouter = require('./categories.router');
const reviewsRouter = require('./reviews.router');
const commentsRouter = require('./comments.router');
const { endpoints } = require('../endpoints');

const apiRouter = require('express').Router();

apiRouter.get('/', (req, res,) => {
    res.status(200).send(endpoints);
})

apiRouter.use('/categories', categoriesRouter);
apiRouter.use('/reviews', reviewsRouter);
apiRouter.use('/comments', commentsRouter);

module.exports = apiRouter


const { getReviewById, patchReviewVoteById, getReviews, postReview, getReviewsBySearch } = require('../controllers/reviews.controllers')
const { getCommentsByReview, postCommentById } = require('../controllers/comments.controllers')

const reviewsRouter = require('express').Router();


reviewsRouter
        .route('/')
        .get(getReviews)
        .post(postReview);

reviewsRouter
        .route('/:review_id/comments')
        .get(getCommentsByReview)
        .post(postCommentById);

reviewsRouter
        .route('/:review_id')
        .get(getReviewById)
        .patch(patchReviewVoteById);



module.exports = reviewsRouter;
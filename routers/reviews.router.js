const { getReviewById, patchReviewVoteById, getReviews, postReview, getReviewsBySearch, deleteReviews, patchReviewBody } = require('../controllers/reviews.controllers')
const { getCommentsByReview, postCommentById } = require('../controllers/comments.controllers')

const reviewsRouter = require('express').Router();


reviewsRouter
        .route('/')
        .get(getReviews)
        .post(postReview);
reviewsRouter
        .route('/:review_id')
        .get(getReviewById)
        .patch(patchReviewVoteById)
        .delete(deleteReviews);
reviewsRouter
        .route('/:review_id/comments')
        .get(getCommentsByReview)
        .post(postCommentById);
reviewsRouter.patch('/:review_id/body', patchReviewBody)


module.exports = reviewsRouter;
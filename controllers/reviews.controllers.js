const {
  fetchReview,
  patchReviewVote,
  fetchAllReviews,
} = require("../models/reviews.models");

exports.getReviewById = (req, res, next) => {
  const { review_id: reviewId } = req.params;
  fetchReview(reviewId)
    .then((review) => {
      res.status(200).send({ review });
    })
    .catch((err) => {
      next(err);
    });
};

exports.patchReviewVoteById = (req, res, next) => {
  const { inc_votes: votes } = req.body;
  const { review_id: reviewId } = req.params;
  patchReviewVote(votes, reviewId)
    .then((review) => {
      res.status(201).send({ review: review });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getReviews = (req, res, next) => {
  const { sort_by: sort, order: order, category: category } = req.query;
  fetchAllReviews(sort, order, category).then((reviews) => {
    
    res.status(200).send({ reviews: reviews });
  }).catch((err) => {
    next(err)
  });
};

const {
  fetchCategories,
  fetchReview,
  patchReviewVote,
  fetchAllReviews,
} = require("../models/models");

exports.getCategories = (req, res, next) => {
  fetchCategories()
    .then((categories) => {
      res.status(200).send({ categories: categories });
    })
    .then((err) => {
      next(err);
    });
};

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
  fetchAllReviews()
    .then((reviews) => {
      res.status(200).send({ reviews: reviews})
    })
};

const {
  fetchReview,
  patchReviewVote,
  fetchAllReviews,
  createReview,
  fetchReviewsByUser
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

exports.postReview = (req, res, next) => {
  const {
    title: title,
    designer: designer,
    owner: owner,
    review_body: body,
    category: category,
  } = req.body;
  createReview(title, body, designer, category, owner)
  .then((review) => {
    res.status(201).send(({ review: review }))
  }).catch((err) => {
    next(err);
  });
};

exports.getReviewsByUser = (req, res, next) => {
  const { username: username } = req.params
  fetchReviewsByUser(username).then((reviews) => {
    res.status(200).send({ reviews: reviews })
  }).catch((err) => {
    next(err);
  })
}

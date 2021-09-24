const {
  fetchCategories,
  fetchReview,
  patchReviewVote,
  fetchAllReviews,
  fetchCommentsByReview,
  createComment,
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
  fetchAllReviews().then((reviews) => {
    res.status(200).send({ reviews: reviews });
  });
};

exports.getCommentsByReview = (req, res, next) => {
  const { review_id: reviewId } = req.params;
  fetchCommentsByReview(reviewId)
    .then((comments) => {
      //console.log({comments: comments})
      res.status(200).send({ comments: comments });
    })
    .catch((err) => {
      next(err);
    });
};

exports.postCommentById = (req, res, next) => {
  const { review_id: reviewId } = req.params;
  const { username: userName, body: body } = req.body;
  createComment(userName, reviewId, body)
    .then((comment) => {
      res.status(201).send({ comment: comment })
    }).catch((err) => {
      next(err)
    });
};

exports.getEndpoints = (req, res, next) => {
  res.status(200).send({
    "endpoints": {
      "getCategories": "/api/categories",
      "getReviewById": "/api/reviews/:review_id",
      "patchReviewVoteById": "/api/reviews/:review_id",
      "getReviews": "/api/reviews",
      "getCommentsByReview": "/api/reviews/:review_id/comments",
      "postComment": "/api/reviews/:review_id/comments",
      "getApiEndpoints": "/api"
    }
  })
}

exports.getWelcome = (req, res, next) => {
  res.status(200).send({ Welcome: "Hello there!"})
}

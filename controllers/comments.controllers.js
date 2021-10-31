const {
  fetchCommentsByReview,
  createComment,
  removeComment,
  updateCommentVote,
} = require("../models/comments.models");

exports.getCommentsByReview = (req, res, next) => {
  const { review_id: reviewId } = req.params;
  fetchCommentsByReview(reviewId)
    .then((comments) => {
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
      res.status(201).send({ comment: comment });
    })
    .catch((err) => {
      next(err);
    });
};

exports.deleteCommentById = (req, res, next) => {
  const { comment_id: commentId } = req.params;
  removeComment(commentId)
    .then(() => {
      res.status(204).send({});
    })
    .catch((err) => {
      next(err);
    });
};

exports.patchCommentVote = (req, res, next) => {
  const { inc_votes: newVote } = req.body;
  const { comment_id: commentId } = req.params;
  updateCommentVote(newVote, commentId)
    .then((comment) => {
      res.status(201).send({ comment: comment });
    })
    .catch((err) => {
      next(err);
    });
};

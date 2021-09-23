const db = require("../db/connection");
const reviews = require("../db/data/test-data/reviews");
const { err400TestFunction } = require('../model-functions/model-functions')

exports.fetchCategories = () => {
  return db.query(`SELECT * FROM categories`).then((categories) => {
    return categories.rows;
  });
};

exports.fetchReview = (reviewId) => {
  return db
    .query(`SELECT * FROM reviews WHERE review_id = $1`, [reviewId])
    .then((review) => {
      if (review.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Review Not Found!" });
      }
      return review.rows[0];
    });
};

exports.patchReviewVote = (votes, reviewId) => {
  if (typeof votes !== "number") {
    return Promise.reject({ status: 400, msg: "Bad Request" });
  }
  return db
    .query(
      `UPDATE reviews SET votes = votes + $1 WHERE review_id = $2 RETURNING *`,
      [votes, reviewId]
    )
    .then((review) => {
      if (review.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Review Not Found!" });
      }
      return review.rows[0];
    });
};

exports.fetchAllReviews = () => {
  return db.query(`SELECT * FROM reviews`).then((reviews) => {
    return reviews.rows;
  });
};

exports.fetchCommentsByReview = (reviewId) => {
  if (!parseInt(reviewId)) {
    return Promise.reject({ status: 400, msg: "Bad Request"})
  }
  return db
    .query(`SELECT * FROM comments WHERE review_id = $1`, [reviewId])
    .then((comments) => {
      if (comments.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Review Not Found Or No Comments!"})
      }
      return comments.rows
    });
};

exports.createComment = (userName, reviewId, body) => {
  return err400TestFunction(userName, reviewId).then(() => {
    return db
    .query(`INSERT INTO comments (author, review_id, body) VALUES ($1, $2, $3) RETURNING *`, [userName, reviewId, body])
    .then((comment) => {
      return comment.rows[0]
    })
  })
}

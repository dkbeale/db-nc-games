const db = require("../db/connection");
const reviews = require("../db/data/test-data/reviews");

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
    .query(`UPDATE reviews SET votes = votes + $1 WHERE review_id = $2 RETURNING *`, [votes, reviewId])
    .then((review) => {
      if(review.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Review Not Found!" });
      }
      return review.rows[0]
    })
}

exports.fetchAllReviews = () => {
  return db
    .query(`SELECT * FROM reviews`)
    .then((reviews) => {
      return reviews.rows;
    })
}

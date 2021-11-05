const db = require("../db/connection");
const { createReviewTesting, getReviewsByUserTesting } = require('../util.functions/model-functions')

exports.fetchReview = (reviewId) => {
  if (reviewId % 1 !== 0) {
    return Promise.reject({ status: 400, msg: "Bad Request - Not an ID" });
  }
  return db
    .query(`SELECT * FROM reviews WHERE review_id = $1`, [reviewId])
    .then((review) => {
      if (review.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Review Not Found!" });
      }
      return db
        .query(`SELECT * FROM comments WHERE review_id = $1`, [reviewId])
        .then((comments) => {
          return { ...review.rows[0], comment_count: comments.rows.length };
        });
    });
};

exports.patchReviewVote = (votes, reviewId) => {
  if (votes % 1 !== 0 || reviewId % 1 !== 0) {
    return Promise.reject({ status: 400, msg: "Invalid ID or Vote" });
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

exports.fetchAllReviews = (sort = "created_at", order = "desc", category) => {
  const sortArray = [
    "review_id",
    "title",
    "designer",
    "owner",
    "review_img_url",
    "review_body",
    "category",
    "created_at",
    "votes",
    "comment_count",
  ];
  if (!sortArray.includes(sort)) {
    return Promise.reject({ status: 400, msg: "Invalid Sort By Query" });
  }

  if (order !== "desc" && order !== "asc") {
    return Promise.reject({ status: 400, msg: "Invalid Order Query" });
  }

  let queryParams = [];
  let fixedCategory = "";

  let query = `SELECT reviews.*, COUNT(comment_id) AS comment_count
  FROM reviews
  LEFT JOIN comments
  ON comments.review_id = reviews.review_id `;

  if (category) {
    fixedCategory = category.replace("_", " ");
    queryParams.push(fixedCategory);
    query += `WHERE reviews.category = $${queryParams.length}`;
  }

  query += `
  GROUP BY reviews.review_id
  ORDER BY ${sort} ${order};`;

  const promises = [db.query(query, queryParams)];

  if (category) {
    promises.push(
      db.query(
        `SELECT * FROM categories
        WHERE slug = $1`,
        [fixedCategory]
      )
    );
  }

  return Promise.all(promises).then(([res, cat]) => {
    if ((!cat || !cat.rows[0]) && category) {
      return Promise.reject({ status: 404, msg: "Category Does Not Exist" });
    }
    if (category && res.rows.length === 0) {
      return Promise.reject({
        status: 200,
        msg: "Valid Category - No Reviews",
      });
    }
    return res.rows;
  });
};

exports.createReview = (title, body, designer, category, owner) => {
  return createReviewTesting(title, body, designer, category, owner).then(
    () => {
      return db
        .query(
          `INSERT INTO reviews (title, review_body, designer, category, owner) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
          [title, body, designer, category, owner]
        )
        .then((res) => {
          return res.rows[0];
        });
    }
  );
};

exports.fetchReviewsByUser = (username) => {
  return getReviewsByUserTesting(username).then(() => {
    return db
      .query(`SELECT * FROM reviews WHERE owner = $1`, [username])
      .then((reviews) => {
        if(reviews.rows.length === 0) {
          return Promise.reject({ status: 404, msg: "404: User has no reviews"})
        }
        return reviews.rows;
      });
  });
};



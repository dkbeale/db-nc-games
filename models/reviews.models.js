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

exports.patchReviewVote = (votes, reviewId, body) => {
  
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

exports.fetchAllReviews = (sort = "created_at", order = "desc", category, search) => {
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

  if (search) {
    queryParams.push(`%${search}%`);
    query += `WHERE reviews.title ILIKE $1`
  }

  if (category) {
    fixedCategory = category.replace("_", " ");
    queryParams.push(fixedCategory);
    if (search) {
      query += `AND reviews.category = $${queryParams.length}`;

    } else {
      query += `WHERE reviews.category = $${queryParams.length}`;
    }
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
        return reviews.rows;
      });
  });
};

exports.removeReview = (reviewId) => {
  if (reviewId % 1 !== 0) {
    return Promise.reject({ status: 400, msg: "Bad Request: Not an ID"})
  }
  return db.query(
    `DELETE FROM reviews WHERE review_id = $1 RETURNING *`, [reviewId]
  )
  .then((reviews) => {
    if (reviews.rows.length === 0) {
      return Promise.reject({ status: 404, msg: "404: Review does not exist"});
    }
  });
}

exports.editReviewBody = (body, reviewId) => {
  if(!body) {
    return Promise.reject({ status: 400, msg: "400: Missing required field"})
  }
  if (reviewId % 1 !== 0) {
    return Promise.reject({ status: 400, msg: "400: Not an ID"})
  }
  return db.query(
    `UPDATE reviews SET review_body = $1 WHERE review_id = $2 RETURNING *`, [body, reviewId]
  ).then((review) => {
    if (review.rows.length === 0) {
      return Promise.reject({ status: 404, msg: "404: Review not found" })
    }
    return review.rows[0];
  })
}

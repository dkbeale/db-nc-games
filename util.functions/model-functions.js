const db = require('../db/connection')

exports.err400TestFunction = (userName, reviewId) => {
    return db.query(`SELECT * FROM reviews WHERE review_id = $1`, [reviewId]).then((review) => {
      if(review.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Review Not Found"})
      }
    }).then(() => {
      return db.query(`SELECT * FROM users WHERE username = $1`, [userName]).then((user) => {
        if(user.rows.length === 0) {
          return Promise.reject({ status: 404, msg: "User Not Found"})
        }
      })
    })
}

exports.createReviewTesting = (title, body, designer, category, owner) => {
  if (!title || !body || !designer || !category || !owner) {
    return Promise.reject({
      status: 400,
      msg: "Bad Request: Missing Property",
    });
  }
  return db.query(
    `SELECT * FROM users WHERE username = $1`, [owner]
  ).then((user) => {
    if (user.rows.length === 0) return Promise.reject({ status: 404, msg: "Invalid Owner: User does not exist"})
  }).then(() => {
    return db.query(
      `SELECT * FROM categories WHERE slug = $1`, [category]
    ).then((category) => {
      if (category.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Invalid Category: Category does not exist"})
      }
    })
  })
}

exports.getReviewsByUserTesting = (username) => {
  return db.query(
    `SELECT * FROM users WHERE username = $1`, [username]
  ).then((users) => {
    if (users.rows.length === 0) {
      return Promise.reject({ status: 404, msg: "404: User does not exist"})
    }
  })
}

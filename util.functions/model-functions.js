const db = require('../db/connection')

exports.err400TestFunction = (userName, reviewId) => {
    return db.query(`SELECT * FROM reviews WHERE review_id = $1`, [reviewId]).then((review) => {
      if(review.rows.length === 0) {
        return Promise.reject({ status: 400, msg: "Bad Request, Review Does Not Exist"})
      }
    }).then(() => {
      return db.query(`SELECT * FROM users WHERE username = $1`, [userName]).then((user) => {
        if(user.rows.length === 0) {
          return Promise.reject({ status: 400, msg: "Bad Request, User Does Not Exist"})
        }
      })
    })
  }
  
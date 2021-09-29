const db = require("../db/connection");
const { err400TestFunction } = require('../util.functions/model-functions')


exports.fetchCommentsByReview = (reviewId) => {
  if (reviewId % 1 !== 0) {
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

exports.removeComment = (commentId) => {
  console.log(typeof commentId)
  if(commentId % 1 !== 0) {
    return Promise.reject({ status: 400, msg: "Bad Request - Not an ID"})
  }
  return db
    .query(`DELETE FROM comments WHERE comment_id = $1 RETURNING *`, [commentId]).then((comment) => {
      if(comment.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Comment does not exist"})
      }
    })
}
const db = require("../db/connection");
const { err400TestFunction, getCommentsByReviewTesting } = require("../util.functions/model-functions");

exports.fetchCommentsByReview = (reviewId) => {
  if (reviewId % 1 !== 0) {
    return Promise.reject({ status: 400, msg: "Bad Request" });
  }
  return getCommentsByReviewTesting(reviewId).then(() => {
    return db
      .query(`SELECT * FROM comments WHERE review_id = $1`, [reviewId])
      .then((comments) => {
        return comments.rows;
      });

  })
};

exports.createComment = (userName, reviewId, body) => {
  if (!userName || !reviewId)
    return Promise.reject({ status: 400, msg: "Missing required field" });
  if (reviewId % 1 !== 0)
    return Promise.reject({ status: 400, msg: "Invalid ID" });
  return err400TestFunction(userName, reviewId).then(() => {
    return db
      .query(
        `INSERT INTO comments (author, review_id, body) VALUES ($1, $2, $3) RETURNING *`,
        [userName, reviewId, body]
      )
      .then((comment) => {
        return comment.rows[0];
      });
  });
};

exports.removeComment = (commentId) => {
  if (commentId % 1 !== 0) {
    return Promise.reject({ status: 400, msg: "Bad Request - Not an ID" });
  }
  return db
    .query(`DELETE FROM comments WHERE comment_id = $1 RETURNING *`, [
      commentId,
    ])
    .then((comment) => {
      if (comment.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Comment does not exist" });
      }
    });
};

exports.updateCommentVote = (newVote, commentId) => {
  if (newVote % 1 !== 0) {
    return Promise.reject({ status: 400, msg: "Bad Request: Vote not an integer"})
  } 
  if (commentId % 1 !== 0) {
    return Promise.reject({ status: 400, msg: "Bad Request: Comment ID not an integer"})
  }
  return db.query(
    `UPDATE comments SET votes = votes + $1 WHERE comment_id = $2 RETURNING *`,
    [newVote, commentId]
  ).then((comment) => {
    if (comment.rows.length === 0) {
      return Promise.reject({ status: 404, msg: "Comment Does Not Exist"})
    }
    return comment.rows[0]
  });
};

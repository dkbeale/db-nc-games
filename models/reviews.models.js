const db = require("../db/connection");
const reviews = require("../db/data/test-data/reviews");

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

exports.fetchAllReviews = (sort = 'created_at', order = 'desc', category) => {
  const sortArray = [
    'review_id',
    'title',
    'designer',
    'owner',
    'review_img_url',
    'review_body',
    'category',
    'created_at',
    'votes',
    'comment_count',
  ];
  if (!sortArray.includes(sort)) {
    return Promise.reject({ status: 400, msg: 'Invalid Sort By Query' });
  }

  if (order !== 'desc' && order !== 'asc') {
    return Promise.reject({ status: 400, msg: 'Invalid Order Query' });
  }

  let queryParams = [];
  let fixedCategory = '';

  let query = `SELECT reviews.*, COUNT(comment_id) AS comment_count
  FROM reviews
  LEFT JOIN comments
  ON comments.review_id = reviews.review_id `;

  if (category) {
    fixedCategory = category.replace('_', ' ');
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
      return Promise.reject({ status: 404, msg: 'Category Does Not Exist' });
    }
    if (category && res.rows.length === 0) {
      return Promise.reject({
        status: 200,
        msg: 'Valid Category - No Reviews',
      });
    }
    return res.rows;
  });
};


// exports.fetchAllReviews = (sort = "created_at", order = "desc", category) => {
//   const sortArray = [
//     "review_id",
//     "title",
//     "designer",
//     "owner",
//     "review_img_url",
//     "review_body",
//     "category",
//     "created_at",
//     "votes",
//     "comment_count",
//   ];
//   if (!sortArray.includes(sort)) {
//     return Promise.reject({ status: 400, msg: "Invalid Sort By Query" });
//   }

//   if (order !== "desc" && order !== "asc") {
//     return Promise.reject({ status: 400, msg: "Invalid Order Query" });
//   }

//   let WHERE = "";
//   let fixedCategory = '';

//   if (category) {
//     fixedCategory = category.replace("_", " ")
//     //fixedCategory = "'" + fixedCategory + "'";
//     console.log(fixedCategory)
//     WHERE = `WHERE reviews.category = '${fixedCategory}'`;
    
//   }

//   let query = `SELECT reviews.*, COUNT(comment_id) AS comment_count
//   FROM reviews 
//   LEFT JOIN comments 
//   ON comments.review_id = reviews.review_id
//   ${WHERE}
//   GROUP BY reviews.review_id
//   ORDER BY ${sort} ${order};`;

//   //console.log(query)
//   const newStuff = "`" + fixedCategory + "`"
//   console.log(newStuff)

//   const promises = [db.query(query)];

//   if(category) {
//     promises.push(db.query(
//       `SELECT * FROM categories
//          WHERE slug = $1`, [fixedCategory]
//     ))
//   }
  
//   return Promise.all(promises).then(([res, cat]) => {
//     console.log(cat.rows)
//     if ((!cat || !cat.rows[0]) && category) {
//       return Promise.reject({ status: 404, msg: "Category Does Not Exist" })
//     } 
//     if (category && res.rows.length === 0) {
//       return Promise.reject({ status: 200, msg: "Valid Category - No Reviews"})
//     }
//     return res.rows
//   })

// };






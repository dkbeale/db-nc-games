const db = require("../connection");
const format = require("pg-format");
const {
  sortCategories,
  sortUsers,
  sortReviews,
  sortComments,
} = require(`../utils/data-manipulation`);

const seed = (data) => {
  const { categoryData, commentData, reviewData, userData } = data;
  return db
    .query(`DROP TABLE IF EXISTS comments;`)
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS reviews;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS users;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS categories;`);
    })
    .then(() => {
      return db.query(
        `CREATE TABLE categories (
          slug VARCHAR(100) PRIMARY KEY NOT NULL, 
          description VARCHAR(500) NOT NULL);`
      );
    })
    .then(() => {
      return db.query(
        `CREATE TABLE users (
          username VARCHAR(50) PRIMARY KEY,
          name VARCHAR (50),
          avatar_url VARCHAR(150) NOT NULL
        );`
      );
    })
    .then(() => {
      return db.query(
        `CREATE TABLE reviews (
          review_id SERIAL PRIMARY KEY,
          title VARCHAR(100) NOT NULL,
          review_body VARCHAR(1000),
          designer VARCHAR(50),
          review_img_url VARCHAR(200) DEFAULT 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg',
          votes INTEGER DEFAULT 0,
          category VARCHAR(100)
          REFERENCES categories(slug),
          owner VARCHAR(50)
          REFERENCES users(username),
          created_at DATE DEFAULT NOW()
        );`
      );
    })
    .then(() => {
      return db.query(
        `CREATE TABLE comments (
          comment_id SERIAL PRIMARY KEY,
          author VARCHAR(50) NOT NULL
          REFERENCES users(username),
          review_id INTEGER NOT NULL
          REFERENCES reviews(review_id)
          ON DELETE CASCADE,
          votes INTEGER DEFAULT 0,
          created_at DATE DEFAULT NOW(),
          body VARCHAR(1000) NOT NULL
        );`
      );
    })
    .then(() => {
      return sortCategories(categoryData);
    })
    .then((sortedCategories) => {
      return db.query(
        format(
          `INSERT INTO categories
           (slug, description)
           VALUES
           %L
           RETURNING *;`,
          sortedCategories
        )
      );
    }).then(() => {
      return sortUsers(userData)
    }).then((sortedUsers) => {
      return db.query(
        format(
          `INSERT INTO users
          (username, name, avatar_url)
          VALUES
          %L
          RETURNING *;`,
          sortedUsers
        ))
    }).then(() => {
      return sortReviews(reviewData)
    }).then((sortedReviews) => {
      return db.query(
        format(
          `INSERT INTO reviews
          (title, review_body, designer, review_img_url, votes, category, owner, created_at)
          VALUES
          %L
          RETURNING *;`, 
          sortedReviews
        ))
    }).then(() => {
      return sortComments(commentData)
    }).then((sortedComments) => {
      return db.query(
        format(
          `INSERT INTO comments
          (author, review_id, votes, created_at, body)
          VALUES
          %L
          RETURNING *;`,
          sortedComments
        ))
    })
};

module.exports = seed;

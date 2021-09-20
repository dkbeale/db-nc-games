const db = require("../connection");
const format = require("pg-format");
const { sortCategories, sortUsers } = require(`../utils/data-manipulation`);

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
          username VARCHAR(50) PRIMARY KEY NOT NULL,
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
          review_body VARCHAR(250),
          designer VARCHAR(50),
          review_img_url VARCHAR(200) DEFAULT 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg',
          votes INTEGER DEFAULT 0,
          category VARCHAR(100),
          FOREIGN KEY (category) REFERENCES categories(slug),
          owner VARCHAR(50),
          FOREIGN KEY (owner) REFERENCES users(username),
          created_at TIMESTAMP DEFAULT NOW()
        );`
      );
    })
    .then(() => {
      return db.query(
        `CREATE TABLE comments (
          comment_id SERIAL PRIMARY KEY,
          author VARCHAR(50) NOT NULL,
          FOREIGN KEY (author) REFERENCES users(username),
          review_id INTEGER NOT NULL,
          FOREIGN KEY (review_id) REFERENCES reviews(review_id),
          votes INTEGER DEFAULT 0,
          created_at TIMESTAMP DEFAULT NOW(),
          body VARCHAR(250) NOT NULL
        );`
      );
    })
};

module.exports = seed;

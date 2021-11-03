const db = require("../db/connection");

exports.fetchCategories = () => {
  return db.query(`SELECT * FROM categories`).then((categories) => {
    return categories.rows;
  });
};

exports.createCategory = (slug, description) => {
  if (!slug || !description)
    return Promise.reject({
      status: 400,
      msg: "Bad Request: Missing required field",
    });
  if (typeof slug !== "string")
    return Promise.reject({
      status: 400,
      msg: "Bad Request: Slug cannot be a number",
    });

  return db
    .query(`SELECT * FROM categories WHERE slug = $1`, [slug])
    .then((resTest) => {
      if (resTest.rows.length === 0) {
        return db
          .query(
            `INSERT INTO categories (slug, description) VALUES ($1, $2) RETURNING *`,
            [slug, description]
          )
          .then((res) => {
            return res.rows[0];
          });
      } else {
        return Promise.reject({
          status: 400,
          msg: "Bad Request: Category already exists",
        });
      }
    });
};



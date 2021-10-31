const db = require("../db/connection");

exports.fetchUsers = () => {
  return db.query(`SELECT * FROM users`).then((users) => {
    return users.rows.map((user) => {
      return { username: user.username };
    });
  });
};

exports.fetchSingleUser = (userName) => {
  return db
    .query(`SELECT * FROM users WHERE username = $1`, [userName])
    .then((user) => {
      if (user.rows.length === 0) {
          return Promise.reject({ status: 404, msg: "User Not Found!"})
      }
      return user.rows[0]
      //console.log(user.rows[0]);
    });
};

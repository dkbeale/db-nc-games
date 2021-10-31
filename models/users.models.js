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
        return Promise.reject({ status: 404, msg: "User Not Found!" });
      }
      return user.rows[0];
    });
};

exports.createUser = (userName, name, avatarUrl) => {
  if (!userName || !name || !avatarUrl) {
    return Promise.reject({ status: 400, msg: "Missing Required Field" });
  }
  const regex = new RegExp(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/i)
  if (!regex.test(avatarUrl)) {
      return Promise.reject({ status: 400, msg: "Invalid URL"})
  }
  return db
    .query(
      `INSERT INTO users (username, name, avatar_url) VALUES ($1, $2, $3) RETURNING *`,
      [userName, name, avatarUrl]
    )
    .then((user) => {
      return user.rows[0];
      console.log(user.rows[0]);
    });
};

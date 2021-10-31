const {
  fetchUsers,
  fetchSingleUser,
  createUser,
} = require("../models/users.models");

exports.getUsers = (req, res, next) => {
  fetchUsers()
    .then((users) => {
      res.status(200).send({ users: users });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getUserByUsername = (req, res, next) => {
  const { username: userName } = req.params;
  fetchSingleUser(userName)
    .then((user) => {
      res.status(200).send({ user: user });
    })
    .catch((err) => {
      next(err);
    });
};

exports.postUser = (req, res, next) => {
  const { username: userName, name: name, avatar_url: avatarUrl } = req.body;
  createUser(userName, name, avatarUrl)
    .then((user) => {
      res.status(201).send({ user: user });
    })
    .catch((err) => {
      next(err);
    });
};

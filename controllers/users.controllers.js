const { fetchUsers, fetchSingleUser } = require("../models/users.models")

exports.getUsers = (req, res, next) => {
    fetchUsers()
    .then((users) => {
        res.status(200).send({ users: users })  
    }).catch((err) => {
        next(err)
    })
}

exports.getUserByUsername = (req, res, next) => {
    const { username: userName } = req.params;
    fetchSingleUser(userName)
    .then((user) => {
        res.status(200).send({ user: user })
    }).catch((err) => {
        next(err)
    })
}
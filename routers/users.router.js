const { getUsers, getUserByUsername, postUser } = require('../controllers/users.controllers')
const { getReviewsByUser } = require('../controllers/reviews.controllers')
const usersRouter = require('express').Router();

usersRouter
        .route('/')
        .get(getUsers)
        .post(postUser);

usersRouter
        .route('/:username')
        .get(getUserByUsername);

usersRouter
        .route('/:username/reviews')
        .get(getReviewsByUser);

module.exports = usersRouter;
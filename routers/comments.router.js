const deleteCommentById = require('../controllers/comments.controllers')

const commentsRouter = require('express').Router()

commentsRouter.route('/:comments_id').delete(deleteCommentById)

module.exports = commentsRouter
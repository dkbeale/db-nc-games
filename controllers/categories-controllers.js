const { fetchCategories, createCategory } = require('../models/categories-models')

exports.getCategories = (req, res, next) => {
    fetchCategories()
      .then((categories) => {
        res.status(200).send({ categories: categories });
      })
      .then((err) => {
        next(err);
      });
};

exports.postCategory = (req, res, next) => {
  const { slug: slug, description: description } = req.body;
  createCategory(slug, description)
    .then((category) => {
      res.status(201).send({ category: category })
    }).catch((err) => {
      next(err);
    })
}
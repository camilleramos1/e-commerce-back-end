const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  Category.findAll(
    { // be sure to include its associated Products
      include: {
        model: Product,
        attributes:['product_name'] 
      }
    }
  ).then((allCategory) => res.status(200).json(allCategory))
  .catch((err) => res.status(500).json(err));
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  Category.findOne(
    {  // be sure to include its associated Products
      where: {
        id: req.params.id
      },
      include: {
        model: Product,
        attributes: ['category_id']
      }
    }
  ).then((oneCategory) => res.status(200).json(oneCategory))
  .catch((err) => res.status(500).json(err));
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name
  }).then((newCategory) => res.status(200).json(newCategory))
  .catch((err) => res.status(500).json(err))
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  }).then((updateCategory) => res.status(200).json(updateCategory))
  .catch((err) => res.status(400).json(err))
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id,
    },
  }).then((deleteCategory) => res.json(deleteCategory))
  .catch((err) => res.status(400).json(err))
});

module.exports = router;

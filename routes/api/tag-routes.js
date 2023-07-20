const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  Tag.findAll({
    include: [{
        // be sure to include its associated Product data
      model: Product
    }]
  }).then(findAllTag => res.json(findAllTag))
  .catch(err => {
    console.log(err);
    res.json(err);
  });
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  Tag.findOne({
    where: {
      id: req.params.id
    },
      // be sure to include its associated Product data
    include: {
      model: Product
    }
  }).then(singleTag => res.json(singleTag))
  .catch(err => {
    console.log(err);
    res.json(err);
  });
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name
  }).then(newTag => res.json(newTag))
  .catch(err => {
    console.log(err);
    res.json(err);
  });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  }).then(updateTag => res.json(updateTag))
  .catch(err => res.json(err))
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  }).then(deleteTag => res.json(deleteTag))
  .catch(err => res.json(err))
});

module.exports = router;

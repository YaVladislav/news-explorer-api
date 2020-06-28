const router = require('express').Router();

const {
  articlesGet,
  createArticles,
  deleteArticles,
} = require('../controllers/articles');

router.get('/', articlesGet);
router.post('/', createArticles);
router.delete('/:id', deleteArticles);

module.exports = router;

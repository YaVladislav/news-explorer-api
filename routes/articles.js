const router = require('express').Router();
const { validateArticleBody, validateId } = require('../middlewares/validation');

const {
  articlesGet,
  createArticles,
  deleteArticles,
} = require('../controllers/articles');

router.get('/', articlesGet);
router.post('/', validateArticleBody, createArticles);
router.delete('/:id', validateId, deleteArticles);

module.exports = router;

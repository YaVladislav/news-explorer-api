const Article = require('../models/article');

const articlesGet = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .then((articles) => res.status(200).json({ articles }))
    .catch(next);
};

const createArticles = (req, res, next) => {
  const {
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
  } = req.body;

  Article.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner: req.user._id,
  })
    .then((article) => res.status(200).json({ article }))
    .catch(next);
};

const deleteArticles = (req, res, next) => {
  const owner = req.user._id;
  Article.findArticle(req.params.id, owner)
    .then((article) => {
      // res.status(200).json({ article });
      res.status(200).json({ message: 'Ресурс успешно удален' });
      article.remove();
    })
    .catch(next);
};

module.exports = {
  articlesGet,
  createArticles,
  deleteArticles,
};

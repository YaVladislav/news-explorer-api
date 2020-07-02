const mongoose = require('mongoose');
const validator = require('validator');

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: [true, 'Поле "keyword" должно быть заполнено'],
  },
  title: {
    type: String,
    required: [true, 'Поле "title" должно быть заполнено'],
  },
  text: {
    type: String,
    required: [true, 'Поле "text" должно быть заполнено'],
  },
  date: {
    type: String,
    required: [true, 'Поле "date" должно быть заполнено'],
  },
  source: {
    type: String,
    required: [true, 'Поле "source" должно быть заполнено'],
  },
  link: {
    type: String,
    required: [true, 'Поле "link" должно быть заполнено'],
    validate: {
      validator: (value) => validator
        .isURL(value, { protocols: ['http', 'https', 'ftp'], require_tld: true, require_protocol: true }),
      message: 'Поле "link" содержит недействительный url-адрес',
    },
  },
  image: {
    type: String,
    required: [true, 'Поле "image" должно быть заполнено'],
    validate: {
      validator: (value) => validator
        .isURL(value, { protocols: ['http', 'https', 'ftp'], require_tld: true, require_protocol: true }),
      message: 'Поле "image" содержит недействительный url-адрес',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
    select: false,
  },
});

articleSchema.statics.findArticle = function (id, owner) {
  return this.findById(id).select('+owner')
    .orFail(new Error('Ресурс удален'))
    .then((article) => {
      if (JSON.stringify(article.owner) !== JSON.stringify(owner)) {
        console.log(article.owner);
        console.log(owner);
        throw new Error('Недостаточно прав');
      }
      return (article);
    });
};

module.exports = mongoose.model('article', articleSchema);

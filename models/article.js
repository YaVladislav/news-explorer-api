const mongoose = require('mongoose');
const validator = require('validator');

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: [true, 'Обязательное поле'],
  },
  title: {
    type: String,
    required: [true, 'Обязательное поле'],
  },
  text: {
    type: String,
    required: [true, 'Обязательное поле'],
  },
  date: {
    type: String,
    required: [true, 'Обязательное поле'],
  },
  source: {
    type: String,
    required: [true, 'Обязательное поле'],
  },
  link: {
    type: String,
    required: [true, 'Обязательное поле'],
    validate: {
      validator: (value) => validator
        .isURL(value, { protocols: ['http', 'https', 'ftp'], require_tld: true, require_protocol: true }),
      message: 'Неверный формат URL',
    },
  },
  image: {
    type: String,
    required: [true, 'Обязательное поле'],
    validate: {
      validator: (value) => validator
        .isURL(value, { protocols: ['http', 'https', 'ftp'], require_tld: true, require_protocol: true }),
      message: 'Неверный формат URL',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'Обязательное поле'],
    select: false,
  },
});

module.exports = mongoose.model('article', articleSchema);

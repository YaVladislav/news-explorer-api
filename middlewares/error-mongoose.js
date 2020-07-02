const { Conflict } = require('../constants');

module.exports = (err, req, res, next) => {
  if (err.name === 'MongoError' && err.code === 11000) {
    next(new Conflict('Пользователь с таким email адресом уже существует'));
  } else {
    next(err);
  }
};

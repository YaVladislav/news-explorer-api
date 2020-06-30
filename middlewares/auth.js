const jwt = require('jsonwebtoken');

const { JWT_SECRET } = require('../config');

module.exports = (req, res, next) => {
  if (!req.cookies.token || !req.cookies.token.startsWith('Bearer')) {
    throw new Error('необходима авторизация');
  }
  const token = req.cookies.token.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(
      token,
      JWT_SECRET,
    );
  } catch (err) {
    throw new Error('необходима авторизация');
  }
  req.user = payload;
  next();
};

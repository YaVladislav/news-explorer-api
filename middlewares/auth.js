const jwt = require('jsonwebtoken');

const { UnautorizedError } = require('../constants');

const { JWT_SECRET } = require('../config');

module.exports = (req, res, next) => {
  if (!req.cookies.token || !req.cookies.token.startsWith('Bearer')) {
    throw new UnautorizedError('Необходима авторизация');
  }
  const token = req.cookies.token.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(
      token,
      JWT_SECRET,
    );
  } catch (err) {
    throw new UnautorizedError('Необходима авторизация');
  }
  req.user = payload;
  next();
};

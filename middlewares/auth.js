const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  if (!req.cookies.token || !req.cookies.token.startsWith('Bearer')) {
    throw new Error('необходима авторизация');
  }

  const token = req.cookies.token.replace('Bearer ', '');
  const { NODE_ENV, JWT_SECRET } = process.env;
  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
    );
  } catch (err) {
    throw new Error('необходима авторизация');
  }

  req.user = payload;

  next();
};

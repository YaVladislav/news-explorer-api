const rateLimit = require('express-rate-limit');
const TooManyRequests = require('../errors/too-many-ruquests');

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 min
  max: 10,
  handler: (req, res, next) => {
    next(new TooManyRequests(
      `Слишком много запросов с вашего IP - ${req.ip}. Повторите попытку через 5 минут`,
    ));
  },
});

module.exports = limiter;

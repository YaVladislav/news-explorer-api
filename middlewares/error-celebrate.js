const { isCelebrate } = require('celebrate');
const { BadRequestErr } = require('../constants');

module.exports = (err, req, res, next) => {
  if (!isCelebrate(err)) {
    next(err);
  } else {
    next(new BadRequestErr(err.message));
  }
};

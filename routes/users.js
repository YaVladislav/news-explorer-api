const router = require('express').Router();

const {
  usersGet,
} = require('../controllers/users');

router.get('/me', usersGet);

module.exports = router;

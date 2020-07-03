const router = require('express').Router();

const { userGet } = require('../controllers/users');

router.get('/me', userGet);

module.exports = router;

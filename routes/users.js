const router = require('express').Router();
// const { validateUserBody } = require('../middlewares/validation');

const { userGet } = require('../controllers/users');

router.get('/me', userGet);

module.exports = router;

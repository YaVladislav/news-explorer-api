const router = require('express').Router();
const auth = require('../middlewares/auth');
const { validateUserBody, validateAuthentication } = require('../middlewares/validation');

const { NotFoundError } = require('../constants');

const {
  login,
  logout,
  createUser,
} = require('../controllers/users');

router.post('/signin', validateAuthentication, login);
router.post('/signout', logout);
router.post('/signup', validateUserBody, createUser);

router.use('/users', auth, require('./users'));
router.use('/articles', auth, require('./articles'));

router.all('*', () => {
  throw new NotFoundError('Ресурс не найден');
});

module.exports = router;

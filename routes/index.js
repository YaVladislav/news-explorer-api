const router = require('express').Router();
const auth = require('../middlewares/auth');

const {
  login,
  createUser,
} = require('../controllers/users');

router.post('/signin', login);
router.post('/signup', createUser);

router.use('/users', auth, require('./users'));
router.use('/articles', auth, require('./articles'));

router.all('*', () => {
  throw new Error('Ресурс не найден');
});

module.exports = router;

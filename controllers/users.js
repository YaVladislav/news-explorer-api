const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { JWT_SECRET } = require('../config');

const User = require('../models/user');

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUser(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        JWT_SECRET,
        { expiresIn: '7d' },
      );
      res.cookie('token', `Bearer ${token}`, { httpOnly: true });
      res.status(201).json({ message: 'Аутентификация прошла успешно' });
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name: req.body.name,
      email: req.body.email,
      password: hash,
    }))
    .then(() => {
      res.status(201).json({ message: 'Пользователь успешно создан' });
    })
    .catch(next);
};

const userGet = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.status(200).json({ email: user.email, name: user.name }))
    .catch(next);
};

module.exports = {
  login,
  createUser,
  userGet,
};

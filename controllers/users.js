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
      res.status(201).json({ message: 'Авторизация прошла успешно', user: { name: user.name } });
    })
    .catch(next);
};

const logout = (req, res) => {
  res.clearCookie('token');
  res.status(201).json({ message: 'Выполнен выход' });
};

const createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name: req.body.name,
      email: req.body.email,
      password: hash,
    }))
    .then((user) => {
      const modifiedUser = JSON
        .stringify(user, (key, value) => ((key === 'password') ? undefined : value));
      res.status(201).json(JSON.parse(modifiedUser));
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
  logout,
  createUser,
  userGet,
};

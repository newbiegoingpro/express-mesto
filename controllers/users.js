const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');

module.exports.createUser = (req, res, next) => {
  // хешируем пароль
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      email: req.body.email,
      password: hash, // записываем хеш в базу
    }))
    .then((user, err) => {
      if (err.name === 'MongoError' && err.code === 11000) {
        res.status(409).send({ message: 'Пользователь уже зарегистрирован.' });
      } else if (err.name === 'ValidationError') {
        throw new BadRequestError('Переданы некорректные данные');
      }
      res.send(user);
    })
    .catch(next);
};

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch(next);
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user, err) => {
      if (!user) {
        throw new NotFoundError('Пользователя с таким Id нет');
      } else if (err.name === 'CastError') {
        throw new BadRequestError({ message: 'Переданы некорректные данные' });
      }
      return res.status(200).send(user);
    })
    .catch(next);
};

module.exports.updateUser = (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, { name: req.body.name, about: req.body.about },
    { new: true, runValidators: true })
    .then((user, err) => {
      if (!user) {
        throw new NotFoundError({ message: 'Пользователя с таким Id нет' });
      } else if (err.name === 'ValidationError') {
        throw new BadRequestError({ message: 'Переданы некорректные данные' });
      }
      return res.status(200).send(user);
    })
    .catch(next);
};

module.exports.updatePhoto = (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, { avatar: req.body.avatar },
    { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError({ message: 'Пользователя с таким Id нет' });
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError({ message: 'Переданы некорректные данные' });
      }
      return res.status(500).send({ message: 'Ошибка на сервере' });
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials({ email, password })
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'some-secret-key');
      res.send({ token });
    })
    .catch(next);
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findOne({ _id: req.user._id })
    // eslint-disable-next-line consistent-return
    .then((user, err) => {
      if (!user) {
        throw new NotFoundError({ message: 'Пользователя с таким Id нет' });
      } else if (err.name === 'ValidationError') {
        throw new BadRequestError({ message: 'Переданы некорректные данные' });
      }
      res.status(200).send(user);
    })
    .catch(next);
};

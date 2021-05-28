const User = require('../models/user');

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  return User.create({ name, about, avatar })
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ "message": "Переданы некорректные данные" })
      } else {
        return res.status(500).send({ "message": "Ошибка на сервере" })
      }
    })
};

module.exports.getUsers = (req, res) => {
  User.find({})
    .then(users => res.status(200).send({ data: users }))
    .catch(() => res.status(500).send({ "message": "Ошибка на сервере" }));
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.userId, {},
    { new: true, select: { "name": 1, "about": 1, "avatar": 1} })
    .then(user => res.status(200).send(user))
    .catch((err) => {
      if (!User[req.params.userId]) {
        res.status(404).send({ "message": "Пользователя с таким Id нет" })
      } else {
        res.status(500).send({ "message": "Ошибка на сервере" })
      }
    })
};

module.exports.updateUser = (req, res) => {
  //const { name, about, avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { "name": req.body.name, "about": req.body.about },
    { new: true, select: { "name": 1, "about": 1, "avatar": 1, "_id": 1 } })
    .then(user => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ "message": "Переданы некорректные данные" })
      } else if (!User[req.user._id]) {
        return res.status(404).send({ "message": "Пользователя с таким Id нет" })
      } else {
        return res.status(500).send({ "message": "Ошибка на сервере" })
      }
    })
};

module.exports.updatePhoto = (req, res) => {
  //const { name, about, avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { "avatar": req.body.avatar },
    { new: true, select: { "name": 1, "about": 1, "avatar": 1, "_id": 1 } })
    .then(user => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ "message": "Переданы некорректные данные" })
      } else if (!User[req.user._id]) {
        return res.status(404).send({ "message": "Пользователя с таким Id нет" })
      } else {
        return res.status(500).send({ "message": "Ошибка на сервере" })
      }
    }
    )
};
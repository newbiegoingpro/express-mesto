/* eslint-disable no-underscore-dangle */
const Card = require('../models/card');

module.exports.createCard = (req, res) => {
  const owner = req.user._id;
  const { name, link } = req.body;
  Card.create({ name, link, owner })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Переданы некорректные данные' });
      }
      return res.status(500).send({ message: 'Ошибка на сервере' });
    });
};

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch(() => res.status(500).send({ message: 'Ошибка на сервере' }));
};

module.exports.deleteCard = (req, res) => {
  const owner = req.user._id;
  Card.find(req.params.cardId)
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'Карточки с таким Id нет' });
      } else if (owner === card.owner.toString()) {
        Card.findByIdAndDelete(req.params.cardId)
          .then(() => res.status(200).send({ message: 'Карточка удалена' }))
          .catch(() => res.status(500).send({ message: 'Ошибка на сервере' }));
      }
      return res.status(403).send({ message: 'Удалить можно только свою карточку' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Переданы некорректные данные' });
      }
      return res.status(500).send({ message: 'Ошибка на сервереt' });
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true, select: 'likes' },
  )
    .then((likes) => {
      if (!likes) {
        return res.status(404).send({ message: 'Карточки с таким Id нет' });
      }
      return res.status(200).send(likes);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Переданы некорректные данные' });
      }
      return res.status(500).send({ message: 'Ошибка на сервере' });
    });
};

module.exports.removeCardLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true, select: 'likes' },
  )
    .then((likes) => {
      if (!likes) {
        return res.status(404).send({ message: 'Карточки с таким Id нет' });
      }
      return res.status(200).send(likes);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Переданы некорректные данные' });
      }
      return res.status(500).send({ message: 'Ошибка на сервере' });
    });
};

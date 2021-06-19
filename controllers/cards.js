/* eslint-disable no-underscore-dangle */
const Card = require('../models/card');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const BadRequestError = require('../errors/BadRequestError');

module.exports.createCard = (req, res, next) => {
  const owner = req.user._id;
  const { name, link } = req.body;
  Card.create({ name, link, owner })
    .then((card, err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError('Переданы некорректные данные');
      }
      res.status(201).send(card);
    })
    .catch(next);
};

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  const owner = req.user._id;
  Card.findById(req.params.cardId)
    // eslint-disable-next-line consistent-return
    .then((card, err) => {
      if (!card) {
        throw new NotFoundError('Карточки с таким Id нет');
      } else if (err.name === 'CastError') {
        throw new BadRequestError('Переданы некорректные данные');
      } else if (owner === card.owner.toString()) {
        Card.findByIdAndDelete(req.params.cardId)
          .then(() => res.status(200).send('Карточка удалена'));
      } else {
        throw new ForbiddenError('Удалить можно только свою карточку.');
      }
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true, select: 'likes' },
  )
    .then((likes, err) => {
      if (!likes) {
        throw new NotFoundError('Карточки с таким Id нет');
      } else if (err.name === 'CastError') {
        throw new BadRequestError('Переданы некорректные данные');
      }
      return res.status(200).send(likes);
    })
    .catch(next);
};

module.exports.removeCardLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true, select: 'likes' },
  )
    .then((likes, err) => {
      if (!likes) {
        throw new NotFoundError({ message: 'Карточки с таким Id нет' });
      } else if (err.name === 'CastError') {
        throw new BadRequestError({ message: 'Переданы некорректные данные' });
      }
      return res.status(200).send(likes);
    })
    .catch(next);
};

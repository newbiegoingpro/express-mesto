const Card = require('../models/card');

module.exports.createCard = (req, res) => {
  console.log(req.user._id);
  const owner = req.user._id;
  const { name, link } = req.body;
  Card.create({ name, link, owner })
  .then((card) => res.status(201).send({ data: card }))
  .catch((err) => {
    if (err.name === 'ValidationError') {
      return res.status(400).send({ "message": "Переданы некорректные данные" })
    } else {
      return res.status(500).send({ "message": "Ошибка на сервере" })
    }
  })
};

module.exports.getCards = (req, res) => {
  Card.find({})
    .then(cards => res.status(200).send({ data: cards }))
    .catch(() => res.status(500).send({ "message": "Ошибка на сервере" }));
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndDelete(req.params.cardId)
    .then(card => res.status(200).send({"message": "Карточка удалена"}))
    .catch((err) => {
      if(!Card[req.params.cardId]){
        res.status(404).send({"message": "Карточки с таким Id нет"})
      } else {
        res.status(500).send({"message": "Ошибка на сервере"})}
    })
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true, select: "likes" },)
    .then(likes => res.status(200).send(likes))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ "message": "Переданы некорректные данные" })
      } else {
        return res.status(500).send({ "message": "Ошибка на сервере" })
      }
    })
}

module.exports.removeCardLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true, select: "likes" },
    )
    .then(likes => res.status(200).send(likes))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ "message": "Переданы некорректные данные" })
      } else {
        return res.status(500).send({ "message": "Ошибка на сервере" })
      }
    })
}
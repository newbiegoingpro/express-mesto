const router = require('express').Router();
const {
  createCard, getCards, deleteCard, likeCard, removeCardLike,
} = require('../controllers/cards');

router.post('/cards', createCard);

router.get('/cards', getCards);

router.delete('/cards/:cardId', deleteCard);

router.put('/cards/:cardId/likes', likeCard);

router.delete('/cards/:cardId/likes', removeCardLike);

module.exports = router;

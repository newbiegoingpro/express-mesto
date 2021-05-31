const router = require('express').Router();

router.post('/users', (req,res) => {
  res.status(404).send({"message": "Запрашиваемый ресурс не найден"})
});

router.get('/users', (req,res) => {
  res.status(404).send({"message": "Запрашиваемый ресурс не найден"})
});

router.get('/users/:userId', (req,res) => {
  res.status(404).send({"message": "Запрашиваемый ресурс не найден"})
});

router.patch('/users/me', (req,res) => {
  res.status(404).send({"message": "Запрашиваемый ресурс не найден"})
});

router.patch('/users/me/avatar', (req,res) => {
  res.status(404).send({"message": "Запрашиваемый ресурс не найден"})
});

router.post('/cards', (req,res) => {
  res.status(404).send({"message": "Запрашиваемый ресурс не найден"})
});

router.get('/cards', (req,res) => {
  res.status(404).send({"message": "Запрашиваемый ресурс не найден"})
});

router.delete('/cards/:cardId', (req,res) => {
  res.status(404).send({"message": "Запрашиваемый ресурс не найден"})
});

router.put('/cards/:cardId/likes', (req,res) => {
  res.status(404).send({"message": "Запрашиваемый ресурс не найден"})
});

router.delete('/cards/:cardId/likes', (req,res) => {
  res.status(404).send({"message": "Запрашиваемый ресурс не найден"})
})

module.exports = router;
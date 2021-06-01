const router = require('express').Router();
const {
  createUser, getUsers, getUser, updateUser, updatePhoto,
} = require('../controllers/users');

router.post('/users', createUser);

router.get('/users', getUsers);

router.get('/users/:userId', getUser);

router.patch('/users/me', updateUser);

router.patch('/users/me/avatar', updatePhoto);

module.exports = router;

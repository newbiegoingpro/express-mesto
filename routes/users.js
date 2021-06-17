const router = require('express').Router();
const {
  getUsers, getUser, updateUser, updatePhoto, getCurrentUser,
} = require('../controllers/users');

router.get('/users', getUsers);

router.get('/users/me', getCurrentUser);

router.get('/users/:userId', getUser);

router.patch('/users/me', updateUser);

router.patch('/users/me/avatar', updatePhoto);

module.exports = router;

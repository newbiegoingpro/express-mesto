const jwt = require('jsonwebtoken');
const NotFoundError = require('../errors/NotFoundError');

const { NODE_ENV, JWT } = process.env;
// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new NotFoundError('Необходима авторизация');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token,
      NODE_ENV !== 'production' ? 'some-secret-key' : JWT);
  } catch (err) {
    throw new NotFoundError('Необходима авторизация');
  }
  req.user = payload; // записываем пейлоуд в объект запроса
  next(); // пропускаем запрос дальше
};

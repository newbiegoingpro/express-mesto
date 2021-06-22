const express = require('express');
const { celebrate, Joi } = require('celebrate');
const { errors } = require('celebrate');

const { PORT = 3000 } = process.env;
const mongoose = require('mongoose');

const app = express();
const bodyParser = require('body-parser');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const blankRouter = require('./routes/blank');
const userControllers = require('./controllers/users');
const auth = require('./middlewares/auth');

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), userControllers.login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }).unknown(true),
}), userControllers.createUser);
app.use(auth);
app.use('/', userRouter);
app.use('/', cardRouter);
app.use('/', blankRouter);
app.use(errors());
app.use((err, req, res, next) => {
  console.log(err);
  const { statusCode = 500, message } = err;
  res.setHeader('Content-Type', 'application/json');
  res
    .status(statusCode)
    .send(JSON.stringify({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    }));
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

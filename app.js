const express = require('express');
const { celebrate, Joi } = require('celebrate');

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
  body: {
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  },
}), userControllers.login);
app.post('/signup', celebrate({
  body: {
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  },
}), userControllers.createUser);
app.use(auth);
app.use('/', userRouter);
app.use('/', cardRouter);
app.use('/', blankRouter);
app.use((err, req, res, next) => {
  res.status(500).send({ message: 'На сервере произошла ошибка' });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

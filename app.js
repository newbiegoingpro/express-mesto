const express = require('express');
const { PORT = 3000 } = process.env;
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));



mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
});

app.use((req, res, next) => {
  req.user = {
    _id: '60ac1837cf9cc2bf50ee58b7',
  };

  next();
});
app.use('/', userRouter);
app.use('/', cardRouter);

app.listen(PORT, () => {

    console.log(`App listening on port ${PORT}`)
});
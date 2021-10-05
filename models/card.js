const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    // eslint-disable-next-line no-useless-escape
    validate: /^(ht|f)tp(s?)\:\/\/[0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*(:(0-9)*)*(\/?)([a-zA-Z0-9\-\.\?\,\'\/\\\+&amp;%\$#_]*)?$/gi,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    minlength: 2,
    maxlength: 30,
    ref: 'user',
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    default: [],
    ref: 'user',
  }],
  createdAt:
  {
    type: Date,
    default: Date.now,
  },
  __v: {
    type: Number,
    select: false,
  },
});

module.exports = mongoose.model('card', cardSchema);

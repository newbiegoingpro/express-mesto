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
  },
  owner:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    minlength: 2,
    maxlength: 30
  },
  likes: [{
      type: mongoose.Schema.Types.ObjectId,
      default: []
     }],
  createdAt:
  {
    type: Date,
    default: Date.now
  }
  ,
  __v: {
    type: Number,
    select: false
  }
});

module.exports = mongoose.model('card', cardSchema);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  userName: {
    type: String,
    required: true
  },

  hash: {
    type: String,
    required: true
  }
});



module.exports = mongoose.model('user', schema);
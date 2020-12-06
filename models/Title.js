const mongoose = require('mongoose');

const TitleSchema = mongoose.Schema({
  rank: {
    name: {
      type: String,
      required: true
    },
    permissionNumber: {
      type: Number,
      required: true
    }
  }
});

module.exports = mongoose.model('title', TitleSchema);
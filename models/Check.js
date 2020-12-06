const mongoose = require('mongoose');

const CheckSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  checks: [
    {
      date: {
        type: String
      },
      dateTime: {
        type: Number
      },
      checkIn: {
        type: Number
      },
      checkOut: {
        type: Number
      }
    }
  ]
});

module.exports = mongoose.model('check', CheckSchema);
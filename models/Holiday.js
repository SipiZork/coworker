const mongoose = require('mongoose');

const HolidaySchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  available: {
    type: Number,
    required: true
  },
  dayoffs: [
    {
      from: {
        type: Date,
        default: Date.now
      },
      to: {
        type: Date,
        default: Date.now
      },
      days: {
        type: Number
      }
    }
  ]
});

module.exports = mongoose.model('holiday', HolidaySchema);
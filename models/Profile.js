const mongoose = require('mongoose');

const ProfileSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  title: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'title',
    required: true
  },
  position: {
    type: String,
    required: true
  },
  address: {
    zipCode: {
      type: String
    },
    county: {
      type: String
    },
    street: {
      name: {
        type: String
      },
      number: {
        type: String
      }
    }
  },
  socialSecurityNumber: {
    type: String
  },
  taxNumber: {
    type: String
  },
  holidays: [
    {
      year: {
        type: Number
      },
      freeDays: {
        type: Number
      },
      frees: [
        {
          date: {
            from: {
              type: Number
            },
            to: {
              type: Number
            }
          },
          type: {
            type: String,
            default: 'Fizetett'
          },
          accepted: {
            type: Boolean,
            default: false
          },
          decision: {
            type: Boolean,
            default: false
          }
        }
      ]
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
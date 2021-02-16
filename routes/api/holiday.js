const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const config = require('config');
const { check, validationResult } = require('express-validator');

const Profile = require('../../models/Profile');

router.post('/', async (req, res) => {
  res.send('OK');
});

// @route   GET holiday/request/me
// @desc    POST new holiday for current User
// @access  Private
router.post('/request/me', auth, async (req, res) => {
  try {
  
  const { from, to, type } = req.body;
  
  let profile = await Profile.findOne({ user: req.user.id });
  
  let theYear = new Date(from).getFullYear();
  // let theYear = 2021;
  let fromDate = new Date(from).getTime();
  let toDate = new Date(to).getTime();
  
  const existYear = profile.holidays.find(({ year }) => year === theYear);
  if (!existYear) {
    console.log("nincsen exiustYear");
    const newYear = {
      year: theYear,
      freeDays: 21,
      frees: [{
        date: {
          from: fromDate,
          to: toDate
        }
      }]
    }
    profile.holidays.unshift(newYear);
  } else {
    const newRequest = {};
    newRequest.date = { from: fromDate, to: toDate };
    newRequest.type = type;
    profile.holidays.map(holiday => {
      if (holiday.year === theYear) {
        holiday.frees.unshift(newRequest);
      }
    })
  }
  profile.save();
  res.send(profile);

} catch (error) {
  console.error(error.message);
  res.status(500).send('Server error');
}
});

// @route   GET holiday/request/:user_id
// @desc    POST new holiday for userID
// @access  Private
router.post('/request/:user_id', auth, async (req, res) => {
    try {
    
    const { from, to, type } = req.body;
    const { user_id } = req.params;
    
    let profile = await Profile.findOne({ user: user_id });
    
    let theYear = new Date(from).getFullYear();
    // let theYear = 2021;
    let fromDate = new Date(from).getTime();
    let toDate = new Date(to).getTime();
    
    const existYear = profile.holidays.find(({ year }) => year === theYear);
    if (!existYear) {
      console.log("nincsen exiustYear");
      const newYear = {
        year: theYear,
        freeDays: 21,
        frees: [{
          date: {
            from: fromDate,
            to: toDate
          }
        }]
      }
      profile.holidays.unshift(newYear);
    } else {
      const newRequest = {};
      newRequest.date = { from: fromDate, to: toDate };
      newRequest.type = type;
      profile.holidays.map(holiday => {
        if (holiday.year === theYear) {
          holiday.frees.unshift(newRequest);
        }
      })
    }
    profile.save();
    res.send(profile);

  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route   GET holiday/modify/status/:user_id/:holiday_id
// @desc    PATCH toggle holiday status
// @access  Private
router.patch('/modify/status/:user_id/:holiday_id', auth, async (req, res) => {
  const { value } = req.body;
  const { user_id, holiday_id } = req.params;
  try {
    let profile = await Profile.findOne({ user: user_id });
    profile.holidays.map(holiday => {
      holiday.frees.map(free => {
        if (free.id === holiday_id) {
          if (value !== undefined) {
            free.accepted = value;
          } else {
            free.accepted = !free.accepted;
          }
          free.decision = true;
        }
      })
    })
    profile.save();
    res.send(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

router.delete('/delete/:user_id/:holiday_id', auth, async (req, res) => {
  const { user_id, holiday_id } = req.params;
  try {
    let profile = await Profile.findOne({ user: user_id });
    await profile.holidays.map(holiday => {
      holiday.frees = holiday.frees.filter(({ id }) => id !== holiday_id);
    });
    profile.save();
    res.send(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
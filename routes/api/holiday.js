const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const config = require('config');
const { check, validationResult } = require('express-validator');

const Profile = require('../../models/Profile');

// @route   GET api/holiday
// @desc    TEST route
// @access  Public

router.get('/', (req, res) => res.send('Holiday route'));

router.get('/me', auth, (req, res) => {

});

router.post('/request', [auth, [
  check('from', 'Kezdő dátum megadása kötelező').not().isEmpty(),
  check('to', 'Vége dátum megadása kötelező').not().isEmpty()
]], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { from, to } = req.body;

    let fromDate = new Date(2020, 12, 1).getTime();
    let toDate = new Date(2020, 12, 4).getTime();
    let msPerDay = 24 * 60 * 60 * 1000;
    let days = Math.floor((toDate - fromDate) / msPerDay);
      
    console.log(days);
    /* const newRequest = { from, to }*/
    const newRequest = {};
    newRequest.date = { from: fromDate, to: toDate };
    
    console.log(newRequest);

    let profile = await Profile.findOne({ user: req.user.id });
    if (profile.holiday.free && profile.holiday.free < days) {
      return res.status('409').json({ msg: 'Nincs elég szabadnap' });
    }

    profile.holiday.holidays.unshift(newRequest);
    console.log(newRequest);
    profile.save();
    res.send(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
    
});

router.get('/', (req, res) => res.send('Holiday route'));

router.get('/', (req, res) => res.send('Holiday route'));

router.get('/', (req, res) => res.send('Holiday route'));


module.exports = router;
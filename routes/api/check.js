const { request } = require('express');
const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const auth = require('../../middleware/auth');

const Check = require('../../models/Check');
const User = require('../../models/User');
const Profile = require('../../models/Profile');
const Title = require('../../models/Title');

// @route   POST api/check/in/:year/:month/:day
// @desc    Check In
// @access  Public
router.put('/in/:year/:month/:day', auth, async (req, res) => {
  const { year, month, day } = req.params;
  const requestDate = `${year}-${month}-${day}`;
  const date = new Date();
  const checkTime = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  try {
    let check = await Check.findOne({ user: req.user.id });
    if (check.checks.find(check => check.date === requestDate)) {
      return res.status(400).send('Hiba a becsekkolás már megtörtént');
    }
    checkFields = {};
    checkFields.date = requestDate;
    checkFields.dateTime = new Date(requestDate);
    checkFields.checkIn = Date.now();
    check.checks.push(checkFields);
    await check.save();
   
    let checkByYearAndMonth = check.checks.filter(check => check.date.includes(`${year}-${month}`));
    checkByYearAndMonth.sort((a, b) => (a.dateTime > b.dateTime) ? 1 : -1);
    return res.send(checkByYearAndMonth);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send('Server error');
  }
});

// @route   POST api/check/out/:year/:month/:day
// @desc    Check Out
// @access  Public
router.put('/out/:year/:month/:day', auth, async (req, res) => {
  const { year, month, day } = req.params;
  const requestDate = `${year}-${month}-${day}`;
  const date = new Date();
  const checkTime = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

  try {
    let check = await Check.findOne({ user: req.user.id });
    let existCheck = check.checks.find(check => check.date === requestDate);
    if (existCheck && existCheck.checkOut === undefined ) {
      check = await Check.findOneAndUpdate({ user: req.user.id, 'checks.date': requestDate }, {
        $set: {
          "checks.$.checkOut": Date.now()
        }
      }, { new: true });
      
      let checkByYearAndMonth = check.checks.filter(check => check.date.includes(`${year}-${month}`));
      checkByYearAndMonth.sort((a, b) => (a.dateTime > b.dateTime) ? 1 : -1);
      return res.send(checkByYearAndMonth);
    } else if(existCheck && existCheck.checkOut !== undefined) {
      return res.status(400).send('Hiba a kicsekkolás már megtörtént');
    } else if(!existCheck) {
      res.status(400).send('Hiba a becsekkolás még nem történt meg');
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/check/me/:year/:month
// @desc    Check checks by userId by Year and Month
// @access  Private
router.get('/me/:year/:month', auth, async (req, res) => {
  const { year, month } = req.params;
    try {
      let checks = await Check.findOne({ user: req.user.id }).populate('user', ['name']);
      let checkByYearAndMonth = checks.checks.filter(check => check.date.includes(`${year}-${month}`));
      checkByYearAndMonth.sort((a, b) => (a.dateTime > b.dateTime) ? 1 : -1);
      res.send(checkByYearAndMonth);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
});

// @route   GET api/check/me
// @desc    Get current user checks
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {
    let checks = await Check.findOne({ user: req.user.id });
    if (!checks) {
      return res.status(400).json({ msg: 'Nem található becsekkolás' });
    }
    res.json(checks);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/check/:user_id
// @desc    Check checks by userId
// @access  Private
router.get('/:user_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate('title', ['rank.permissionNumber']);
    if (profile.title.rank.permissionNumber >= 2) {
      let checks = await Check.findOne({ user: req.params.user_id });
      return res.send(checks.checks);
    }
    return res.status(401).json({ msg: 'Nincs jogosultságod ehhez a lekérdezéshez' });
  } catch (error) {
    console.error(error.message);
    return res.status(500).send('Server error');
  }
});

// @route   POST api/check/:user_id/:year
// @desc    Check checks by userId by Year
// @access  Private
router.get('/:user_id/:year/', auth, async (req, res) => {
  const { user_id, year } = req.params;
    try {
      let checks = await Check.findOne({ user: user_id });
      let checkyByYear = checks.checks.filter(check => check.date.includes(year));
      res.send(checkyByYear);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
});

// @route   POST api/check/:user_id/:year/:month
// @desc    Check checks by userId by Year and Month
// @access  Private
router.get('/:user_id/:year/:month', auth, async (req, res) => {
  const { user_id, year, month } = req.params;
    try {
      let checks = await Check.findOne({ user: user_id }).populate('user', ['name']);
      let checkByYearAndMonth = checks.checks.filter(check => check.date.includes(`${year}-${month}`));
      checkByYearAndMonth.sort((a, b) => (a.dateTime > b.dateTime) ? 1 : -1);
      console.log('Leuftok');
      res.send(checkByYearAndMonth);
    } catch (error) {
      console.error(error.message);
      return res.status(500).send('Server error');
    }
});

// @route   POST api/check/:user_id/:year/:month/:day
// @desc    Check checks by userId by Year and Month and Day
// @access  Private
router.get('/:user_id/:year/:month/:day', auth, async (req, res) => {
  const { user_id, year, month, day } = req.params;
    try {
      let checks = await Check.findOne({ user: user_id });
      let checkyByYearAndMonthAndDay = checks.checks.filter(check => check.date.includes(`${year}-${month}-${day}`));
      res.send(checkyByYearAndMonthAndDay);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
});

router.put('/modify/:user_id/:check_id', auth, async (req, res) => {
  const { user_id, check_id } = req.params;
  const { year, month, day, timeIn, timeOut } = req.body;
  try {
    let checks = await Check.findOneAndUpdate({ user: user_id, 'checks._id': check_id }, {
      $set: {
        "checks.$.checkIn": timeIn,
        "checks.$.checkOut": timeOut
      }
    }, { new: true });
    let checkByYearAndMonth = checks.checks.filter(check => check.date.includes(`${year}-${month}`));
    checkByYearAndMonth.sort((a, b) => (a.dateTime > b.dateTime) ? 1 : -1);
    res.send(checkByYearAndMonth);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

router.post('/create/:user_id/', auth, async (req, res) => {
  const { user_id } = req.params;
  const { year, month, day, checkInTime, checkOutTime } = req.body;

  try {
    const dateString = `${year}-${month}-${day}`;
    const dateTime = new Date(dateString);
    let checks = await Check.findOne({ user: user_id });
    let existDate = checks.checks.filter(check => check.date.includes(`${year}-${month}-${day}`));
    console.log(existDate);
    if (existDate.length > 0) {
      return res.status(408).send({ msg: 'Megadott dátumhoz már létezik csekkolás' });
    }
    const checkFields = {};
    checkFields.date = dateString;
    checkFields.dateTime = dateTime;
    checkFields.checkIn = checkInTime;
    checkFields.checkOut = checkOutTime;
    checks.checks.push(checkFields);
    await checks.save();
    let checkByYearAndMonth = checks.checks.filter(check => check.date.includes(`${year}-${month}`));
    checkByYearAndMonth.sort((a, b) => (a.dateTime > b.dateTime) ? 1 : -1);
    return res.send(checkByYearAndMonth);
   
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

router.delete('/delete/:user_id/:check_id/:year/:month', auth, async (req, res) => {
  const { user_id, check_id, year, month } = req.params;
  try {
    let checks = await Check.findOne({ user: user_id });
    let profile = await Profile.findOne({ user: req.user.id }).populate('title', ['rank.permissionNumber']);
    console.log(checks);
    let check = checks.checks.filter(check => check._id === check_id);
    if (!check) {
      return res.status(404).json({ msg: 'Csekkolás nem található' });
    }
    // TODO ÁTIRANDÓ
    if (profile.title.rank.permissionNumber < 2) {
      return res.status(401).json({ msg: 'Authentikációs probléma' });
    }

    checks.checks = checks.checks.filter(({ id }) => id !== check_id);
    await checks.save();

    let checkByYearAndMonth = checks.checks.filter(check => check.date.includes(`${year}-${month}`));
    checkByYearAndMonth.sort((a, b) => (a.dateTime > b.dateTime) ? 1 : -1);
    return res.send(checkByYearAndMonth);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
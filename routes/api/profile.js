const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const config = require('config');
const { check, validationResult } = require('express-validator');

const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Title = require('../../models/Title');
const Check = require('../../models/Check');

// @route   GET api/profile/me
// @desc    Get current user profile
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name']).populate('title', ['rank.name', 'rank.permissionNumber']);
    
    if (!profile) {
      return res.status(400).json({ msg: 'A felhasználóhoz még nem tartozik profil'});
    }

    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/profile/
// @desc    Create or Update user profile
// @access  Private
router.post('/', [
  auth,
  [
    check('position', 'Munakör megadása kötelező').not().isEmpty()
  ]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    const {
      title,
      position,
      zipCode,
      county,
      streetName,
      streetNumber,
      socialSecurityNumber,
      taxNumber
    } = req.body

    const titleObject = await Title.findOne({ 'rank.name': title });
    const profileFields = {};
    
    profileFields.user = req.user.id;
    profileFields.title = titleObject.id;
    if (position) profileFields.position = position;
    if (socialSecurityNumber) profileFields.socialSecurityNumber = socialSecurityNumber;
    if (taxNumber) profileFields.taxNumber = taxNumber;

    profileFields.address = {};

    if (zipCode) profileFields.address.zipCode = zipCode;
    if (county) profileFields.address.county = county;

    profileFields.address.street = {};

    if (streetName) profileFields.address.street.name = streetName;
    if (streetNumber) profileFields.address.street.number = streetNumber;
    

    try {
     let profile = await Profile.findOne({ user: req.user.id });
      if (profile) {
        // Update
        profile = await Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true });

        return res.json(profile);
      }

      checkFields = {};
      checkFields.user = req.user.id;
      // Create
      profile = new Profile(profileFields);
      let check = new Check(checkFields);
      await profile.save();
      await check.save();

      res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
});

// @route   GET api/profile/
// @desc    Get all profiles
// @access  Private

router.get('/', auth, async (req, res) => {
  const user = await Profile.findOne({ user: req.user.id }).populate('title', ['rank.name', 'rank.permissionNumber']);
  if (user.title.rank.permissionNumber >= config.get('adminPermission')) {
    try {
      let profiles = await Profile.find().populate('user', ['name']).populate('title', ['rank.name', 'rank.permissionNumber']);
      profiles.sort((a, b) => (a.user.name > b.user.name) ? 1 : -1);
      res.json(profiles);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  }
});

// @route   GET api/profile/user/:user_id
// @desc    Get user by ID
// @access  Private

router.get('/user/:user_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name']).populate('title', ['rank.name', 'rank.permissionNumber']);

    if (!profile) return res.status(400).json({ msg: 'A keresett profil nem található' });
    
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    if (error.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'A keresett profil nem található' });
    }
    res.status(500).send('Server error');
  }
});


module.exports = router;
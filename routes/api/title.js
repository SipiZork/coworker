const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Profile = require('../../models/Profile');

const Title = require('../../models/Title');

// @route   POST api/title/
// @desc    Create a title
// @access  Private
router.post('/', [auth, [
  check('name', 'A munakör megnevezése kötelező').not().isEmpty(),
  check('permissionNumber', 'A munkakör engedélyszámának megadása kötelező').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  const {
    name,
    permissionNumber
  } = req.body;

  const titleFields = {}
  titleFields.rank = {}

  if (name) titleFields.rank.name = name;
  if (permissionNumber) titleFields.rank.permissionNumber = permissionNumber;

  try {
    let title = await Title.findOne({ name });
    if (title) {
      // Update
      title = await Profile.findByIdAndUpdate({ name }, { $set: titleFields }, { new: true });
      
      return res.json(title);
    }
    title = new Title(titleFields);
    await title.save();

    res.json(title);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
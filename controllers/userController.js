const { body, validationResult } = require('express-validator');

const User = require('../models/user');

exports.getMembershipForm = (req, res) => { res.render('member_form'); };

exports.grantMembership = [
  body('member_password', 'Incorrect password - please try again.')
    .exists()
    .custom((value, {}) => value === process.env.MEMBER_PASSWORD),
  async (req, res, next) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty) {
        res.render('member_form', { errors: errors.array() });
        return;
      }

      await User.findByIdAndUpdate(req.user.id, { membership_status: 'Member' });

      res.redirect('/');
    } catch (err) {
      return next(err);
    }
  }
];
const bcrypt = require('bcryptjs');
const passport = require('passport');
const { body, validationResult } = require('express-validator');

const User = require('../models/user');

exports.getSignupForm = (req, res) => { res.render('signup_form'); };

exports.getLoginForm = (req, res) => { res.render('login_form'); };

exports.signup = [
  body('first_name').trim().escape(),
  body('last_name').trim().escape(),
  body('email')
    .isEmail().withMessage('Please enter a valid email address.')
    .normalizeEmail()
    .custom(async (value, {}) => {
      const user = await User.findOne({ email: value });
      
      if (user) return Promise.reject('Email is already in use. Please enter a different email address.');
    }),
  body('pwd').exists(),
  body('confirm_pwd', 'Passwords do not match - please try again.')
    .exists()
    .custom((value, { req }) => value === req.body.pwd),
  async (req, res, next) => {
    try {
      const errors = validationResult(req);

      const saveFields = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
      };

      if (!errors.isEmpty()) {
        res.render('signup_form', {
          user: saveFields,
          errors: errors.array(),
        });
        return;
      };

      bcrypt.hash(
        req.body.pwd,
        10,
        async (err, hashedPwd) => {
          if (err) return next(err);
  
          const user = new User({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: hashedPwd,
            membership_status: 'Non-member',
          });
  
          await user.save();
  
          res.redirect('/');
        }
      );
    } catch (err) {
      return next(err);
    }
  },
];

exports.login = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
});;

exports.logout = (req, res, next) => {
  req.logout(err => {
    console.log('logout');
    if (err) return next(err);
    res.redirect('/');
  })
};
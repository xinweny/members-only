const bcrypt = require('bcryptjs');
const passport = require('passport');

const User = require('../models/user');

exports.getSignupForm = (req, res) => { res.render('signup_form'); };

exports.getLoginForm = (req, res) => { res.render('login_form'); };

exports.signup = async (req, res, next) => {
  try {
    bcrypt.hash(
      req.body.password,
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
};

exports.login = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
});

exports.logout = (req, res, next) => {
  req.logout(err => {
    if (err) return next(err);
    res.redirect('/');
  })
};
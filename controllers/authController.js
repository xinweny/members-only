const bcrypt = require('bcryptjs');

const User = require('../models/user');

exports.getSignupForm = (req, res, next) => {
  try {
    res.render('signup');
  } catch (err) {
    return next(err);
  }
};

exports.getLoginForm = (req, res, next) => {
  try {
    res.render('login');
  } catch (err) {
    return next(err);
  }
};

exports.signup = (req, res, next) => {

};

exports.login = (req, res, next) => {

};

exports.logout = (req, res, next) => {

};
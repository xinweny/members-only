const bcrypt = require('bcrypt');

const User = require('../models/user');

exports.getSignupForm = (req, res, next) => {
  res.render('signup');
};

exports.getLoginForm = (req, res, next) => {
  res.render('login');
};

exports.signup = (req, res, next) => {

};

exports.login = (req, res, next) => {

};

exports.logout = (req, res, next) => {

};
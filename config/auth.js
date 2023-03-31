const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcryptjs');

const User = require('../models/user');

exports.configSession = app => {
  app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  }));
};

exports.configPassport = app => {
  passport.use(new LocalStrategy(
    async (username, password, done) => {
      try {
        const user = await User.findOne({ username });

        if (!user) return done(null, false, { message: 'Incorect username' });

        bcrypt.compare(password, user.password, (err, res) => {
          if (res) return done(null, user);

          return done(null, false, { message: 'Incorrect password' });
        });
      } catch (err) {
        return done(err);
      }
    }
  ));

  passport.serializeUser((user, done) => { done(null, user.id); });
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  });

  app.use(passport.initialize());
  app.use(passport.session());
};
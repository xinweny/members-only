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
    { usernameField: 'email' },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });

        if (!user) return done(null, false, { message: 'Email not found. Please try again.' });

        bcrypt.compare(password, user.password, (err, res) => {
          if (res) return done(null, user);

          return done(null, false, { message: 'Incorrect password. Please try again.' });
        });
      } catch (err) {
        return done(err);
      }
    }
  ));

  passport.serializeUser((user, done) => {
    process.nextTick(() => { done(null, user._id); });
  });
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      process.nextTick(() => done(null, user));
    } catch (err) {
      return done(err);
    }
  });

  app.use(passport.initialize());
  app.use(passport.session());
};

exports.storeCurrentUser = app => {
  app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
  })
};
const passport = require('passport');
const LocalStrategy = require("passport-local").Strategy;
const User = require('../models/User');
const bcrypt = require('bcryptjs');

passport.serializeUser((user, cb) => {
  cb(null, user._id);
});

passport.deserializeUser((id, cb) => {
  User.findById(id, (err, user) => {
    if (err) { return cb(err); }
    cb(null, user);
  });
});

passport.use(new LocalStrategy((username, password, next) => {
  User.findOne({ username }, (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return next(null, false, { message: "Usuário ou senha incorretos!" });
    }

    return next(null, user);
  });
}));

module.exports = passport;
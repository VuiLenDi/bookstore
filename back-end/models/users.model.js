const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchema = Schema(
  {
    username: String,
    password: String
  },
  { timestamps: true }
);

UserSchema.pre(
  'save',
  function(next) {
    const user = this;
    if (!user.isModified('password')) {
      return next();
    }
    bcrypt.hash(user.password, 10).then(hashedPassword => {
      user.password = hashedPassword;
      next();
    });
  },
  function(err) {
    next(err);
  }
);

UserSchema.methods.comparePassword = function(candidatePassword, next) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return next(err);
    next(null, isMatch);
  });
};

const collectionName = 'Users';
const Users = mongoose.model(collectionName, UserSchema, collectionName);

module.exports = Users;

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = require('../config').tokenKey;

class Users {
  constructor(db, data) {
    this.db = db;
    this.data = data;
  }

  getAccount() {
    return {
      username: this.data.username,
      password: this.data.password
    };
  }

  createAccount() {
    // TODO:
    const user = this.getAccount();
    return this.db.Users.create(user).then(() => {
      return user;
    });
  }

  login() {
    const user = this.getAccount();

    return new Promise((resolve, reject) => {
      this.db.Users.findOne({ username: user.username }, (err, userInfo) => {
        if (err) return { err: err };

        if (bcrypt.compareSync(user.password, userInfo.password)) {
          resolve({
            id: userInfo.id,
            token: jwt.sign({ id: userInfo._id }, secretKey, {
              expiresIn: '1h'
            })
          });
        } else {
          resolve({
            err: 'Error',
            message: 'Wrong password'
          });
        }
      });
    });
  }
}

module.exports = {
  Users
};

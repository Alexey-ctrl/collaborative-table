const crypto = require('crypto');
const UserRepository = require('./UserRepository');

class UserService {
  constructor() {
    this._userReposetory = new UserRepository();
  }

  async singUp(login, password) {
    const hashPassword = this._hashPassword(password);
    return this._userReposetory.create({login, password: hashPassword});
  }

  async checkValidUser(login, password) {
    const user = await this._userReposetory.getByLogin(login);
    if (!user) return false;
    return user.password === this._hashPassword(password) ? user : false;
  }

  _hashPassword(password) {
    return crypto.createHash('md5')
      .update(password)
      .digest('hex');
  }
}

module.exports = UserService;

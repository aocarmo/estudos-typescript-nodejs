"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UsersTokensRepositoryInMemory = void 0;

var _UsersToken = require("@modules/accounts/infra/typeorm/entities/UsersToken");

class UsersTokensRepositoryInMemory {
  constructor() {
    this.usersTokens = [];
  }

  async create({
    user_id,
    expires_date,
    refresh_token
  }) {
    const userToken = new _UsersToken.UserTokens();
    Object.assign(userToken, {
      expires_date,
      refresh_token,
      user_id
    });
    this.usersTokens.push(userToken);
    return userToken;
  }

  async findByUserIdAndRefreshToken(user_id, refresh_token) {
    const userToken = this.usersTokens.find( // ut = userToken
    ut => ut.user_id === user_id && ut.refresh_token && refresh_token);
    return userToken;
  }

  async deleteById(id) {
    const userToken = this.usersTokens.find(ut => ut.id === id);
    this.usersTokens.splice(this.usersTokens.indexOf(userToken));
  }

  async findByRefreshToken(refresh_token) {
    const userToken = this.usersTokens.find(ut => ut.refresh_token === refresh_token);
    return userToken;
  }

}

exports.UsersTokensRepositoryInMemory = UsersTokensRepositoryInMemory;
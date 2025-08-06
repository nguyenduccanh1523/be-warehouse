const UserRepository = require("../repositories/UserRepository");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class UserService {
  async getAllUsers() {
    const usersData = await UserRepository.findAll();
    return usersData.map(
      (user) => new User(user.id, user.username, user.password)
    );
  }

  async createUser(userData) {
    const salt = await bcrypt.genSalt(10);
    userData.password = await bcrypt.hash(userData.password, salt);
    const user = new User(null, userData.username, userData.password);
    const createdUser = await UserRepository.create(user);
    return new User(createdUser.id, createdUser.username, createdUser.password);
  }

  async login(username, password) {
    const user = await UserRepository.findByUsername(username);
    if (!user) return null;

    const valid = bcrypt.compareSync(password, user.password);
    if (!valid) return null;

    const accessToken = jwt.sign(
      { id: user.id, username: user.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRES }
    );

    const refreshToken = jwt.sign(
      { id: user.id, username: user.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: process.env.REFRESH_TOKEN_EXPIRES }
    );

    return {
      user: new User(user.id, user.username, user.password),
      accessToken,
      refreshToken,
    };
  }

  async refresh(refreshToken) {
    try {
      const payload = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET
      );
      const accessToken = jwt.sign(
        { id: payload.id, username: payload.username },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRES }
      );
      return { accessToken };
    } catch (error) {
      return null;
    }
  }
}

module.exports = new UserService();

const UserService = require('../services/UserService');
const User = require('../models/User');

class UserController {
  async getAllUsers(req, res) {
    const users = await UserService.getAllUsers();
    res.json(users);
  }

  async createUser(req, res) {
    const {username, password} = req.body;
    const newUser = new User(null, username, password);
    const user = await UserService.createUser(newUser);
    res.status(201).json({user});
  }

  async login(req, res) {
    const {username, password} = req.body;
    const result = await UserService.login(username, password);
    if (!result) {
      return res.status(401).json({message: 'Invalid credentials'});
    }
    res.json({user: result.user, accessToken: result.accessToken, refreshToken: result.refreshToken});
  }

  async refreshToken(req, res) {
    const {refreshToken} = req.body;
    if (!refreshToken) return res.status(401).json({message: 'No refresh token provided'});

    const newAccessToken = await UserService.refresh(refreshToken);
    if (!newAccessToken) return res.status(403).json({message: 'Invalid refresh token'});

    res.json({accessToken: newAccessToken.accessToken});
  }
}

module.exports = new UserController();
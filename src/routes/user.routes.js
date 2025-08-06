const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const authMiddleware = require('../middlewares/auth');

router.get('/', authMiddleware, UserController.getAllUsers);
router.post('/register', UserController.createUser);
router.post('/login', UserController.login);
router.post('/refresh-token', UserController.refreshToken);

module.exports = router;

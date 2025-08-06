const db = require('../config/db');

class UserRepository {
  async findAll () {
    const [rows] = await db.query('SELECT * FROM users');
    return rows;
  }

  async create (user) {
    const { username, password } = user;
    const [result] = await db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, password]);
    return { id: result.insertId, ...user };
  }

  async findByUsername (username) {
    const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
    return rows?.length ? rows[0] : null;
  }

}

module.exports = new UserRepository();
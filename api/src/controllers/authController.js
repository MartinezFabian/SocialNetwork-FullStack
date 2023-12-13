import { db } from '../../connect.js';
import bcrypt from 'bcryptjs';

export const register = (req, res) => {
  // Check if user already exists:
  const q = 'SELECT * FROM users WHERE username = ?';

  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);

    if (data.length > 0) return res.status(409).json('This username already exists!');

    // Create New User:

    // 1. hash password => "password" => "$2b$10$9k4FZ7YfZ8Zs9k4FZ7YfZ..."

    // Determines how many times the hashing algorithm will be executed
    const salt = bcrypt.genSaltSync(10);
    // Hash the password received in req.body.password using the generated salt
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    // 2. insert new user into database
    const q = 'INSERT INTO users (`username`, `email`, `password`, `name`) VALUES (?)';

    const values = [req.body.username, req.body.email, hashedPassword, req.body.name];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);

      return res.status(200).json('User has been created.');
    });
  });
};

export const login = (req, res) => {
  // TODO: Implement this controller
};

export const logout = (req, res) => {
  // TODO: Implement this controller
};

import jwt from 'jsonwebtoken';
import { db } from '../../connect.js';

export const getUser = (req, res) => {
  const userId = req.params.id;

  const q = `SELECT * FROM users WHERE id = ?`;

  db.query(q, [userId], (err, data) => {
    if (err) return res.status(500).json(err);

    const { password, ...userData } = data[0];

    return res.status(200).json(userData);
  });
};

export const updateUser = (req, res) => {
  const token = req.cookies.access_token;

  if (!token) return res.status(401).json('Not authenticated!');

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, userInfo) => {
    if (err) return res.status(403).json('Token is not valid!');

    const q = `UPDATE users SET name = ?, city = ?, contact = ? WHERE id = ?;`;

    db.query(q, [req.body.name, req.body.city, req.body.contact, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);

      if (data.affectedRows > 0) return res.json('User has been updated!');
    });
  });
};

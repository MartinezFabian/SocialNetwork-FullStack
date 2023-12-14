import jwt from 'jsonwebtoken';
import moment from 'moment';
import { db } from '../../connect.js';

export const addPost = (req, res) => {
  const token = req.cookies.access_token;

  if (!token) return res.status(401).json('Not authenticated!');

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, userInfo) => {
    if (err) return res.status(403).json('Token is not valid!');

    const q = `INSERT INTO posts (description, userid, created_ago) VALUES (?)`;

    const values = [
      req.body.description,
      userInfo.id,
      moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);

      return res.status(200).json('Post has been created!');
    });
  });
};

export const getPost = (req, res) => {
  // TODO: Implement this controller
};

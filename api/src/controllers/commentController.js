import jwt from 'jsonwebtoken';
import { db } from '../../connect.js';
import moment from 'moment';

export const addComment = (req, res) => {
  const token = req.cookies.access_token;

  if (!token) return res.status(401).json('Not authenticated!');

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, userInfo) => {
    if (err) return res.status(403).json('Token is not valid!');

    const q = `INSERT INTO comments (description, created_ago, userid, postid) VALUES (?)`;

    const values = [
      req.body.description,
      moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
      userInfo.id,
      req.body.postId,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);

      return res.status(200).json('Comment has been created!');
    });
  });
};

export const getComments = (req, res) => {
  // TODO: Implement this controller
};

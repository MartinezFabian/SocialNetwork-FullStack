import { db } from '../../connect.js';
import jwt from 'jsonwebtoken';

export const addLike = (req, res) => {
  const token = req.cookies.access_token;

  if (!token) return res.status(401).json('Not authenticated!');

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, userInfo) => {
    if (err) return res.status(403).json('Token is not valid!');

    const q = `INSERT INTO likes (userid, postid ) VALUES (?)`;

    const values = [userInfo.id, req.body.postId];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);

      return res.status(200).json('The like has been given');
    });
  });
};

export const getLikes = (req, res) => {
  // TODO: Implement this controller
};

export const deleteLike = (req, res) => {
  // TODO: Implement this controller
};

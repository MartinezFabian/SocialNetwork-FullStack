import jwt from 'jsonwebtoken';
import { db } from '../../connect.js';

export const addRelationship = (req, res) => {
  const token = req.cookies.access_token;

  if (!token) return res.status(401).json('Not authenticated!');

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, userInfo) => {
    if (err) return res.status(403).json('Token is not valid!');

    const q = `INSERT INTO relationships (follower_userid, followed_userid) VALUES (?)`;

    const values = [userInfo.id, req.body.userId];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);

      return res.status(200).json('Following user!');
    });
  });
};

export const getRelationship = (req, res) => {
  // TODO: implement this controller
};

export const deleteRelationship = (req, res) => {
  // TODO: implement this controller
};

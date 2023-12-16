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
  const userId = req.query.userId;

  const token = req.cookies.access_token;

  if (!token) return res.status(401).json('Not authenticated!');

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, userInfo) => {
    if (err) return res.status(403).json('Token is not valid!');

    // first query to get posts only from the user
    // second query to get posts from the user and the user's followers
    const q = userId
      ? `
      SELECT p.*, u.name
      FROM posts AS p INNER JOIN users AS u
      ON p.userid = u.id 
      WHERE p.userid = ?
      ORDER BY p.created_ago DESC;
    `
      : `
      SELECT p.*, u.name
      FROM posts AS p INNER JOIN users AS u
      ON p.userid = u.id
      LEFT JOIN relationships AS r
      ON r.followed_userid = p.userid
      WHERE r.follower_userid = ? OR p.userid = ?
      ORDER BY p.created_ago DESC;
    `;

    db.query(q, userId ? [userId] : [userInfo.id, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);

      return res.status(200).json(data);
    });
  });
};

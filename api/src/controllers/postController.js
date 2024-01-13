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
    const q =
      userId !== undefined
        ? `
      SELECT p.*, u.name
      FROM posts AS p INNER JOIN users AS u
      ON p.userid = u.id 
      WHERE p.userid = ?
      ORDER BY p.created_ago DESC;
    `
        : `
      SELECT p.id, p.description, p.userid, p.created_ago,  MAX(u.name) as name
      FROM posts AS p INNER JOIN users AS u 
      ON p.userid = u.id
      LEFT JOIN relationships AS r 
      ON r.followed_userid = p.userid
      WHERE r.follower_userid = ? OR p.userid = ?
      GROUP BY p.id
      ORDER BY p.created_ago DESC;
    `;

    const values = userId !== undefined ? [userId] : [userInfo.id, userInfo.id];

    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);

      return res.status(200).json(data);
    });
  });
};

export const deletePost = (req, res) => {
  const token = req.cookies.access_token;

  if (!token) return res.status(401).json('Not authenticated!');

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, userInfo) => {
    if (err) return res.status(403).json('Token is not valid!');

    const q = `DELETE FROM posts WHERE id = ? AND userid = ?;`;

    db.query(q, [req.params.id, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);

      if (data.affectedRows > 0) return res.status(200).json('Post has been deleted!');

      return res.status(403).json('You can only delete your posts!');
    });
  });
};

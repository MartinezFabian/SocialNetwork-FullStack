import { useState } from 'react';
import { Link } from 'react-router-dom';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';

import styles from './Post.module.css';
import { CommentsList } from './CommentsList';

export const Post = ({ id, description, userid, created_ago, name }) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const liked = false;

  return (
    <li className={styles.container}>
      <section className={styles.user}>
        <div className={styles.userInfo}>
          <AccountCircleRoundedIcon
            sx={{ fontSize: 36, color: '#766cff' }}
          ></AccountCircleRoundedIcon>
          <div className={styles.details}>
            <Link to={`/profile/${userid}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <span className={styles.name}>{name}</span>
            </Link>
            <span className={styles.date}>1 min ago</span>
          </div>
        </div>
        <MoreHorizIcon />
      </section>

      <section className={styles.content}>
        <p className={styles.text}>{description}</p>
      </section>

      <section className={styles.info}>
        <div className={styles.item}>
          {liked ? <FavoriteOutlinedIcon /> : <FavoriteBorderOutlinedIcon />}
          100 Likes
        </div>
        <div onClick={() => setCommentOpen((prevState) => !prevState)} className={styles.item}>
          <TextsmsOutlinedIcon />
          22 Comments
        </div>
      </section>
      {commentOpen ? <CommentsList postid={id}></CommentsList> : null}
    </li>
  );
};

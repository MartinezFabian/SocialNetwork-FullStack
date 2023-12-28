import PlaceIcon from '@mui/icons-material/Place';
import LanguageIcon from '@mui/icons-material/Language';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';

import { Post } from '../components/Post';
import styles from './ProfilePage.module.css';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

export const ProfilePage = () => {
  const { currentUser } = useContext(AuthContext);

  const posts = [
    {
      id: 15,
      description: 'Posts 4 desde Postman User test',
      userid: 2,
      created_ago: '2023-12-15T23:42:45.000Z',
      name: 'fabian m',
    },
    {
      id: 3,
      description: 'Posts 3 desde Postman Fabian',
      userid: 2,
      created_ago: '2023-12-14T23:39:14.000Z',
      name: 'fabian m',
    },
    {
      id: 2,
      description: 'Posts 2 desde Postman Fabian',
      userid: 2,
      created_ago: '2023-12-14T23:39:08.000Z',
      name: 'fabian m',
    },
    {
      id: 1,
      description: 'Posts 1 desde Postman Fabian',
      userid: 2,
      created_ago: '2023-12-14T23:38:41.000Z',
      name: 'fabian m',
    },
  ];

  return (
    <>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.right}>
            <MoreVertIcon />
          </div>
          <div className={styles.user}>
            <AccountCircleRoundedIcon
              sx={{ fontSize: 80, color: '#766cff' }}
            ></AccountCircleRoundedIcon>
            <span className={styles.username}>{currentUser.name}</span>
          </div>

          <div className={styles.center}>
            <div className={styles.info}>
              <div className={styles.item}>
                <span className={styles.city}>@{currentUser.username}</span>
              </div>
              <div className={styles.item}>
                <PlaceIcon />
                <span className={styles.city}>{currentUser.city}</span>
              </div>
              <div className={styles.item}>
                <LanguageIcon />
                <a className={styles.contact}>{currentUser.contact}</a>
              </div>
            </div>

            <button className={styles.follow}>follow</button>
          </div>
        </div>
      </div>

      <ul className={styles.posts}>
        {posts.map((post) => {
          return <Post key={post.id} {...post}></Post>;
        })}
      </ul>
    </>
  );
};

import PlaceIcon from '@mui/icons-material/Place';
import LanguageIcon from '@mui/icons-material/Language';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';

import { Post } from '../components/Post';
import styles from './ProfilePage.module.css';

import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { makeRequest } from '../../axios';

export const ProfilePage = () => {
  const { id } = useParams();

  const {
    isLoading: isLoadingPosts,
    error: errorPosts,
    data: posts,
  } = useQuery({
    queryKey: ['postId'],
    queryFn: () =>
      makeRequest.get(`/posts?userId=${id}`).then((res) => {
        return res.data;
      }),
  });

  const {
    isLoading: isLoadingUser,
    error: errorUser,
    data: userData,
  } = useQuery({
    queryKey: ['user'],
    queryFn: () =>
      makeRequest.get(`/users/find/${id}`).then((res) => {
        return res.data;
      }),
  });

  return (
    <>
      {errorUser ? (
        'An error has occurred: ' + errorUser
      ) : isLoadingUser ? (
        'Loading...'
      ) : (
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.right}>
              <MoreVertIcon />
            </div>
            <div className={styles.user}>
              <AccountCircleRoundedIcon
                sx={{ fontSize: 80, color: '#766cff' }}
              ></AccountCircleRoundedIcon>
              <span className={styles.username}>{userData.name}</span>
            </div>

            <div className={styles.center}>
              <div className={styles.info}>
                <div className={styles.item}>
                  <span className={styles.city}>@{userData.username}</span>
                </div>
                <div className={styles.item}>
                  <PlaceIcon />
                  <span className={styles.city}>{userData.city}</span>
                </div>
                <div className={styles.item}>
                  <LanguageIcon />
                  <a className={styles.contact}>{userData.contact}</a>
                </div>
              </div>

              <button className={styles.follow}>follow</button>
            </div>
          </div>
        </div>
      )}

      {errorPosts ? (
        'An error has occurred: ' + errorPosts
      ) : isLoadingPosts ? (
        'Loading...'
      ) : (
        <ul className={styles.posts}>
          {posts.map((post) => {
            return <Post key={post.id} {...post}></Post>;
          })}
        </ul>
      )}
    </>
  );
};

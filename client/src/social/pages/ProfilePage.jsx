import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import PlaceIcon from '@mui/icons-material/Place';
import EmailIcon from '@mui/icons-material/Email';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';

import { Post } from '../components/Post';
import styles from './ProfilePage.module.css';
import { makeRequest } from '../../axios';
import { UpdateProfile } from '../components/UpdateProfile';

export const ProfilePage = () => {
  const [openUpdate, setOpenUpdate] = useState(false);
  const { currentUser, logoutUser } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();

  // posts data query

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

  // user data query

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

  // Follow / Unfollow logic
  const { data: followersData = [] } = useQuery({
    queryKey: ['follow'],
    queryFn: () =>
      makeRequest.get(`relationship?followedUserId=${id}`).then((res) => {
        return res.data;
      }),
  });

  const queryClient = useQueryClient();

  const follow = (isFollowing) => {
    if (isFollowing) {
      return makeRequest.delete(`relationship?userId=${id}`);
    } else {
      return makeRequest.post('relationship', { userId: id });
    }
  };

  const followMutation = useMutation({
    mutationFn: follow,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['follow'] });
    },
  });

  const onFollow = () => {
    followMutation.mutate(followersData.includes(currentUser.id)); //  true or false based on if the user is already following
  };

  // logout logic

  const onLogout = async () => {
    try {
      await logoutUser();
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {errorUser ? (
        'An error has occurred: ' + errorUser
      ) : isLoadingUser ? (
        <div className="loader-container">
          <span className="loader"></span>
        </div>
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
                  <EmailIcon />
                  <a className={styles.contact}>{userData.contact}</a>
                </div>
              </div>

              {parseInt(currentUser.id) === parseInt(id) ? (
                <div className={styles.buttons}>
                  <button
                    onClick={() => setOpenUpdate((prevState) => !prevState)}
                    className={styles.follow}
                  >
                    <EditIcon />
                    Edit Profile
                  </button>

                  <button onClick={onLogout} className={styles.logout}>
                    <LogoutIcon />
                    Log Out
                  </button>
                </div>
              ) : (
                <button onClick={onFollow} className={styles.follow}>
                  {followersData.includes(currentUser.id) ? 'unfollow' : 'follow'}
                </button>
              )}
            </div>
          </div>

          {openUpdate && <UpdateProfile setOpenUpdate={setOpenUpdate} userData={userData} />}
        </div>
      )}

      {errorPosts ? (
        'An error has occurred: ' + errorPosts
      ) : isLoadingPosts ? (
        <div className="loader-container">
          <span className="loader"></span>
        </div>
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

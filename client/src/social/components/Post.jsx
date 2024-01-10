import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';

import styles from './Post.module.css';
import { CommentsList } from './CommentsList';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { makeRequest } from '../../axios';
import { AuthContext } from '../../context/AuthContext';
import moment from 'moment';

export const Post = ({ id, description, userid, created_ago, name }) => {
  const [commentOpen, setCommentOpen] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const { isLoading, data: likesData } = useQuery({
    queryKey: ['likes', id],
    queryFn: () =>
      makeRequest.get(`likes?postid=${id}`).then((res) => {
        return res.data;
      }),
  });

  const queryClient = useQueryClient();

  const giveLike = (isLiked) => {
    if (isLiked) {
      return makeRequest.delete(`likes?postid=${id}`);
    } else {
      return makeRequest.post('likes', { postId: id });
    }
  };

  const mutation = useMutation({
    mutationFn: giveLike,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['likes'] });
    },
  });

  const onLike = () => {
    mutation.mutate(likesData.includes(currentUser.id)); // true or false based on if the user already liked
  };

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
            <span className={styles.date}>{moment(created_ago).fromNow()}</span>
          </div>
        </div>
        <MoreHorizIcon />
      </section>

      <section className={styles.content}>
        <p className={styles.text}>{description}</p>
      </section>

      <section className={styles.info}>
        <div className={styles.item}>
          {isLoading ? (
            'Loading...'
          ) : likesData.includes(currentUser.id) ? (
            <FavoriteOutlinedIcon onClick={onLike} sx={{ fontSize: 18 }} />
          ) : (
            <FavoriteBorderOutlinedIcon onClick={onLike} sx={{ fontSize: 18 }} />
          )}
          {likesData?.length} Likes
        </div>
        <div onClick={() => setCommentOpen((prevState) => !prevState)} className={styles.item}>
          <TextsmsOutlinedIcon /> Comments
        </div>
      </section>
      {commentOpen ? <CommentsList postid={id}></CommentsList> : null}
    </li>
  );
};

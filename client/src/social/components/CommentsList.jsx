import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import styles from './CommentsList.module.css';
import { useQuery } from '@tanstack/react-query';
import { makeRequest } from '../../axios';
import moment from 'moment';

export const CommentsList = ({ postid }) => {
  const {
    isLoading,
    error,
    data: commentsData,
  } = useQuery({
    queryKey: ['comments'],
    queryFn: () =>
      makeRequest.get(`/comments?postid=${postid}`).then((res) => {
        return res.data;
      }),
  });

  return (
    <section className={styles.comments}>
      <div className={styles.write}>
        <AccountCircleRoundedIcon
          sx={{ fontSize: 28, color: '#766cff' }}
        ></AccountCircleRoundedIcon>
        <input type="text" placeholder="write a comment" className={styles.input} />
        <button className={styles.button}>Send</button>
      </div>

      {error
        ? 'An error has occurred : ' + error
        : isLoading
        ? 'Loading...'
        : commentsData.map((comment) => (
            <div key={comment.id} className={styles.comment}>
              <AccountCircleRoundedIcon
                sx={{ fontSize: 28, color: '#766cff' }}
              ></AccountCircleRoundedIcon>
              <div className={styles.info}>
                <span className={styles.name}>{comment.name}</span>
                <p className={styles.description}>{comment.description}</p>
              </div>
              <span className={styles.date}>{moment(comment.created_ago).fromNow()}</span>
            </div>
          ))}
    </section>
  );
};

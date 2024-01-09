import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import styles from './CommentsList.module.css';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { makeRequest } from '../../axios';
import moment from 'moment';
import { useState } from 'react';

export const CommentsList = ({ postid }) => {
  const [text, setText] = useState('');

  const queryClient = useQueryClient();

  const uploadComment = (newComment) => {
    return makeRequest.post('/comments', newComment);
  };

  const mutation = useMutation({
    mutationFn: uploadComment,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['comments'] });
    },
  });

  const onInputChange = (e) => {
    setText(e.target.value);
  };

  const onSendComment = () => {
    mutation.mutate({ description: text, postId: postid });

    setText('');
  };

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
        <input
          type="text"
          onChange={onInputChange}
          value={text}
          placeholder="write a comment"
          className={styles.input}
        />
        <button onClick={onSendComment} className={styles.button}>
          Send
        </button>
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

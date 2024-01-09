import { useState } from 'react';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import styles from './AddPost.module.css';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { makeRequest } from '../../axios';

export const AddPost = () => {
  const [text, setText] = useState('');

  const queryClient = useQueryClient();

  const uploadPost = (newPost) => {
    return makeRequest.post('/posts', newPost);
  };

  const mutation = useMutation({
    mutationFn: uploadPost,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  const onInputChange = (e) => {
    setText(e.target.value);
  };

  const onFormSubmit = (e) => {
    e.preventDefault();

    mutation.mutate({ description: text });

    setText('');
  };

  return (
    <form onSubmit={onFormSubmit} className={styles.container}>
      <div className={styles.left}>
        <AccountCircleRoundedIcon
          sx={{ fontSize: 30, color: '#766cff' }}
        ></AccountCircleRoundedIcon>
      </div>

      <div className={styles.right}>
        <textarea
          type="text"
          placeholder="What's happening?"
          onChange={onInputChange}
          value={text}
          maxLength={140}
          className={styles.input}
        />

        <div className={styles.buttons}>
          <button type="submit" className={styles.button}>
            Share
          </button>
        </div>
      </div>
    </form>
  );
};

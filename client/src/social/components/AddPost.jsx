import { useState } from 'react';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import styles from './AddPost.module.css';

export const AddPost = () => {
  const [text, setText] = useState('');

  const onInputChange = (e) => {
    setText(e.target.value);
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    console.log(text);
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

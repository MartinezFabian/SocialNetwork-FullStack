import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import styles from './CommentsList.module.css';

export const CommentsList = () => {
  const comments = [
    {
      id: 14,
      description:
        'Esta es otro comentario desde Postmanaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
      created_ago: '2023-12-25T21:48:16.000Z',
      userid: 2,
      postid: 3,
      name: 'fabian m',
    },
    {
      id: 12,
      description: 'Esta es otro comentario desde Postman',
      created_ago: '2023-12-25T21:48:15.000Z',
      userid: 2,
      postid: 3,
      name: 'fabian m',
    },
    {
      id: 13,
      description: 'Esta es otro comentario desde Postman',
      created_ago: '2023-12-25T21:48:15.000Z',
      userid: 2,
      postid: 3,
      name: 'fabian m',
    },
  ];

  return (
    <section className={styles.comments}>
      <div className={styles.write}>
        <AccountCircleRoundedIcon
          sx={{ fontSize: 28, color: '#766cff' }}
        ></AccountCircleRoundedIcon>
        <input type="text" placeholder="write a comment" className={styles.input} />
        <button className={styles.button}>Send</button>
      </div>

      {comments.map((comment) => (
        <div key={comment.id} className={styles.comment}>
          <AccountCircleRoundedIcon
            sx={{ fontSize: 28, color: '#766cff' }}
          ></AccountCircleRoundedIcon>
          <div className={styles.info}>
            <span className={styles.name}>{comment.name}</span>
            <p className={styles.description}>{comment.description}</p>
          </div>
          <span className={styles.date}>1 hour ago</span>
        </div>
      ))}
    </section>
  );
};

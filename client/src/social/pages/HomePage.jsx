import { AddPost } from '../components/AddPost';
import { Post } from '../components/Post';
import styles from './HomePage.module.css';

export const HomePage = () => {
  const posts = [
    {
      id: 15,
      description: 'Posts 4 desde Postman User test',
      userid: 2,
      created_ago: '2023-12-15T23:42:45.000Z',
      name: 'fabian m',
    },
    {
      id: 10,
      description: 'Posts 5 desde Postman Juan',
      userid: 3,
      created_ago: '2023-12-14T23:40:07.000Z',
      name: 'juan',
    },
    {
      id: 9,
      description: 'Posts 4 desde Postman Juan',
      userid: 3,
      created_ago: '2023-12-14T23:40:04.000Z',
      name: 'juan',
    },
    {
      id: 8,
      description: 'Posts 3 desde Postman Juan',
      userid: 3,
      created_ago: '2023-12-14T23:39:59.000Z',
      name: 'juan',
    },
    {
      id: 7,
      description: 'Posts 2 desde Postman Juan',
      userid: 3,
      created_ago: '2023-12-14T23:39:55.000Z',
      name: 'juan',
    },
    {
      id: 6,
      description: 'Posts 1 desde Postman Juan',
      userid: 3,
      created_ago: '2023-12-14T23:39:51.000Z',
      name: 'juan',
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
    <div className={styles.homepage}>
      <AddPost></AddPost>

      <ul className={styles.posts}>
        {posts.map((post) => {
          return <Post key={post.id} {...post}></Post>;
        })}
      </ul>
    </div>
  );
};

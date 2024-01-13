import { useQuery } from '@tanstack/react-query';
import { AddPost } from '../components/AddPost';
import { Post } from '../components/Post';
import styles from './HomePage.module.css';
import { makeRequest } from '../../axios';

export const HomePage = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ['posts'],
    queryFn: () =>
      makeRequest.get('/posts').then((res) => {
        return res.data;
      }),
  });

  return (
    <div className={styles.homepage}>
      <AddPost></AddPost>

      {error ? (
        'An error has occurred: ' + error
      ) : isLoading ? (
        <div className="loader-container">
          <span className="loader"></span>
        </div>
      ) : (
        <ul className={styles.posts}>
          {data.map((post) => {
            return <Post key={post.id} {...post}></Post>;
          })}
        </ul>
      )}
    </div>
  );
};

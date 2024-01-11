import styles from './RightBar.module.css';

import { makeRequest } from '../axios';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';
import { UserSuggestionItem } from '../social/components/UserSuggestionItem';

export const RightBar = () => {
  const { currentUser } = useContext(AuthContext);

  const {
    isLoading,
    error,
    data: allUsers,
  } = useQuery({
    queryKey: ['comments'],
    queryFn: () =>
      makeRequest.get(`users/all`).then((res) => {
        return res.data;
      }),
  });

  return (
    <aside className={styles.aside}>
      <div className={styles.card}>
        <p className={styles.title}>Suggestions for you</p>

        <ul className={styles.list}>
          {error
            ? 'Something went wrong'
            : isLoading
            ? 'Loading...'
            : allUsers.map((user) => {
                return user.id === currentUser.id ? null : (
                  <UserSuggestionItem key={user.id} {...user}></UserSuggestionItem>
                );
              })}
        </ul>
      </div>
    </aside>
  );
};

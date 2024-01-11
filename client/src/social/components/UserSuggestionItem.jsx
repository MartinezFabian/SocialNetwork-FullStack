import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import styles from './UserSuggestionItem.module.css';
import { Link } from 'react-router-dom';

export const UserSuggestionItem = ({ id, name }) => {
  const onProfileRefresh = () => {
    history.push(`/profile/${id}`);
  };

  return (
    <li className={styles.item}>
      <Link to={`/profile/${id}`} onClick={onProfileRefresh} className={styles.link}>
        <AccountCircleRoundedIcon
          sx={{ fontSize: 20, color: '#766cff' }}
        ></AccountCircleRoundedIcon>
        <span className={styles.name}>{name}</span>
      </Link>
    </li>
  );
};

import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import styles from './RightBar.module.css';
import { Link } from 'react-router-dom';

export const RightBar = () => {
  return (
    <aside className={styles.aside}>
      <div className={styles.card}>
        <p className={styles.title}>Suggestions for you</p>

        <ul className={styles.list}>
          <li className={styles.item}>
            <Link to="/profile/2" className={styles.link}>
              <AccountCircleRoundedIcon
                sx={{ fontSize: 20, color: '#766cff' }}
              ></AccountCircleRoundedIcon>
              <span className={styles.name}>Juan Perez</span>
            </Link>
          </li>
          <li className={styles.item}>
            <Link to="/profile/2" className={styles.link}>
              <AccountCircleRoundedIcon
                sx={{ fontSize: 20, color: '#766cff' }}
              ></AccountCircleRoundedIcon>
              <span className={styles.name}>Juan Perez</span>
            </Link>
          </li>
          <li className={styles.item}>
            <Link to="/profile/2" className={styles.link}>
              <AccountCircleRoundedIcon
                sx={{ fontSize: 20, color: '#766cff' }}
              ></AccountCircleRoundedIcon>
              <span className={styles.name}>Juan Perez</span>
            </Link>
          </li>
          <li className={styles.item}>
            <Link to="/profile/2" className={styles.link}>
              <AccountCircleRoundedIcon
                sx={{ fontSize: 20, color: '#766cff' }}
              ></AccountCircleRoundedIcon>
              <span className={styles.name}>Juan Perez</span>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};

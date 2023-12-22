import { NavLink } from 'react-router-dom';
import styles from './LeftBar.module.css';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';

export const LeftBar = () => {
  return (
    <aside className={styles.aside}>
      <ul className={styles.list}>
        <li className={styles.item}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active} ` : styles.link
            }
          >
            <HomeRoundedIcon />
            Home
          </NavLink>
        </li>
        <li className={styles.item}>
          <NavLink
            to="/profile/1"
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active} ` : styles.link
            }
          >
            <PersonRoundedIcon />
            Profile
          </NavLink>
        </li>
      </ul>
    </aside>
  );
};

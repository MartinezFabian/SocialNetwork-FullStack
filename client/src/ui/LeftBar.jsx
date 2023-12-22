import { NavLink } from 'react-router-dom';
import styles from './LeftBar.module.css';

export const LeftBar = () => {
  return (
    <aside className={styles.aside}>
      <ul className={styles.list}>
        <li className={styles.item}>
          <NavLink
            exact
            to="/"
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active} ` : styles.link
            }
          >
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
            Profile
          </NavLink>
        </li>
      </ul>
    </aside>
  );
};

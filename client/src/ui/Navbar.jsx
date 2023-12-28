import { Link } from 'react-router-dom';
import ConnectWithoutContactOutlinedIcon from '@mui/icons-material/ConnectWithoutContactOutlined';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import styles from './Navbar.module.css';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export const Navbar = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.link}>
        <ConnectWithoutContactOutlinedIcon
          sx={{ fontSize: 30, color: '#675dff' }}
        ></ConnectWithoutContactOutlinedIcon>
        <h1 className={styles.appname}>Social Network </h1>
      </Link>

      <Link to="/profile/1" className={styles.link}>
        <AccountCircleRoundedIcon
          sx={{ fontSize: 20, color: '#766cff' }}
        ></AccountCircleRoundedIcon>
        <span className={styles.username}>{currentUser.username}</span>
      </Link>
    </nav>
  );
};

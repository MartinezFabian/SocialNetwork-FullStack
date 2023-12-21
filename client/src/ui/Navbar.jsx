import { Link } from 'react-router-dom';
import ConnectWithoutContactOutlinedIcon from '@mui/icons-material/ConnectWithoutContactOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import styles from './Navbar.module.css';

export const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.link}>
        <ConnectWithoutContactOutlinedIcon
          sx={{ fontSize: 30, color: '#675dff' }}
        ></ConnectWithoutContactOutlinedIcon>
        <h1 className={styles.appname}>Social Network </h1>
      </Link>

      <Link to="/profile/1" className={styles.link}>
        <AccountCircleOutlinedIcon sx={{ fontSize: 18, color: '#fff' }}></AccountCircleOutlinedIcon>
        <span className={styles.username}>Fabian Martinez</span>
      </Link>
    </nav>
  );
};

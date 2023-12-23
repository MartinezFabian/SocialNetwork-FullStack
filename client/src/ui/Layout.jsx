import { Outlet } from 'react-router-dom';
import { LeftBar } from './LeftBar';
import { Navbar } from './Navbar';
import { RightBar } from './RightBar';
import styles from './Layout.module.css';

export const Layout = () => {
  return (
    <>
      <Navbar></Navbar>
      <div className={styles.container}>
        <LeftBar />

        <div className={styles.mainContainer}>
          <main className={styles.main}>
            <Outlet />
          </main>
          <RightBar />
        </div>
      </div>
    </>
  );
};

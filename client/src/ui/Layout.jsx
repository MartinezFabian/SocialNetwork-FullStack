import { Outlet } from 'react-router-dom';
import { LeftBar } from './LeftBar';
import { Navbar } from './Navbar';
import { RightBar } from './RightBar';

export const Layout = () => {
  return (
    <>
      <Navbar></Navbar>
      <div style={{ display: 'flex' }}>
        <LeftBar />
        <main style={{ flex: 6 }}>
          <Outlet />
        </main>
        <RightBar />
      </div>
    </>
  );
};

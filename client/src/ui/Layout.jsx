import { Outlet } from 'react-router-dom';
import { LeftBar } from '../social/components/LeftBar';
import { Navbar } from '../social/components/Navbar';
import { RightBar } from '../social/components/RightBar';

export const Layout = () => {
  return (
    <>
      <Navbar></Navbar>
      <div style={{ display: 'flex' }}>
        <LeftBar />
        <div style={{ flex: 6 }}>
          <Outlet />
        </div>
        <RightBar />
      </div>
    </>
  );
};

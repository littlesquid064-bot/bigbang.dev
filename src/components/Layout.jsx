import React from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import HeaderBar from './HeaderBar';
import BottomNavigationBar from './BottomNavigationBar';
import FloatingActionButton from './FloatingActionButton';
import { Plus } from 'lucide-react';

function Layout() {
  const location = useLocation();

  const showFab = location.pathname === '/' || location.pathname === '/orders';

  return (
    <div className="layout-container">
      <HeaderBar />
      <main className="main-content">
        <Outlet />
      </main>
      {showFab && (
        <Link to="/orders/new">
          <FloatingActionButton icon={<Plus size={24} />} />
        </Link>
      )}
      <BottomNavigationBar />
    </div>
  );
}

export default Layout;
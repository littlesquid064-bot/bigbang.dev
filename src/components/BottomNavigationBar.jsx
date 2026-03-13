import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, ListOrdered, CreditCard, Package, Settings } from 'lucide-react';

function BottomNavigationBar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path || (path === '/orders' && location.pathname.startsWith('/orders/')) || (path === '/inventory' && location.pathname.startsWith('/inventory/'));

  return (
    <nav className="bottom-nav">
      <Link to="/" className={isActive('/') ? 'active' : ''}>
        <LayoutDashboard />
        <span>Dashboard</span>
      </Link>
      <Link to="/orders" className={isActive('/orders') ? 'active' : ''}>
        <ListOrdered />
        <span>Orders</span>
      </Link>
      <Link to="/payments" className={isActive('/payments') ? 'active' : ''}>
        <CreditCard />
        <span>Payments</span>
      </Link>
      <Link to="/inventory" className={isActive('/inventory') ? 'active' : ''}>
        <Package />
        <span>Inventory</span>
      </Link>
      <Link to="/settings" className={isActive('/settings') ? 'active' : ''}>
        <Settings />
        <span>Settings</span>
      </Link>
    </nav>
  );
}

export default BottomNavigationBar;